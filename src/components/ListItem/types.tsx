import type { IProduct } from "../../interface/types";

export interface IListItemProps {
  product: IProduct;
  onClick: (product: IProduct) => void;
}
