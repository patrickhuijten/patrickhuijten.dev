import { getStories, getStory, mapToHtml } from "@/lib/storyblok-api";
import { BlogPostStoryblok } from "@/types/storyblok";
import { ISbStoryData } from "@storyblok/react";
import { PageContainer } from "features/page-container";
import Link from "next/link";

export async function fetchIntro() {
  return getStory("cdn/stories/articles");
}

export async function fetchArticles() {
  return (await getStories({
    starts_with: "articles",
    version: "draft",
    is_startpage: false,
  })) as ISbStoryData<BlogPostStoryblok>[];
}

export const Articles = async () => {
  const { data: intro } = await fetchIntro();
  console.log(intro);
  const articles = await fetchArticles();
  return (
    <PageContainer>
      <h1>{intro.story.content.title}</h1>
      <p>{intro.story.content.text}</p>
      <hr />
      {articles.map((story) => (
        <ArticleLink article={story} />
      ))}
    </PageContainer>
  );
};

const ArticleLink = ({
  article,
}: {
  article: ISbStoryData<BlogPostStoryblok>;
}) => {
  return (
    <Link href={article.full_slug}>
      <h2>{article.content.title}</h2>
      <span
        dangerouslySetInnerHTML={{
          __html: mapToHtml(article.content.teaser ?? ""),
        }}
      />
    </Link>
  );
};
