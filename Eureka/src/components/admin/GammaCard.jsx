import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCardLocal, removeCardLocal } from '../../store/slices/cardsSlice';
import { Trash2, GripVertical } from 'lucide-react';
import BlockNoteEditor from './BlockNoteEditor';
import './GammaCard.css';

const LEGACY_EUREKA_TYPES = new Set([
  'title',
  'gamma',
  'h1',
  'h2',
  'h3',
  'h4',
  'bullet_list',
  'numbered_list',
]);

function toInlineContent(content) {
  if (content == null || content === '') return undefined;
  if (Array.isArray(content)) return content;
  return [{ type: 'text', text: String(content), styles: {} }];
}

function omitId(block) {
  const { id: _omit, ...rest } = block;
  return rest;
}

function migrateLegacyBlock(b) {
  const t = b.type;
  if (t === 'title')
    return { type: 'heading', props: { level: 1 }, content: toInlineContent(b.content) };
  if (t === 'gamma') return { type: 'paragraph', content: toInlineContent(b.content) };
  if (t === 'h1')
    return { type: 'heading', props: { level: 1 }, content: toInlineContent(b.content) };
  if (t === 'h2')
    return { type: 'heading', props: { level: 2 }, content: toInlineContent(b.content) };
  if (t === 'h3')
    return { type: 'heading', props: { level: 3 }, content: toInlineContent(b.content) };
  if (t === 'h4')
    return { type: 'heading', props: { level: 3 }, content: toInlineContent(b.content) };
  if (t === 'bullet_list')
    return { type: 'bulletListItem', content: toInlineContent(b.content) };
  if (t === 'numbered_list')
    return { type: 'numberedListItem', content: toInlineContent(b.content) };
  if (t === 'image') return { type: 'image', props: { url: b.content } };
  if (t === 'video') return { type: 'video', props: { url: b.content } };
  if (t === 'question') {
    const json =
      typeof b.content === 'object' ? JSON.stringify(b.content) : (b.content ?? '{}');
    return { type: 'question', props: { jsonContent: json } };
  }
  if (t === 'paragraph')
    return { type: 'paragraph', content: toInlineContent(b.content) };
  return { type: 'paragraph', content: toInlineContent(b.content ?? '') };
}

function sanitizeBlockNoteBlock(block) {
  const b = omitId(block);
  if (b.type === 'paragraph') {
    if (typeof b.content === 'string') {
      const nextContent = toInlineContent(b.content);
      return omitId(nextContent !== undefined ? { ...b, content: nextContent } : { ...b, content: undefined });
    }
    if (b.content === '')
      return omitId({ ...b, content: undefined });
  }
  if (b.type === 'heading') {
    if (typeof b.content === 'string') {
      const level =
        typeof b.props?.level === 'number' ? Math.min(3, Math.max(1, b.props.level)) : 1;
      return {
        ...b,
        props: { ...b.props, level },
        content: toInlineContent(b.content),
      };
    }
  }
  if (b.type === 'bulletListItem' || b.type === 'numberedListItem' || b.type === 'checkListItem') {
    if (typeof b.content === 'string')
      return { ...b, content: toInlineContent(b.content) };
  }
  return b;
}

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

  const getInitialContent = () => {
    if (!card.blocks?.length) return undefined;
    const mixedLegacy = card.blocks.some((b) => LEGACY_EUREKA_TYPES.has(b.type));
    const mapped = mixedLegacy
      ? card.blocks.map(migrateLegacyBlock)
      : card.blocks.map(sanitizeBlockNoteBlock);
    return mapped.map((b) => {
      const next = omitId(b);
      if (
        next.type === 'paragraph' &&
        next.content === ''
      )
        return { ...next, content: undefined };
      return next;
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
