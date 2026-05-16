import React from 'react';
import { FieldType } from '../data/BaseData';
import './DynamicForm.css';

/**
 * Recursive component to render form fields based on a schema.
 */
const DynamicForm = ({ schema, data, onChange, level = 0 }) => {
  if (!schema) return null;

  const handleChange = (key, value) => {
    const nextData = { ...data, [key]: value };
    onChange(nextData);
  };

  const renderField = (field) => {
    const { key, type, label, default: defaultValue, options, itemSchema, fields } = field;
    const value = data?.[key] ?? defaultValue;

    switch (type) {
      case FieldType.TEXT:
      case FieldType.NUMBER:
      case FieldType.COLOR:
        return (
          <div key={key} className="form-group">
            <label>{label}</label>
            <input
              type={type === FieldType.COLOR ? 'color' : type === FieldType.NUMBER ? 'number' : 'text'}
              value={value ?? ''}
              onChange={(e) => handleChange(key, type === FieldType.NUMBER ? Number(e.target.value) : e.target.value)}
              className="form-control"
            />
          </div>
        );
      
      case FieldType.TEXTAREA:
        return (
          <div key={key} className="form-group">
            <label>{label}</label>
            <textarea
              value={value ?? ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className="form-control"
              rows={3}
            />
          </div>
        );

      case FieldType.CHECKBOX:
        return (
          <div key={key} className="form-check">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => handleChange(key, e.target.checked)}
              id={`field-${key}`}
            />
            <label htmlFor={`field-${key}`}>{label}</label>
          </div>
        );

      case FieldType.SELECT:
        return (
            <div key={key} className="form-group">
                <label>{label}</label>
                <select 
                    value={value ?? ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="form-control"
                >
                    {options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>
        );

      case FieldType.GROUP:
        return (
          <div key={key} className="form-section">
            <h4 className="form-section-title">{label}</h4>
            <div className="form-section-content">
                <DynamicForm 
                    schema={fields} 
                    data={value || {}} 
                    onChange={(newGroupData) => handleChange(key, newGroupData)}
                    level={level + 1}
                />
            </div>
          </div>
        );

      case FieldType.ARRAY:
        const items = Array.isArray(value) ? value : [];
        return (
          <div key={key} className="form-array">
            <div className="form-array-header">
                <label>{label}</label>
                <button 
                    type="button"
                    className="btn-sm btn-add"
                    onClick={() => {
                        const newItem = {};
                        // Initialize default values for new item based on itemSchema
                        itemSchema.forEach(f => {
                            if (f.default !== undefined) newItem[f.key] = f.default;
                        });
                        handleChange(key, [...items, newItem]);
                    }}
                >
                    + Add
                </button>
            </div>
            <div className="form-array-list">
                {items.map((item, idx) => (
                    <div key={idx} className="form-array-item">
                        <div className="form-array-item-content">
                            <DynamicForm
                                schema={itemSchema}
                                data={item}
                                onChange={(updatedItem) => {
                                    const newItems = [...items];
                                    newItems[idx] = updatedItem;
                                    handleChange(key, newItems);
                                }}
                                level={level + 1}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn-icon btn-remove"
                            onClick={() => {
                                const newItems = items.filter((_, i) => i !== idx);
                                handleChange(key, newItems);
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`dynamic-form level-${level}`}>
      {schema.map(renderField)}
    </div>
  );
};

export default DynamicForm;
