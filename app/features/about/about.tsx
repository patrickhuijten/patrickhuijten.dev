import styles from "features/about/about.module.css";
import { Grid } from "features/about/grid/grid";
import { Background } from "features/about/background/background";
import { PageContainer } from "features/page-container";
export const About = () => {
  return (
    <PageContainer>
      <section className={styles.about}>
        <Grid />
        <Background />
      </section>
    </PageContainer>
  );
};
