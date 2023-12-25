import { MarkdownSpan } from "@/app/markdown-span";
import { getStory } from "@/lib/storyblok-api";
import { LandingPageStoryblok } from "@/types/storyblok";
import { ISbStoryData } from "@storyblok/react";
import { Card } from "features/about/card/card";
import styles from "features/about/grid/grid.module.css";
import { Social } from "features/about/social/social";
import Image from "next/image";

export const Portrait = async () => {
  const { content } = await fetchLandingPage();
  return (
    <Image
      className={styles.portrait}
      src={content.portrait.filename}
      fill
      style={{ objectFit: "cover" }}
      alt={content.portrait.alt ?? ""}
    />
  );
};

export const Headline = async () => {
  const { content } = await fetchLandingPage();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <MarkdownSpan markdown={content.headline} />
      <div>
        {content.socials?.map((social) => (
          <Social iconType={social.platform} src={social.url?.url} />
        ))}
      </div>
    </div>
  );
};

export const Biography = async () => {
  const { content } = await fetchLandingPage();

  return <MarkdownSpan markdown={content.biography} />;
};

export const Grid = async () => {
  return (
    <div className={styles.grid}>
      <div className={styles.picture}>
        <Card>
          <Portrait />
        </Card>
      </div>
      <div className={styles.headline}>
        <Card>
          <Headline />
        </Card>
      </div>
      <div className={styles.bio}>
        <Card>
          <Biography />
        </Card>
      </div>
    </div>
  );
};

export async function fetchLandingPage() {
  const data = await getStory("home");

  return data as ISbStoryData<LandingPageStoryblok>;
}
