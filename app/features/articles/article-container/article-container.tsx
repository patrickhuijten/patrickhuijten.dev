import { ISbStoryData } from "@storyblok/react/rsc";
import { Article } from "./article";
import { TableOfContent } from "./table-of-content";
import { BlogPostStoryblok } from "@/types/storyblok";
import styles from "./article-container.module.css";
export const ArticleContainer = (article: ISbStoryData<BlogPostStoryblok>) => {
  return (
    <div className={styles["article-container"]}>
      <Article {...article} />
      <TableOfContent {...article} />
    </div>
  );
};
