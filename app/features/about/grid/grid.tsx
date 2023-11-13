import { MarkdownSpan } from "@/app/markdown-span";
import { getStory } from "@/lib/storyblok-api";
import { LandingPageStoryblok } from "@/types/storyblok";
import { ISbResult, ISbStory, ISbStoryData } from "@storyblok/react";
import { Card } from "features/about/card/card";
import styles from "features/about/grid/grid.module.css";
import { Social } from "features/about/social/social";
import Image from "next/image";

export const Grid = async () => {
  const { content } = await fetchLandingPage();
  const { headline, biography, socials, portrait } = content;

  return (
    <div className={styles.grid}>
      <div className={styles.picture}>
        <Card>
          {portrait && (
            <Image
              src={portrait.filename}
              fill
              style={{ objectFit: "cover" }}
              alt={portrait.alt ?? ""}
            />
          )}
        </Card>
      </div>
      <div className={styles.headline}>
        <Card>
          <MarkdownSpan markdown={headline} />
          <div>
            {socials?.map((social) => (
              <Social iconType={social.platform} src={social.url?.url} />
            ))}
          </div>
        </Card>
      </div>
      <div className={styles.bio}>
        <Card>
          <MarkdownSpan markdown={biography} />
        </Card>
      </div>
    </div>
  );
};

export async function fetchLandingPage() {
  const data = await getStory("home");

  return data as ISbStoryData<LandingPageStoryblok>;
}
