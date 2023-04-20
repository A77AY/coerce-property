import { coerce } from "./coerce";

describe("coerce", () => {
  describe("init ...", () => {
    class Sample {
      @coerce((v) => String(v))
      withoutDef;

      @coerce((v) => String(v))
      defUndefined = undefined;

      @coerce((v) => String(v))
      defNull = null;

      @coerce((v) => String(v))
      def0 = 0;

      @coerce(() => "empty")
      defEmptyStr = "";
    }

    it("without default value shouldn't call decorator function", () => {
      expect(new Sample().withoutDef).toBeUndefined();
    });

    describe("with default ... value should call decorator function", () => {
      it("undefined", () => {
        expect(new Sample().defUndefined).toBe("undefined");
      });

      it("null", () => {
        expect(new Sample().defNull).toBe("null");
      });

      it("0", () => {
        expect(new Sample().def0).toBe("0");
      });

      it("empty string", () => {
        expect(new Sample().defEmptyStr).toBe("empty");
      });
    });
  });

  describe("set ... should call decorator function and update value", () => {
    class Sample {
      @coerce((v) => v + "b")
      defStr = "a";

      @coerce((v) => v * 10)
      defNum = 1;
    }

    it("string", () => {
      const sample = new Sample();
      sample.defStr = "x";
      expect(sample.defStr).toBe("xb");
    });

    it("number", () => {
      const sample = new Sample();
      sample.defNum = 2;
      expect(sample.defNum).toBe(20);
    });
  });

  describe("usage this with ...", () => {
    describe("function ... property from this", () => {
      class Sample {
        strBefore = "before";

        @coerce(function () {
          return this.strBefore;
        })
        strWithBefore = "str";

        @coerce(function () {
          return this.strAfter;
        })
        strWithAfter = "str";

        strAfter = "after";
      }

      it("should get before init", () => {
        expect(new Sample().strWithBefore).toBe("before");
      });

      it("shouldn't get after init", () => {
        expect(new Sample().strWithAfter).toBeUndefined();
      });
    });

    describe("arrow function ... property from this", () => {
      class Sample {
        strBefore = "before";

        @coerce(() => {
          return this.strBefore;
        })
        strWithBefore = "str";

        @coerce(() => {
          return this.strAfter;
        })
        strWithAfter = "str";

        strAfter = "after";
      }

      it("shouldn't get before init", () => {
        expect(new Sample().strWithBefore).toBeUndefined();
      });

      it("shouldn't get after init", () => {
        expect(new Sample().strWithAfter).toBeUndefined();
      });
    });

    describe("arrow function ... property from self", () => {
      class Sample {
        strBefore = "before";

        @coerce((v, self) => {
          return self.strBefore;
        })
        strWithBefore = "str";

        @coerce((v, self) => {
          return self.strAfter;
        })
        strWithAfter = "str";

        strAfter = "after";
      }

      it("should get before init", () => {
        expect(new Sample().strWithBefore).toBe("before");
      });

      it("shouldn't get after init", () => {
        expect(new Sample().strWithAfter).toBeUndefined();
      });
    });
  });
});
