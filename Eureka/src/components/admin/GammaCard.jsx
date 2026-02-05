import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCardLocal, removeCardLocal } from '../../store/slices/cardsSlice';
import { Trash2, GripVertical } from 'lucide-react';
import BlockNoteEditor from './BlockNoteEditor';
import './GammaCard.css';

const GammaCard = ({ card, lessonId, attributes, listeners, setNodeRef, style }) => {
  const dispatch = useDispatch();

  const handleDeleteCard = () => {
    if (window.confirm('Delete this card and all its contents?')) {
      dispatch(removeCardLocal(card.id));
    }
  };

  const handleContentChange = (newBlocks) => {
    // Save the entire block structure to the card
    dispatch(updateCardLocal({ 
      id: card.id, 
      updates: { blocks: newBlocks } 
    }));
  };

  // Migration helper to support legacy content and new BlockNote content
  const getInitialContent = () => {
    if (!card.blocks || card.blocks.length === 0) return undefined;
    
    // Check if it's already BlockNote format (has 'props' or standard types)
    // or if it's the new format we are saving
    const isBlockNote = card.blocks.some(b => b.props || ['paragraph', 'heading'].includes(b.type));
    
    if (isBlockNote) {
      // Ensure we don't pass broken blocks if mixed
      return card.blocks; 
    }

    // Attempt migration from old custom format to BlockNote
    return card.blocks.map(b => {
      if (b.type === 'h1') return { type: 'heading', content: b.content, props: { level: 1 } };
      if (b.type === 'h2') return { type: 'heading', content: b.content, props: { level: 2 } };
      if (b.type === 'h3') return { type: 'heading', content: b.content, props: { level: 3 } };
      if (b.type === 'h4') return { type: 'heading', content: b.content, props: { level: 3 } }; // BlockNote usually supports 1-3
      if (b.type === 'bullet_list') return { type: 'bulletListItem', content: b.content };
      if (b.type === 'numbered_list') return { type: 'numberedListItem', content: b.content };
      if (b.type === 'image') return { type: 'image', props: { url: b.content } };
      if (b.type === 'video') return { type: 'video', props: { url: b.content } };
      if (b.type === 'question') {
         // Old question content might be object or string
         const json = typeof b.content === 'object' ? JSON.stringify(b.content) : b.content;
         return { type: 'question', props: { jsonContent: json } };
      }
      // Default to paragraph
      return { type: 'paragraph', content: b.content || '' };
    });
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="gamma-card-full-width"
    >
      <div className="gamma-card-container">
        <div className="gamma-card-header">
          <div className="drag-handle" {...attributes} {...listeners}>
            <GripVertical size={16} />
          </div>
          <span className="card-type-label">CARD / SLIDE</span>
          <div className="card-actions">
            <button className="icon-btn delete" onClick={handleDeleteCard}>
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="gamma-card-body" style={{ padding: 0 }}>
           {/* Render the BlockNote Editor */}
           <BlockNoteEditor 
             initialContent={getInitialContent()}
             onContentChange={handleContentChange}
           />
        </div>
      </div>
    </div>
  );
};

export default GammaCard;
