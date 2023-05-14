import CONFIG from './config.json';
import {generateImage} from './generator';
import {startup} from './vm';

let runsLeft = CONFIG.runs;

const doGenerate = () => {
    if (runsLeft > 0) {
        runsLeft --;
        generateImage().then(() => {
            doGenerate();
        });
    }
}

startup().then(() => {
    doGenerate();
});
