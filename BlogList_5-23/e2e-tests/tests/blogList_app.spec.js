const {
  test,
  expect,
  beforeEach,
  afterEach,
  describe,
} = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    // Reset the backend test database
    await request.post("/api/testing/reset");

    // Create a test user directly in backend
    await request.post("/api/users", {
      data: {
        username: "Alisa",
        name: "Alisa Test",
        password: "secret123",
      },
    });

    await page.goto("/");
  });
  // ✅ Очищаем БД после каждого теста
  afterEach(async ({ request }) => {
    await request.post("/api/testing/reset");
  });

  // 5.17 - verify login form is visible
  test("Login form is shown", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Log in to application/i })
    ).toBeVisible();

    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
  });

  //5.18 - login tests
  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "Alisa", "secret123");
      await expect(page.getByText("Alisa logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "Alisa", "wrongpassword");

      const errorDiv = page.getByText("Wrong credentials");
      await expect(errorDiv).toBeVisible();
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
      await expect(page.getByText("Alisa logged in")).not.toBeVisible();
    });
  });
  describe("When logged in", () => {
    let uniqueBlog;

    beforeEach(async ({ page }) => {
      await loginWith(page, "Alisa", "secret123");
      uniqueBlog = await createBlog(page, "Anna K", "http://example.com");
      await expect(page.getByText(`${uniqueBlog} Anna K`)).toBeVisible();
    });
    test("a new blog can be created", async ({ page }) => {
      await expect(page.getByText(`${uniqueBlog} Anna K`)).toBeVisible();
    });
    test("the blog can be liked", async ({ page }) => {
      await page
        .locator(`text=${uniqueBlog} Anna K`)
        .getByRole("button", { name: "view" })
        .click();
      const likesText = await page.getByText("likes").textContent();
      const initialLikes = parseInt(likesText.match(/\d+/)[0]);
      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByText(`likes ${initialLikes + 1}`)).toBeVisible();
    });
    test("the user who added a blog can delete it", async ({ page }) => {
      const blogElement = page.locator("div.blog", {
        hasText: `${uniqueBlog} Anna K`,
      });
      await blogElement.getByRole("button", { name: "view" }).click();

      page.once("dialog", async (dialog) => await dialog.accept());

      await page.getByRole("button", { name: "delete" }).click();

      await expect(page.getByText(`${uniqueBlog} Anna K`)).not.toBeVisible({
        timeout: 5000,
      });
    });
    test("blogs are ordered by number of likes (descending)", async ({
      page,
    }) => {
      // Создаём несколько блогов
      const blog1 = await createBlog(page, "Author1", "http://a1.com");
      const blog2 = await createBlog(page, "Author2", "http://a2.com");
      const blog3 = await createBlog(page, "Author3", "http://a3.com");

      // Открываем все блоги (чтобы появились кнопки like)
      const blogs = await page.locator("div.blog");
      const count = await blogs.count();
      for (let i = 0; i <= count; i++) {
        await blogs.nth(i).getByRole("button", { name: "view" }).click();
      }

      // Лайкаем blog2 3 раза
      const blog2Element = page.locator("div.blog", {
        hasText: `${blog2} Author2`,
      });
      await blog2Element.getByRole("button", { name: "like" }).click();
      await page.waitForTimeout(300);
      await blog2Element.getByRole("button", { name: "like" }).click();
      await page.waitForTimeout(300);
      await blog2Element.getByRole("button", { name: "like" }).click();
      await page.waitForTimeout(300);

      // Лайкаем blog1 один раз
      const blog1Element = page.locator("div.blog", {
        hasText: `${blog1} Author1`,
      });
      await blog1Element.getByRole("button", { name: "like" }).click();
      await page.waitForTimeout(300);

      // Лайкаем blog3 2 раз

      const blog3Element = page.locator("div.blog", {
        hasText: `${blog3} Author3`,
      });
      await blog3Element.getByRole("button", { name: "like" }).click();
      await page.waitForTimeout(300);
      await blog3Element.getByRole("button", { name: "like" }).click();
      await page.waitForTimeout(300);

      // Проверяем порядок: blog2 должен быть первым
      const blogTitles = await page.locator(".blog").allInnerTexts();
      console.log("Blog order:", blogTitles);

      expect(blogTitles[0]).toContain(blog2);
      expect(blogTitles[1]).toContain(blog3);
      expect(blogTitles[2]).toContain(blog1);
      //expect(blogTitles[2]).toContain(uniqueBlog);
    });
  });
});
