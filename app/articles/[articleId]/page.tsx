import { getStory } from "@/lib/storyblok-api";
import { ISbStoryData } from "@storyblok/react/rsc";
import { BlogPostStoryblok } from "@/types/storyblok";
import { ArticleContainer } from "@/app/features/articles/article-container/article-container";

export async function fetchArticle(articleId: string) {
  const data = await getStory(`articles/${articleId}`, {
    version: "draft",
    cv: 2,
  });
  return data as ISbStoryData<BlogPostStoryblok>;
}

export default async function ArticlePage({
  params,
}: {
  params: { articleId: string };
}) {
  const article = await fetchArticle(params.articleId);
  return (
    <>
      <h1> {article.content.title} </h1>
      <hr />
      <ArticleContainer {...article} />
    </>
  );
}

export const revalidate = 0;
