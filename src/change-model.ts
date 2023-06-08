import {setAutoConfig} from './auto';
import {vmFactory} from './vm/vm';

const args = process.argv.slice(2);

vmFactory(args[0]).startup().then(() => {
  setAutoConfig({sd_model_checkpoint: 'deliberate.safetensors'}).then(() => {
    console.log('changed');
  });
});


