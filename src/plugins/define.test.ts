import { DefinePlugin } from "./define";

describe("DefinePlugin", (): void => {
  describe(".getErrorMessage", (): void => {
    it("should be return value", (): void => {
      const definePlugin = new DefinePlugin("test");
      expect(definePlugin.getErrorMessage()).toMatch(/.*/);
    });
  });
});
