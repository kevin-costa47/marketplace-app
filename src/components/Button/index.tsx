import styles from "./index.module.css";

export default function Button({
  children,
  style,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  style?: string;
}) {
  function getButtonClasses() {
    if (style === "secondary") {
      return styles["btnSecondary"];
    }

    return `${styles["btnPrimary"]} ${props.disabled ? styles["disabledButton"] : ""}`;
  }

  return (
    <button className={getButtonClasses()} {...props}>
      {children}
    </button>
  );
}
