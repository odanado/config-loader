import { EnvPlugin, DefinePlugin } from "@/plugins/index"

export type Plugin = EnvPlugin | DefinePlugin

export type MapPlugin<T> = {
  [P in keyof T]: Plugin
}

export class ConfigLoader<T> {
  async load(mapPlugin: MapPlugin<T>): Promise<T> {
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

    return result as T
  }
}
