import { MapPlugin, DefinePlugin, EnvPlugin } from "@odanado/config-loader";
import { ConfigScheme } from "./";

const mapPlugin: MapPlugin<ConfigScheme> = {
  RDB_DB_NAME: new DefinePlugin("test"),
  RDB_PASSWORD: new EnvPlugin("RDB_PASSWORD"),
  RDB_USER: new DefinePlugin("test_user")
};
export default mapPlugin;
