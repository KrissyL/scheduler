import reduceState from "reducer/application";

describe("Application Reducer", () => {
  it("throws an error with an unsupported action type", () => {
    expect(() => reduceState({}, { type: null })).toThrowError(
      /Cannot reduce. Unsupported action type/i
    );
  });
});