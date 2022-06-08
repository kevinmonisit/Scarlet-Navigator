import mongoose, { Schema } from 'mongoose';

interface Course {
  _id: any;
  title: string;
  credits: number;
  school: string;
  subject: string;
  courseString: string;
  campusLocations: Array<string>;
  // prerequisites: Array<Schema.Types.ObjectId>;
}

const CourseSchema = new Schema<Course>({
  title: { type: String, required: true },
  credits: { type: Number },
  school: { type: String },
  subject: { type: String },
  courseString: { type: String },
  campusLocations: [{ type: String }],
  // prerequisites: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});

export default mongoose.model<Course>('Course', CourseSchema);
export { Course };
