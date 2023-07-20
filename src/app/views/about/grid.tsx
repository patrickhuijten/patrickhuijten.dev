import styles from "@/app/views/about/grid.module.css";
import Image from "next/image";
import { Card } from "./card";
import { getStoryblokApi } from "@storyblok/react";
import { remark } from "remark";
import html from "remark-html";
import { Social } from "./social";

export const Grid = async () => {
  const { data } = await fetchData();
  const { headline, biography, socials, portrait } = data.story.content;

  const { value: headlineAsHtml } = await remark()
    .use(html)
    .process(headline as string);

  const { value: biographyAsHtml } = await remark()
    .use(html)
    .process(biography as string);

  return (
    <div className={styles.grid}>
      <div className={styles.picture}>
        <Card>
          <Image
            src={portrait.filename}
            fill
            style={{ objectFit: "cover" }}
            alt={portrait.alt}
          />
        </Card>
      </div>
      <div className={styles.headline}>
        <Card>
          <div dangerouslySetInnerHTML={{ __html: headlineAsHtml }} />
          <div>
            {socials.map((social) => (
              <Social iconType={social.platform} src={social.url.url} />
            ))}
          </div>
        </Card>
      </div>
      <div className={styles.bio}>
        <Card>
          <div dangerouslySetInnerHTML={{ __html: biographyAsHtml }} />
        </Card>
      </div>
    </div>
  );
};

const getFakeData = () => {
  return {
    data: {
      story: {
        content: {
          headline: "",
          biography: "",
          portrait: { filename: "" },
          socials: [],
        },
      },
    },
  };
};
export async function fetchData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/home`, { cv: Date.now() });
}
