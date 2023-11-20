import {InstancesClient, ZoneOperationsClient} from '@google-cloud/compute';
import * as child_process from 'child_process';
import {waitForAuto1111} from '../auto';
import {VMOperations} from './abstract-vm';
import {settings} from '../settings';

const TERMINATED = 'TERMINATED';
const INSTANCE1 = {instance: settings.gcpInstance, zone: settings.gcpZone, project: settings.gcpProject};

// let instanceRecord;
const instancesClient = new InstancesClient();
const operationsClient = new ZoneOperationsClient();

export class GCPOperations extends VMOperations {
  public setIpAddress(ip: string) {
    this.ipAddress = ip;
  }

  public async startup() {
    let [result] = await instancesClient.get(INSTANCE1);
    console.log('current: ' + result.status);

    if (result.status === TERMINATED) {
      await startVM();
      [result] = await instancesClient.get(INSTANCE1);
    }
    this.ipAddress = result.networkInterfaces[0]?.accessConfigs[0]?.natIP;
    console.log('IP: ' + this.ipAddress);

    await waitForAuto1111();
    console.log(`auto running: http://${this.ipAddress}:${settings.port}`);
    // await runAuto();
  }

  public async shutdown() {
    const [response] = await instancesClient.stop(INSTANCE1);
    let operation = response.latestResponse as any;
    while (operation.status !== 'DONE') {
      [operation] = await operationsClient.wait({
        operation: operation.name,
        project: settings.gcpProject,
        zone: settings.gcpZone,
      });
    }
  }
}

export const runAuto = () => {
  return new Promise((resolve) => {
    const listening = child_process.spawn('gcloud',
      ['compute', 'ssh', settings.gcpInstance, '--command', '"stable-diffusion-webui/webui.sh --listen --xformers --api"']);

    listening.stdout.on('data', data => {
      console.log(`stdout: ${data}`);
    });

    listening.stderr.on('data', data => {
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
      project: settings.gcpProject,
      zone: settings.gcpZone,
    });
  }
};

// gcloud compute instances create instance-3 \
//     --project=rockopera8 \
//     --zone=us-central1-b \
//     --machine-type=g2-standard-4 \
//     --network-interface=network-tier=PREMIUM,stack-type=IPV4_ONLY,subnet=default \
//     --no-restart-on-failure \
//     --maintenance-policy=TERMINATE \
//     --provisioning-model=SPOT \
//     --instance-termination-action=DELETE \
//     --service-account=599939742063-compute@developer.gserviceaccount.com \
//     --scopes=https://www.googleapis.com/auth/devstorage.read_only,https://www.googleapis.com/auth/logging.write,https://www.googleapis.com/auth/monitoring.write,https://www.googleapis.com/auth/servicecontrol,https://www.googleapis.com/auth/service.management.readonly,https://www.googleapis.com/auth/trace.append \
// --accelerator=count=1,type=nvidia-l4 \
//     --tags=http-server \
//     --create-disk=auto-delete=yes,boot=yes,device-name=instance-3,image=projects/rockopera8/global/images/auto1111,mode=rw,size=50,type=projects/rockopera8/zones/us-central1-a/diskTypes/pd-balanced \
//     --no-shielded-secure-boot \
//     --shielded-vtpm \
//     --shielded-integrity-monitoring \
//     --labels=goog-ec-src=vm_add-gcloud \
//     --reservation-affinity=any
//

