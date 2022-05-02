import mongoose, { Schema } from 'mongoose';

interface Course {
  title: String;
  credits: number;
  prerequisites: Array<Schema.Types.ObjectId>;
}

const CourseSchema = new Schema<Course>({
  title: { type: String, required: true },
  credits: { type: Number, min: 0, max: 4, required: true },
  prerequisites: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});

export default mongoose.model<Course>('Course', CourseSchema);
export { Course };
