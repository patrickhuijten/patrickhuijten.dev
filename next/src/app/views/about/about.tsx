import styles from "@/app/views/about/about.module.css";
import { Grid } from "@/app/views/about/grid";
import { Background } from "@/app/views/about/background";
export const About = () => {
  return (
    <section className={styles.about}>
      <Grid />
      <Background />
    </section>
  );
};
