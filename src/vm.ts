import {InstancesClient, ZoneOperationsClient} from '@google-cloud/compute';
import * as child_process from 'child_process';
import {ENV} from './env';

const TERMINATED = 'TERMINATED';
const INSTANCE1 = {instance: ENV.INSTANCE, zone: ENV.ZONE, project: ENV.PROJECT};

// let instanceRecord;
const instancesClient = new InstancesClient();
const operationsClient = new ZoneOperationsClient();
export let ipAddress;

export const startup = async () => {
  let [result] = await instancesClient.get(INSTANCE1);
  console.log('status: ' + result.status);

  if (result.status === TERMINATED) {
    await startVM();
    [result] = await instancesClient.get(INSTANCE1);
  }
  ipAddress = result.networkInterfaces[0]?.accessConfigs[0]?.natIP;
  console.log('IP: ' + ipAddress);

  // await runAuto();
};

export const shutdown = async () => {
  const [response] = await instancesClient.stop(INSTANCE1);
  let operation = response.latestResponse as any;
  while (operation.status !== 'DONE') {
    [operation] = await operationsClient.wait({
      operation: operation.name,
      project: ENV.PROJECT,
      zone: ENV.ZONE,
    });
  }
};

export const runAuto = () => {
  return new Promise((resolve) => {
    const listening = child_process.spawn('gcloud', ['compute', 'ssh', ENV.INSTANCE, '--command', '"stable-diffusion-webui/webui.sh --listen --xformers --api"']);


    listening.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
    });

    listening.stderr.on("data", data => {
      console.log(`stderr: ${data}`);
    });

    listening.on('error', (error) => {
      console.log(`error: ${error.message}`);
    });

    listening.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });

    resolve(null);

  });
};

const startVM = async () => {
  const [response] = await instancesClient.start(INSTANCE1);
  let operation = response.latestResponse as any;
  while (operation?.status !== 'DONE') {
    [operation] = await operationsClient.wait({
      operation: operation.name,
      project: ENV.PROJECT,
      zone: ENV.ZONE,
    });
  }
};
