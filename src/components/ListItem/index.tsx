import React from "react";
import type { IListItemProps } from "./types";
import styles from "./index.module.css";
import Button from "../Button";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { getFormattedPrice } from "@/utils/utils";

const ListItem = React.memo(({ product, onClick }: IListItemProps) => {
  const { title, image, price } = product;

  const handleImageError = () => {
    console.warn(`Failed to load image for product: ${title}`);
  };

  return (
    <div className={styles["listItemContainer"]}>
      <div className={styles["listItemImage"]}>
        <img src={image} alt={title} onError={handleImageError} />
      </div>
      <div className={styles["listItemDetails"]}>
        <span className={styles["listItemName"]} data-testid="product-name">
          {title}
        </span>
        <span className={styles["listItemPrice"]} data-testid="product-price">
          {getFormattedPrice(price)}
        </span>
      </div>

      <div className={styles["listItemActions"]}>
        <Button
          data-testid="product-add-to-cart"
          onClick={() => onClick(product)}
          aria-label={`Add ${title} to cart`}>
          <FontAwesomeIcon icon={faCartPlus} cursor={"pointer"} />
          {t("button.addToCart")}
        </Button>
      </div>
    </div>
  );
});

ListItem.displayName = "ListItem";

export default ListItem;
