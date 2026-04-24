import "./index.module.css";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();

  return (
    <div className={styles["headerContainer"]}>
      <h2 data-testid="header-title">{t("pageTitle")}</h2>
      <nav className={styles["navContainer"]}>
        <div className={styles["navCol"]}>
          <Link to="/">{t("nav.home")}</Link>
        </div>
      </nav>
    </div>
  );
}
