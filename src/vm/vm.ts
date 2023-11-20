import {GCPOperations} from './gcp';
import {AWSOperators} from './aws';
import {VMOperations} from './abstract-vm';
import {settings} from '../settings';

export let vm: VMOperations = null;
export const vmFactory = (): VMOperations => {
  if (settings.vm === 'gcp') {
    return vm = new GCPOperations();
  }
  if (settings.vm === 'aws') {
    return vm = new AWSOperators();
  }
  throw 'Invalid Type: ' + settings.vm;
};
