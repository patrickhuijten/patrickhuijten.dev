import { BlogPostStoryblok } from "@/types/storyblok";
import { ISbStoryData } from "@storyblok/react/rsc";
import toc from "markdown-toc";
import Markdown from "react-markdown";

export const TableOfContent = (article: ISbStoryData<BlogPostStoryblok>) => {
  const tocMarkdown = toc(article.content.content).content;
  return <Markdown>{tocMarkdown}</Markdown>;
};
