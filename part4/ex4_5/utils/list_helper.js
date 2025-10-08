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

//without lodash ex ex4_6
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorCount = {};

  blogs.forEach((blog) => {
    authorCount[blog.author] = (authorCount[blog.author] || 0) + 1;
  });

  let topAuthor = null;
  let maxBlogs = 0;

  for (const author in authorCount) {
    if (authorCount[author] > maxBlogs) {
      maxBlogs = authorCount[author];
      topAuthor = author;
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
