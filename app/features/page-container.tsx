import { ReactNode } from "react";
import styles from "features/page-container.module.css";

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return <section className={styles.page}>{children}</section>;
};
