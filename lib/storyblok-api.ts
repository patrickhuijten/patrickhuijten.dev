import { getStoryblokApi } from "@storyblok/react/rsc";
import { StoryblokClient, ISbStory } from "@storyblok/react";
import { PageStoryblok } from "@/types/storyblok";
import { remark } from "remark";
import remarkHtml from "remark-html";

type StoryblokPageResult = ISbStory & {
  data: ISbStory["data"] & {
    story: ISbStory["data"]["story"] & {
      content: PageStoryblok;
    };
  };
};

export const getStory = async (slug: string): Promise<StoryblokPageResult> => {
  const storyblokApi: StoryblokClient = getStoryblokApi();

  const story = (await storyblokApi.get(slug, {
    cv: Date.now(),
  })) as StoryblokPageResult;

  story.data.story.content.biography = processToHtml(
    story.data.story.content.biography ?? ""
  );

  story.data.story.content.headline = processToHtml(
    story.data.story.content.headline ?? ""
  );

  story.data.story.content.experiences =
    story.data.story.content.experiences?.map((experience) => ({
      description: processToHtml(experience.description ?? ""),
      ...experience,
    })) ?? [];

  return story;
};

const processToHtml = (value: string) =>
  remark()
    .use(remarkHtml)
    .processSync(value)
    .toString();
