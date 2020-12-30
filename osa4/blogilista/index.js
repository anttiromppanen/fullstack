require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = 'mongodb+srv://ana:ana@cluster0.3anup.mongodb.net/blogilista-app?retryWrites=true&w=majority';
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log(error.message));

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
