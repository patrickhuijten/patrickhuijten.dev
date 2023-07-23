import styles from "@/app/views/work/work.module.css";
import { TableContainer } from "./experience/table-container";

export const Work = () => {
  return (
    <section className={styles.work}>
      <TableContainer />
    </section>
  );
};
