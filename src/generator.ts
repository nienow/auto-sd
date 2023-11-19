import CONFIG from './config.json';
import fs from 'fs-extra';
import {generateNegative, generatePrompt} from './prompt-gen';
import {ENV} from './env';
import {generateSettings} from './settings-gen';
import {vm} from './vm/vm';

export const generateImage = async () => {
  const params = generateSettings();
  // const params = fastSettings as any;
  params.prompt = generatePrompt(params);
  params.negative_prompt = generateNegative();

  const result = await fetch(`http://${vm.ipAddress}:${CONFIG.port}/sdapi/v1/txt2img`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json());

  if (result.images) {
    const filename = new Date().getTime();
    fs.writeFileSync(`${ENV.OUTPUT}/${filename}.png`, Buffer.from(result.images[0], 'base64'));
  } else {
    console.log(result);
  }

  // fs.outputFileSync(`${path}/${filename}.txt`, JSON.stringify(params));

  // fs.outputFileSync(newFile, html);
};
