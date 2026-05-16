import { BaseData } from '../BaseData';

/** Config lives on domain vectors; no extra interaction fields required */
export class VectorDragInteraction extends BaseData {
  constructor(data = {}) {
    super(data);
  }

  static schema = [];
}
