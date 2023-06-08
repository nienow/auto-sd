import CONFIG from './config.json';
import {generateImage} from './generator';
import {vmFactory} from './vm/vm';

let runsLeft = CONFIG.runs;

const doGenerate = () => {
  if (runsLeft > 0) {
    runsLeft--;
    generateImage().then(() => {
      doGenerate();
    });
  }
};

const args = process.argv.slice(2);

vmFactory(args[0]).startup().then(() => {
  doGenerate();
});
