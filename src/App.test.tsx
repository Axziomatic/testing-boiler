import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App";

describe("App", () => {
  it("should renders headline", () => {
    render(<App />);
    const headline = screen.getByText("Vite + React");
    expect(headline).toBeInTheDocument();
  });

  it("should allow user to add and delete a thought", () => {
    render(<App />);

    //Open modal to add a thought
    const addButton = screen.getByRole("button", { name: /add thought/i });
    fireEvent.click(addButton);

    // Write prompt in textarea
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "My test thought" } });

    //Submit form
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    // Check that thought renders in list
    const newThought = screen.getByText("My test thought");
    expect(newThought).toBeInTheDocument();

    // Click delete button for thought
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    // Check thought no longer in DOM
    expect(screen.queryByText("My test thought")).not.toBeInTheDocument;
  });

  it("renders latest thought first", () => {
    render(<App />);

    // Open modal and add first thought
    fireEvent.click(screen.getByText("Add Thought!"));
    fireEvent.change(screen.getByPlaceholderText("Write here"), {
      target: { value: "First thought" },
    });
    fireEvent.submit(screen.getByLabelText("thought-form"));

    // Open modal and add second thought
    fireEvent.click(screen.getByText("Add Thought!"));
    fireEvent.change(screen.getByPlaceholderText("Write here"), {
      target: { value: "Second thought" },
    });
    fireEvent.submit(screen.getByLabelText("thought-form"));

    // Get all list items
    const items = screen.getAllByRole("listitem");

    // Check order: latest first
    expect(items[0]).toHaveTextContent("Second thought");
    expect(items[1]).toHaveTextContent("First thought");
  });
});
