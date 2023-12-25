import Markdown, { ExtraProps } from "react-markdown";
import Image from "next/image";
import { ISbStoryData } from "@storyblok/react/rsc";
import { BlogPostStoryblok } from "@/types/storyblok";
import slugify from "slugify";
import { Element } from "hast";
import React, { ClassAttributes, HTMLAttributes, createElement } from "react";

const getHeaderText = (node?: Element) => {
  const textElement = node?.children.at(0);
  return textElement?.type === "text" ? textElement.value : "";
};

const mapMarkdownHeader = (
  props: ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement> &
    ExtraProps
) => {
  const text = getHeaderText(props.node);
  console.log(props.node?.tagName);
  return createElement(
    props.node?.tagName ?? "span",
    { id: slugify(text.toLowerCase()) },
    text
  );
};

export const Article = (article: ISbStoryData<BlogPostStoryblok>) => {
  return (
    <article>
      <Markdown
        components={{
          h1: mapMarkdownHeader,
          h2: mapMarkdownHeader,
          h3: mapMarkdownHeader,
          h4: mapMarkdownHeader,
          h5: mapMarkdownHeader,
          h6: mapMarkdownHeader,
          img: (props) => (
            <span
              style={{
                position: "relative",
                display: "block",
                aspectRatio: "5/2",
              }}
            >
              <Image
                src={props.src!}
                alt={props.alt!}
                fill
                style={{ objectFit: "cover" }}
              />
            </span>
          ),
        }}
      >
        {article.content.content}
      </Markdown>
    </article>
  );
};
