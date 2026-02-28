import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      shell: false,
      ...opts,
    });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(' ')} exited with code ${code}`));
    });
  });
}

async function main() {
  const repoRoot = process.cwd();

  const storybookBasePath = process.env.STORYBOOK_BASE_PATH ?? '/storybook/';

  // 1) Build Storybook
  await run(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'build-storybook'],
    {
      env: {
        ...process.env,
        STORYBOOK_BASE_PATH: storybookBasePath,
      },
    },
  );

  // 2) Build Docs (includes docs:generate)
  await run(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'docs:build']);

  // 3) Assemble output into pages-dist
  const outDir = path.join(repoRoot, 'pages-dist');
  const storybookIn = path.join(repoRoot, 'storybook-static');
  const docsIn = path.join(repoRoot, 'docs', 'build');

  await fs.rm(outDir, {recursive: true, force: true});
  await fs.mkdir(path.join(outDir, 'storybook'), {recursive: true});
  await fs.mkdir(path.join(outDir, 'docs'), {recursive: true});

  // Prevent GitHub Pages from running Jekyll.
  await fs.writeFile(path.join(outDir, '.nojekyll'), '');

  // Node 20+ supports fs.cp
  await fs.cp(storybookIn, path.join(outDir, 'storybook'), {recursive: true});
  await fs.cp(docsIn, path.join(outDir, 'docs'), {recursive: true});

  const landing = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>material-expressive-react</title>
  </head>
  <body style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 40px;">
    <h1 style="margin:0 0 8px">material-expressive-react</h1>
    <p style="margin:0 0 16px; color:#444">Landing page for GitHub Pages</p>
    <ul>
      <li><a href="./storybook/">Storybook</a></li>
      <li><a href="./docs/">Docs (MDX)</a></li>
    </ul>
  </body>
</html>
`;

  await fs.writeFile(path.join(outDir, 'index.html'), landing, 'utf8');

  // eslint-disable-next-line no-console
  console.log(`Assembled Pages output at ${outDir}`);
}

await main();

