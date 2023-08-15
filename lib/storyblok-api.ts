import { getStoryblokApi } from "@storyblok/react/rsc";
import { StoryblokClient, ISbStory } from "@storyblok/react";
import { PageStoryblok } from "@/types/storyblok.js";
// @ts-ignore
import { remark } from "remark";
// @ts-ignore
import remarkHtml from "remark-html";
import { format } from "date-fns";
type StoryblokPageResult = ISbStory & {
  data: ISbStory["data"] & {
    story: ISbStory["data"]["story"] & {
      content: Required<PageStoryblok>;
    };
  };
};

export const getStory = async (slug: string): Promise<StoryblokPageResult> => {
  const storyblokApi: StoryblokClient = getStoryblokApi();
  const date = new Date().getUTCMinutes();
  const options = {
    cv: date,
  };

  const story = (await storyblokApi.get(slug, options)) as StoryblokPageResult;

  story.data.story.content.biography = processToHtml(
    story.data.story.content.biography ?? ""
  );

  story.data.story.content.headline = processToHtml(
    story.data.story.content.headline ?? ""
  );

  story.data.story.content.experiences =
    story.data.story.content.experiences.map((experience) => ({
      ...experience,
      description: processToHtml(experience.description ?? ""),
      start_date: processDateToString(experience.start_date),
      end_date: processDateToString(experience.end_date),
    }));

  return story;
};

const processDateToString = (value?: string) =>
  value ? format(new Date(value), "MMM yyyy") : "Unknown date";

const processToHtml = (value: string) =>
  // @ts-ignore
  remark().use(remarkHtml).processSync(value).toString();
