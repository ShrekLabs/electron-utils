import { expect, test } from "vitest";
import { toHTMLList } from "../utils";

test("addIfMissing", () => {
  expect(toHTMLList(["a", "b"])).toStrictEqual("<ul><li>a</li><li>b</li></ul>");
  expect(toHTMLList(["a"])).toStrictEqual("<ul><li>a</li></ul>");
  expect(toHTMLList([])).toStrictEqual("");
});
