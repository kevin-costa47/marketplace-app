function getFormattedPrice(price: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export { getFormattedPrice };
