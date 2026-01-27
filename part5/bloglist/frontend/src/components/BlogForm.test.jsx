import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("calls createBlog with the right details when a new blog is created", async () => {
    // mock function to track calls
    const createBlog = vi.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    // get input fields and button
    const titleInput = screen.getByLabelText("title");
    const authorInput = screen.getByLabelText("author");
    const urlInput = screen.getByLabelText("url");
    const createButton = screen.getByText("create");

    //  fill out the form
    await user.type(titleInput, "React testing with Vitest");
    await user.type(authorInput, "Jane Doe");
    await user.type(urlInput, "https://example.com");
    await user.click(createButton);

    //  check that createBlog was called once
    expect(createBlog.mock.calls).toHaveLength(1);

    //  check that it was called with the right details
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: "React testing with Vitest",
      author: "Jane Doe",
      url: "https://example.com",
    });
  });
});
