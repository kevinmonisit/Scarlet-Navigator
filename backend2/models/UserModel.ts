import mongoose from 'mongoose';
import { Schema } from 'mongoose';

interface User {
  courses: Array<Schema.Types.ObjectId>;
  startingYear: number;
}

const UserSchema = new Schema<User>({
  // major: { type: Schema.Types.ObjectId, ref: 'Major' },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  startingYear: { type: Number, required: true },
});

export default mongoose.model<User>('User', UserSchema);
export { User };
