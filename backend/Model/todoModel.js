const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  content: {type: String,required:true},
  createdAt: { type: Date, default: Date.now }
});

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: {type: String},
  priority: { type: String,  default: 'medium',enum: ['low', 'medium', 'high'] },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  tags: [String],
  assignedUsers: [String],
  notes: [noteSchema]
}, { timestamps: true ,versionKey:false });

const todo=mongoose.model("todo",todoSchema)

module.exports = {todo}
