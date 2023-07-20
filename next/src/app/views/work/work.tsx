import styles from "@/app/views/work/work.module.css";
import { TableContainer } from "@/app/views/work/table-container";

export const Work = () => {
  return (
    <section className={styles.work}>
      <TableContainer />
    </section>
  );
};
