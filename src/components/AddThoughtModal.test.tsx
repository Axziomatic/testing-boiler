import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AddThoughtModal from "./AddThoughtModal";

describe("AddThoughtModal", () => {
  it("lets user write thought and submit", () => {
    const handleSubmit = vi.fn();
    const handleClose = vi.fn();

    render(<AddThoughtModal onSubmit={handleSubmit} onClose={handleClose} />);

    //Write a thought
    const textarea = screen.getByPlaceholderText("Write here...");
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

  it("submits the form when Enter is pressed in the textarea", () => {
    const handleSubmit = vi.fn();
    const handleClose = vi.fn();

    render(<AddThoughtModal onSubmit={handleSubmit} onClose={handleClose} />);

    const textarea = screen.getByPlaceholderText("Write here...");

    // Write a thought
    fireEvent.change(textarea, { target: { value: "Enter thought" } });

    // Hit Enter without shift
    fireEvent.keyDown(textarea, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
      shiftKey: false,
    });

    // Expected: handleSubmit is called
    expect(handleSubmit).toHaveBeenCalledWith("Enter thought");
    expect(handleClose).toHaveBeenCalled();
  });

  it("does not submit when input is empty", () => {
    const handleSubmit = vi.fn();
    const handleClose = vi.fn();

    render(<AddThoughtModal onSubmit={handleSubmit} onClose={handleClose} />);

    const form = screen.getByLabelText("thought-form");
    fireEvent.submit(form);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("does not submit when input only contains spaces", () => {
    const handleSubmit = vi.fn();
    const handleClose = vi.fn();

    render(<AddThoughtModal onSubmit={handleSubmit} onClose={handleClose} />);

    const textarea = screen.getByPlaceholderText("Write here...");
    fireEvent.change(textarea, { target: { value: "    " } });

    const form = screen.getByLabelText("thought-form");
    fireEvent.submit(form);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(handleClose).not.toHaveBeenCalled();
  });
});
