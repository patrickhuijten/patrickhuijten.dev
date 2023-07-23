import { PropsWithChildren } from "react";
import styles from "features/about/card/card.module.css";

export const Card = ({ children }: PropsWithChildren) => {
  return <div className={styles.card}>{children}</div>;
};
