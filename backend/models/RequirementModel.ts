import mongoose, { Schema } from 'mongoose';

interface Requirement {
  title: String;
}

const RequirementSchema = new Schema<Requirement>({});

export default mongoose.model<Requirement>('Requirement', RequirementSchema);
export { Requirement };
