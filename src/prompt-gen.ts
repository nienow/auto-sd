import {settings} from './settings';

export const generatePrompt = (tagCats: any, params: any) => {
  const prompt = tagCats.map(cat => {
    const tag = cat.randomTagByProbability();
    if (tag.pose) {
      params.alwayson_scripts = {
        controlnet: {
          args: [
            {
              input_image: tag.pose[1],
              model: 'depth',
              module: 'depth',
              resize_mode: 'Envelope (Outer Fit)', // Scale to Fit (Inner Fit) | Just Resize
              control_mode: 'ControlNet is more important' // Balanced | My prompt is more important
            }
          ]
        }
      };
      params.width = tag.pose[2].width;
      params.height = tag.pose[2].height;
    }
    return tag.getOutput();
  }).filter((str) => !!str).join(',');
  console.log('Generating', prompt);
  return prompt;
  // const verse = getRandomVerse();
  // return verse + ',' + prompt;
};

export const generateNegative = () => {
  return settings.negative;
};
