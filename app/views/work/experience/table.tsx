"use client";

import { useState } from "react";
import { ExperienceItem } from "./experience";
import styles from "@/app/views/work/table/table.module.css";
import { ExperienceIndex } from "./experience-index";
import { ExperienceStoryblok } from "@/types/storyblok";

type TableProps = {
  experiences: ExperienceStoryblok[];
};

export const Table = ({ experiences }: TableProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={styles.table}>
      <ul className={styles.container}>
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
