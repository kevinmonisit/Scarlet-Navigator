import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
  // major: { type: Schema.Types.ObjectId, ref: 'Major' },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  startingYear: Number,
});

export default mongoose.model('User', UserSchema);
