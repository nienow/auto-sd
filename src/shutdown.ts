import {vmFactory} from './vm/vm';

const args = process.argv.slice(2);

vmFactory(args[0]).shutdown().then(() => {
  console.log('Shutdown!');
});
