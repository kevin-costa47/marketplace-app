import styles from "./index.module.css";

import { useCartStore } from "../../store";
import { t } from "i18next";
import CartContainer from "../../components/CartContainer";

export default function List() {
  const { items } = useCartStore();

  return (
    <div className={styles["pageContainer"]}>
      {items.length === 0 ? (
        <h2 className={styles["cartContainerTitle"]}>{t("cart.empty")}</h2>
      ) : (
        <CartContainer />
      )}
    </div>
  );
}
