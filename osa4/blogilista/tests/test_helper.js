const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'First Test Blog',
    author: 'Pete Parkkonen',
    url: 'www.pete.fi',
    likes: 1,
  },
  {
    title: 'Second Test Blog',
    author: 'Rane Raitsikka',
    url: 'www.raneraitsikka.fi',
    likes: 50,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((x) => x.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
