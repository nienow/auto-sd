import {vmFactory} from './vm/vm';

vmFactory().shutdown().then(() => {
  console.log('Shutdown!');
});
