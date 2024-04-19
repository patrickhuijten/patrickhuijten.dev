import {
  faLinkedin,
  faArtstation,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./social.module.css";
import { type IconProp } from "@fortawesome/fontawesome-svg-core";
import { SocialStoryblok } from "@/types/storyblok";

type SocialProps = {
  src: string;
  iconType: SocialStoryblok["platform"]
};
export const Social = ({ src, iconType }: SocialProps) => {
  const icon = getIcon(iconType);
  return (
    <a className={styles.link} href={src} target="_blank">
      <FontAwesomeIcon className={styles.social} icon={icon} />
    </a>
  );
};

const getIcon = (iconType: SocialProps["iconType"]) => {
  switch (iconType) {
    case "linkedin":
      return faLinkedin as IconProp;
    case "artstation":
      return faArtstation as IconProp;
    case "github":
      return faGithub as IconProp;
      default:
        return faGithub
  }
};
