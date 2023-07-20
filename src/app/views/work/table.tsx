"use client";

import { useState } from "react";
import { ExperienceItem } from "@/app/views/work/experience";
import styles from "@/app/views/work/table.module.css";
import { ExperienceIndex } from "./experience-index";
interface Company {
  url: string;
}

export type Experience = {
  _uid: string;
  title: string;
  company: Company;
  company_name: string;
  description: string;
  start_date: string;
  end_date?: string;
  current: boolean;
};

type TableProps = {
  experiences: Experience[];
};
export const Table = ({ experiences }: TableProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedExperience = experiences.at(selectedIndex);
  return (
    <div className={styles.table}>
      <ul className={styles.container}>
        {experiences.map((experience, index) => (
          <ExperienceIndex
            selected={selectedIndex === index}
            experience={experience}
            key={experience._uid}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </ul>
      <section>
        {selectedExperience && (
          <ExperienceItem
            key={selectedExperience._uid}
            experience={selectedExperience}
          />
        )}
      </section>
    </div>
  );
};
