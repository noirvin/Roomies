const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = mongoose.Schema({
    title: String,
    content: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);
