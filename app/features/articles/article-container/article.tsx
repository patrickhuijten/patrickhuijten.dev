import Markdown from "react-markdown";
import Image from "next/image";
import { ISbStoryData } from "@storyblok/react/rsc";
import { BlogPostStoryblok } from "@/types/storyblok";

export const Article = (article: ISbStoryData<BlogPostStoryblok>) => {
  return (
    <article>
      <Markdown
        components={{
          img: (props) => (
            <div style={{ position: "relative", aspectRatio: "5/2" }}>
              <Image
                src={props.src!}
                alt={props.alt!}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ),
        }}
      >
        {article.content.content}
      </Markdown>
    </article>
  );
};
