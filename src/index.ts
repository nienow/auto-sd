import {generateImage} from './generator';
import {vmFactory} from './vm/vm';
import {settings} from './settings';

let runsLeft = settings.runs;

const doGenerate = () => {
  if (runsLeft > 0) {
    runsLeft--;
    generateImage().then(() => {
      doGenerate();
    });
  }
};

vmFactory().startup().then(() => {
  doGenerate();
});
