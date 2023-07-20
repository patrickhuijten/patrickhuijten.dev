import { Experience } from "./table";
import styles from "@/app/views/work/experience-index.module.css";
type ExperienceIndexProps = {
  experience: Experience;
  onClick: () => void;
  selected: boolean;
};

export const ExperienceIndex = ({
  experience,
  onClick,
  selected,
}: ExperienceIndexProps) => {
  return (
    <li className={styles.index} aria-selected={selected} onClick={onClick}>
      {experience.company_name}
    </li>
  );
};
