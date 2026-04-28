import { useEffect, useState } from "react";

import styles from "./index.module.css";
import type { IProductsSearchQuery } from "../../interface/types";
import { useDebounceValue } from "../../hooks/useDebounce";
import { t } from "i18next";

export default function ListFilters({
  onChange,
}: {
  onChange: (filter: IProductsSearchQuery) => void;
}) {
  const [sortFIlter, setSortFIlter] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const debouncedSearch = useDebounceValue(nameFilter, 500);

  useEffect(() => {
    if (debouncedSearch !== null)
      onChange({ name: debouncedSearch, sort: sortFIlter });
  }, [debouncedSearch, onChange, sortFIlter]);

  function onChangeSort(event: React.ChangeEvent<HTMLSelectElement>) {
    const sort = event.target.value as string;
    setSortFIlter(sort);
    onChange({ name: nameFilter || "", sort: sort });
  }

  return (
    <div className={styles["listFilterContainer"]}>
      <h2 className={styles["listFilterTitle"]}>{t("productList")}</h2>
      <div className={styles["formColumn"]}>
        <div className={styles["formInput"]}>
          <label htmlFor="name">{t("filter.name")}:</label>
          <input
            type="text"
            id="name"
            name="name"
            data-testid="filter-name"
            placeholder={t("filter.namePlaceholder")}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
        <div className={styles["formInput"]}>
          <label htmlFor="sort">{t("filter.sort")}:</label>
          <select
            name="sort"
            aria-placeholder="select-sort"
            onChange={onChangeSort}
            value={sortFIlter}
            data-tested="filter-sort"
            id="sort">
            <option value="" selected>
              {t("filter.noOrder")}
            </option>
            <option value="asc">{t("filter.ascedent")}</option>
            <option value="desc">{t("filter.descedent")}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
