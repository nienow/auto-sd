export abstract class VMOperations {
  public ipAddress: string = '';

  public abstract startup(): Promise<void>;

  public abstract shutdown(): Promise<void>;
}
