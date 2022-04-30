import mongoose from 'mongoose';
import { Schema } from 'mongoose';

interface User {
  courses: Array<Schema.Types.ObjectId>;
  startingYear: number;
  plan: Array<Array<Schema.Types.ObjectId>>;
}

const UserSchema = new Schema<User>({
  // major: { type: Schema.Types.ObjectId, ref: 'Major' },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course', default: [] }],
  startingYear: { type: Number, required: true },
  plan: [{ type: Array, default: [] }],
});

export default mongoose.model<User>('User', UserSchema);
export { User };
