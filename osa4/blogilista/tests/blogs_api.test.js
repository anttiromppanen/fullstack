const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('initial tests', () => {
  test('api returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(2);
  });

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test Blog from post test',
      author: 'Not Antti',
      url: 'www.antti.fi',
      likes: 100,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const titles = response.body.map((x) => x.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain('Test Blog from post test');
  });
});

describe('Check blog fields', () => {
  test('id field does not have underscore', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });

  test('return 0 likes if likes are not set', async () => {
    const newBlog = {
      title: 'Test post for likes not set',
      author: 'Not Antti',
      url: 'www.antti.fi',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const addedBlog = response.body.find((x) => x.title === 'Test post for likes not set');

    expect(addedBlog.likes).toBe(0);
  });

  test('return 400 if title not set', async () => {
    const newBlog = {
      author: 'Not Antti',
      url: 'www.antti.fi',
      likes: 500,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('return 400 if url not set', async () => {
    const newBlog = {
      title: 'Check if url not set',
      author: 'Not Antti',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('Deletion of a blog', () => {
  test('returns 204 if id is valid', async () => {
    const response = await api.get('/api/blogs');
    const { id } = response.body.slice(-1)[0];

    await api.delete(`/api/blogs/${id}`).expect(204);
  });

  test('returns 400 if id is invalid', async () => {
    await api.delete('/api/blogs/123abc').expect(400);
  });
});

describe('Edit a blogpost', () => {
  test('succesful edit returns 200', async () => {
    const blogs = await api.get('/api/blogs');
    const idOfFirstBlog = blogs.body[0].id;

    await api.put(`/api/blogs/${idOfFirstBlog}`).send({}).expect(200);
  });

  test('returns 400 for bad id', async () => {
    await api.put('/api/blogs/abc123').send({}).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
