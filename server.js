
base_dir = "/mnt/agents/output/vscode-pwa"

package_json = '''{
  "name": "vscode-terminal",
  "version": "1.0.0",
  "description": "VS Code Terminal - Interactive Command Learning Environment",
  "main": "index.html",
  "scripts": {
    "start": "npx serve -s . -l 3000",
    "build": "echo 'Static site - no build needed'"
  },
  "dependencies": {
    "serve": "^14.2.1"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}'''

with open(f"{base_dir}/package.json", "w", encoding="utf-8") as f:
    f.write(package_json)

print("package.json created successfully")

# Also create a simple server file as alternative
server_js = '''const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') filePath = './index.html';

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + error.code + ' ..\n');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT + '/');
});
'''

with open(f"{base_dir}/server.js", "w", encoding="utf-8") as f:
    f.write(server_js)

# Update package.json to use server.js
package_json_updated = '''{
  "name": "vscode-terminal",
  "version": "1.0.0",
  "description": "VS Code Terminal - Interactive Command Learning Environment",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "build": "echo 'Static site - no build needed'"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}'''

with open(f"{base_dir}/package.json", "w", encoding="utf-8") as f:
    f.write(package_json_updated)

print("server.js created successfully")
print("package.json updated to use server.js")

# List final files
import os
print("\n=== Final Project Files ===")
for f in sorted(os.listdir(base_dir)):
    filepath = os.path.join(base_dir, f)
    if os.path.isfile(filepath):
        size = os.path.getsize(filepath)
        print(f"  {f} ({size:,} bytes)")
    else:
        print(f"  {f}/")
