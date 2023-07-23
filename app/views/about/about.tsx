import styles from "@/app/views/about/about.module.css";
import { Grid } from "./grid/grid";
import { Background } from "./background/background";
export const About = () => {
  return (
    <section className={styles.about}>
      <Grid />
      <Background />
    </section>
  );
};
