const express         = require('express'),
      app             = express(),
      bodyParser      = require('body-parser'),
      cookieParser    = require('cookie-parser'),
      mongoose        = require('mongoose'),
      methodOverride  = require('method-override'),
      helmet          = require('helmet'),
      path            = require('path');

const Book            = require('./models/Book'),
      Comment         = require('./models/Comment');

require('dotenv').config();

app.use(helmet({
  frameguard: {
    action: 'deny'
  },
  directives: {
    defaultSrc: ["self"],
    scriptSrc: ["self"]
  },
  hidePoweredBy: {
    setTo: 'PHP 4.2.0'
  }
}));

mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname + '/public')));
app.set('view engine', 'ejs');

//========== Front End Routes ==========
app.get('/test', (req, res) => {
  console.log('==========')
  console.log(req)
  console.log('==========')
  console.log(res)
  console.log('==========')
  res.json({ hello: 'world' })
});

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/books', (req, res) => {
  Book.find({})
      .populate('comments')
      .exec((err, books) => {
        if (err) {
          console.log(err);
          res.status(500).json({ err })
        } else {
          res.render('books', { books });
        }
  })
});

app.get('/books/new', (req, res) => {
  res.render('books/new')
});

app.get('/books/:id', (req, res) => {
  Book.findById(req.params.id)
      .populate('comments')
      .exec((err, book) => {
        if (err) {
          console.log(err);
          res.status(500).json({ err })
        } else {
          res.render('books/view', { book });
        }
  })
})
//========== / Front End Routes ==========

//========== API Routes ==========
app.get('/api/books', (req, res) => {
  Book.find({})
      .populate('comments')
      .exec((err, books) => {
        if (err) {
          console.log(err);
          res.status(500).json({ err })
        } else {
          res.status(200).json({ books })
        }
  })
})

app.get('/api/books/:id', (req, res) => {
  Book.count({ _id: req.params.id }, (err, count) => {
    if (count > 0) {
      Book.findById(req.params.id)
          .populate('comments')
          .exec((err, book) => {
            if (err) {
              console.log(err);
              res.status(500).json({ err })
            } else {
              res.status(200).json({ book })
            }
      })
    } else {
      res.status(200).json({ message: 'no book exists' })
    }
  })
});

app.post('/api/books', (req, res) => {
  const newBook = req.body;
  Book.create(newBook, (err, book) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err })
    } else {
      res.status(200).json({ book })
    }
  })
});

app.post('/api/books/:id', (req, res) => {
  console.log('Adding new comment');
  Book.findById(req.params.id, (err, foundBook) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err })
    } else {
      console.log('Book found:', foundBook);
      Comment.create(req.body, (err, createdComment) => {
        if (err) {
          console.log(err);
          res.status(500).json({ err })
        } else {
          foundBook.comments.push(createdComment._id);
          foundBook.save();
          res.redirect(`/api/books/${req.params.id}`);
        }
      })
    }
  })
});

app.delete('/api/books', (req, res) => {
  Book.remove({}, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err })
    } else {
      res.status(200).json({
        message: 'complete delete successful'
      })
    }
  })
})

app.delete('/api/books/:id', (req, res) => {
  Book.count({ _id: req.params.id }, (err, count) => {
    if (count > 0) {
      Book.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ err })
        } else {
          res.status(200).json({
            message: 'delete successful'
          })
        }
      })
    } else {
      res.status(200).json({
        message: 'no book exists'
      })
    }
  })
})

app.delete('/api/comment/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err })
    } else {
      res.status(200).json({
        message: 'delete successful'
      })
    }
  })
})
//========== / API Routes ==========

const PORT = process.env.PORT || 3000
var server = app.listen(
  PORT,
  () => console.log( `${new Date().toLocaleTimeString()}: Server initialised on port ${PORT}`)
);
