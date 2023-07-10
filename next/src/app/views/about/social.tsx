import {
  faLinkedin,
  faArtstation,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/app/views/about/social.module.css";

type SocialProps = {
  src: string;
  iconType: "linkedin" | "artstation" | "github";
};
export const Social = ({ src, iconType }: SocialProps) => {
  return (
    <a href={src} target="_blank">
      <FontAwesomeIcon className={styles.social} icon={getIcon(iconType)} />
    </a>
  );
};

const getIcon = (iconType: SocialProps["iconType"]) => {
  switch (iconType) {
    case "linkedin":
      return faLinkedin;
    case "artstation":
      return faArtstation;
    case "github":
      return faGithub;
  }
};
