import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ListItem from "./index";

const mockProduct = {
  id: 1,
  category: "Category",
  description: "Description",
  price: 100,
  title: "Mock Product",
  rating: {
    rate: 4,
    count: 10,
  },
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
};

describe("Testing List Item", () => {
  it("should render correctly", () => {
    const onClick = vi.fn();

    render(<ListItem product={mockProduct} onClick={onClick} />);
    expect(screen.getByTestId("product-name")).toHaveTextContent(
      mockProduct.title,
    );
    expect(screen.getByTestId("product-price")).toHaveTextContent(
      mockProduct.price.toString(),
    );

    expect(screen.getByAltText(mockProduct.title)).toHaveAttribute(
      "src",
      mockProduct.image,
    );
  });

  it("check if onClick is getting called", () => {
    const onClick = vi.fn();
    render(<ListItem product={mockProduct} onClick={onClick} />);
    expect(screen.getByTestId("product-name")).toHaveTextContent(
      mockProduct.title,
    );
    expect(screen.getByTestId("product-price")).toHaveTextContent(
      mockProduct.price.toString(),
    );

    expect(screen.getByAltText(mockProduct.title)).toHaveAttribute(
      "src",
      mockProduct.image,
    );

    fireEvent.click(screen.getByTestId("product-add-to-cart"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
