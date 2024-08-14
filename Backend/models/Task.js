const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
 userId: { type: String, required: true },
 description: { type: String, required: false },
title: { type: String, required: true },
deadline: { type: String, required: true },

  status: { type: String },

  
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;