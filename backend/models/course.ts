const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

const CourseSchema = new Schema({
  title: String,
  credits: { type: Number, min: 0, max: 4 },
  prerequisites: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});

module.exports = mongoose.model('Course', CourseSchema);
export {};
