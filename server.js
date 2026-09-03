const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.md': 'text/markdown; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=UTF-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function createServer(port) {
  const server = http.createServer((req, res) => {
    let safePath = req.url.split('?')[0];
    if (safePath === '/' || safePath === '') {
      safePath = '/index.html';
    }

    const filePath = path.join(ROOT_DIR, safePath);

    if (!filePath.startsWith(ROOT_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('403 Proibido');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Não Encontrado');
        return;
      }

      let targetPath = filePath;
      if (stats.isDirectory()) {
        targetPath = path.join(filePath, 'index.html');
      }

      fs.readFile(targetPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
          res.end('500 Erro Interno do Servidor');
          return;
        }

        const ext = path.extname(targetPath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(content);
      });
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️  Porta ${port} em uso. Tentando porta ${port + 1}...`);
      createServer(port + 1);
    } else {
      console.error('❌ Erro no servidor:', err);
    }
  });

  server.listen(port, HOST, () => {
    const interfaces = os.networkInterfaces();
    const networkIps = [];

    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          networkIps.push(iface.address);
        }
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('⚡  SERVIDOR LOCAL INICIADO COM SUCESSO!');
    console.log('='.repeat(60));
    console.log(`🏠  Local:       http://localhost:${port}`);
    if (networkIps.length > 0) {
      networkIps.forEach(ip => {
        console.log(`🌐  Rede Local:  http://${ip}:${port}`);
      });
    } else {
      console.log(`🌐  Rede Local:  http://${HOST}:${port}`);
    }
    console.log(`📁  Diretório:   ${ROOT_DIR}`);
    console.log('🛑  Pressione Ctrl + C para encerrar');
    console.log('='.repeat(60) + '\n');
  });
}

createServer(DEFAULT_PORT);
