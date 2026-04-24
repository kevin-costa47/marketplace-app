export interface IProductsSearchQuery {
  name?: string;
  sort?: string;
}

export interface IProduct {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
