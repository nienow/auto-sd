import {GCPOperations} from './gcp';
import {AWSOperators} from './aws';
import {VMOperations} from './abstract-vm';

export let vm: VMOperations = null;
export const vmFactory = (type: string): VMOperations => {
  if (type === 'gcp') {
    return vm = new GCPOperations();
  }
  if (type === 'aws') {
    return vm = new AWSOperators();
  }
  throw 'Invalid Type: ' + type;
};
