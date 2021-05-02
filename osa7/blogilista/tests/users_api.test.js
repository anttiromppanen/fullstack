const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: 'root', password: 'root', name: 'root' });
    await user.save();
  });

  test('GET returns correct number or users with correct statuscode', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(1);
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'anddi',
      name: 'Antti Abc',
      password: 'enkerro',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((x) => x.username);
    expect(usernames).toContain(newUser.username);
  });
});

describe('userdata validation', () => {
  describe('username validation', () => {
    test('fails with statuscode 400 if username doesnt exist', async () => {
      const newUser = {
        name: 'Jussi',
        password: 'KaameeRibul',
      };

      await api.post('/api/users').send(newUser).expect(400);
    });

    test('fails with statuscode 400 if username length is under 3 characters', async () => {
      const newUser = {
        username: 'ab',
        name: 'RandomName',
        password: 'KaameeRibuls',
      };

      await api.post('/api/users').send(newUser).expect(400);
    });

    test('username must be unique in system', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'root',
        name: 'Test User',
        password: 'KaameeRibuls',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('`username` to be unique');

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
  });

  describe('password validation', () => {
    test('fails with statuscode 400 if password doesnt exist', async () => {
      const newUser = {
        username: 'TestUser',
        name: 'Test User',
      };

      await api.post('/api/users').send(newUser).expect(400);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
