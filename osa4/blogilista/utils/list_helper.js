const dummy = (blogs) => 1;

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
