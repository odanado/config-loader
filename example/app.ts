import { ConfigLoader } from "@odanado/config-loader"
import { ConfigScheme } from "./config"


async function main() {
  const path = `${process.cwd()}/config`
  const configLoader = new ConfigLoader<ConfigScheme>(path)
  // if NODE_ENV === 'development'
  await configLoader.load() // -> { RDB_USER: 'test', RDB_PASSWORD: 'password', RDB_USER: 'test_user' }
  
  
  // if NODE_ENV === 'production' and RDB_PASSWORD === 'abcdef'
  await configLoader.load() // -> { RDB_USER: 'test', RDB_PASSWORD: 'abcdef', RDB_USER: 'test_user' }
}

main()
