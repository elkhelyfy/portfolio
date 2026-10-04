/**
 * Extra blocks on case-study pages, keyed by project slug.
 * `terminals` prints line by line; `tests` fills a grid up to `total`.
 */
export type Line = { t: string; k?: 'cmd' | 'ok' | 'err' | 'dim' | 'head' };

export interface Terminal {
  title: string;
  tone: 'white' | 'dim';
  lines: Line[];
}

export interface Demo {
  label: string;
  title: string;
  note: string;
  terminals?: Terminal[];
  tests?: { total: number; columns: number; runner: string; caption: string };
}

export const demos: Record<string, Demo> = {
  igodar: {
    label: 'Text → SQL',
    title: 'Plain-English questions, read-only answers',
    note: 'Reconstructed demo. Fund names and figures are invented.',
    terminals: [
      {
        title: 'IGODAR Assistant',
        tone: 'white',
        lines: [
          { t: '$ ask "Which funds paid distributions last quarter?"', k: 'cmd' },
          { t: 'provider: claude   mode: read-only', k: 'dim' },
          { t: '' },
          { t: 'SELECT f.name, SUM(d.amount) AS total_eur' },
          { t: '  FROM distributions d' },
          { t: '  JOIN funds f ON f.id = d.fund_id' },
          { t: " WHERE d.paid_on >= '2026-07-01'" },
          { t: "   AND d.paid_on <  '2026-10-01'" },
          { t: ' GROUP BY f.name' },
          { t: ' ORDER BY total_eur DESC;' },
          { t: '✓ read-only', k: 'ok' },
          { t: '' },
          { t: 'fund                      total_eur', k: 'head' },
          { t: 'Atlas Growth Fund      1,240,000.00' },
          { t: 'Meridian Income          815,500.00' },
          { t: 'Northbank Credit         402,750.00' },
          { t: '3 rows', k: 'dim' },
        ],
      },
      {
        title: 'Read-Only Guard',
        tone: 'dim',
        lines: [
          { t: '$ ask "Delete last week\'s test distributions"', k: 'cmd' },
          { t: 'provider: claude   mode: read-only', k: 'dim' },
          { t: '' },
          { t: 'DELETE FROM distributions' },
          { t: " WHERE created_at >= '2026-09-24'" },
          { t: "   AND note LIKE '%test%';" },
          { t: '✗ refused: DELETE is not read-only', k: 'err' },
          { t: '✗ nothing was executed', k: 'err' },
          { t: '' },
          { t: '$ ask "Then how many are there?"', k: 'cmd' },
          { t: '' },
          { t: 'SELECT COUNT(*) FROM distributions' },
          { t: " WHERE created_at >= '2026-09-24'" },
          { t: "   AND note LIKE '%test%';" },
          { t: '✓ read-only', k: 'ok' },
          { t: 'count', k: 'head' },
          { t: '7' },
        ],
      },
    ],
  },
  marechal: {
    label: 'Test Suite',
    title: '319 automated tests',
    note: 'One square per test.',
    tests: { total: 319, columns: 29, runner: 'pytest', caption: 'Running test suite ...' },
  },
};
