import { Table } from "features/work/experience/table";
import { getStory } from "@/lib/storyblok-api";
import { ISbStoryData } from "@storyblok/react";
import { LandingPageStoryblok } from "@/types/storyblok";

export const TableContainer = async () => {
  const about = await fetchData();
  const { experiences, experiences_headline } = about.content;
  return (
    <>
      <h1> {experiences_headline}</h1>
      <Table experiences={experiences ?? []} />
    </>
  );
};

export async function fetchData() {
  const data = await getStory("home");
  console.log(data);
  return data as ISbStoryData<LandingPageStoryblok>;
}
