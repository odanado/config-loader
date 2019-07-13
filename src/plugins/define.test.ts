import { DefinePlugin } from "./define"

describe("DefinePlugin", () => {
  describe(".getErrorMessage", () => {
    it("should be return value", () => {
      const definePlugin = new DefinePlugin("test")
      expect(definePlugin.getErrorMessage()).toMatch(/.*/)
    })
  })
})