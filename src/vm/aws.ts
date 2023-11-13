import * as child_process from 'child_process';
import {ENV} from '../env';
import {
  DescribeInstancesCommand, EC2Client, RunInstancesCommand, StartInstancesCommand, StopInstancesCommand, TerminateInstancesCommand,
  waitUntilInstanceStatusOk, waitUntilInstanceStopped, waitUntilInstanceTerminated
} from '@aws-sdk/client-ec2';
import {VMOperations} from './abstract-vm';

const ec2 = new EC2Client({region: ENV.AWS_REGION});

export class AWSOperators extends VMOperations {
  public async startup() {
    let instance = await describeInstance();
    console.log('current state: ' + instance.State.Name);
    if (instance.State.Name !== 'stopped') {
      this.ipAddress = instance.PublicIpAddress;
      console.log('IP: ' + instance.PublicIpAddress);
      return;
    }
    const startCmd = new StartInstancesCommand({InstanceIds: [ENV.INSTANCE]});
    await ec2.send(startCmd);
    await waitUntilInstanceStatusOk({client: ec2, maxWaitTime: 180}, {InstanceIds: [ENV.INSTANCE]});
    instance = await describeInstance();
    this.ipAddress = instance.PublicIpAddress;
    console.log('IP: ' + instance.PublicIpAddress);
  }

  public async shutdown() {
    const command = new StopInstancesCommand({InstanceIds: [ENV.INSTANCE]});
    await ec2.send(command);
    await waitUntilInstanceStopped(
      {client: ec2, maxWaitTime: 180},
      {InstanceIds: [ENV.INSTANCE]}
    );
  }
}

const describeInstance = async () => {
  const command = new DescribeInstancesCommand({
    InstanceIds: [ENV.INSTANCE],
  });

  const {Reservations} = await ec2.send(command);
  return Reservations[0].Instances[0];
};

export const createInstance = async () => {
  const cmd = new RunInstancesCommand({
    LaunchTemplate: {LaunchTemplateName: ENV.AWS_LAUNCH_TEMPLATE, Version: '7'},
    MinCount: 1,
    MaxCount: 1
  });
  const {Instances} = await ec2.send(cmd);
  await waitUntilInstanceStatusOk(
    {client: ec2, maxWaitTime: 240},
    {InstanceIds: [Instances[0].InstanceId]}
  );
};

export const createInstanceFromImage = async () => {
  const cmd = new RunInstancesCommand({
    LaunchTemplate: {LaunchTemplateName: ENV.AWS_LAUNCH_TEMPLATE, Version: '7'},
    ImageId: '',
    MinCount: 1,
    MaxCount: 1
  });
  const {Instances} = await ec2.send(cmd);
  await waitUntilInstanceStatusOk(
    {client: ec2, maxWaitTime: 240},
    {InstanceIds: [Instances[0].InstanceId]}
  );
};

export const deleteInstance = async (instanceId) => {
  const command = new TerminateInstancesCommand({
    InstanceIds: [instanceId],
  });

  try {
    await ec2.send(command);
    await waitUntilInstanceTerminated(
      {client: ec2, maxWaitTime: 240},
      {InstanceIds: [instanceId]}
    );
    console.log(`Instance with ID ${instanceId} terminated.\n`);
  } catch (err) {
    console.error(err);
  }
};

export const runAuto = () => {
  return new Promise((resolve) => {
    const listening = child_process.spawn('gcloud',
      ['compute', 'ssh', ENV.INSTANCE, '--command', '"stable-diffusion-webui/webui.sh --listen --xformers --api"']);

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
