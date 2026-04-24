import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ListFilters from "./index";

describe("Testing List Filters", () => {
  it("check if filters are being rendered", () => {
    const onChange = vi.fn();
    render(<ListFilters onChange={onChange} />);
    const inputText = screen.getByTestId("filter-name");
    const selectButtons = screen.getByRole("combobox");

    expect(inputText).toBeInTheDocument();
    expect(inputText).toHaveAttribute("type", "text");

    expect(selectButtons).toBeInTheDocument();
  });
});
