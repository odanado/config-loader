export abstract class PluginBase {
  public abstract load(): Promise<void>
  public abstract getValue(): string | undefined
  public abstract getErrorMessage(): string
}
