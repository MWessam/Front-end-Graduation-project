import React, { useState, useCallback } from 'react';
import { QuestionType, InteractionMode } from '../types';
import './DragMatchQuestionRenderer.css';

/**
 * DRAG_MATCH: User drags items from left to match with items on right
 */
function DragMatchMode({ questionBody, value, onChange, disabled }) {
  const leftItems = questionBody?.leftItems ?? [];
  const rightItems = questionBody?.rightItems ?? [];
  
  const matches = value?.matches ?? {};
  const [draggingItem, setDraggingItem] = useState(null);
  const [dragOverTarget, setDragOverTarget] = useState(null);
  
  const handleDragStart = useCallback((e, item) => {
    if (disabled) return;
    setDraggingItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item.id);
  }, [disabled]);
  
  const handleDragEnd = useCallback(() => {
    setDraggingItem(null);
    setDragOverTarget(null);
  }, []);
  
  const handleDragOver = useCallback((e, targetId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverTarget(targetId);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setDragOverTarget(null);
  }, []);
  
  const handleDrop = useCallback((e, targetId) => {
    e.preventDefault();
    if (disabled || !draggingItem) return;
    
    // Remove any existing match for this left item
    const newMatches = { ...matches };
    
    // If this target already has a match, remove it
    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === targetId) {
        delete newMatches[key];
      }
    });
    
    // Add new match
    newMatches[draggingItem.id] = targetId;
    
    onChange?.({ matches: newMatches });
    setDraggingItem(null);
    setDragOverTarget(null);
  }, [disabled, draggingItem, matches, onChange]);
  
  const handleRemoveMatch = useCallback((leftId) => {
    if (disabled) return;
    const newMatches = { ...matches };
    delete newMatches[leftId];
    onChange?.({ matches: newMatches });
  }, [disabled, matches, onChange]);
  
  // Get matched right item for a left item
  const getMatchedRight = (leftId) => {
    const rightId = matches[leftId];
    return rightItems.find((item) => item.id === rightId);
  };
  
  // Check if a right item is matched
  const isRightMatched = (rightId) => {
    return Object.values(matches).includes(rightId);
  };
  
  return (
    <div className="drag-match-container" data-testid="drag-match-container">
      <div className="drag-match-columns">
        {/* Left column - draggable items */}
        <div className="drag-match-column drag-match-left">
          <div className="drag-match-column-header">Match from:</div>
          {leftItems.map((item) => {
            const matchedRight = getMatchedRight(item.id);
            const isMatched = !!matchedRight;
            
            return (
              <div key={item.id} className="drag-match-item-row">
                <div
                  className={`drag-match-item drag-match-item-left ${
                    isMatched ? 'matched' : ''
                  } ${draggingItem?.id === item.id ? 'dragging' : ''}`}
                  draggable={!disabled && !isMatched}
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragEnd={handleDragEnd}
                >
                  <span className="drag-match-item-content">{item.label}</span>
                  {isMatched && (
                    <span className="drag-match-item-badge">
                      → {matchedRight.label}
                      {!disabled && (
                        <button
                          className="drag-match-remove-btn"
                          onClick={() => handleRemoveMatch(item.id)}
                        >
                          ×
                        </button>
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Right column - drop targets */}
        <div className="drag-match-column drag-match-right">
          <div className="drag-match-column-header">Match to:</div>
          {rightItems.map((item) => {
            const isMatched = isRightMatched(item.id);
            const isOver = dragOverTarget === item.id;
            
            return (
              <div
                key={item.id}
                className={`drag-match-item drag-match-item-right ${
                  isMatched ? 'matched' : ''
                } ${isOver ? 'drag-over' : ''}`}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, item.id)}
              >
                <span className="drag-match-item-content">{item.label}</span>
                {isMatched && (
                  <span className="drag-match-check">✓</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Match count */}
      <div className="drag-match-info">
        <span className="drag-match-count">
          Matched: {Object.keys(matches).length} / {Math.min(leftItems.length, rightItems.length)}
        </span>
      </div>
    </div>
  );
}

/**
 * DRAG_ORDER: User drags items to arrange them in correct order
 */
function DragOrderMode({ questionBody, value, onChange, disabled }) {
  const items = questionBody?.items ?? [];
  
  // Initialize order if not set
  const currentOrder = value?.order ?? items.map((item) => item.id);
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  
  const orderedItems = currentOrder
    .map((id) => items.find((item) => item.id === id))
    .filter(Boolean);
  
  const handleDragStart = useCallback((e, index) => {
    if (disabled) return;
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  }, [disabled]);
  
  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setDragOverIndex(null);
  }, []);
  
  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    setDragOverIndex(index);
  }, [dragIndex]);
  
  const handleDrop = useCallback((e, dropIndex) => {
    e.preventDefault();
    if (disabled || dragIndex === null || dragIndex === dropIndex) return;
    
    const newOrder = [...currentOrder];
    const [removed] = newOrder.splice(dragIndex, 1);
    newOrder.splice(dropIndex, 0, removed);
    
    onChange?.({ order: newOrder });
    setDragIndex(null);
    setDragOverIndex(null);
  }, [disabled, dragIndex, currentOrder, onChange]);
  
  return (
    <div className="drag-order-container" data-testid="drag-order-container">
      <div className="drag-order-list">
        {orderedItems.map((item, index) => (
          <div
            key={item.id}
            className={`drag-order-item ${
              dragIndex === index ? 'dragging' : ''
            } ${dragOverIndex === index ? 'drag-over' : ''}`}
            draggable={!disabled}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
          >
            <span className="drag-order-number">{index + 1}</span>
            <span className="drag-order-content">{item.label}</span>
            <span className="drag-order-handle">⋮⋮</span>
          </div>
        ))}
      </div>
      
      <div className="drag-order-help">
        <span>Drag items to reorder</span>
      </div>
    </div>
  );
}

/**
 * DragMatchQuestionRenderer
 * Renders drag-and-drop matching and ordering questions
 */
const DragMatchQuestionRenderer = ({
  questionType,
  interactionMode,
  questionBody,
  value,
  onChange,
  disabled,
}) => {
  switch (interactionMode) {
    case InteractionMode.DRAG_MATCH:
      return (
        <DragMatchMode
          questionBody={questionBody}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    
    case InteractionMode.DRAG_ORDER:
      return (
        <DragOrderMode
          questionBody={questionBody}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );
    
    default:
      return (
        <div className="drag-match-unknown" data-testid="drag-match-unknown">
          Drag match does not support interaction mode: {interactionMode}
        </div>
      );
  }
};

DragMatchQuestionRenderer.questionType = QuestionType.DRAG_MATCH;

export default DragMatchQuestionRenderer;
