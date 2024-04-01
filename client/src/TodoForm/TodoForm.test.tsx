// Test file for Form

import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import TodoForm from "./TodoForm";

describe("Todo Form", () => {
  it("renders correctly", () => {
    render(<TodoForm />);

    expect(
      screen.getByRole("textbox", { name: "Enter todo description" })
    ).toBeInTheDocument();
  });

  it("button renders and is clickable", () => {
    render(<TodoForm />);

    expect(screen.getByRole("button", { name: "Add to List" })).toBeVisible();
  });

  it("can change value of input", async () => {
    render(<TodoForm />);

    const todoInput = screen.getByRole("textbox", {
      name: "Enter todo description",
    });

    fireEvent.change(todoInput, { target: { value: "This is a test" } });
    await waitFor(() => {
      expect(todoInput).toHaveValue("This is a test");
    });
  });
});
