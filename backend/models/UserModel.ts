import mongoose, { Schema } from 'mongoose';

const MAX_REGULAR_SEMESTERS = 16;
const MAX_SUMMER_SEMESTERS = 8;
const MAX_TOTAL_SEMESTERS = MAX_REGULAR_SEMESTERS + MAX_SUMMER_SEMESTERS;

interface User {
  courses: Array<Schema.Types.ObjectId>;
  startingYear: number;
  plan: Array<Array<Schema.Types.ObjectId>>;
  secondPlan: Array<Array<Schema.Types.ObjectId>>;
  thirdPlan: Array<Array<Schema.Types.ObjectId>>;
}

const UserSchema = new Schema<User>({
  // major: { type: Schema.Types.ObjectId, ref: 'Major' },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course', default: [] }],
  startingYear: { type: Number, required: true },
  plan: [
    {
      type: Array,
      default: [],
    },
  ],
  secondPlan: [
    {
      type: Array,
      default: [],
    },
  ],
  thirdPlan: [
    {
      type: Array,
      default: [],
    },
  ],
});

export default mongoose.model<User>('User', UserSchema);
export { User };
