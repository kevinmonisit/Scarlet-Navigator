const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  major: { type: Schema.Types.ObjectId, ref: 'Major' },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  startingYear: Number,
});

//Export model
module.exports = mongoose.model('User', UserSchema);
export {};
