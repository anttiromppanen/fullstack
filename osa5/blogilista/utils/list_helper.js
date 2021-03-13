const _ = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) => blogs.reduce((a, b) => a + b.likes, 0);

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog));

  const finalObject = {
    title: result.title,
    author: result.author,
    likes: result.likes,
  };

  return finalObject;
};

const mostBlogs = (blogs) => {
  const result = _(blogs)
    .countBy('author')
    .map((key, value) => ({ author: value, blogs: key }))
    .value();

  return _.last(result);
};

const mostLikes = (blogs) => {
  const result = _(blogs)
    .groupBy('author')
    .map((key, value) => ({ author: value, likes: _.sumBy(key, 'likes') }))
    .orderBy('likes')
    .value();

  return _.last(result);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
