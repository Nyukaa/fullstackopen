import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Blog from "./Blog";

describe("<Blog />", () => {
  let blog;
  let mockLikeHandler;
  let mockDeleteHandler;
  let user;

  beforeEach(() => {
    blog = {
      title: "Testing React components",
      author: "John Doe",
      url: "https://example.com",
      likes: 10,
      user: { id: "123", name: "Jane" },
    };

    user = { id: "123", name: "Jane" };
    mockLikeHandler = vi.fn();
    mockDeleteHandler = vi.fn();

    render(
      <Blog
        blog={blog}
        user={user}
        handleLike={mockLikeHandler}
        handleDelete={mockDeleteHandler}
      />
    );
  });

  test("renders title and author, but not url or likes by default", () => {
    const element = screen.getByText("Testing React components John Doe", {
      exact: false,
    });
    expect(element).toBeDefined();

    // URL and likes should not be visible
    expect(screen.queryByText("https://example.com")).toBeNull();
    expect(screen.queryByText("likes 10")).toBeNull();
  });

  test("shows url and likes when the view button is clicked", async () => {
    const userAction = userEvent.setup();
    const button = screen.getByText("view");
    await userAction.click(button);

    expect(screen.getByText("https://example.com")).toBeDefined();
    expect(screen.getByText("likes 10")).toBeDefined();
  });
  test("clicking the like button twice calls event handler twice", async () => {
    const userAction = userEvent.setup();

    // show details first
    const viewButton = screen.getByText("view");
    await userAction.click(viewButton);

    const likeButton = screen.getByText("like");

    await userAction.click(likeButton);
    await userAction.click(likeButton);

    expect(mockLikeHandler.mock.calls).toHaveLength(2);
  });
});
