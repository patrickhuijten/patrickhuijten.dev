"use client";

import { ExperienceStoryblok } from "@/types/storyblok";
import { ExperienceItem } from "features/work/experience/experience";
import { ExperienceIndex } from "features/work/experience/experience-index";
import styles from "./table.module.css";
import { useState } from "react";

type TableProps = {
  experiences: ExperienceStoryblok[];
};

export const Table = ({ experiences }: TableProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={styles.table}>
      <ul className={styles.container}>
        <li
          key="selector"
          className={styles.selector}
          style={{ transform: `translateY(${50 * selectedIndex}px)` }}
        />
        {experiences.map((experience, index) => (
          <ExperienceIndex
            selected={selectedIndex === index}
            experience={experience}
            key={"index-" + experience._uid}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </ul>
      <div>
        {experiences.map((experience, index) => (
          <ExperienceItem
            experience={experience}
            key={"content-" + experience._uid}
            active={index === selectedIndex}
          />
        ))}
      </div>
    </div>
  );
};
