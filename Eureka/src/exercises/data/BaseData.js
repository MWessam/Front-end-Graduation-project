/**
 * Enum for supported field types in the dynamic editor.
 */
export const FieldType = {
  TEXT: 'text',
  NUMBER: 'number',
  COLOR: 'color',
  TEXTAREA: 'textarea',
  CHECKBOX: 'checkbox',
  SELECT: 'select',
  ARRAY: 'array', // List of items
  GROUP: 'group', // Nested object
};

/**
 * Base class for all Data Transfer Objects (DTOs) in the exercise system.
 * Provides a contract for serialization and validation.
 */
export class BaseData {
  constructor(data = {}) {
    // Intentionally empty base constructor
  }

  /**
   * Serializes the object to a plain JSON structure.
   * By default, returns the object's properties.
   */
  toJSON() {
    return { ...this };
  }

  /**
   * Validates the data structure.
   * @returns {boolean} True if valid, false otherwise.
   */
  isValid() {
    return true;
  }

  /**
   * Static schema definition for the editor.
   * Must be overridden by subclasses.
   */
  static schema = [];
}
