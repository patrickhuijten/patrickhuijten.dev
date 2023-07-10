import styles from "./page.module.css";
import { About } from "./views/about/about";
import { Work } from "./views/work/work";

export default function Home() {
  return (
    <main className={styles.main}>
      <About />
      <Work />
    </main>
  );
}
