import { MarkdownSpan } from "@/app/markdown-span";
import { BlogPostStoryblok } from "@/types/storyblok";
import { ISbStoryData } from "@storyblok/react";
import Link from "next/link";
import styles from "@/app/features/articles/article-link.module.css";

export const ArticleLink = ({
  article,
}: {
  article: ISbStoryData<BlogPostStoryblok>;
}) => {
  return (
    <Link href={article.full_slug}>
      <div className={styles["article-link"]}>
        <div className={styles["article-link-header"]}>
          <b className={styles["article-link-header-title"]}>
            {article.content.title}
          </b>
          <span>{new Date(article.created_at).toDateString()} </span>
        </div>
        <MarkdownSpan
          className={styles["article-link-teaser"]}
          markdown={article.content.teaser ?? ""}
        />

        <b className={styles["article-link-read-more"]}>Read more</b>
      </div>
    </Link>
  );
};
