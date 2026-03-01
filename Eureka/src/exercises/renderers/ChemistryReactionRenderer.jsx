import React, { useState, useEffect } from 'react';
import { QuestionType, InteractionMode } from '../types';
import './ChemistryReactionRenderer.css';

const STRATEGIES = {
  [InteractionMode.DRAG_DROP_MIX]: {
    render({ questionBody, value, onChange, disabled }) {
      // value = { addedReagents: ['H2O', 'NaCl'] }
      const reagents = questionBody?.reagents ?? [];
      const reactions = questionBody?.reactions ?? [];
      
      const addedReagents = value?.addedReagents ?? [];
      const [pouring, setPouring] = useState(null); // { id, color }
      const [bubbles, setBubbles] = useState([]);
      const [showResult, setShowResult] = useState(false);

      // Determine current state based on added reagents
      const getCurrentState = () => {
        let color = 'rgba(203, 213, 225, 0.3)'; // default clear/grayish water
        let precipitate = null;
        let product = null;

        // Simple rule engine
        for (const reaction of reactions) {
            const hasAllReactants = reaction.reactants.every(r => addedReagents.includes(r));
            if (hasAllReactants) {
                color = reaction.productColor || color;
                precipitate = reaction.precipitate || precipitate;
                product = reaction.productName || product;
            }
        }
        return { color, precipitate, product };
      };

      const { color, precipitate, product } = getCurrentState();

      // Effect to trigger bubbles/reaction effects when product changes
      useEffect(() => {
        if (product) {
            setShowResult(true);
            // Spawn bubbles
            const newBubbles = Array.from({ length: 10 }).map((_, i) => ({
                id: Date.now() + i,
                left: Math.random() * 80 + 10 + '%',
                delay: Math.random() * 2 + 's'
            }));
            setBubbles(newBubbles);
        } else {
            setShowResult(false);
            setBubbles([]);
        }
      }, [product, addedReagents.length]);

      const handleDragStart = (e, reagent) => {
        if (disabled || addedReagents.includes(reagent.id)) return;
        e.dataTransfer.setData('reagentId', reagent.id);
        e.dataTransfer.setData('reagentColor', reagent.color);
      };

      const handleDragOver = (e) => {
        e.preventDefault(); // Allow drop
      };

      const handleDrop = (e) => {
        e.preventDefault();
        if (disabled || pouring) return;

        const reagentId = e.dataTransfer.getData('reagentId');
        const reagentColor = e.dataTransfer.getData('reagentColor');
        
        if (!reagentId || addedReagents.includes(reagentId)) return;

        // Start Pouring Animation
        setPouring({ id: reagentId, color: reagentColor });

        // Wait for pour to finish before adding logic
        setTimeout(() => {
            const newAdded = [...addedReagents, reagentId];
            onChange?.({ addedReagents: newAdded });
            setPouring(null);
        }, 1500); // Match CSS animation duration
      };

      const handleReset = () => {
        if (disabled) return;
        onChange?.({ addedReagents: [] });
        setPouring(null);
        setBubbles([]);
      }

      return (
        <div className="chem-reaction-container">
            {showResult && product && (
                <div className="reaction-result-overlay">
                    Created: {product}
                </div>
            )}

            <div className="reagent-shelf">
                {reagents.map(r => (
                    <div 
                        key={r.id}
                        className={`reagent-bottle ${addedReagents.includes(r.id) ? 'added' : ''}`}
                        draggable={!disabled && !addedReagents.includes(r.id)}
                        onDragStart={(e) => handleDragStart(e, r)}
                        style={{ backgroundColor: r.color || '#fff' }}
                    >
                        <span className="reagent-bottle-label">{r.label}</span>
                    </div>
                ))}
            </div>

            <div className="reaction-area">
                {pouring && (
                    <div className="pouring-stream" style={{ backgroundColor: pouring.color }}></div>
                )}
                
                <div 
                    className="beaker-container"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <div className="beaker">
                        <div 
                            className="liquid" 
                            style={{ 
                                backgroundColor: color, 
                                height: addedReagents.length > 0 ? `${Math.min(90, addedReagents.length * 20 + 20)}%` : '0%' 
                            }}
                        >
                            {bubbles.map(b => (
                                <div 
                                    key={b.id} 
                                    className="bubble" 
                                    style={{ left: b.left, animationDelay: b.delay }}
                                />
                            ))}
                            {precipitate && <div className="precipitate">↓ {precipitate}</div>}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="reaction-info">
                <p style={{color: '#64748b'}}>
                    {addedReagents.length === 0 
                        ? "Drag reagents into the beaker to start." 
                        : `Contains: ${addedReagents.join(' + ')}`
                    }
                </p>
            </div>
            
            <button className="reset-btn" onClick={handleReset} disabled={disabled}>
                Empty Beaker
            </button>
        </div>
      );
    }
  }
};

const ChemistryReactionRenderer = ({ questionType, interactionMode, questionBody, value, onChange, disabled }) => {
  const strategy = STRATEGIES[interactionMode];
  if (!strategy) {
    return <div>Unsupported mode: {interactionMode}</div>;
  }
  return strategy.render({ questionBody, value, onChange, disabled });
};

ChemistryReactionRenderer.questionType = QuestionType.CHEMISTRY_REACTION;
export default ChemistryReactionRenderer;
