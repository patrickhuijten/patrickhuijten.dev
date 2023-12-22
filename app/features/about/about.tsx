import styles from "features/about/about.module.css";
import { Grid } from "features/about/grid/grid";
import { PageContainer } from "features/page-container";

export const About = () => {
  return (
    <PageContainer>
      <section className={styles.about}>
        <Grid />
      </section>
    </PageContainer>
  );
};
