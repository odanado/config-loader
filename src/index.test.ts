import { ConfigLoader, MapPlugin } from "./index"
import { DefinePlugin, EnvPlugin } from "./plugins"

interface ConfigScheme {
  RDB_USER: string
  RDB_DB_NAME: string
  RDB_PASSWORD: string
}

const mapPlugin: MapPlugin<ConfigScheme> = {
  RDB_DB_NAME: new DefinePlugin('test'),
  RDB_PASSWORD: new EnvPlugin('RDB_PASSWORD'),
  RDB_USER: new DefinePlugin('test_user'),
}

describe("ConfigLoader", () => {
  let loader: ConfigLoader<ConfigScheme>
  beforeAll(() => {
    loader = new ConfigLoader<ConfigScheme>("test")
  })

  describe(".load", () => {
    it("should be throw error", async () => {
      delete process.env["RDB_PASSWORD"]
      await expect(loader._load(mapPlugin)).rejects.toThrow(/RDB_PASSWORD/)
    })

    it("should be success", async () => {
      process.env["RDB_PASSWORD"] = "pass"
      await expect(loader._load(mapPlugin)).resolves.toBeTruthy()
    })
  })
})