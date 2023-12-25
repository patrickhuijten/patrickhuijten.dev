import Link from "next/link";
import { Headline, Portrait } from "../about/grid/grid";
import styles from "./header.module.css";
export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={"/"} style={{ position: "relative" }}>
        <Portrait />
      </Link>
      <Headline />
    </header>
  );
};