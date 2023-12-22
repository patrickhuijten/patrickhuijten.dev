import { About } from "features/about/about";
import { Articles } from "features/articles/articles";
import { Work } from "features/work/work";

export default function Home() {
  return (
    <>
      <About />
      <Articles />
      <Work />
    </>
  );
}

export const revalidate = 60;
