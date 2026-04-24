import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "./index";
import { BrowserRouter } from "react-router-dom";
import { t } from "i18next";

describe("Testing Header", () => {
  it("check if title is being rendered", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const filterHeader = screen.getByText("pageTitle");
    expect(filterHeader).toBeInTheDocument();
  });

  it("check the nav bar", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const filterHeader = screen.getByRole("navigation");
    expect(filterHeader).toBeInTheDocument();
    expect(filterHeader).toContainElement(
      screen.getByRole("link", { name: t("nav.home") }),
    );
  });
});
