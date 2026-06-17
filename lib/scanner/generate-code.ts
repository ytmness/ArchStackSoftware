const ASCII_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";

const CODE_FRAGMENTS = [
  "const", "export", "import", "async", "await", "return", "interface",
  "type", "function", "class", "extends", "implements", "public", "private",
  "string", "number", "boolean", "null", "undefined", "Promise", "Response",
  "fetch", "map", "filter", "reduce", "useState", "useEffect", "props",
  "schema", "validate", "payload", "session", "token", "router", "handler",
  "deploy", "build", "cache", "query", "mutation", "supabase", "postgres",
];

const TERMINAL_PREFIXES = ["> ", "$ ", "// ", "  ", "· "];

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRng(seed?: string) {
  let state = seed ? hashSeed(seed) : (Math.random() * 2 ** 32) >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 2 ** 32;
  };
}

function randomLine(next: () => number, cols: number, lineIndex: number): string {
  const prefix =
    lineIndex % 7 === 0
      ? TERMINAL_PREFIXES[Math.floor(next() * TERMINAL_PREFIXES.length)]
      : "";
  const budget = cols - prefix.length;
  let body = "";
  while (body.length < budget) {
    if (next() > 0.5) {
      body += CODE_FRAGMENTS[Math.floor(next() * CODE_FRAGMENTS.length)] + " ";
    } else {
      body += ASCII_CHARS[Math.floor(next() * ASCII_CHARS.length)];
    }
  }
  return (prefix + body).slice(0, cols).padEnd(cols, " ");
}

export function generateAsciiBlock(
  cols: number,
  rows: number,
  seed?: string
): string {
  const next = createRng(seed);
  const lines: string[] = [];
  for (let i = 0; i < rows; i++) {
    lines.push(randomLine(next, cols, i));
  }
  return lines.join("\n");
}

export function scrambleAsciiBlock(cols: number, rows: number): string {
  return generateAsciiBlock(cols, rows);
}

export function mutateTerminalFrame(
  current: string,
  cols: number,
  rows: number,
  intensity = 1
): string {
  const lines = current.split("\n");
  while (lines.length < rows) {
    lines.push("".padEnd(cols, " "));
  }

  const flips = 2 + Math.floor(intensity * 6);
  for (let n = 0; n < flips; n++) {
    const li = Math.floor(Math.random() * rows);
    const line = (lines[li] ?? "").padEnd(cols, " ");
    const chars = line.split("");
    const span = 1 + Math.floor(intensity * 2);
    for (let k = 0; k < span; k++) {
      const ci = Math.floor(Math.random() * cols);
      chars[ci] = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
    }
    lines[li] = chars.join("").slice(0, cols);
  }

  if (intensity > 1.5 && Math.random() > 0.55) {
    const li = Math.floor(Math.random() * rows);
    lines[li] = randomLine(() => Math.random(), cols, li);
  }

  return lines.slice(0, rows).join("\n");
}

export function getAsciiGrid(w: number, h: number) {
  const rows = Math.max(24, Math.round(h / 10));
  const lineHeight = h / rows;
  const fontSize = lineHeight * 0.86;
  const cols = Math.max(40, Math.floor(w / (fontSize * 0.55)));
  return { cols, rows, fontSize, lineHeight };
}
