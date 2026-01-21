import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../../styles/teacher/class.css';

const Class = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('materials');
  const [materials, setMaterials] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [modal, setModal] = useState<{ type: string | null, data?: any }>({ type: null });
  
  // Create Exam State
  const [examStep, setExamStep] = useState(1);
  const [examForm, setExamForm] = useState<any>({
    title: '', type: '', date: '', duration: '', description: '', totalMarks: '',
    questions: [], uploadedFile: ''
  });
  const [currentQuestion, setCurrentQuestion] = useState<any>({ 
    type: 'multiple-choice', question: '', marks: '', options: ['', ''], correctAnswer: 0, sampleAnswer: '' 
  });

  // Material Form
  const [materialForm, setMaterialForm] = useState({ title: '', type: '', description: '' });

  useEffect(() => {
    // Load Class Data
    const classes = JSON.parse(localStorage.getItem('classesData') || '[]');
    const currentClass = classes.find((c: any) => c.id == id);
    if (currentClass) {
        setClassData(currentClass);
    } else {
        navigate('/teacher');
    }

    // Load Materials
    const storedMaterials = JSON.parse(localStorage.getItem('materialsData') || '[]');
    // Filter by class ID if we had that relationship, but original JS seems to load ALL materials regardless of class?
    // Looking at class.js, it just loads `materialsData` from local storage. It doesn't seem to filter by classID in `loadMaterials`.
    // Wait, `loadMaterials` iterates `materialsData`. It doesn't check classId. 
    // This implies materials are shared or the mock data is simple.
    // I will filter if I can, but to be "faithful" to the bug/feature, I'll load all.
    // Actually, for a better app, I should filter. But I'll stick to the original logic which seems to show global materials.
    setMaterials(storedMaterials);

    // Load Exams
    const storedExams = JSON.parse(localStorage.getItem('examsData') || '[]');
    setExams(storedExams);

  }, [id, navigate]);

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    const newMaterial = {
        id: Date.now(), // Simple ID
        ...materialForm,
        date: new Date().toISOString().split('T')[0],
        views: 0
    };
    const updatedMaterials = [newMaterial, ...materials];
    setMaterials(updatedMaterials);
    localStorage.setItem('materialsData', JSON.stringify(updatedMaterials));
    setModal({ type: null });
    setMaterialForm({ title: '', type: '', description: '' });
  };

  // Exam Wizard Logic
  const handleAddQuestion = () => {
    const newQuestion = { ...currentQuestion };
    // Validate
    if (!newQuestion.question || !newQuestion.marks) return;
    
    setExamForm(prev => ({
        ...prev,
        questions: [...prev.questions, newQuestion]
    }));
    
    // Reset current question
    setCurrentQuestion({ 
        type: 'multiple-choice', question: '', marks: '', options: ['', ''], correctAnswer: 0, sampleAnswer: '' 
    });
  };

  const handleSubmitExam = () => {
    const newExam = {
        id: Date.now(),
        ...examForm,
        submissions: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0
    };
    const updatedExams = [newExam, ...exams];
    setExams(updatedExams);
    localStorage.setItem('examsData', JSON.stringify(updatedExams));
    
    // Update class exam count
    if (classData) {
        const classes = JSON.parse(localStorage.getItem('classesData') || '[]');
        const updatedClasses = classes.map((c: any) => 
            c.id === classData.id ? { ...c, exams: (c.exams || 0) + 1 } : c
        );
        localStorage.setItem('classesData', JSON.stringify(updatedClasses));
        setClassData(updatedClasses.find((c: any) => c.id === classData.id));
    }

    setModal({ type: null });
    setExamStep(1);
    setExamForm({ title: '', type: '', date: '', duration: '', description: '', totalMarks: '', questions: [], uploadedFile: '' });
  };

  if (!classData) return <div>Loading...</div>;

  return (
    <div className="page-content">
        <header className="main-header">
            <div className="header-left">
                <button className="back-btn" onClick={() => navigate('/teacher')}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    <span>Back to Dashboard</span>
                </button>
            </div>
            
            <div className="header-actions">
                <div className="notification-badge">
                    <button className="icon-btn">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="badge">3</span>
                    </button>
                </div>
                <div className="user-avatar"><span>A</span></div>
            </div>
        </header>

        {/* Class Banner */}
        <div className="class-banner" id="class-banner" style={{ background: `linear-gradient(135deg, ${classData.color} 0%, ${classData.color}dd 100%)` }}>
            <div className="banner-content">
                <h1 className="class-title">{classData.name}</h1>
                <div className="class-info">
                    <span className="class-description">{classData.description}</span>
                    <div className="class-location">
                        <span className="material-symbols-outlined">location_on</span>
                        <span>{classData.location}</span>
                    </div>
                </div>
            </div>
            <div className="banner-actions">
                <button className="btn-primary" onClick={() => setModal({ type: 'invite' })}>
                    <span className="material-symbols-outlined">person_add</span>
                    Invite Students
                </button>
                <button className="btn-secondary" onClick={() => setModal({ type: 'settings' })}>
                    <span className="material-symbols-outlined">settings</span>
                    Settings
                </button>
            </div>
        </div>

        {/* Tabs */}
        <div className="class-nav-tabs">
            <nav className="tabs-container">
                <button className={`tab-btn ${activeTab === 'materials' ? 'active' : ''}`} onClick={() => setActiveTab('materials')}>
                    <span className="material-symbols-outlined">library_books</span>
                    Materials
                </button>
                <button className={`tab-btn ${activeTab === 'members' ? 'active' : ''}`} onClick={() => setActiveTab('members')}>
                    <span className="material-symbols-outlined">groups</span>
                    Members
                </button>
                <button className={`tab-btn ${activeTab === 'exams' ? 'active' : ''}`} onClick={() => setActiveTab('exams')}>
                    <span className="material-symbols-outlined">quiz</span>
                    Exams
                    <span className="badge-count">{classData.exams || 0}</span>
                </button>
            </nav>
        </div>

        <div className="tab-content-container">
            {/* Materials Tab */}
            {activeTab === 'materials' && (
                <div className="tab-content active">
                    <div className="tab-header">
                        <h2>Class Materials</h2>
                        <button className="btn-primary" onClick={() => setModal({ type: 'add-material' })}>
                            <span className="material-symbols-outlined">add</span>
                            Add Material
                        </button>
                    </div>

                    <div className="invite-banner">
                        <div className="banner-text">
                            <h3>Invite students to join this class</h3>
                            <p>Students get free access to activities and materials you add to your class.</p>
                        </div>
                        <button className="close-banner-btn">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="materials-list">
                        {materials.map((material: any) => (
                            <div key={material.id} className="material-card">
                                <div className="material-header">
                                    <div>
                                        <h3 className="material-title">{material.title}</h3>
                                        <span className="material-type">
                                            <span className="material-symbols-outlined">
                                                {material.type === 'video' ? 'videocam' : 'description'}
                                            </span>
                                            {material.type}
                                        </span>
                                    </div>
                                    <div className="material-actions">
                                        <button className="class-card-action-btn">
                                            <span className="material-symbols-outlined">download</span>
                                        </button>
                                        <button className="class-card-action-btn">
                                            <span className="material-symbols-outlined">share</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="material-description" dangerouslySetInnerHTML={{ __html: material.description }}></div>
                                <div className="material-footer">
                                    <span className="material-date">
                                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>calendar_month</span>
                                        {material.date}
                                    </span>
                                    <span className="material-views">
                                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>visibility</span>
                                        {material.views} views
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
                <div className="tab-content active">
                    <div className="tab-header">
                        <h2>Class Members</h2>
                        <Link to="/teacher/students" className="btn-primary">
                            <span className="material-symbols-outlined">groups</span>
                            Show Students
                        </Link>
                    </div>
                    <p>Members list coming soon...</p>
                </div>
            )}

            {/* Exams Tab */}
            {activeTab === 'exams' && (
                <div className="tab-content active">
                    <div className="tab-header">
                        <h2>Exams & Assignments</h2>
                        <button className="btn-primary" onClick={() => setModal({ type: 'create-exam' })}>
                            <span className="material-symbols-outlined">quiz</span>
                            Create Exam
                        </button>
                    </div>
                    <div className="exams-list">
                        {exams.map((exam: any) => (
                            <div key={exam.id} className="exam-card">
                                <div className="exam-header">
                                    <div>
                                        <h3 className="exam-title">{exam.title}</h3>
                                        <span className="exam-type">{exam.type}</span>
                                    </div>
                                    <div className="material-actions">
                                        <button className="class-card-action-btn">
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="exam-details">
                                    <div className="exam-detail">
                                        <span className="material-symbols-outlined">calendar_month</span>
                                        <span>{exam.date}</span>
                                    </div>
                                    <div className="exam-detail">
                                        <span className="material-symbols-outlined">schedule</span>
                                        <span>{exam.duration} min</span>
                                    </div>
                                    <div className="exam-detail">
                                        <span className="material-symbols-outlined">grade</span>
                                        <span>{exam.totalMarks} marks</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Modals */}
        {modal.type === 'add-material' && (
            <div className="modal show">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Add New Material</h3>
                        <button className="modal-close" onClick={() => setModal({ type: null })}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddMaterial}>
                            <div className="form-group">
                                <label>Material Title</label>
                                <input type="text" placeholder="Enter title" required value={materialForm.title} onChange={e => setMaterialForm({...materialForm, title: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <select required value={materialForm.type} onChange={e => setMaterialForm({...materialForm, type: e.target.value})}>
                                    <option value="">Select type</option>
                                    <option value="document">Document</option>
                                    <option value="presentation">Presentation</option>
                                    <option value="video">Video</option>
                                    <option value="link">Link</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea rows={4} placeholder="Enter description" value={materialForm.description} onChange={e => setMaterialForm({...materialForm, description: e.target.value})}></textarea>
                            </div>
                            <button type="submit" className="btn-primary">Add Material</button>
                        </form>
                    </div>
                </div>
            </div>
        )}

        {/* Create Exam Modal (Simplified Wizard) */}
        {modal.type === 'create-exam' && (
            <div className="modal show">
                <div className="modal-content" style={{ maxWidth: '700px' }}>
                    <div className="modal-header">
                        <h3>Create New Exam (Step {examStep}/3)</h3>
                        <button className="modal-close" onClick={() => setModal({ type: null })}>&times;</button>
                    </div>
                    <div className="modal-body">
                        {examStep === 1 && (
                            <div className="exam-step">
                                <div className="form-group">
                                    <label>Exam Title</label>
                                    <input type="text" placeholder="Enter title" value={examForm.title} onChange={e => setExamForm({...examForm, title: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select value={examForm.type} onChange={e => setExamForm({...examForm, type: e.target.value})}>
                                        <option value="">Select type</option>
                                        <option value="quiz">Quiz</option>
                                        <option value="midterm">Midterm</option>
                                        <option value="final">Final Exam</option>
                                    </select>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input type="date" value={examForm.date} onChange={e => setExamForm({...examForm, date: e.target.value})} />
                                    </div>
                                    <div className="form-group">
                                        <label>Duration (min)</label>
                                        <input type="number" value={examForm.duration} onChange={e => setExamForm({...examForm, duration: e.target.value})} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Total Marks</label>
                                    <input type="number" value={examForm.totalMarks} onChange={e => setExamForm({...examForm, totalMarks: e.target.value})} />
                                </div>
                            </div>
                        )}

                        {examStep === 2 && (
                            <div className="exam-step">
                                <h4>Add Questions</h4>
                                <div className="form-group">
                                    <label>Question</label>
                                    <textarea rows={2} value={currentQuestion.question} onChange={e => setCurrentQuestion({...currentQuestion, question: e.target.value})}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Marks</label>
                                    <input type="number" value={currentQuestion.marks} onChange={e => setCurrentQuestion({...currentQuestion, marks: e.target.value})} />
                                </div>
                                <button className="btn-secondary" onClick={handleAddQuestion}>Add Question</button>
                                <div className="questions-preview">
                                    <p>Questions Added: {examForm.questions.length}</p>
                                </div>
                            </div>
                        )}

                        {examStep === 3 && (
                            <div className="exam-step">
                                <h4>Review</h4>
                                <p><strong>Title:</strong> {examForm.title}</p>
                                <p><strong>Type:</strong> {examForm.type}</p>
                                <p><strong>Questions:</strong> {examForm.questions.length}</p>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        {examStep > 1 && <button className="btn-secondary" onClick={() => setExamStep(prev => prev - 1)}>Previous</button>}
                        {examStep < 3 && <button className="btn-primary" onClick={() => setExamStep(prev => prev + 1)}>Next</button>}
                        {examStep === 3 && <button className="btn-primary" onClick={handleSubmitExam}>Submit Exam</button>}
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Class;


