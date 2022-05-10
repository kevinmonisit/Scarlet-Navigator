import mongoose, { Schema } from 'mongoose';

interface Major {
  title: String;
  requirements: Array<Schema.Types.ObjectId>;
}

const MajorSchema = new Schema<Major>({
  title: { type: String, require: true },
  requirements: [
    { type: Schema.Types.ObjectId, ref: 'Requirement', require: true },
  ],
});

export default mongoose.model<Major>('Major', MajorSchema);
export { Major };
