import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import styles from "./index.module.css";

export default function LoadingBar() {
  const { isRefreshing } = useProducts();
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const handleRefresh = () => {
      setShowBar(true);
    };

    const handleComplete = () => {
      setShowBar(false);
    };

    if (isRefreshing) {
      handleRefresh();
    } else {
      const timer = setTimeout(handleComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [isRefreshing]);

  return (
    <div
      className={`${styles.topLoadingBar} ${showBar ? styles.active : ""}`}
    />
  );
}
