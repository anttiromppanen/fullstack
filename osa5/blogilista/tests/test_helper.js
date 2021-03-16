const Blog = require('../models/blog');
const User = require('../models/user');

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

const initialUsers = [
  {
    username: 'root',
    password: 'root',
    name: 'root',
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((x) => x.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((x) => x.toJSON());
};

module.exports = {
  initialBlogs, initialUsers, blogsInDb, usersInDb,
};
