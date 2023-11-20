import fs from 'fs-extra';
import {generateNegative, generatePrompt} from './prompt-gen';
import {ENV} from './env';
import {generateSettings} from './settings-gen';
import {vm} from './vm/vm';
import {getFile, settings} from './settings';
import yaml from 'js-yaml';
import {getTagsInCategories} from './tags/yml-tag-parser';

const modelJSON = yaml.load(getFile(settings.model));
const settingsConfig = modelJSON.settings;
delete modelJSON.settings;
const catTags = getTagsInCategories(modelJSON);

export const generateImage = async () => {
  const params = generateSettings(settingsConfig);
  params.prompt = generatePrompt(catTags, params);
  params.negative_prompt = generateNegative();

  const result = await fetch(`http://${vm.ipAddress}:${settings.port}/sdapi/v1/txt2img`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json());

  console.log(result);
  if (result.images) {
    const filename = new Date().getTime();
    fs.writeFileSync(`${ENV.OUTPUT}/${filename}.png`, Buffer.from(result.images[0], 'base64'));
  } else {
    console.log(result);
  }

  // fs.outputFileSync(`${path}/${filename}.txt`, JSON.stringify(params));

  // fs.outputFileSync(newFile, html);
};
