const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const fav = blogs.reduce((fav, blog) =>
    blog.likes > fav.likes ? blog : fav
  );

  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes,
  };
};

//with lodash
const _ = require("lodash");

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  // grouping blogs by author and counting
  const grouped = _.countBy(blogs, "author");

  // top author with most blogs
  const topAuthor = _.maxBy(Object.keys(grouped), (author) => grouped[author]);

  return {
    author: topAuthor,
    blogs: grouped[topAuthor],
  };
};
// without lodash
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likesByAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  let topAuthor = null;
  let maxLikes = 0;

  for (const [author, likes] of Object.entries(likesByAuthor)) {
    if (likes > maxLikes) {
      topAuthor = { author, likes };
      maxLikes = likes;
    }
  }

  return topAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
