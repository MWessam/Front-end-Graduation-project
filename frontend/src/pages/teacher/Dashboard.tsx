import type { FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ClassData {
  id: number;
  name: string;
  description: string;
  location: string;
  sets: number;
  members: number;
  exams: number;
  color: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState<{ type: 'create' | 'update' | 'delete' | null, data?: any }>({ type: null });
  
  // Create Modal State
  const [createForm, setCreateForm] = useState({ name: '', description: '', subject: '', color: '#22c55e' });
  
  // Update Modal State
  const [updateForm, setUpdateForm] = useState({ id: 0, name: '', location: '', description: '' });

  useEffect(() => {
    const storedClasses = localStorage.getItem('classesData');
    if (storedClasses) {
        setClasses(JSON.parse(storedClasses));
    }
    
    // Check for action param
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'create') {
        setModal({ type: 'create' });
    }
  }, [location.search]);

  const saveClasses = (newClasses: ClassData[]) => {
    setClasses(newClasses);
    localStorage.setItem('classesData', JSON.stringify(newClasses));
    window.dispatchEvent(new Event('classesUpdated')); // Notify Sidebar
  };

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    const newClass: ClassData = {
        id: classes.length > 0 ? Math.max(...classes.map(c => c.id)) + 1 : 1,
        name: createForm.name,
        description: createForm.description || "New Class",
        location: "Mansura's College - Mansura, Dept.",
        sets: 0,
        members: 0,
        exams: 0,
        color: createForm.color
    };
    saveClasses([...classes, newClass]);
    setModal({ type: null });
    setCreateForm({ name: '', description: '', subject: '', color: '#22c55e' });
  };

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    const updatedClasses = classes.map(c => c.id === updateForm.id ? { ...c, name: updateForm.name, location: updateForm.location, description: updateForm.description } : c);
    saveClasses(updatedClasses);
    setModal({ type: null });
  };

  const handleDelete = () => {
    if (modal.data) {
        const updatedClasses = classes.filter(c => c.id !== modal.data.id);
        saveClasses(updatedClasses);
        setModal({ type: null });
    }
  };

  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-content">
        <header className="main-header" style={{ marginBottom: '2rem' }}>
            <div className="search-container">
                <span className="material-symbols-outlined search-icon">search</span>
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search classes..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
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

        <div className="page-header">
            <h1 className="page-title">Your Classes</h1>
            <div className="page-actions">
                <button id="create-class-btn" className="btn-primary" onClick={() => setModal({ type: 'create' })}>
                    <span className="material-symbols-outlined">add</span>
                    Create Class
                </button>
            </div>
        </div>

        <div className="classes-grid">
            {filteredClasses.length === 0 ? (
                <div className="no-results" style={{ textAlign: 'center', padding: '3rem', gridColumn: '1/-1', color: 'var(--text-light-secondary)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>search_off</span>
                    <h3>No classes found</h3>
                </div>
            ) : (
                filteredClasses.map(cls => (
                    <div 
                        key={cls.id} 
                        className="class-card" 
                        style={{ '--primary': cls.color } as any}
                        onClick={(e) => {
                            if (!(e.target as HTMLElement).closest('.class-card-actions')) {
                                navigate(`/teacher/class/${cls.id}`);
                            }
                        }}
                    >
                        <div className="class-card-header">
                            <div>
                                <h3 className="class-card-title">{cls.name}</h3>
                                <p className="class-card-subtitle">{cls.description}</p>
                                <p className="class-card-subtitle">{cls.location}</p>
                            </div>
                            <div className="class-card-actions">
                                <button className="class-card-action-btn more-options-btn" onClick={(e) => { e.stopPropagation(); setModal({ type: 'delete', data: cls }); }}>
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                                <button className="class-card-action-btn settings-btn" onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setUpdateForm({ id: cls.id, name: cls.name, location: cls.location, description: cls.description });
                                    setModal({ type: 'update', data: cls }); 
                                }}>
                                    <span className="material-symbols-outlined">settings</span>
                                </button>
                            </div>
                        </div>
                        <div className="class-card-stats">
                            <div className="class-card-stat">
                                <span className="material-symbols-outlined">bolt</span>
                                <span>{cls.sets} sets</span>
                            </div>
                            <div className="class-card-stat">
                                <span className="material-symbols-outlined">group</span>
                                <span>{cls.members} members</span>
                            </div>
                            <div className="class-card-stat">
                                <span className="material-symbols-outlined">assignment</span>
                                <span>{cls.exams} exams</span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* Create Modal */}
        {modal.type === 'create' && (
            <div className="modal show">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Create New Class</h3>
                        <button className="modal-close" onClick={() => setModal({ type: null })}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form id="create-class-form" onSubmit={handleCreate}>
                            <div className="form-group">
                                <label>Class Name</label>
                                <input type="text" placeholder="Enter class name" required value={createForm.name} onChange={e => setCreateForm({...createForm, name: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea placeholder="Enter class description" rows={3} value={createForm.description} onChange={e => setCreateForm({...createForm, description: e.target.value})}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input type="text" placeholder="Enter subject" value={createForm.subject} onChange={e => setCreateForm({...createForm, subject: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Class Color</label>
                                <div className="color-selector">
                                    {['#22c55e', '#3b82f6', '#8b5cf6', '#f97316'].map(color => (
                                        <div key={color} style={{ display: 'inline-block', marginRight: '10px' }}>
                                            <input 
                                                type="radio" 
                                                name="color" 
                                                id={`color-${color}`}
                                                value={color}
                                                checked={createForm.color === color} 
                                                onChange={() => setCreateForm({...createForm, color})} 
                                                style={{ display: 'none' }}
                                            />
                                            <label 
                                                htmlFor={`color-${color}`} 
                                                className={`color-option ${createForm.color === color ? 'selected' : ''}`}
                                                style={{ 
                                                    backgroundColor: color, 
                                                    width: '30px', 
                                                    height: '30px', 
                                                    display: 'block', 
                                                    borderRadius: '50%', 
                                                    cursor: 'pointer',
                                                    border: createForm.color === color ? '3px solid #fff' : 'none',
                                                    boxShadow: createForm.color === color ? '0 0 0 2px var(--text-light)' : 'none'
                                                }}
                                            ></label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-secondary modal-cancel" onClick={() => setModal({ type: null })}>Cancel</button>
                        <button type="submit" form="create-class-form" className="btn-primary">Create Class</button>
                    </div>
                </div>
            </div>
        )}

        {/* Update Modal */}
        {modal.type === 'update' && (
            <div className="modal show">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Update Class Details</h3>
                        <button className="modal-close" onClick={() => setModal({ type: null })}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form id="update-class-form" onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label>Class name</label>
                                <input type="text" required value={updateForm.name} onChange={e => setUpdateForm({...updateForm, name: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Class Location</label>
                                <input type="text" required value={updateForm.location} onChange={e => setUpdateForm({...updateForm, location: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Class Description</label>
                                <textarea rows={3} value={updateForm.description} onChange={e => setUpdateForm({...updateForm, description: e.target.value})}></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-secondary" onClick={() => setModal({ type: null })}>Cancel</button>
                        <button type="submit" form="update-class-form" className="btn-primary">Update Details</button>
                    </div>
                </div>
            </div>
        )}

        {/* Delete Modal */}
        {modal.type === 'delete' && (
            <div className="modal show">
                <div className="modal-content delete-modal">
                    <div className="modal-header">
                        <h3>Delete Class</h3>
                        <button className="modal-close" onClick={() => setModal({ type: null })}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <div className="delete-icon">
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                        <p className="delete-message">Are you sure you want to delete <strong>{modal.data?.name}</strong>?</p>
                        <p className="delete-warning">This action cannot be undone.</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-secondary" onClick={() => setModal({ type: null })}>Cancel</button>
                        <button className="btn-danger" onClick={handleDelete}>Delete Class</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Dashboard;


