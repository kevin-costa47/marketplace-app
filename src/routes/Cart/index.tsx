import styles from "./index.module.css";

import { useCartStore } from "../../store";
import { t } from "i18next";
import CartContainer from "../../components/CartContainer";
import { useProducts } from "../../hooks/useProducts";
import { useEffect } from "react";
import type { IProduct } from "../../interface/types";

export default function List() {
  const { products } = useProducts();
  const { items, updateItemPrice } = useCartStore();

  useEffect(() => {
    if (!products || items.length === 0) return;

    items.forEach((cartItem) => {
      const freshProduct = products.find((p: IProduct) => p.id === cartItem.id);

      if (freshProduct && freshProduct.price !== cartItem.price) {
        updateItemPrice(cartItem.id, freshProduct.price);
      }
    });
  }, [products, items.length, items, updateItemPrice]);

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
