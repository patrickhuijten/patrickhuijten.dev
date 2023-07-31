import { Table } from "features/work/experience/table";
import { getStory } from "@/lib/storyblok-api";

export const TableContainer = async () => {
  const { data } = await fetchData();
  const { experiences, experiences_headline } = data.story.content;
  return (
    <>
      <h1> {experiences_headline}</h1>
      <Table experiences={experiences ?? []} />
    </>
  );
};

export async function fetchData() {
  return getStory("cdn/stories/home");
}
