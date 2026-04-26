import "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useTranslation } from "react-i18next";
import { useCartStore } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "../../hooks/useProducts";
import { useEffect } from "react";

export default function Header() {
  const { hasError } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    if (hasError) {
      navigate("/error");
    }
  }, [hasError, navigate]);

  const { t } = useTranslation();
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const totalAmount = useCartStore((state) => state.getTotalAmount());

  return (
    <div className={styles["headerContainer"]}>
      <h2 data-testid="header-title">{t("pageTitle")}</h2>
      <nav className={styles["navContainer"]}>
        <div className={styles["navCol"]}>
          <Link to="/">{t("nav.home")}</Link>
        </div>

        <div className={styles["cartContainer"]}>
          {totalPrice > 0 && (
            <span className={styles["cartPrice"]} data-testid="cart-price">
              ({totalPrice}€)
            </span>
          )}
          <div className={styles["cartIconContainer"]}>
            <Link to="/cart">
              {totalAmount > 0 && (
                <span
                  className={styles["cartQuantity"]}
                  data-testid="cart-amount">
                  {totalAmount}
                </span>
              )}

              <FontAwesomeIcon icon={faCartShopping} color="white" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
