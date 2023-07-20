import { PropsWithChildren } from "react";
import styles from "@/app/views/about/card.module.css";

export const Card = ({ children }: PropsWithChildren) => {
  return <div className={styles.card}>{children}</div>;
};
