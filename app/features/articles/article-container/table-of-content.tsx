import { BlogPostStoryblok } from "@/types/storyblok";
import { ISbStoryData } from "@storyblok/react/rsc";
import Markdown from "react-markdown";
// @ts-ignore - no types available
import toc from "markdown-toc";

export const TableOfContent = (article: ISbStoryData<BlogPostStoryblok>) => {
  const tocMarkdown = toc(article.content.content).content;
  return <Markdown>{tocMarkdown}</Markdown>;
};
