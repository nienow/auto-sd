import PARAMS from './params.json';
import CONFIG from './config.json';
import {generate} from './generator';
import {startup} from './vm';

let runsLeft = CONFIG.runs;

const doGenerate = () => {
    if (runsLeft > 0) {
        runsLeft --;
        generate(PARAMS).then(() => {
            doGenerate();
        });
    }
}

startup().then(() => {
    doGenerate();
});
