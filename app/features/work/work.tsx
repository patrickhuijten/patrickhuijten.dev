import styles from "./work.module.css";
import { TableContainer } from "features/work/experience/table-container";

export const Work = () => {
  return (
    <section className={styles.work}>
      <TableContainer />
    </section>
  );
};
