const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequirementSchema = new Schema({
  title: String,
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});

export {};
