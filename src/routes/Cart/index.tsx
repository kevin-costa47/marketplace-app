import styles from "./index.module.css";

import { useCartStore } from "@/store";
import { t } from "i18next";
import CartContainer from "@/components/CartContainer";
import { useProducts } from "@/hooks/useProducts";

export default function Cart() {
  const { isFirstLoading, hasError } = useProducts();
  const { items } = useCartStore();

  if (hasError) {
    return (
      <div className={styles["pageCartContainer"]}>
        <h2>{t("error")}</h2>
      </div>
    );
  }

  if (isFirstLoading) {
    return (
      <div className={styles["pageCartContainer"]}>
        <h2>{t("loading")}</h2>
      </div>
    );
  }

  return (
    <div className={styles["pageCartContainer"]}>
      {items.length === 0 ? (
        <h2 className={styles["cartContainerTitle"]}>{t("cart.empty")}</h2>
      ) : (
        <CartContainer />
      )}
    </div>
  );
}
