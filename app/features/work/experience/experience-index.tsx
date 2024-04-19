"use client";

import styles from "./experience-index.module.css";
import { ExperienceStoryblok } from "@/types/storyblok";

type ExperienceIndexProps = {
  experience: ExperienceStoryblok;
  onClick: () => void;
  selected: boolean;
};

export const ExperienceIndex = ({
  experience,
  onClick,
  selected,
}: ExperienceIndexProps) => {
  return (
    <li className={styles.index} data-selected={selected} onClick={onClick}>
      {experience.company_name}
    </li>
  );
};
