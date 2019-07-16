import { join } from "path";

import { EnvPlugin, DefinePlugin } from "./plugins";

export { EnvPlugin, DefinePlugin };

export type Plugin = EnvPlugin | DefinePlugin;

export type MapPlugin<T> = {
  [P in keyof T]: Plugin;
};

export class ConfigLoader<T> {
  private env: string;
  private directory: string;
  public constructor(directory: string) {
    if (!process.env.NODE_ENV) {
      throw new Error("NODE_ENV is undefined");
    }
    this.env = process.env.NODE_ENV;
    this.directory = directory;
  }

  public get mapPluginFile(): string {
    return join(this.directory, `${this.env}`);
  }

  public async load(): Promise<T> {
    const mapPlugin = this.dispatch();
    return this._load(mapPlugin);
  }

  private async _load(mapPlugin: MapPlugin<T>): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = {} as any; // XXX
    const keys = Object.keys(mapPlugin);
    await Promise.all(
      keys.map(
        async (key): Promise<void> => {
          const plugin = mapPlugin[key as keyof T]; // XXX
          await plugin.load();
          const value = plugin.getValue();
          if (value === undefined) {
            throw new Error(plugin.getErrorMessage());
          }
          result[key] = value;
        }
      )
    );

    return result as T; // XXX
  }

  private dispatch(): MapPlugin<T> {
    const mapPlugin = require(this.mapPluginFile).default as MapPlugin<T>; // XXX
    return mapPlugin;
  }
}
