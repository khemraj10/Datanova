const { encode, decode } = require("./cipher");
test("basic round-trip with emoji", () => {
  const msg = "hello world! 👋";
  expect(decode(encode(msg))).toBe(msg);
});
test("round-trip with upper case letters", () => {
  const msg = "Test Message";
  expect(decode(encode(msg))).toBe(msg);
});
