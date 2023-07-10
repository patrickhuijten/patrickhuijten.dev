import aboutStyles from "@/app/views/about/about.module.css";
import { Grid } from "./grid";
export const About = () => {
  return (
    <section className={aboutStyles.about}>
      <Grid />
    </section>
  );
};
