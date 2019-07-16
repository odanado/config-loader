import { join } from "path"

import { EnvPlugin, DefinePlugin } from "./plugins"

export {
  EnvPlugin,
  DefinePlugin
}

export type Plugin = EnvPlugin | DefinePlugin

export type MapPlugin<T> = {
  [P in keyof T]: Plugin
}

export class ConfigLoader<T> {
  private env: string;
  constructor (private directory: string) {
    if (!process.env.NODE_ENV) {
      throw new Error("NODE_ENV is undefined")
    }
    this.env = process.env.NODE_ENV
  }

  get mapPluginFile() {
    return join(this.directory, `${this.env}`)
  }

  async load(): Promise<T> {
    const mapPlugin = this.dispatch()
    return this._load(mapPlugin)
  }

  async _load(mapPlugin: MapPlugin<T>): Promise<T> {
    const result: any = {}
    const keys = Object.keys(mapPlugin)
    await Promise.all(keys.map(async key => {
      const plugin = mapPlugin[key as keyof T] // XXX
      await plugin.load()
      const value = plugin.getValue()
      if (value === undefined) {
        throw new Error(plugin.getErrorMessage())
      }
      result[key] = value
    }))

    return result as T // XXX
  }

  dispatch(): MapPlugin<T> {
    const mapPlugin = require(this.mapPluginFile).default as MapPlugin<T> // XXX
    return mapPlugin
  }
}
