import { getStory } from "@/lib/storyblok-api";
import { Card } from "features/about/card/card";
import styles from "features/about/grid/grid.module.css";
import { Social } from "features/about/social/social";
import Image from "next/image";

export const Grid = async () => {
  const { data } = await fetchData();
  const { headline, biography, socials, portrait } = data.story.content;

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
          <div dangerouslySetInnerHTML={{ __html: headline ?? "" }} />
          <div>
            {socials?.map((social) => (
              <Social iconType={social.platform} src={social.url?.url} />
            ))}
          </div>
        </Card>
      </div>
      <div className={styles.bio}>
        <Card>
          <div dangerouslySetInnerHTML={{ __html: biography ?? "" }} />
        </Card>
      </div>
    </div>
  );
};

export async function fetchData() {
  return getStory("cdn/stories/home");
}
