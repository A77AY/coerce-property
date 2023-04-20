import { coerceBoolean, coerceArray } from "./coercions";

describe("coercions", () => {
  class Sample {
    @coerceBoolean
    num1ToBoolean: boolean | number = 1;

    @coerceArray
    toArray = "a";
  }

  describe("should convert to boolean", () => {
    it("1 to true", () => {
      expect(new Sample().num1ToBoolean).toBeTruthy();
    });

    it("null to false", () => {
      const sample = new Sample();
      sample.num1ToBoolean = null;
      expect(sample.num1ToBoolean).toBeFalsy();
    });
  });

  describe("should convert to array", () => {
    it("a to ['a']", () => {
      expect(new Sample().toArray).toContain("a");
    });
  });
});
