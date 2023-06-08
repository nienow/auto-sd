import CONFIG from './config.json';
import {vm} from './vm/vm';

export const waitForAuto1111 = async () => {
  for (let attemps = 0; attemps < 20; attemps++) {
    try {
      const progress = await fetch(apiUrl('progress'))
        .then(res => res.json());
      if (progress.hasOwnProperty('progress')) {
        return true;
      }
    } catch {
      console.log('waiting on auto1111: attempt ' + attemps);
    }
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
  return false;
};

export const changeModel = async (model: string) => {
  await fetch(apiUrl('reload-checkpoint'), {
    method: 'POST',
    body: JSON.stringify({'sd_model': model}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json()).then(data => console.log(data));
};

export const setAutoConfig = async (data: any) => {
  await fetch(apiUrl('options'), {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json()).then(data => console.log(data));
};

export const refreshModels = async () => {
  await fetch(apiUrl('refresh-checkpoints'), {method: 'POST'});
};

const apiUrl = (path: string) => {
  return `http://${vm.ipAddress}:${CONFIG.port}/sdapi/v1/${path}`;
};
