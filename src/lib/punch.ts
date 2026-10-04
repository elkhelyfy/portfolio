/**
 * IBM 029 keypunch code. A card has 80 columns and 12 rows, printed top to bottom
 * as 12, 11, 0, 1 … 9. Each character punches one column: a digit punches its own
 * row; letters add a "zone" punch (12, 11 or 0) to a digit; symbols combine with 8.
 */
export type Row = '12' | '11' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export const ROWS: Row[] = ['12', '11', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const SYMBOLS: Record<string, Row[]> = {
  '&': ['12'],
  '+': ['12', '6', '8'],
  '-': ['11'],
  '/': ['0', '1'],
  '.': ['12', '3', '8'],
  '<': ['12', '4', '8'],
  '(': ['12', '5', '8'],
  '!': ['11', '2', '8'],
  $: ['11', '3', '8'],
  '*': ['11', '4', '8'],
  ')': ['11', '5', '8'],
  ';': ['11', '6', '8'],
  ',': ['0', '3', '8'],
  '%': ['0', '4', '8'],
  _: ['0', '5', '8'],
  '>': ['0', '6', '8'],
  '?': ['0', '7', '8'],
  ':': ['2', '8'],
  '#': ['3', '8'],
  '@': ['4', '8'],
  "'": ['5', '8'],
  '=': ['6', '8'],
  '"': ['7', '8'],
};

/** the rows punched for one character; unknown characters punch nothing */
export function punches(ch: string): Row[] {
  const c = ch.toUpperCase();
  if (c >= '0' && c <= '9') return [c as Row];
  const code = c.charCodeAt(0);
  if (c >= 'A' && c <= 'I') return ['12', String(code - 64) as Row];
  if (c >= 'J' && c <= 'R') return ['11', String(code - 73) as Row];
  if (c >= 'S' && c <= 'Z') return ['0', String(code - 81) as Row];
  return SYMBOLS[c] ?? [];
}

/** one entry per column (max 80): the character and the rows it punches */
export function encode(text: string) {
  return [...text.toUpperCase().slice(0, 80)].map((char) => ({ char, rows: punches(char) }));
}
