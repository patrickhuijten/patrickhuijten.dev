"use client";

import { type Experience  } from "@/app/views/work/table";
type ExperienceProps = {
    experience: Experience
}
export const ExperienceItem = ({ experience}: ExperienceProps) => {    
    const { _uid, company_name, description} = experience
    console.log(_uid, company_name, description)
  return (<div key={_uid}>
      <h1> {company_name}</h1>
      <div dangerouslySetInnerHTML={{__html: description}} />
    </div>)
};
