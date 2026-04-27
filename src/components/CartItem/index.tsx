import styles from "./index.module.css";

import { useCartStore } from "../../store";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import type { ICartItemProps } from "./types";

export default function CartItem({ item }: ICartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div key={item.id} className={styles["cartItemContainer"]}>
      <div className={styles["cartImageContainer"]}>
        <img src={item.image} width={64} height={64} alt={item.title} />
      </div>

      <div className={styles["cartTitleContainer"]}>
        <span>{item.title}</span>
      </div>

      <span className={styles["cartItemQuantity"]}>
        <label htmlFor="">{t("cart.item.quantity")}</label>
        <input
          type="number"
          min={0}
          max={50}
          onChange={(event) => updateQuantity(item, Number(event.target.value))}
          value={item.quantity}
        />
      </span>

      <span className={styles["cartItemPrice"]}>
        <strong>{t("cart.item.price")}:</strong> {item.price} €
      </span>

      <span className={styles["cartItemTotalPrice"]}>
        <strong>{t("cart.item.total")}:</strong> {item.price * item.quantity} €
      </span>

      <FontAwesomeIcon
        icon={faTrash}
        style={{ color: "var(--color-primary)", cursor: "pointer" }}
        onClick={() => removeItem(item)}
      />
    </div>
  );
}
