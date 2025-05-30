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

const inverseMap = Object.entries(symbolMap).reduce((acc, [k, v]) => {
  acc[v] = k;
  if (v.toUpperCase() !== v) acc[v.toUpperCase()] = k.toUpperCase();
  return acc;
}, {});

function hasInvalidControlChars(text) {
  return [...text].some(
    (c) => (c.charCodeAt(0) < 0x20 && c !== "\n") || c.charCodeAt(0) === 0x7f
  );
}

function encode(text) {
  if ([...text].length > 280) throw { code: "INPUT_TOO_LONG" };
  if (hasInvalidControlChars(text)) throw { code: "UNSUPPORTED_CONTROL_CHAR" };
  return [...text]
    .map((c) => {
      const lower = c.toLowerCase();
      if (symbolMap[lower])
        return c === lower ? symbolMap[lower] : symbolMap[lower].toUpperCase();
      return c;
    })
    .join("");
}

function decode(encoded) {
  if ([...encoded].length > 280) throw { code: "INPUT_TOO_LONG" };
  if (hasInvalidControlChars(encoded))
    throw { code: "UNSUPPORTED_CONTROL_CHAR" };
  return [...encoded]
    .map((c) => {
      if (inverseMap[c]) return inverseMap[c];
      if (/^[a-zA-Z]$/.test(c)) return c;
      if (Object.values(symbolMap).includes(c))
        throw { code: "UNKNOWN_SYMBOL" };
      return c;
    })
    .join("");
}

module.exports = { encode, decode };
