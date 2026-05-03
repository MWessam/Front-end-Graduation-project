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
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  fetchCards,
  saveCardAction,
  addCardLocal,
  reorderCardsLocal,
} from '../../store/slices/cardsSlice';
import { contentService } from '../../services/contentService';
import GammaCard from '../../components/admin/GammaCard';
import AdminBreadcrumbs from '../../components/admin/AdminBreadcrumbs';
import { Plus, Save, ChevronLeft, FileQuestion } from 'lucide-react';
import './LessonEditor.css';

const SortableCard = ({ card, lessonId }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });

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
      blocks: [],
    };
    dispatch(addCardLocal(newCard));
  };

  const handleSave = () => {
    dispatch(saveCardAction({ lessonId: id, cards, title: lesson.title }));
    alert('Lesson saved successfully!');
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = cards.findIndex((c) => c.id === active.id);
    const newIndex = cards.findIndex((c) => c.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    dispatch(reorderCardsLocal(arrayMove(cards, oldIndex, newIndex)));
  };

  const handleBack = () => {
    if (lesson?.subject?.id) {
      navigate(`/admin/subjects/${lesson.subject.id}`);
    } else {
      navigate('/admin');
    }
  };

  if (!lesson) {
    return <div className="loading">Loading...</div>;
  }

  const crumbs = [
    { label: 'Admin', to: '/admin' },
    lesson.subject?.id != null && {
      label: lesson.subject?.name ?? 'Subject',
      to: `/admin/subjects/${lesson.subject.id}`,
    },
    { label: lesson.title || 'Lesson' },
  ].filter(Boolean);

  return (
    <div className="gamma-editor-page">
      <header className="gamma-header">
        <div className="header-left">
          <button type="button" onClick={handleBack} className="btn-icon">
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
          <button
            type="button"
            onClick={() => navigate(`/admin/lessons/${id}/questions`)}
            className="btn-secondary"
          >
            <FileQuestion size={18} />
            <span>Manage Questions</span>
          </button>
          <button type="button" onClick={handleSave} className="btn-primary">
            <Save size={18} />
            <span>Save Presentation</span>
          </button>
        </div>
      </header>

      <main className="gamma-editor-main">
        <div className="gamma-editor-crumb-row">
          <AdminBreadcrumbs items={crumbs} />
        </div>
        <div className="editor-container">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
              <div className="cards-grid">
                {cards.map((card) => (
                  <SortableCard key={card.id} card={card} lessonId={id} />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <button type="button" className="add-card-block" onClick={handleAddCard}>
            <Plus size={24} />
            <span>Add a new card</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default LessonEditor;
