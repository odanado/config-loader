# config-loader
[![Build Status](https://dev.azure.com/odan3240/config-loader/_apis/build/status/odanado.config-loader?branchName=master)](https://dev.azure.com/odan3240/config-loader/_build/latest?definitionId=1&branchName=master)
[![Coverage Status](https://coveralls.io/repos/github/odanado/config-loader/badge.svg?branch=add-coveralls)](https://coveralls.io/github/odanado/config-loader?branch=add-coveralls)

## Installation
```bash
$ yarn add @odanado/config-loader
```

## Usage

### In config directory
```typescript
// config/index.ts
export interface ConfigScheme {
  RDB_USER: string
  RDB_DB_NAME: string
  RDB_PASSWORD: string
}


// config/development.ts
import { MapPlugin, DefinePlugin } from "@odanado/config-loader"
import { ConfigScheme } from "./"

const mapPlugin: MapPlugin<ConfigScheme> = {
  RDB_DB_NAME: new DefinePlugin('test'),
  RDB_PASSWORD: new DefinePlugin('password'),
  RDB_USER: new DefinePlugin('test_user'),
}
export default mapPlugin



// config/production.ts
import { MapPlugin, DefinePlugin, EnvPlugin } from "@odanado/config-loader"
import { ConfigScheme } from "./"

const mapPlugin: MapPlugin<ConfigScheme> = {
  RDB_DB_NAME: new DefinePlugin('test'),
  RDB_PASSWORD: new EnvPlugin('RDB_PASSWORD'),
  RDB_USER: new DefinePlugin('test_user'),
}
export default mapPlugin

```

### In app.ts
```typescript
import { ConfigLoader } from "@odanado/config-loader"
import { ConfigScheme } from "./config"


async function main() {
  const path = `${process.cwd()}/config`
  const configLoader = new ConfigLoader<ConfigScheme>(path)
  // if NODE_ENV === 'development'
  await configLoader.load() // -> { RDB_DB_NAME: 'test', RDB_PASSWORD: 'password', RDB_USER: 'test_user' }
  
  
  // if NODE_ENV === 'production' and RDB_PASSWORD === 'abcdef'
  await configLoader.load() // -> { RDB_DB_NAME: 'test', RDB_PASSWORD: 'abcdef', RDB_USER: 'test_user' }
}

main()
```
