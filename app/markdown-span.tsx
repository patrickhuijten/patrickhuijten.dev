import { remark } from "remark";
import remarkHtml from "remark-html";
import { HTMLAttributes } from "react";

export const MarkdownSpan = ({
  markdown = "",
  ...props
}: { markdown?: string } & HTMLAttributes<HTMLSpanElement>) => {
  const __html = remark().use(remarkHtml).processSync(markdown).toString();
  return <span {...props} dangerouslySetInnerHTML={{ __html }} />;
};
