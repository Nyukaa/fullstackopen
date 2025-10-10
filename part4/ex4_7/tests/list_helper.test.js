const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithManyBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    console.log("test1:", result);
    assert.strictEqual(result, 5);
  });
  test("empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
  test("list of many blogs, calculating sum of likes ", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    console.log("test3:", result);
    assert.strictEqual(result, 36);
  });
  test("favorite blog (with the most likes) ", () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);
    console.log("testfavorite:", result);
    assert.deepStrictEqual(result, {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
  test("favorite blog (with one blog) ", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    console.log("testfavoriteOne :", result);
    assert.deepStrictEqual(result, {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });
  test("favorite blog (without blogs) ", () => {
    const result = listHelper.favoriteBlog([]);
    assert.deepStrictEqual(result, null);
  });

  describe("most blogs", () => {
    test("author with most blogs", () => {
      const result = listHelper.mostBlogs(listWithManyBlogs);
      assert.deepStrictEqual(result, {
        author: "Robert C. Martin",
        blogs: 3,
      });
    });

    test("empty list returns null", () => {
      const result = listHelper.mostBlogs([]);
      assert.strictEqual(result, null);
    });
  });

  describe("most likes", () => {
    const blogs = [
      { title: "React patterns", author: "Michael Chan", likes: 7 },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
      { title: "First class tests", author: "Robert C. Martin", likes: 10 },
      { title: "TDD harms architecture", author: "Robert C. Martin", likes: 0 },
      { title: "Type wars", author: "Robert C. Martin", likes: 2 },
    ];

    test("author with the most total likes", () => {
      const result = listHelper.mostLikes(blogs);
      assert.deepStrictEqual(result, {
        author: "Edsger W. Dijkstra",
        likes: 17,
      });
    });

    test("empty list returns null", () => {
      const result = listHelper.mostLikes([]);
      assert.strictEqual(result, null);
    });
  });
});
