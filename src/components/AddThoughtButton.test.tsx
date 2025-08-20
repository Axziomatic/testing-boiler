import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AddThoughtButton from "./AddThoughtButton";

describe("AddThoughtButton", () => {
  it("renders a button with text", () => {
    render(<AddThoughtButton onClick={() => {}} />);
    expect(screen.getByText("Add Thought!")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<AddThoughtButton onClick={handleClick} />);
    fireEvent.click(screen.getByText("Add Thought!"));
    expect(handleClick).toBeCalledTimes(1);
  });
});
