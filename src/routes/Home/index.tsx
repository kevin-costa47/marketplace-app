import { useCallback, useEffect, useMemo, useState } from "react";
import { useProducts } from "../../hooks/useProducts";

import styles from "./index.module.css";
import ListItem from "../../components/ListItem";
import ListFilters from "../../components/ListFilters";
import type { IProductsSearchQuery, IProduct } from "../../interface/types";
import { t } from "i18next";
import { useCartStore } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function List() {
  const { products, isFirstLoading, isRefreshing, hasError } = useProducts();
  const [activeFilters, setActiveFilters] = useState<IProductsSearchQuery>();
  const { addItem, clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const updateProductList = useCallback((filter: IProductsSearchQuery) => {
    setActiveFilters(filter);
  }, []);

  const clickedItem = useCallback(
    (product: IProduct) => {
      addItem(product);
    },
    [addItem],
  );

  const displayList = useMemo(() => {
    const { name, sort } = activeFilters || {};

    if (!products) {
      return [];
    }
    let newProducts = [...products];

    if (sort) {
      newProducts = newProducts?.sort((a: IProduct, b: IProduct) => {
        if (sort === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    if (name) {
      newProducts = newProducts?.filter((product: IProduct) => {
        return name
          ? product.title.toLowerCase().includes(name.toLowerCase())
          : true;
      });
    }

    return newProducts;
  }, [activeFilters, products]);

  if (hasError) {
    return (
      <div className={styles["listContainer"]}>
        <h1>{t("error")}</h1>
      </div>
    );
  }

  return (
    <div className={styles["listContainer"]}>
      <>
        {isFirstLoading ? (
          <div className={styles["loadingContainer"]}>
            <FontAwesomeIcon
              icon={faSpinner}
              pulse
              color="var(--color-primary)"
              size="6x"
              spin
            />
          </div>
        ) : displayList.length > 0 ? (
          <div className={styles["productListContainer"]}>
            {isRefreshing && (
              <div className={styles.refetchContainer}>
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  color="var(--color-primary)"
                  size="6x"
                  spin
                />
              </div>
            )}
            <ListFilters onChange={updateProductList} />
            <div className={styles["productList"]}>
              {displayList.map((product: IProduct) => (
                <ListItem
                  key={product.id}
                  product={product}
                  onClick={clickedItem}
                />
              ))}
            </div>
          </div>
        ) : (
          <h2>{t("noProducts")}</h2>
        )}
      </>
    </div>
  );
}
