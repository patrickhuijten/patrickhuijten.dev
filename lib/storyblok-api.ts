import { ISbStoriesParams, getStoryblokApi } from "@storyblok/react/rsc";
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
};

const processDateToString = (value?: string) =>
  value ? format(new Date(value), "MMM yyyy") : "Unknown date";

export const mapToHtml = (value: string) =>
  remark().use(remarkHtml).processSync(value).toString();
