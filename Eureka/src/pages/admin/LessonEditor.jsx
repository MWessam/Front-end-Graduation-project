import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  fetchCards, 
  saveCardAction, 
  addCardLocal, 
  reorderCardsLocal 
} from '../../store/slices/cardsSlice';
import { contentService } from '../../services/contentService';
import GammaCard from '../../components/admin/GammaCard';
import { Plus, Save, ChevronLeft, LayoutGrid, FileQuestion } from 'lucide-react';
import './LessonEditor.css';

const SortableCard = ({ card, lessonId }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <GammaCard 
      card={card} 
      lessonId={lessonId}
      setNodeRef={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
    />
  );
};

const LessonEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.items);
  const [lesson, setLesson] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const data = contentService.getLessonById(id);
    if (data) {
      setLesson(data);
      dispatch(fetchCards(id));
    } else {
      navigate('/admin');
    }
  }, [id, dispatch, navigate]);

  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      blocks: [
        { id: Date.now() + 1, type: 'paragraph', content: '' }
      ],
    };
    dispatch(addCardLocal(newCard));
  };

  const handleSave = () => {
    dispatch(saveCardAction({ lessonId: id, cards }));
    alert('Lesson saved successfully!');
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = cards.findIndex((c) => c.id === active.id);
      const newIndex = cards.findIndex((c) => c.id === over.id);
      dispatch(reorderCardsLocal(arrayMove(cards, oldIndex, newIndex)));
    }
  };

  const handleBack = () => {
    if (lesson?.subject?.id) {
        navigate(`/admin/subjects/${lesson.subject.id}`);
    } else {
        navigate('/admin');
    }
  };

  if (!lesson) return <div className="loading">Loading...</div>;

  return (
    <div className="gamma-editor-page">
      <header className="gamma-header">
        <div className="header-left">
          <button onClick={handleBack} className="btn-icon">
            <ChevronLeft size={20} />
          </button>
          <div className="lesson-meta">
            <input 
              type="text" 
              className="lesson-title-input"
              value={lesson.title}
              onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
            />
            <span className="lesson-badge">{lesson.subject.name}</span>
          </div>
        </div>
        <div className="header-right">
          <button onClick={() => navigate(`/admin/lessons/${id}/questions`)} className="btn-secondary" style={{ marginRight: '10px' }}>
             <FileQuestion size={18} />
             <span>Manage Questions</span>
          </button>
          <button onClick={handleSave} className="btn-primary">
            <Save size={18} />
            <span>Save Presentation</span>
          </button>
        </div>
      </header>

      <main className="gamma-editor-main">
        <div className="editor-container">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={cards.map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="cards-grid">
                {cards.map((card) => (
                  <SortableCard key={card.id} card={card} lessonId={id} />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <button className="add-card-block" onClick={handleAddCard}>
            <Plus size={24} />
            <span>Add a new card</span>
          </button>
        </div>
      </main>

      <div className="gamma-toolbar">
        <button className="toolbar-item active">
          <LayoutGrid size={20} />
          <span>Cards</span>
        </button>
        {/* Add more toolbar items as needed */}
      </div>
    </div>
  );
};

export default LessonEditor;
