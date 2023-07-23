import { ExperienceStoryblok } from "@/types/storyblok";
import styles from "features/work/experience/experience.module.css";

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
    start_date,
    end_date,
    location,
    current,
  } = experience;

  return (
    <section key={_uid} hidden={!active}>
      <header className={styles.header}>
        <h1>
          {title} @{" "}
          <a href={company?.url} target="_blank">
            {company_name}
          </a>
        </h1>
        <div />

        <span>{location}</span>
        <TimeRange
          start_date={start_date}
          end_date={end_date}
          current={current}
        />
      </header>

      <hr />
      <div dangerouslySetInnerHTML={{ __html: description ?? "" }} />
    </section>
  );
};

const TimeRange = ({
  start_date,
  end_date,
  current,
}: Pick<ExperienceStoryblok, "start_date" | "end_date" | "current">) => {
  return (
    <span>
      📆 {start_date} - {current ? "Current" : end_date}
    </span>
  );
};
