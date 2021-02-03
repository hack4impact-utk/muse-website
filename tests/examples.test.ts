import { sum } from "server/sum";
import { mult } from "server/product";
import fetch from "isomorphic-unfetch";
//Put the name of your function in the first parameter of describe.
describe("sum", () => {
  //the it() function will contain your actual test. Use the first parameter of it to describe what your test is testing for.
  it("Make sure calculations are correct", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(2, 5)).toBe(7);
    expect(sum(10, 15)).toBe(25);
  });
});

describe("mult", () => {
  it("Make sure that mult returns the correct calculations", () => {
    expect(mult(2, 2)).toBe(4);
    expect(mult(2, 6)).toBe(12);
    expect(mult(4, 4)).not.toBe(20);
  });
});

describe("API Route", () => {
  it("Makes sure name is returned", async () => {
    const response = await fetch("http://localhost:3000/api/cart", {
      method: "GET",
    });

    const data = (await response.json()) as {
      success: boolean;
      payload: string;
    };

    expect((data as { success: boolean; payload: string }).payload).toBe(
      "Trevor"
    );
  });
});
