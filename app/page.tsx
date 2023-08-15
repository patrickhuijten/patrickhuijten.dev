import styles from "./page.module.css";
import { About } from "features/about/about";
import { Work } from "features/work/work";

export default function Home() {
  return (
    <main className={styles.main}>
      <About />
      <Work />
    </main>
  );
}

export const revalidate = 60;
