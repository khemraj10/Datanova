# Datanova
# Symbol Cipher Tool

## Setup
```bash
git clone -b main <repo-url>
npm install
npm run dev
```

## Test
```bash
npm test
```

## Mapping Rules
- Letters A-Z and a-z are mapped to special symbols.
- Non-alphabetic characters (emoji, punctuation) stay unchanged.
- Input > 280 characters → `INPUT_TOO_LONG`
- Control characters → `UNSUPPORTED_CONTROL_CHAR`
- Unknown decode symbols → `UNKNOWN_SYMBOL`