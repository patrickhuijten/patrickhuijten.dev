import {
  ISbStoriesParams,
  ISbStoryData,
  ISbStoryParams,
  getStoryblokApi,
  storyblokEditable,
} from "@storyblok/react/rsc";
import { StoryblokClient, ISbStory } from "@storyblok/react";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { format } from "date-fns";

export const getStories = async (options: ISbStoriesParams) => {
  const storyblokApi = getStoryblokApi();
  const date = new Date().getUTCSeconds();

  const baseOptions = {
    cv: date,
  };

  const { data } = await storyblokApi.getStories({
    ...options,
    ...baseOptions,
  });

  return data.stories;
};

export const getStory = async (slug: string, options?: ISbStoriesParams) => {
  const storyblokApi = getStoryblokApi();
  const date = new Date().getUTCSeconds();
  const baseOptions = {
    cv: date,
  };
  try {
    const story = await storyblokApi.getStory(slug, {
      ...options,
      ...baseOptions,
    });
    return story.data.story;
  } catch (err) {
    console.warn("error for: ", slug);
  }

  // story.data.story.content.biography = processToHtml(
  //   story.data.story.content.biography ?? ""
  // );

  // story.data.story.content.headline = processToHtml(
  //   story.data.story.content.headline ?? ""
  // );

  // story.data.story.content.experiences =
  //   story.data.story.content.experiences.map((experience) => ({
  //     ...experience,
  //     description: processToHtml(experience.description ?? ""),
  //     start_date: processDateToString(experience.start_date),
  //     end_date: processDateToString(experience.end_date),
  //   }));

  // return story;
};

const processDateToString = (value?: string) =>
  value ? format(new Date(value), "MMM yyyy") : "Unknown date";

export const mapToHtml = (value: string) =>
  remark().use(remarkHtml).processSync(value).toString();
