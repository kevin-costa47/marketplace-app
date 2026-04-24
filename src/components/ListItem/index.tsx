import type { IListItemProps } from "./types";
import "./index.module.css";
import styles from "./index.module.css";
import Button from "../Button";
import { t } from "i18next";

export default function ListItem({ product, onClick }: IListItemProps) {
  const { title, image, price } = product;

  return (
    <div className={styles["listItemContainer"]}>
      <div className={styles["listItemImage"]}>
        <img src={image} alt={title} />
      </div>
      <div className={styles["listItemDetails"]}>
        <span className={styles["listItemName"]} data-testid="product-name">
          {title}
        </span>
        <span className={styles["listItemPrice"]} data-testid="product-price">
          {price}$
        </span>
      </div>

      <div className={styles["listItemActions"]}>
        <Button
          data-testid="product-add-to-cart"
          onClick={() => onClick(product)}>
          {t("button.addToCart")}
        </Button>
      </div>
    </div>
  );
}
