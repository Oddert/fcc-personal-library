const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Placeholder'
  },
  title: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'fcc-library-comment'
    }
  ]
});

module.exports = mongoose.model('fcc-library-book', BookSchema);
