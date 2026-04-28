import { t } from "i18next";
import { useProducts } from "@/hooks/useProducts";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function ErrorPage() {
  const { error } = useProducts();

  return (
    <div className={styles["errorContainer"]}>
      <FontAwesomeIcon
        icon={faCircleXmark}
        style={{ color: "var(--color-primary)" }}
        size="2xl"
      />
      <h2>{t("error.title")}</h2>
      <p>{error?.name}</p>
      <p>{error?.message}</p>
    </div>
  );
}
