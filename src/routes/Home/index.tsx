import { useCallback, useMemo, useState } from "react";
import { useProducts } from "../../hooks/useProducts";

import styles from "./index.module.css";
import ListItem from "../../components/ListItem";
import ListFilters from "../../components/ListFilters";
import type { IProductsSearchQuery, IProduct } from "../../interface/types";
import { t } from "i18next";

export default function List() {
  const { products, isSearching } = useProducts();
  const [activeFilters, setActiveFilters] = useState<IProductsSearchQuery>();

  const updateProductList = useCallback((filter: IProductsSearchQuery) => {
    setActiveFilters(filter);
  }, []);

  const clickedItem = useCallback((product: IProduct) => {
    console.log("clicked", product);
  }, []);

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

  return (
    <div className={styles["listContainer"]}>
      <>
        <ListFilters onChange={updateProductList} />
        {isSearching ? (
          <h2> {t("loadingProduts")}...</h2>
        ) : displayList.length > 0 ? (
          <div className={styles["productList"]}>
            {displayList.map((product: IProduct) => (
              <ListItem
                key={product.id}
                product={product}
                onClick={clickedItem}
              />
            ))}
          </div>
        ) : (
          <h2>{t("noProducts")}</h2>
        )}
      </>
    </div>
  );
}
