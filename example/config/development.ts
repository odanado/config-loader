import { MapPlugin, DefinePlugin } from "@odanado/config-loader";
import { ConfigScheme } from "./";

const mapPlugin: MapPlugin<ConfigScheme> = {
  RDB_DB_NAME: new DefinePlugin("test"),
  RDB_PASSWORD: new DefinePlugin("password"),
  RDB_USER: new DefinePlugin("test_user")
};
export default mapPlugin;
