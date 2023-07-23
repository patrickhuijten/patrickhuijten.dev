"use client";

import { ExperienceStoryblok } from "@/types/storyblok";

type ExperienceProps = {
  experience: ExperienceStoryblok;
  active: boolean;
};
export const ExperienceItem = ({ experience, active }: ExperienceProps) => {
  const {
    title,
    _uid,
    company_name,
    description,
    company,
    location,
  } = experience;
  return (
    <section key={_uid} hidden={!active}>
      <header>
        <h1>
          {title} @{" "}
          <a href={company?.url} target="_blank">
            {company_name}
          </a>
        </h1>
        <span>{location}</span>
      </header>

      <hr />
      <div dangerouslySetInnerHTML={{ __html: description ?? "" }} />
    </section>
  );
};
