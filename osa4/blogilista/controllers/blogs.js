const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map((x) => x.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.likes) {
    blog.likes = 0;
  }
  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

  const savedBlog = await blog.save();
  return response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
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
