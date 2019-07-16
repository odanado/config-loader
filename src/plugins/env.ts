import { PluginBase } from "../plugin";

export class EnvPlugin extends PluginBase {
  private value?: string;
  private key: string;
  public constructor(key: string) {
    super();
    this.key = key;
  }

  public load(): Promise<void> {
    return new Promise<void>((resolve): void => {
      this.value = process.env[this.key];
      resolve();
    });
  }
  public getValue(): string | undefined {
    return this.value;
  }
  public getErrorMessage(): string {
    return `${this.key} is not define in environment variable`;
  }
}
