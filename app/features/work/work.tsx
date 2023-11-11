import styles from "features/work/work.module.css";
import { TableContainer } from "features/work/experience/table-container";
import { PageContainer } from "features/page-container";

export const Work = () => {
  return (
    <PageContainer>
      <section className={styles.work}>
        <TableContainer />
      </section>
    </PageContainer>
  );
};
