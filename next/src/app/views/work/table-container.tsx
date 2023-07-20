import styles from "@/app/views/work/table-container.module.css";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { Experience, Table } from "@/app/views/work/table";
import { remark } from "remark";
import html from "remark-html";

export const TableContainer = async () => {
  const { data } = await fetchData();
  const { experiences } = data.story.content;

  return <Table experiences={experiences} />;
};

// const getFakeData = async () => {
//   const processor = remark().use(html);

//   const start_date = new Date(2019, 10, 1).toUTCString();
//   const experiences: Experience[] = [
//     {
//       _uid: "123",
//       company_name: "Ikea",
//       title: "Software engineer",
//       description: "## Hi my name is Patrick",
//       company: {
//         url: "https://ikea.com",
//       },
//       start_date: new Date(2021, 10, 1).toUTCString(),
//       current: true,
//     },
//     {
//       _uid: "123",
//       company_name: "Eli5",
//       title: "Full-stack Developer",
//       description: "## Hi my name is Patrick",
//       company: {
//         url: "https://eli5.io",
//       },
//       start_date: new Date(2019, 10, 1).toUTCString(),
//       end_date: new Date(2021, 10, 1).toUTCString(),
//       current: false,
//     },
//   ];

//   const mappedExperiences = experiences.map((item) => ({
//     ...item,
//     description: processor.processSync(item.description).toString(),
//   }));

//   return {
//     data: {
//       story: {
//         content: {
//           experiences: mappedExperiences,
//         },
//       },
//     },
//   };
// };

export async function fetchData() {
  const storyblokApi = getStoryblokApi();

  return storyblokApi.get(`cdn/stories/home`, { cv: Date.now() });
}
