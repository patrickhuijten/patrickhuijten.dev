import {
  faLinkedin,
  faArtstation,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/app/views/about/social.module.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type SocialProps = {
  src: string;
  iconType: "linkedin" | "artstation" | "github";
};
export const Social = ({ src, iconType }: SocialProps) => {
  const icon = getIcon(iconType);
  return (
    <a className={styles.link} href={src} target="_blank">
      <FontAwesomeIcon className={styles.social} icon={icon} />
    </a>
  );
};

const getIcon = (iconType: SocialProps["iconType"]): IconProp => {
  switch (iconType) {
    case "linkedin":
      return faLinkedin as IconProp;
    case "artstation":
      return faArtstation as IconProp;
    case "github":
      return faGithub as IconProp;
  }
};
