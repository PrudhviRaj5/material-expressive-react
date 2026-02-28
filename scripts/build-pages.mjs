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
    <meta name="theme-color" content="#6750a4" />
    <title>material-expressive-react</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0&display=swap"
    />

    <style>
      :root {
        color-scheme: light dark;

        /* Material Design 3 (light). Used by @material/web components via CSS vars. */
        --md-sys-color-primary: #6750a4;
        --md-sys-color-on-primary: #ffffff;
        --md-sys-color-primary-container: #eaddff;
        --md-sys-color-on-primary-container: #21005d;

        --md-sys-color-secondary: #625b71;
        --md-sys-color-on-secondary: #ffffff;

        --md-sys-color-surface: #fffbfe;
        --md-sys-color-on-surface: #1c1b1f;
        --md-sys-color-surface-container-low: #f7f2fa;
        --md-sys-color-surface-container: #f3edf7;
        --md-sys-color-outline: #79747e;

        --md-sys-shape-corner-extra-large: 28px;
        --md-sys-shape-corner-large: 16px;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --md-sys-color-primary: #d0bcff;
          --md-sys-color-on-primary: #381e72;
          --md-sys-color-primary-container: #4f378b;
          --md-sys-color-on-primary-container: #eaddff;

          --md-sys-color-secondary: #ccc2dc;
          --md-sys-color-on-secondary: #332d41;

          --md-sys-color-surface: #141218;
          --md-sys-color-on-surface: #e6e0e9;
          --md-sys-color-surface-container-low: #1d1b20;
          --md-sys-color-surface-container: #211f26;
          --md-sys-color-outline: #938f99;
        }
      }

      html,
      body {
        height: 100%;
      }

      body {
        margin: 0;
        font-family: Roboto, system-ui, -apple-system, Segoe UI, sans-serif;
        background: radial-gradient(
            800px 600px at 15% 0%,
            color-mix(in srgb, var(--md-sys-color-primary) 18%, transparent),
            transparent 60%
          ),
          radial-gradient(
            900px 700px at 90% 20%,
            color-mix(in srgb, var(--md-sys-color-secondary) 14%, transparent),
            transparent 55%
          ),
          var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
      }

      .wrap {
        min-height: 100%;
        display: grid;
        place-items: center;
        padding: 48px 20px;
        box-sizing: border-box;
      }

      .card {
        width: min(720px, 100%);
        border-radius: var(--md-sys-shape-corner-extra-large);
        padding: 32px;
        background: color-mix(in srgb, var(--md-sys-color-surface-container) 92%, transparent);
        border: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 30%, transparent);
        box-shadow:
          0 1px 2px rgba(0, 0, 0, 0.08),
          0 10px 30px rgba(0, 0, 0, 0.12);
        backdrop-filter: blur(10px);
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        border-radius: 999px;
        background: var(--md-sys-color-primary-container);
        color: var(--md-sys-color-on-primary-container);
        font-weight: 500;
        font-size: 13px;
      }

      .badge .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--md-sys-color-primary);
      }

      h1 {
        margin: 18px 0 10px;
        font-size: 44px;
        letter-spacing: -0.6px;
        line-height: 1.1;
      }

      p {
        margin: 0;
        color: color-mix(in srgb, var(--md-sys-color-on-surface) 75%, transparent);
        font-size: 16px;
        line-height: 1.5;
      }

      .actions {
        margin-top: 22px;
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      md-filled-button,
      md-outlined-button {
        --md-filled-button-container-shape: 999px;
        --md-outlined-button-container-shape: 999px;
      }

      .footer {
        margin-top: 18px;
        font-size: 13px;
        color: color-mix(in srgb, var(--md-sys-color-on-surface) 65%, transparent);
      }

      a.inline {
        color: inherit;
        text-decoration: underline;
        text-decoration-color: color-mix(in srgb, var(--md-sys-color-outline) 55%, transparent);
        text-underline-offset: 3px;
      }
    </style>

    <script type="module">
      // Use Material Web components for a true Material look.
      import 'https://unpkg.com/@material/web@2.4.1/button/filled-button.js?module';
      import 'https://unpkg.com/@material/web@2.4.1/button/outlined-button.js?module';
      import 'https://unpkg.com/@material/web@2.4.1/icon/icon.js?module';
    </script>
  </head>
  <body>
    <div class="wrap">
      <main class="card">
        <div class="badge"><span class="dot"></span> GitHub Pages</div>
        <h1>material-expressive-react</h1>
        <p>
          React wrappers for Material 3 web components, built on top of
          <a class="inline" href="https://github.com/material-components/material-web">@material/web</a>.
        </p>

        <div class="actions">
          <md-filled-button onclick="location.href='./storybook/'">
            <md-icon slot="icon">auto_stories</md-icon>
            Storybook
          </md-filled-button>
          <md-outlined-button onclick="location.href='./docs/'">
            <md-icon slot="icon">description</md-icon>
            Docs (MDX)
          </md-outlined-button>
        </div>

        <div class="footer">
          Tip: append <code>?path=/docs/...</code> in Storybook to jump directly to a component.
        </div>
      </main>
    </div>
  </body>
</html>
`;

  await fs.writeFile(path.join(outDir, 'index.html'), landing, 'utf8');

  // eslint-disable-next-line no-console
  console.log(`Assembled Pages output at ${outDir}`);
}

await main();
