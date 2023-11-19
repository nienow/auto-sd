import {ENV} from './env';
import {getTagsInCategories} from './tags/tag-parser-factory';

const TAG_CATEGORIES = getTagsInCategories();
export const generatePrompt = (params: any) => {
  const prompt = TAG_CATEGORIES.map(cat => {
    const tag = cat.randomTagByProbability();
    if (tag.pose) {
      params.controlnet_input_image = [tag.pose[1]];
      params.controlnet_model = tag.pose[0];
    }
    return tag.getOutput();
  }).filter((str) => !!str).join(',');
  console.log('Generating', prompt);
  return prompt;
  // const verse = getRandomVerse();
  // return verse + ',' + prompt;
};

export const generateNegative = () => {
  return ENV.BASE_NEG;
};
