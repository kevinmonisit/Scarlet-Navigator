import mongoose from 'mongoose';
import { Schema } from 'mongoose';

interface Course {
  title: String;
  credits: number;
  prerequisites: Array<Schema.Types.ObjectId>;
  _id: Schema.Types.ObjectId;
}

const CourseSchema = new Schema<Course>({
  title: String,
  credits: { type: Number, min: 0, max: 4 },
  prerequisites: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});

export default mongoose.model<Course>('Course', CourseSchema);
export { Course };
