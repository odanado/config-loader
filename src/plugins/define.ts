import { PluginBase } from "../plugin"

export class DefinePlugin extends PluginBase {
  constructor(public value: string) {
    super()
  }
  load(): Promise<void> {
    return new Promise<void>(resolve => resolve())
  }
  getValue(): string {
    return this.value
  }
  getErrorMessage(): string {
    return "value is undefined"
  }
}