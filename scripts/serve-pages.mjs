import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const rootArg = process.argv[2] ?? 'pages-dist';
const port = Number(process.argv[3] ?? '5173');

const rootDir = path.resolve(process.cwd(), rootArg);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.map': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
};

function safeJoin(root, reqPath) {
  const rel = reqPath.replace(/^\/+/, '');
  const resolved = path.resolve(root, rel);
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

async function statOrNull(p) {
  try {
    return await fs.stat(p);
  } catch {
    return null;
  }
}

function contentType(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream';
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
    const pathname = decodeURIComponent(url.pathname);

    // Resolve filesystem path.
    const base = safeJoin(rootDir, pathname);
    if (!base) {
      res.statusCode = 400;
      res.end('Bad request');
      return;
    }

    // If it’s a directory, serve index.html
    const st = await statOrNull(base);
    let filePath = base;
    if (st?.isDirectory()) {
      filePath = path.join(base, 'index.html');
    }

    // If no extension and not found, try <path>/index.html (for “pretty URLs”).
    if (!path.extname(filePath)) {
      const candidate = path.join(filePath, 'index.html');
      if (await statOrNull(candidate)) filePath = candidate;
    }

    const fileStat = await statOrNull(filePath);
    if (!fileStat?.isFile()) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Not found');
      return;
    }

    const data = await fs.readFile(filePath);
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType(filePath));
    res.setHeader('Cache-Control', 'no-store');
    res.end(data);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(String(err));
  }
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Serving ${rootDir} at http://localhost:${port}/`);
});
