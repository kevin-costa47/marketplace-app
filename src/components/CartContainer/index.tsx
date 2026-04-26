import styles from "./index.module.css";

import { useCartStore } from "../../store";
import { t } from "i18next";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faX } from "@fortawesome/free-solid-svg-icons";
import CartItem from "../CartItem";

export default function CartContainer() {
  const { items, getTotalPrice, getTotalAmount, clearCart } = useCartStore();

  return (
    <div className={styles["cartContainer"]}>
      <h2 className={styles["cartContainerTitle"]}>{t("cart.title")}</h2>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <div className={styles["cartTotalContainer"]}>
        <span className={styles["cartTotal"]}>
          <strong>{t("cart.total.amount")}:</strong> {getTotalAmount()}
        </span>
        <span className={styles["cartTotalPrice"]}>
          <strong>{t("cart.total.price")}:</strong> {getTotalPrice()} €
        </span>
      </div>

      <div className={styles["buttonsContainer"]}>
        <Button onClick={clearCart} style={"secondary"}>
          <FontAwesomeIcon
            icon={faX}
            cursor={"pointer"}
            color="var(--color-primary)"
          />
          {t("button.clearCart")}
        </Button>
        <Button>
          <FontAwesomeIcon icon={faCartArrowDown} cursor={"pointer"} />
          {t("button.checkout")}
        </Button>
      </div>
    </div>
  );
}
