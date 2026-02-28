import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

// `react-docgen-typescript` is CommonJS.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rdt = require('react-docgen-typescript');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, '..');
const srcRoot = path.join(repoRoot, 'src');
const docsOutRoot = path.join(repoRoot, 'docs', 'docs');

const COMPONENTS_DIR = path.join(docsOutRoot, 'components');
const UTILITIES_DIR = path.join(docsOutRoot, 'utilities');

function asPosix(p) {
  return p.split(path.sep).join('/');
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function readText(p) {
  return fs.readFile(p, 'utf8');
}

function ensureTrailingSlash(v) {
  return v.endsWith('/') ? v : `${v}/`;
}

/**
 * Parse simple barrel lines like:
 *   export * from './Button.js';
 */
function parseExportStarPaths(tsText) {
  const out = [];
  for (const line of tsText.split('\n')) {
    const m = line.match(/^\s*export\s+\*\s+from\s+['"](.+)['"];\s*$/);
    if (m) out.push(m[1]);
  }
  return out;
}

async function resolveSourceModule(baseDir, exportPath) {
  // exportPath is like './Button.js'
  const relNoExt = exportPath.replace(/\.[a-z]+$/i, '');
  const candidates = [
    path.join(baseDir, `${relNoExt}.tsx`),
    path.join(baseDir, `${relNoExt}.ts`),
    path.join(baseDir, `${relNoExt}.jsx`),
    path.join(baseDir, `${relNoExt}.js`),
  ];
  for (const c of candidates) {
    if (await exists(c)) return c;
  }
  return null;
}

function mdEscape(v) {
  // In MDX, strings like `React.ComponentProps<typeof X>` inside a markdown table
  // can be interpreted as JSX because of `<...>`. Escape HTML-sensitive chars.
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Curly braces can be interpreted as MDX expressions.
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, '<br/>');
}

function toMarkdownTable(rows) {
  if (!rows.length) return '_No documented props._';
  const header = ['Prop', 'Type', 'Default', 'Required', 'Description'];
  const lines = [
    `| ${header.join(' | ')} |`,
    `| ${header.map(() => '---').join(' | ')} |`,
    ...rows.map((r) =>
      `| ${[r.name, r.type, r.defaultValue, r.required, r.description]
        .map((c) => mdEscape(c ?? ''))
        .join(' | ')} |`,
    ),
  ];
  return lines.join('\n');
}

function guessGroupFromFile(filePath) {
  // src/<group>/Foo.tsx
  const rel = path.relative(srcRoot, filePath);
  const parts = rel.split(path.sep);
  return parts.length > 1 ? parts[0] : null;
}

function isProbablyReactComponent(sourceText, exportName) {
  if (exportName === 'Slotted') return true;

  const name = exportName.replace(/[$()*+.?[\\\]^{|}-]/g, '\\$&');
  const patterns = [
    // `export const Foo = forwardRef(...` or `export const Foo = React.forwardRef(...`
    new RegExp(`export\\s+const\\s+${name}\\s*=\\s*(?:React\\.)?forwardRef\\b`),
    // `export const Foo = memo(...` or `export const Foo = React.memo(...`
    new RegExp(`export\\s+const\\s+${name}\\s*=\\s*(?:React\\.)?memo\\b`),
    // `export function Foo(...)`
    new RegExp(`export\\s+function\\s+${name}\\b`),
    // `export class Foo extends React.Component`
    new RegExp(`export\\s+class\\s+${name}\\b\\s+extends\\s+React\\.(?:PureComponent|Component)\\b`),
  ];
  return patterns.some((re) => re.test(sourceText));
}

async function cleanGeneratedMdx(dir) {
  if (!(await exists(dir))) return;
  const entries = await fs.readdir(dir);
  await Promise.all(
    entries
      .filter((f) => f.endsWith('.mdx'))
      .filter((f) => f !== 'index.mdx')
      .map((f) => fs.unlink(path.join(dir, f))),
  );
}

function toDocPathForComponent(componentName, group) {
  if (componentName === 'Slotted') {
    return {dir: UTILITIES_DIR, docId: `utilities/${componentName}`};
  }
  return {dir: COMPONENTS_DIR, docId: `components/${componentName}`};
}

function inferEventMappings(fileText) {
  const mappings = [];

  // Pattern: events: {select: 'onSelect', change: 'onChange'}
  // (best-effort; not a full JS parser)
  for (const m of fileText.matchAll(/events\s*:\s*\{([^}]+)\}/g)) {
    const body = m[1];
    for (const pair of body.split(',')) {
      const pm = pair.trim().match(/^([a-zA-Z0-9_-]+)\s*:\s*['"]([a-zA-Z0-9_]+)['"]\s*$/);
      if (pm) mappings.push({event: pm[1], prop: pm[2]});
    }
  }

  // Pattern: useEventListener(innerRef, 'change', onChange)
  for (const m of fileText.matchAll(/useEventListener\([^,]+,\s*['"]([^'"]+)['"],\s*([a-zA-Z0-9_]+)\s*\)/g)) {
    mappings.push({event: m[1], prop: m[2]});
  }

  // De-dupe
  const seen = new Set();
  return mappings.filter((x) => {
    const key = `${x.event}=>${x.prop}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function renderEventsSection(mappings) {
  if (!mappings.length) {
    return `## Events\n\n_This component does not explicitly re-emit DOM events via wrapper props._\n`;
  }
  const rows = mappings
    .map((m) => `- \`${m.prop}\` → DOM event \`${m.event}\``)
    .join('\n');
  return `## Events\n\n${rows}\n`;
}

function renderSlotsSection() {
  return `## Slots\n\nMaterial Web components frequently use named slots. In React, you can pass \`slot=\"...\"\` on children (e.g. \`<Icon slot=\"icon\" />\`).\n\nIf you need to slot a child component that does not accept a \`slot\` prop, use the \`Slotted\` utility (see **Utilities → Slotted**).\n`;
}

function renderImportsSection(componentName, group) {
  const rootImport = `import {${componentName}} from 'material-expressive-react';`;
  const groupImport = group
    ? `import {${componentName}} from 'material-expressive-react/${group}';`
    : null;
  return [
    '## Imports',
    '',
    '```ts',
    rootImport,
    ...(groupImport ? [groupImport] : []),
    '```',
    '',
  ].join('\n');
}

function renderPropsSection(props) {
  const rows = Object.entries(props ?? {}).map(([name, p]) => {
    const type = p.type?.name ?? '';
    const required = p.required ? 'Yes' : 'No';
    const defaultValue = p.defaultValue?.value ?? '';
    const description = p.description ?? '';
    return {name, type, required, defaultValue, description};
  });

  rows.sort((a, b) => a.name.localeCompare(b.name));

  return [
    '## Props',
    '',
    toMarkdownTable(rows),
    '',
  ].join('\n');
}

async function main() {
  const rootIndex = path.join(srcRoot, 'index.ts');
  const rootIndexText = await readText(rootIndex);
  const groupEntryExports = parseExportStarPaths(rootIndexText)
    .filter((p) => p.endsWith('/index.js'))
    .map((p) => p.replace('./', ''));

  const groupIndexFiles = groupEntryExports.map((p) =>
    path.join(srcRoot, p.replace(/\.js$/, '.ts')),
  );

  const sourceFiles = new Set();
  for (const groupIndexFile of groupIndexFiles) {
    const groupDir = path.dirname(groupIndexFile);
    const groupIndexText = await readText(groupIndexFile);
    const modulePaths = parseExportStarPaths(groupIndexText);
    for (const exportPath of modulePaths) {
      const resolved = await resolveSourceModule(groupDir, exportPath);
      if (resolved) sourceFiles.add(resolved);
    }
  }

  // Utilities
  sourceFiles.add(path.join(srcRoot, 'internal', 'slot.tsx'));

  await fs.mkdir(COMPONENTS_DIR, {recursive: true});
  await fs.mkdir(UTILITIES_DIR, {recursive: true});

  // Remove previously-generated pages so removals/renames don’t leave stale files.
  await cleanGeneratedMdx(COMPONENTS_DIR);
  await cleanGeneratedMdx(UTILITIES_DIR);

  const parser = rdt.withCustomConfig(path.join(repoRoot, 'tsconfig.json'), {
    savePropValueAsString: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    propFilter: (prop) => {
      // Hide React's intrinsic DOM attributes and keep our wrapper props.
      if (prop.parent) {
        const fileName = prop.parent.fileName || '';
        if (fileName.includes('node_modules')) return false;
      }
      return true;
    },
  });

  const written = [];

  for (const filePath of Array.from(sourceFiles).sort()) {
    const fileText = await readText(filePath);
    const docs = parser.parse(filePath);
    if (!docs?.length) continue;

    const group = guessGroupFromFile(filePath);
    const events = inferEventMappings(fileText);

    for (const doc of docs) {
      const componentName = doc.displayName;
      if (!componentName) continue;

      // `react-docgen-typescript` can sometimes treat non-component exports as
      // “components” (e.g. const objects). Filter those out.
      if (!isProbablyReactComponent(fileText, componentName)) continue;

      const {dir} = toDocPathForComponent(componentName, group);
      const outFile = path.join(dir, `${componentName}.mdx`);

      const description = (doc.description || '').trim();

      const content = [
        '---',
        `title: ${componentName}`,
        '---',
        '',
        '<!-- AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. -->',
        `<!-- Source: ${asPosix(path.relative(repoRoot, filePath))} -->`,
        '',
        `# ${componentName}`,
        '',
        ...(description ? [description, ''] : []),
        renderImportsSection(componentName, group),
        renderPropsSection(doc.props),
        renderEventsSection(events),
        renderSlotsSection(),
        '## Examples',
        '',
        'See Storybook for live examples and variants.',
        '',
      ].join('\n');

      await fs.writeFile(outFile, content, 'utf8');
      written.push(path.relative(repoRoot, outFile));
    }
  }

  // eslint-disable-next-line no-console
  console.log(`Generated ${written.length} MDX files:`);
  for (const f of written) {
    // eslint-disable-next-line no-console
    console.log(`- ${f}`);
  }
}

await main();
