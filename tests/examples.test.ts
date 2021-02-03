import { sum } from "server/sum";

//Put the name of your function in the first parameter of describe.
describe("sum", () => {
  //the it() function will contain your actual test. Use the first parameter of it to describe what your test is testing for.
  it("Make sure calculations are correct", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(2, 5)).toBe(7);
    expect(sum(10, 15)).toBe(25);
  });
});

//TODO: An asynchronous example
