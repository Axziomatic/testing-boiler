import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AddThoughtModal from "./AddThoughtModal";

describe("AddThoughtModal", () => {
  it("lets user write thought and submit", () => {
    const handleSubmit = vi.fn();
    const handleClose = vi.fn();

    render(<AddThoughtModal onSubmit={handleSubmit} onClose={handleClose} />);

    //Write a thought
    const textarea = screen.getByPlaceholderText("Write here");
    fireEvent.change(textarea, { target: { value: "My first thought" } });
    expect(textarea).toHaveValue("My first thought");

    // Find form and submit
    const form = screen.getByLabelText("thought-form");
    fireEvent.submit(form);

    // Check callbacks
    expect(handleSubmit).toHaveBeenCalledWith("My first thought");
    expect(handleClose).toHaveBeenCalled();
  });

  it("Cancels when pressing cancel", () => {
    const handleSubmit = vi.fn();
    const handleClose = vi.fn();
    render(<AddThoughtModal onSubmit={handleSubmit} onClose={handleClose} />);

    fireEvent.click(screen.getByText("Cancel"));

    expect(handleClose).toHaveBeenCalled();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
