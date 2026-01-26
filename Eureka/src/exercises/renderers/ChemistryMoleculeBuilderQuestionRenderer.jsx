import React, { useState, useCallback, useRef } from 'react';
import { QuestionType, InteractionMode } from '../types';
import './ChemistryMoleculeBuilderQuestionRenderer.css';

const BOND_TYPES = ['single', 'double', 'triple'];
const CELL = 44;
const COLS = 12;
const ROWS = 8;
const CANVAS_W = COLS * CELL;
const CANVAS_H = ROWS * CELL;

function snapToGrid(clientX, clientY, rect) {
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const col = Math.max(0, Math.min(COLS - 1, Math.floor(x / CELL)));
  const row = Math.max(0, Math.min(ROWS - 1, Math.floor(y / CELL)));
  return { x: col * CELL + CELL / 2, y: row * CELL + CELL / 2, col, row };
}

function serializeEdge(a, b) {
  const [i, j] = [a, b].sort();
  return `${i}-${j}`;
}

function ChemistryMoleculeBuildStrategy({ questionBody, value, onChange, disabled }) {
  const allowedElements = questionBody?.allowedElements ?? ['C', 'H', 'O', 'N'];
  const nodes = value?.nodes ?? [];
  const edges = value?.edges ?? [];
  const canvasRef = useRef(null);
  const [selectedBondType, setSelectedBondType] = useState('single');
  const [pendingBondNode, setPendingBondNode] = useState(null);
  
  // Track dragging state for atoms
  const [draggingAtom, setDraggingAtom] = useState(null);
  const [dragStartPos, setDragStartPos] = useState(null);
  const hasDraggedRef = useRef(false);

  const handleDragStart = useCallback(
    (e, element) => {
      if (disabled) return;
      e.dataTransfer.setData('text/plain', element);
      e.dataTransfer.effectAllowed = 'copy';
    },
    [disabled]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      if (disabled) return;
      const element = e.dataTransfer.getData('text/plain');
      if (!element || !allowedElements.includes(element)) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const { x, y } = snapToGrid(e.clientX, e.clientY, rect);
      const id = `n-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const next = [...nodes, { id, element, x, y }];
      onChange?.({ ...value, nodes: next, edges });
    },
    [disabled, allowedElements, nodes, edges, value, onChange]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  // Handle atom mouse down (start of drag or click)
  const handleAtomMouseDown = useCallback(
    (e, node) => {
      if (disabled) return;
      e.preventDefault();
      setDraggingAtom(node);
      setDragStartPos({ x: e.clientX, y: e.clientY });
      hasDraggedRef.current = false;
    },
    [disabled]
  );

  // Handle atom mouse move (dragging)
  const handleAtomMouseMove = useCallback(
    (e) => {
      if (!draggingAtom || disabled) return;
      e.preventDefault();
      
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Check if we've moved enough to consider it a drag
      if (dragStartPos) {
        const dx = e.clientX - dragStartPos.x;
        const dy = e.clientY - dragStartPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
          // It's a drag, not a click
          hasDraggedRef.current = true;
          
          const { x, y } = snapToGrid(e.clientX, e.clientY, rect);
          const updatedNodes = nodes.map((n) =>
            n.id === draggingAtom.id ? { ...n, x, y } : n
          );
          onChange?.({ ...value, nodes: updatedNodes, edges });
        }
      }
    },
    [draggingAtom, dragStartPos, disabled, nodes, edges, value, onChange]
  );

  // Handle atom mouse up (end of drag or click)
  const handleAtomMouseUp = useCallback(
    (e, node) => {
      if (disabled) return;
      
      const wasDragged = hasDraggedRef.current;
      
      // Reset dragging state
      setDraggingAtom(null);
      setDragStartPos(null);
      hasDraggedRef.current = false;
      
      // If we dragged, don't trigger click handler
      if (wasDragged) {
        return;
      }

      // Otherwise, it's a click - handle bond creation
      if (!pendingBondNode) {
        setPendingBondNode(node);
      } else {
        if (pendingBondNode.id === node.id) {
          setPendingBondNode(null);
        } else {
          const key = serializeEdge(pendingBondNode.id, node.id);
          const exists = edges.some((e) => serializeEdge(e.from, e.to) === key);
          if (!exists) {
            const next = [
              ...edges,
              { from: pendingBondNode.id, to: node.id, bondType: selectedBondType },
            ];
            onChange?.({ ...value, nodes, edges: next });
          }
          setPendingBondNode(null);
        }
      }
    },
    [disabled, pendingBondNode, selectedBondType, edges, nodes, value, onChange]
  );

  // Global mouse move handler for dragging atoms
  React.useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (draggingAtom) {
        handleAtomMouseMove(e);
      }
    };

    const handleGlobalMouseUp = (e) => {
      if (draggingAtom) {
        const node = nodes.find((n) => n.id === draggingAtom.id);
        if (node) {
          handleAtomMouseUp(e, node);
        }
      }
    };

    if (draggingAtom) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [draggingAtom, handleAtomMouseMove, handleAtomMouseUp, nodes]);

  const getNode = (id) => nodes.find((n) => n.id === id);

  return (
    <div className="chemistry-molecule-builder" data-testid="chemistry-molecule-builder">
      <div className="chemistry-molecule-palette">
        <span className="chemistry-molecule-palette-label">Elements</span>
        <div className="chemistry-molecule-elements">
          {allowedElements.map((el) => (
            <div
              key={el}
              className="chemistry-molecule-element"
              draggable={!disabled}
              onDragStart={(e) => handleDragStart(e, el)}
            >
              {el}
            </div>
          ))}
        </div>
      </div>
      <div className="chemistry-molecule-bonds">
        <span className="chemistry-molecule-palette-label">Bonds</span>
        <div className="chemistry-molecule-bond-btns">
          {BOND_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              className={`chemistry-molecule-bond-btn ${selectedBondType === t ? 'active' : ''}`}
              onClick={() => setSelectedBondType(t)}
              disabled={disabled}
            >
              {t === 'single' && '—'}
              {t === 'double' && '═'}
              {t === 'triple' && '≡'}
              <span className="chemistry-molecule-bond-label">{t}</span>
            </button>
          ))}
        </div>
        {pendingBondNode && (
          <span className="chemistry-molecule-pending">Click another atom to connect</span>
        )}
      </div>
      <div
        ref={canvasRef}
        className="chemistry-molecule-canvas"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ width: CANVAS_W, height: CANVAS_H }}
      >
        <svg width="100%" height="100%" className="chemistry-molecule-svg">
          {edges.map((e, i) => {
            const a = getNode(e.from);
            const b = getNode(e.to);
            if (!a || !b) return null;
            const count = e.bondType === 'double' ? 2 : e.bondType === 'triple' ? 3 : 1;
            return (
              <g key={i}>
                {Array.from({ length: count }).map((_, k) => {
                  const off = count === 1 ? 0 : (k - (count - 1) / 2) * 8;
                  const dx = b.x - a.x;
                  const dy = b.y - a.y;
                  const perp = Math.sqrt(dx * dx + dy * dy) || 1;
                  const nx = (-dy / perp) * off;
                  const ny = (dx / perp) * off;
                  return (
                    <line
                      key={k}
                      x1={a.x + nx}
                      y1={a.y + ny}
                      x2={b.x + nx}
                      y2={b.y + ny}
                      stroke="currentColor"
                      strokeWidth={2}
                      className="chemistry-molecule-bond-line"
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
        {nodes.map((n) => (
          <button
            key={n.id}
            type="button"
            className={`chemistry-molecule-atom ${pendingBondNode?.id === n.id ? 'pending' : ''} ${draggingAtom?.id === n.id ? 'dragging' : ''}`}
            style={{ left: n.x - 18, top: n.y - 18 }}
            onMouseDown={(e) => handleAtomMouseDown(e, n)}
            disabled={disabled}
          >
            {n.element}
          </button>
        ))}
      </div>
    </div>
  );
}

const STRATEGIES = {
  [InteractionMode.MOLECULE_BUILD]: {
    render(props) {
      return <ChemistryMoleculeBuildStrategy {...props} />;
    },
  },
};

const ChemistryMoleculeBuilderQuestionRenderer = ({
  questionType,
  interactionMode,
  questionBody,
  value,
  onChange,
  disabled,
}) => {
  const mode = interactionMode ?? InteractionMode.MOLECULE_BUILD;
  const strategy = STRATEGIES[mode] ?? STRATEGIES[InteractionMode.MOLECULE_BUILD];
  if (!strategy) {
    return (
      <div className="chemistry-molecule-unknown" data-testid="chemistry-molecule-unknown">
        Molecule builder does not support: {interactionMode}
      </div>
    );
  }
  return strategy.render({ questionBody, value, onChange, disabled });
};

ChemistryMoleculeBuilderQuestionRenderer.questionType = QuestionType.CHEMISTRY_MOLECULE_BUILDER;

export default ChemistryMoleculeBuilderQuestionRenderer;
