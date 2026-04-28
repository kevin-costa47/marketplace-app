import { useCallback, useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";

import styles from "./index.module.css";
import ListItem from "@/components/ListItem";
import ListFilters from "@/components/ListFilters";
import type { IProductsSearchQuery, IProduct } from "@/interface/types";
import { t } from "i18next";
import { useCartStore } from "@/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import LoadingBar from "@/components/LoadingBar";

export default function List() {
  const { products, isFirstLoading } = useProducts();
  const [activeFilters, setActiveFilters] = useState<IProductsSearchQuery>();
  const { addItem } = useCartStore();

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
    if (!products) {
      return [];
    }
    let newProducts = [...products];

    const { name, sort } = activeFilters || {};

    if (sort) {
      newProducts.sort((a: IProduct, b: IProduct) => {
        return sort === "asc" ? a.price - b.price : b.price - a.price;
      });
    }

    if (name) {
      newProducts = newProducts.filter((product: IProduct) =>
        product.title.toLowerCase().includes(name.toLowerCase()),
      );
    }

    return newProducts;
  }, [activeFilters, products]);

  if (isFirstLoading) {
    return (
      <div className={styles["loadingContainer"]}>
        <FontAwesomeIcon
          icon={faSpinner}
          pulse
          color="var(--color-primary)"
          size="6x"
          spin
        />
      </div>
    );
  }

  return (
    <div className={styles["productListContainer"]}>
      <LoadingBar />
      <ListFilters onChange={updateProductList} />
      <div className={styles["productList"]}>
        {displayList.length === 0 ? (
          <div className={styles["noProductsContainer"]}>
            <h2>{t("noProducts")}</h2>
          </div>
        ) : (
          displayList.map((product: IProduct) => (
            <ListItem
              key={product.id}
              product={product}
              onClick={clickedItem}
            />
          ))
        )}
      </div>
    </div>
  );
}
