import styles from "./about.module.css";
import { Grid } from "features/about/grid/grid";
import { Background } from "features/about/background/background";
export const About = () => {
  return (
    <section className={styles.about}>
      <Grid />
      <Background />
    </section>
  );
};
