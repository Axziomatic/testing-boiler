import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../src/App";

describe("App with localStorage", () => {
  beforeEach(() => {
    localStorage.clear();
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
    fireEvent.change(screen.getByPlaceholderText("Write here..."), {
      target: { value: "First thought" },
    });
    fireEvent.submit(screen.getByLabelText("thought-form"));

    // Open modal and add second thought
    fireEvent.click(screen.getByText("Add Thought!"));
    fireEvent.change(screen.getByPlaceholderText("Write here..."), {
      target: { value: "Second thought" },
    });
    fireEvent.submit(screen.getByLabelText("thought-form"));

    // Get all list items
    const items = screen.getAllByRole("listitem");

    // Check order: latest first
    expect(items[0]).toHaveTextContent("Second thought");
    expect(items[1]).toHaveTextContent("First thought");
  });

  it("saves new thoughts to localStorage and deletes them", () => {
    render(<App />);

    // Mock localStorage.setItem to track calls
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    // Add thought
    fireEvent.click(screen.getByText("Add Thought!"));
    fireEvent.change(screen.getByPlaceholderText("Write here..."), {
      target: { value: "Persistent thought" },
    });
    fireEvent.submit(screen.getByLabelText("thought-form"));

    // Check that a thought is in localStorage
    expect(setItemSpy).toHaveBeenCalledWith(
      "thoughts",
      expect.stringContaining("Persistent thought")
    );

    // Check thought is visible in list
    expect(screen.getByText("Persistent thought")).toBeInTheDocument();

    // Click delete-button
    fireEvent.click(screen.getByText("Delete"));

    // Check that thought is removed from DOM
    expect(screen.queryByText("Persistent thought")).not.toBeInTheDocument();

    // Check that localStorage is updated after delete
    const storedThoughts = JSON.parse(localStorage.getItem("thoughts") || "[]");
    expect(
      storedThoughts.find((t: any) => t.text === "Persistent thought")
    ).toBeUndefined();

    setItemSpy.mockRestore();
  });
});
