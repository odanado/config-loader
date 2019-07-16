import { PluginBase } from "../plugin"

export class EnvPlugin extends PluginBase {
  private value?: string;
  constructor(private key: string) {
    super()
  }

  load(): Promise<void> {
    return new Promise<void>(resolve => {
      this.value = process.env[this.key]
      resolve()
    })
  }
  getValue() {
    return this.value
  }
  getErrorMessage() {
    return `${this.key} is not define in environment variable`
  }
}