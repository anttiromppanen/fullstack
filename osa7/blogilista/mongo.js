const mongoose = require('mongoose');

// const pw = process.argv[2];

const mongoUrl = 'censored';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const blog = new Blog({
  title: 'Third post',
  author: 'Antti',
  url: 'www.anttiromppanen.com',
  likes: 0,
});

blog.save().then(() => {
  console.log('post saved');
  mongoose.connection.close();
});
