import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "./index";

describe("Testing List Filters", () => {
  it("check if Button is being rendered", () => {
    render(<Button children="Button" />);
    const filterHeader = screen.getByText("Button");
    expect(filterHeader).toBeInTheDocument();
  });

  it("check if Button is being rendered", () => {
    const onClick = vi.fn();
    render(<Button children="Button" onClick={onClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
