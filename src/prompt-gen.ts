import {ENV} from './env';
import {getTagsInCategories} from './tags/tag-parser-factory';

const TAG_CATEGORIES = getTagsInCategories();
export const generatePrompt = () => {
  const prompt = TAG_CATEGORIES.map(cat => {
    return cat.randomTagByProbability().getOutput();
  }).filter((str) => !!str).join(',');
  console.log('Generating', prompt);
  return prompt;
  // const verse = getRandomVerse();
  // return verse + ',' + prompt;
};

export const generateNegative = () => {
  return ENV.BASE_NEG;
};
