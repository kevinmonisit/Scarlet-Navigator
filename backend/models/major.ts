const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MajorSchema = new Schema({
  title: String,
  requirements: [{ type: Schema.Types.ObjectId, ref: 'Requirement' }],
});

module.exports = mongoose.model('Major', MajorSchema);
export {};
