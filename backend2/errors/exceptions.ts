import { Schema } from 'mongoose';

class DoesNotExistException extends Error {
  constructor(idOfDocumentToLocate: Schema.Types.ObjectId) {
    super();
  }
}
