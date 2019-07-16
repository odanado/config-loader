import { PluginBase } from "../plugin";

export class DefinePlugin extends PluginBase {
  private value: string;
  public constructor(value: string) {
    super();
    this.value = value;
  }
  public load(): Promise<void> {
    return new Promise<void>((resolve): void => resolve());
  }
  public getValue(): string {
    return this.value;
  }
  public getErrorMessage(): string {
    return "value is undefined";
  }
}
