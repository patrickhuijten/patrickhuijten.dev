import { getStories, getStory, mapToHtml } from "@/lib/storyblok-api";
import { BlogPostStoryblok, PageStoryblok } from "@/types/storyblok";
import { ISbStoryData } from "@storyblok/react";
import { PageContainer } from "features/page-container";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { ArticleLink } from "./article-link";

export async function fetchIntro() {
  const data = await getStory("articles", { version: "draft" });

  return data as ISbStoryData<PageStoryblok>;
}

export async function fetchArticles() {
  const data = await getStories({
    starts_with: "articles",
    version: "draft",
    is_startpage: false,
  });
  return data as ISbStoryData<BlogPostStoryblok>[];
}

export const Articles = async () => {
  const intro = await fetchIntro();
  console.log({ intro });
  const articles = await fetchArticles();
  return (
    <PageContainer>
      <h1>{intro.content.title}</h1>
      <p>{intro.content.text}</p>
      <hr />
      <ArticleLinkContainer>
        {articles.map((story) => (
          <ArticleLink article={story} key={story.uuid} />
        ))}
      </ArticleLinkContainer>
    </PageContainer>
  );
};

const ArticleLinkContainer = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem 0",
      }}
    >
      {children}
    </div>
  );
};
