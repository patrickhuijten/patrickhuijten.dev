import { Table } from "./table";
import { getStory } from "@/lib/storyblok-api";

export const TableContainer = async () => {
  const { data } = await fetchData();
  const { experiences } = data.story.content;
  return <Table experiences={experiences ?? []} />;
};

export async function fetchData() {
  return getStory("cdn/stories/home");
}
