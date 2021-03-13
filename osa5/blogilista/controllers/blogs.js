/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs.map((x) => x.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  const blog = new Blog(body);
  blog.user = user._id;

  if (!blog.likes) {
    blog.likes = 0;
  }
  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  const blogToReturn = await Blog.findById(blog.id).populate('user', { username: 1, name: 1, id: 1 });

  return response.status(201).json(blogToReturn);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!blog) return response.status(404).json({ error: 'blog not found' });

  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndDelete(id);
    return response.status(204).end();
  }

  return response.status(403).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;

  const newBlog = {
    title: body.title || '',
    author: body.author || '',
    url: body.url || '',
    likes: body.likes || 0,
  };

  const editedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true });
  return response.json(editedBlog.toJSON());
});

module.exports = blogsRouter;
