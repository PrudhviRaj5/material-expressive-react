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
        --md-sys-color-surface-container-high: #ece6f0;
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
          --md-sys-color-surface-container-high: #2b2930;
          --md-sys-color-outline: #938f99;
        }
      }

      * {
        box-sizing: border-box;
      }

      html,
      body {
        height: 100%;
      }

      body {
        margin: 0;
        font-family: Roboto, system-ui, -apple-system, Segoe UI, sans-serif;
        background:
          radial-gradient(
            1100px 700px at 15% -10%,
            color-mix(in srgb, var(--md-sys-color-primary) 16%, transparent),
            transparent 60%
          ),
          radial-gradient(
            1000px 650px at 95% 10%,
            color-mix(in srgb, var(--md-sys-color-secondary) 12%, transparent),
            transparent 55%
          ),
          linear-gradient(
            180deg,
            color-mix(in srgb, var(--md-sys-color-surface-container-low) 75%, transparent),
            var(--md-sys-color-surface)
          );
        color: var(--md-sys-color-on-surface);
      }

      a.inline {
        color: inherit;
        text-decoration: underline;
        text-decoration-color: color-mix(in srgb, var(--md-sys-color-outline) 55%, transparent);
        text-underline-offset: 3px;
      }

      .app {
        min-height: 100dvh;
        display: grid;
        grid-template-rows: auto 1fr auto;
      }

      .appbar {
        position: sticky;
        top: 0;
        z-index: 5;
        background: color-mix(in srgb, var(--md-sys-color-surface-container) 85%, transparent);
        border-bottom: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 22%, transparent);
        backdrop-filter: blur(10px);
      }

      .appbar-inner {
        height: 64px;
        max-width: 1120px;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
      }

      .logo {
        width: 36px;
        height: 36px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        background: var(--md-sys-color-primary-container);
        color: var(--md-sys-color-on-primary-container);
        border: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 22%, transparent);
        font-weight: 700;
        letter-spacing: -0.3px;
        user-select: none;
      }

      .title {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .title strong {
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.1px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .title span {
        font-size: 12px;
        color: color-mix(in srgb, var(--md-sys-color-on-surface) 65%, transparent);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .appbar-actions {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      md-filled-button,
      md-outlined-button {
        --md-filled-button-container-shape: 999px;
        --md-outlined-button-container-shape: 999px;
      }

      .content {
        max-width: 1120px;
        width: 100%;
        margin: 0 auto;
        padding: 28px 20px 36px;
        display: grid;
        gap: 18px;
      }

      .hero {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 16px;
        align-items: stretch;
        animation: enter 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
      }

      @media (max-width: 920px) {
        .hero {
          grid-template-columns: 1fr;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .hero {
          animation: none;
        }
      }

      @keyframes enter {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .panel {
        border-radius: var(--md-sys-shape-corner-extra-large);
        background: color-mix(in srgb, var(--md-sys-color-surface-container) 92%, transparent);
        border: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 22%, transparent);
        box-shadow:
          0 1px 2px rgba(0, 0, 0, 0.07),
          0 12px 32px rgba(0, 0, 0, 0.10);
        overflow: hidden;
      }

      .hero-copy {
        padding: 26px 26px 22px;
        background:
          radial-gradient(
            900px 480px at 20% -20%,
            color-mix(in srgb, var(--md-sys-color-primary) 18%, transparent),
            transparent 62%
          ),
          radial-gradient(
            700px 430px at 110% 20%,
            color-mix(in srgb, var(--md-sys-color-secondary) 12%, transparent),
            transparent 60%
          ),
          color-mix(in srgb, var(--md-sys-color-surface-container) 92%, transparent);
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
        border: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 18%, transparent);
      }

      .badge .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--md-sys-color-primary);
      }

      h1 {
        margin: 16px 0 10px;
        font-size: clamp(34px, 3.2vw, 54px);
        letter-spacing: -0.8px;
        line-height: 1.05;
      }

      p {
        margin: 0;
        color: color-mix(in srgb, var(--md-sys-color-on-surface) 75%, transparent);
        font-size: 16px;
        line-height: 1.55;
        max-width: 70ch;
      }

      .actions {
        margin-top: 18px;
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        align-items: center;
      }

      .tip {
        margin-top: 14px;
        font-size: 13px;
        color: color-mix(in srgb, var(--md-sys-color-on-surface) 65%, transparent);
      }

      .disclaimer {
        margin-top: 16px;
        padding-top: 14px;
        border-top: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 18%, transparent);
        font-size: 12.5px;
        line-height: 1.5;
        color: color-mix(in srgb, var(--md-sys-color-on-surface) 65%, transparent);
      }

      .hero-side {
        padding: 18px;
        display: grid;
        gap: 10px;
        background: color-mix(in srgb, var(--md-sys-color-surface-container-high) 84%, transparent);
      }

      .side-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }

      .side-title h2 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.1px;
      }

      .pill {
        font-size: 12px;
        padding: 6px 10px;
        border-radius: 999px;
        border: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 22%, transparent);
        color: color-mix(in srgb, var(--md-sys-color-on-surface) 70%, transparent);
        background: color-mix(in srgb, var(--md-sys-color-surface-container) 70%, transparent);
      }

      .side-card {
        border-radius: 18px;
        padding: 14px 14px 12px;
        border: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 18%, transparent);
        background: color-mix(in srgb, var(--md-sys-color-surface-container) 88%, transparent);
      }

      .side-card strong {
        display: block;
        font-size: 13px;
        margin-bottom: 6px;
      }

      .side-card p {
        font-size: 13px;
        line-height: 1.45;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
      }

      @media (max-width: 720px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }

      .tile {
        padding: 18px;
        display: grid;
        gap: 10px;
      }

      .tile-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .tile h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }

      .kicker {
        font-size: 12px;
        color: color-mix(in srgb, var(--md-sys-color-on-surface) 65%, transparent);
      }

      .tile p {
        font-size: 14px;
      }

      .footerbar {
        padding: 14px 20px;
        border-top: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 18%, transparent);
        background: color-mix(in srgb, var(--md-sys-color-surface-container-low) 70%, transparent);
      }

      .footerbar-inner {
        max-width: 1120px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
        color: color-mix(in srgb, var(--md-sys-color-on-surface) 65%, transparent);
        font-size: 12px;
      }

      code {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
          monospace;
        font-size: 0.95em;
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
    <div class="app">
      <header class="appbar" role="banner">
        <div class="appbar-inner">
          <div class="brand" aria-label="material-expressive-react">
            <div class="logo" aria-hidden="true">mx</div>
            <div class="title">
              <strong>material-expressive-react</strong>
              <span>Material 3 Expressive UI React components</span>
            </div>
          </div>

          <div class="appbar-actions">
            <md-outlined-button onclick="location.href='./docs/'">
              <md-icon slot="icon">description</md-icon>
              Docs
            </md-outlined-button>
            <md-filled-button onclick="location.href='./storybook/'">
              <md-icon slot="icon">auto_stories</md-icon>
              Storybook
            </md-filled-button>
          </div>
        </div>
      </header>

      <main class="content" role="main">
        <section class="hero">
          <div class="panel hero-copy">
            <div class="badge"><span class="dot"></span> GitHub Pages</div>
            <h1>Material 3 Expressive UI for React.</h1>
            <p>
              Material 3 Expressive UI React components, based on the Material 3 theme from
              <a class="inline" href="https://github.com/material-components/material-web">@material/web</a>.
              Includes custom CSS and motion to feel expressive and closer to Android component
              animations.
            </p>

            <div class="actions">
              <md-filled-button onclick="location.href='./storybook/'">
                <md-icon slot="icon">auto_stories</md-icon>
                Open Storybook
              </md-filled-button>
              <md-outlined-button onclick="location.href='./docs/'">
                <md-icon slot="icon">description</md-icon>
                Read Docs
              </md-outlined-button>
            </div>

            <div class="disclaimer">
              Note: This project is not affiliated with, endorsed by, or supported by Google. It was
              built out of necessity, based on public comments suggesting Material 3 Expressive for
              the web is unlikely to ship anytime soon.
            </div>
          </div>

          <aside class="panel hero-side" aria-label="Project quick facts">
            <div class="side-title">
              <h2>About the library</h2>
              <div class="pill">Material 3</div>
            </div>

            <div class="side-card">
              <strong>Expressive motion</strong>
              <p>Custom CSS + animation to better match Android-like component motion and feel.</p>
            </div>

            <div class="side-card">
              <strong>Based on @material/web</strong>
              <p>
                Theming tokens come from
                <a class="inline" href="https://github.com/material-components/material-web">@material/web</a>
                so components inherit a true Material 3 look.
              </p>
            </div>

            <div class="side-card">
              <strong>Not Google-affiliated</strong>
              <p>Independent, community-built project; not endorsed or supported by Google.</p>
            </div>
          </aside>
        </section>

        <section class="grid" aria-label="Destinations">
          <article class="panel tile">
            <div class="tile-head">
              <div>
                <div class="kicker">Library</div>
                <h3>Storybook</h3>
              </div>
              <md-outlined-button onclick="location.href='./storybook/'">
                <md-icon slot="icon">arrow_forward</md-icon>
                Open
              </md-outlined-button>
            </div>
            <p>Browse every component, variants, slots, and interactive demos.</p>
          </article>

          <article class="panel tile">
            <div class="tile-head">
              <div>
                <div class="kicker">Guides</div>
                <h3>Docs (MDX)</h3>
              </div>
              <md-outlined-button onclick="location.href='./docs/'">
                <md-icon slot="icon">arrow_forward</md-icon>
                Open
              </md-outlined-button>
            </div>
            <p>Installation, theming, and patterns for building consistent Material experiences.</p>
          </article>
        </section>
      </main>

      <footer class="footerbar" role="contentinfo">
        <div class="footerbar-inner">
          <span>material-expressive-react</span>
          <span>
            Based on
            <a class="inline" href="https://github.com/material-components/material-web">@material/web</a>
          </span>
        </div>
      </footer>
    </div>
  </body>
</html>
`;

  await fs.writeFile(path.join(outDir, 'index.html'), landing, 'utf8');

  // eslint-disable-next-line no-console
  console.log(`Assembled Pages output at ${outDir}`);
}

await main();
