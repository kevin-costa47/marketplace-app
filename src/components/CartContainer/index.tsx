import styles from "./index.module.css";

import { useCartStore } from "@/store";
import { t } from "i18next";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faX } from "@fortawesome/free-solid-svg-icons";
import CartItem from "../CartItem";
import { getFormattedPrice } from "@/utils/utils";

export default function CartContainer() {
  const {
    items,
    invalidCart,
    getTotalPrice,
    getTotalAmount,
    clearCart,
    removeUpdatedCartNotification,
    completeOrder,
    updatedCart,
  } = useCartStore();

  function checkoutEvent() {
    if (invalidCart()) {
      alert(t("cart.invalid"));
      return;
    }

    completeOrder();
    alert(t("cart.invalid"));
  }

  return (
    <div className={styles["cartContainer"]}>
      <h2 className={styles["cartContainerTitle"]}>{t("cart.title")}</h2>

      {updatedCart && (
        <div className={styles["cartUpdateContainer"]}>
          <p>{t("cart.updated")}</p>
          <FontAwesomeIcon
            icon={faX}
            cursor={"pointer"}
            onClick={removeUpdatedCartNotification}></FontAwesomeIcon>
        </div>
      )}

      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <div className={styles["cartTotalContainer"]}>
        <span className={styles["cartTotal"]}>
          <strong>{t("cart.total.amount")}:</strong> {getTotalAmount()}
        </span>
        <span className={styles["cartTotalPrice"]}>
          <strong>{t("cart.total.price")}:</strong>{" "}
          {getFormattedPrice(getTotalPrice())}
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
        <Button disabled={!invalidCart()} onClick={checkoutEvent}>
          <FontAwesomeIcon icon={faCartArrowDown} cursor={"pointer"} />
          {t("button.checkout")}
        </Button>
      </div>
    </div>
  );
}
