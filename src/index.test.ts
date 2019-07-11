import { add } from "./"

describe("index", () => {
  it("add", () => {
    expect(add(10, 32)).toEqual(42)
  })
})