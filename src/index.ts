import { EnvPlugin, DefinePlugin } from "@/plugins/index"

export type Plugin = EnvPlugin | DefinePlugin

// いい感じの名前にする
export type Config<T> = {
  [P in keyof T]: Plugin
}

type Config2 = {
  [P in string]: Plugin
}

export class ConfigLoader<T> {
  async load(config: Config2): Promise<T> {
    const result: any = {}
    const keys = Object.keys(config)
    await Promise.all(keys.map(async key => {
      const plugin = config[key]
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
