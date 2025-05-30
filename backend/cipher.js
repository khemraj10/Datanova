const symbolMap = {
  a: "α",
  b: "β",
  c: "¢",
  d: "δ",
  e: "ε",
  f: "ϝ",
  g: "ɡ",
  h: "♄",
  i: "ι",
  j: "ʆ",
  k: "κ",
  l: "λ",
  m: "ɱ",
  n: "η",
  o: "☺",
  p: "ρ",
  q: "φ",
  r: "я",
  s: "ѕ",
  t: "τ",
  u: "υ",
  v: "ν",
  w: "ω",
  x: "х",
  y: "γ",
  z: "ζ",
};

const inverseMap = Object.fromEntries(
  Object.entries(symbolMap).map(([k, v]) => [v, k])
);

function hasInvalidControlChars(text) {
  return [...text].some(
    (c) => (c.charCodeAt(0) < 0x20 && c !== "\n") || c.charCodeAt(0) === 0x7f
  );
}
function encode(text) {
  if ([...text].length > 280) throw new Error("INPUT_TOO_LONG");
  if (hasInvalidControlChars(text)) throw new Error("UNSUPPORTED_CONTROL_CHAR");

  return [...text]
    .map((char) => {
      const lower = char.toLowerCase();
      if (symbolMap[lower]) {
        const symbol = symbolMap[lower];
        // If original char is uppercase, prefix symbol with '^'
        return char === lower ? symbol : "^" + symbol;
      }
      return char;
    })
    .join("");
}

function decode(text) {
  if ([...text].length > 280) throw new Error("INPUT_TOO_LONG");
  if (hasInvalidControlChars(text)) throw new Error("UNSUPPORTED_CONTROL_CHAR");

  const chars = [...text];
  let result = [];
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === "^") {
      // Next char is an uppercase letter symbol
      i++;
      const symbol = chars[i];
      if (inverseMap[symbol]) {
        result.push(inverseMap[symbol].toUpperCase());
      } else {
        // Unknown symbol after '^', just add both chars
        result.push("^" + symbol);
      }
    } else {
      if (inverseMap[chars[i]]) {
        result.push(inverseMap[chars[i]]);
      } else {
        result.push(chars[i]);
      }
    }
  }
  return result.join("");
}

module.exports = { encode, decode };
