import React, { useState } from 'react';
import { QuestionType, InteractionMode } from '../types';
import './MathMatrixMultiplicationRenderer.css';

const STRATEGIES = {
  [InteractionMode.MATRIX_DRAG]: {
    render({ questionBody, value, onChange, disabled }) {
      const matrixA = questionBody?.matrixA ?? [[1, 2], [3, 4]];
      const matrixB = questionBody?.matrixB ?? [[5, 6], [7, 8]];
      
      // Calculate result dimensions
      const rowsA = matrixA.length;
      const colsA = matrixA[0].length;
      const rowsB = matrixB.length;
      const colsB = matrixB[0].length;
      
      // Result matrix initialized with nulls or user values
      // value = { cells: { "0-0": 19, "0-1": 22 ... } }
      const userCells = value?.cells ?? {};

      const [draggedItem, setDraggedItem] = useState(null); // { type: 'row'|'col', index: number, matrix: 'A'|'B' }

      const handleDragStart = (e, type, index, matrix) => {
        if (disabled) return;
        setDraggedItem({ type, index, matrix });
        e.dataTransfer.setData('text/plain', JSON.stringify({ type, index, matrix }));
      };

      const handleDrop = (e, rowIndex, colIndex) => {
        e.preventDefault();
        if (disabled) return;
        
        try {
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            
            // We need both a row from A and a col from B for a specific cell
            // But the prompt says "drag a row and a column into the new thing"
            // Let's assume the user clicks a cell in result, and it highlights the row/col?
            // Or they drag row i to the result row i?
            
            // Implementation:
            // The user must drag Row i from A AND Column j from B to Cell (i, j).
            // This might be tedious.
            // Alternative: Click Cell (i,j) -> Highlights Row i and Col j -> User confirms calculation?
            
            // Let's follow "drag a row and a column".
            // Maybe we drop them onto a "Work Area" to calculate a specific cell?
            
            // Let's keep it simple:
            // Drag Row i of A to Result Row i.
            // Drag Col j of B to Result Col j.
            // When both are present for a cell, it reveals the value.
            
            // Actually, typically in these tools, you drag the row OVER the column to visualize the dot product.
            
            // Let's implement: Click a cell in result matrix to "focus" it.
            // Then highlight the corresponding row in A and col in B.
            // Then user enters the value?
            
            // "Drag a row and a column into the new thing"
            // Okay, let's have a "Calculation Zone".
            // Drop Row -> Shows Row. Drop Col -> Shows Col.
            // If dimensions match, show dot product calculation: (a*x + b*y ...).
            // Then user drags that result to the matrix?
            
            // Let's try: Drop Row i on Cell (i, j) AND Drop Col j on Cell (i, j).
            
            const currentCellKey = `${rowIndex}-${colIndex}`;
            const currentCellValue = userCells[currentCellKey] || {};
            
            let newCellValue = { ...currentCellValue };
            
            if (data.matrix === 'A' && data.type === 'row' && data.index === rowIndex) {
                newCellValue.rowDropped = true;
            }
            if (data.matrix === 'B' && data.type === 'col' && data.index === colIndex) {
                newCellValue.colDropped = true;
            }
            
            // If both dropped, calculate value
            if (newCellValue.rowDropped && newCellValue.colDropped) {
                // Calculate dot product
                let sum = 0;
                for(let k=0; k<colsA; k++) {
                    sum += matrixA[rowIndex][k] * matrixB[k][colIndex];
                }
                newCellValue.value = sum;
            }
            
            onChange?.({ cells: { ...userCells, [currentCellKey]: newCellValue } });

        } catch (err) {
            console.error("Drop error", err);
        }
        setDraggedItem(null);
      };

      const allowDrop = (e) => {
        e.preventDefault();
      };

      return (
        <div className="matrix-mult-container">
            <div className="matrices-row">
                {/* Matrix A */}
                <div className="matrix-wrapper">
                    <div className="matrix-label">A</div>
                    <div className="matrix">
                        {matrixA.map((row, i) => (
                            <div key={i} className="matrix-row" draggable onDragStart={(e) => handleDragStart(e, 'row', i, 'A')}>
                                {row.map((val, j) => (
                                    <div key={j} className="matrix-cell">{val}</div>
                                ))}
                                <div className="drag-handle">::</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="operator">×</div>

                {/* Matrix B */}
                <div className="matrix-wrapper">
                    <div className="matrix-label">B</div>
                    <div className="matrix">
                        <div className="matrix-header-drag">
                            {matrixB[0].map((_, j) => (
                                <div key={j} className="col-drag-handle" draggable onDragStart={(e) => handleDragStart(e, 'col', j, 'B')}>::</div>
                            ))}
                        </div>
                        {matrixB.map((row, i) => (
                            <div key={i} className="matrix-row">
                                {row.map((val, j) => (
                                    <div key={j} className="matrix-cell">{val}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="operator">=</div>

            {/* Result Matrix C */}
            <div className="matrix-wrapper">
                <div className="matrix-label">Result</div>
                <div className="matrix result-matrix">
                    {Array(rowsA).fill(0).map((_, i) => (
                        <div key={i} className="matrix-row">
                            {Array(colsB).fill(0).map((_, j) => {
                                const cellKey = `${i}-${j}`;
                                const cellData = userCells[cellKey] || {};
                                const isComplete = cellData.value !== undefined;
                                
                                return (
                                    <div 
                                        key={j} 
                                        className={`matrix-cell result-cell ${isComplete ? 'complete' : ''} ${cellData.rowDropped ? 'has-row' : ''} ${cellData.colDropped ? 'has-col' : ''}`}
                                        onDrop={(e) => handleDrop(e, i, j)}
                                        onDragOver={allowDrop}
                                    >
                                        {isComplete ? cellData.value : '?'}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="instructions">
                Drag rows from A and columns from B into the Result cells to calculate their dot product.
            </div>
        </div>
      );
    }
  }
};

const MathMatrixMultiplicationRenderer = ({ questionType, interactionMode, questionBody, value, onChange, disabled }) => {
  const strategy = STRATEGIES[interactionMode];
  if (!strategy) {
    return <div>Unsupported mode: {interactionMode}</div>;
  }
  return strategy.render({ questionBody, value, onChange, disabled });
};

MathMatrixMultiplicationRenderer.questionType = QuestionType.MATH_MATRIX_MULTIPLICATION;
export default MathMatrixMultiplicationRenderer;
