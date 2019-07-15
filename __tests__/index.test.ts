import { ConfigLoader } from "@/index"
import { ConfigScheme } from "../fixtures/config/index"


describe('ConfigLoader', () => {
  let configLoader: ConfigLoader<ConfigScheme>;
  function prepare(env: string) {
    process.env.NODE_ENV = env
    configLoader = new ConfigLoader<ConfigScheme>('../fixtures/config')
  }
  it('not found test.ts', async () => {
    prepare('test')
    await expect(configLoader.load()).rejects.toThrow(/Cannot find module/)
  })
  it('development', async () => {
    prepare('development')
    await expect(configLoader.load()).resolves.toBeDefined()
  })
  it('production', async () => {
    prepare('production')
    await expect(configLoader.load()).rejects.toThrow(/RDB_PASSWORD/)

    process.env.RDB_PASSWORD = 'password'
    await expect(configLoader.load()).resolves.toBeTruthy()
    delete process.env.RDB_PASSWORD
  })
  it('NODE_ENV is undefined', () => {
    delete process.env.NODE_ENV
    expect(() => new ConfigLoader<ConfigScheme>('../fixtures/config')).toThrow(/NODE_ENV/)
  })
})