const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('fcc-library-comment', CommentSchema);
