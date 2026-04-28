import React from "react";
import styles from "./index.module.css";

import { useCartStore } from "@/store";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getFormattedPrice } from "@/utils/utils";
import type { ICartItemProps } from "./types";

const CartItem = React.memo(({ item }: ICartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleImageError = () => {
    console.warn(`Failed to load image for cart item: ${item.title}`);
  };

  return (
    <div className={styles["cartItemContainer"]}>
      <div className={styles["cartImageContainer"]}>
        <img
          src={item.image}
          width={64}
          height={64}
          alt={item.title}
          onError={handleImageError}
        />
      </div>

      <div className={styles["cartTitleContainer"]}>
        <span>{item.title}</span>
      </div>

      <span className={styles["cartItemQuantity"]}>
        <label htmlFor={`quantity-${item.id}`}>{t("cart.item.quantity")}</label>
        <input
          id={`quantity-${item.id}`}
          type="number"
          min={0}
          max={50}
          step={1}
          onChange={(event) => updateQuantity(item, Number(event.target.value))}
          value={item.quantity}
          data-testid="cart-item-quantity"
        />
      </span>

      <span className={styles["cartItemPrice"]}>
        <strong>{t("cart.item.price")}:</strong> {getFormattedPrice(item.price)}
      </span>

      <span className={styles["cartItemTotalPrice"]}>
        <strong>{t("cart.item.total")}:</strong>{" "}
        {getFormattedPrice(item.price * item.quantity)}
      </span>

      <FontAwesomeIcon
        icon={faTrash}
        style={{ color: "var(--color-primary)", cursor: "pointer" }}
        onClick={() => removeItem(item)}
        aria-label={`Remove ${item.title} from cart`}
        data-testid="cart-item-remove"
      />
    </div>
  );
});

CartItem.displayName = "CartItem";

export default CartItem;
