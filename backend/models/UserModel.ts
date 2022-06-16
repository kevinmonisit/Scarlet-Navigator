import mongoose, { Schema } from 'mongoose';

const MAX_REGULAR_SEMESTERS = 16;
const MAX_SUMMER_SEMESTERS = 8;
const MAX_TOTAL_SEMESTERS = MAX_REGULAR_SEMESTERS + MAX_SUMMER_SEMESTERS;

interface User {
  courses: Array<Schema.Types.ObjectId>;
  startingYear: number;
  plan: Array<Array<Schema.Types.ObjectId>>;
}

function arrayLimit(val: Array<any>) {
  return val.length <= MAX_TOTAL_SEMESTERS;
}

const UserSchema = new Schema<User>({
  // major: { type: Schema.Types.ObjectId, ref: 'Major' },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course', default: [] }],
  startingYear: { type: Number, required: true },
  plan: [
    {
      type: Array,
      default: [],
      validate: [
        arrayLimit,
        `User exceeds the limit of ${MAX_TOTAL_SEMESTERS} semesters`,
      ],
    },
  ],
});

export default mongoose.model<User>('User', UserSchema);
export { User };
