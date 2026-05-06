
base_dir = "/mnt/agents/output/vscode-pwa"

# app.js - Main application logic
app_js_content = r'''// VS Code Terminal - Main Application
(function() {
  'use strict';

  // State
  let currentDir = '/home/user/projects/myapp';
  let commandHistory = [];
  let historyIndex = -1;
  let activeTab = 'welcome';
  let openTabs = [{ id: 'welcome', name: 'Welcome', type: 'welcome' }];
  let sidebarVisible = true;
  let terminalVisible = true;
  let detailsVisible = false;
  let currentCommand = null;

  // DOM Elements
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const tabsBar = document.getElementById('tabs-bar');
  const editorContent = document.getElementById('editor-content');
  const sidebar = document.getElementById('sidebar');
  const terminalContainer = document.getElementById('terminal-container');
  const detailsPanel = document.getElementById('details-panel');
  const commandPalette = document.getElementById('command-palette');
  const overlay = document.getElementById('overlay');
  const paletteInput = document.getElementById('palette-input');
  const paletteResults = document.getElementById('palette-results');

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    initTerminal();
    initTabs();
    initFileTree();
    initActivityBar();
    initCommandPalette();
    initKeyboardShortcuts();
    registerServiceWorker();
    printWelcome();
  });

  // Service Worker Registration
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('SW registered'))
        .catch(err => console.log('SW registration failed'));
    }
  }

  // Terminal
  function initTerminal() {
    terminalInput.addEventListener('keydown', handleTerminalInput);
    terminalInput.focus();
    
    terminalBody.addEventListener('click', () => {
      terminalInput.focus();
    });
  }

  function handleTerminalInput(e) {
    if (e.key === 'Enter') {
      const cmd = terminalInput.value.trim();
      if (cmd) {
        executeCommand(cmd);
        commandHistory.push(cmd);
        historyIndex = commandHistory.length;
      }
      terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      autoComplete();
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      clearTerminal();
    }
  }

  function executeCommand(cmd) {
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line';
    promptLine.innerHTML = '<span class="terminal-prompt">user@dev:~$</span> <span class="terminal-command">' + escapeHtml(cmd) + '</span>';
    terminalBody.appendChild(promptLine);

    const parts = cmd.split(' ');
    const baseCmd = parts[0];
    const fullCmd = cmd;

    let output = '';
    let type = 'output';

    if (commandsDB[fullCmd]) {
      output = commandsDB[fullCmd].output;
      currentCommand = fullCmd;
      showCommandDetails(fullCmd);
    } else if (commandsDB[baseCmd]) {
      output = commandsDB[baseCmd].output;
      currentCommand = baseCmd;
      showCommandDetails(baseCmd);
    } else {
      switch (baseCmd) {
        case 'cd':
          if (parts[1]) {
            currentDir = parts[1].startsWith('/') ? parts[1] : currentDir + '/' + parts[1];
          } else {
            currentDir = '/home/user';
          }
          break;
        case 'echo':
          output = parts.slice(1).join(' ').replace(/^["']|["']$/g, '');
          break;
        case 'clear':
        case 'cls':
          clearTerminal();
          return;
        case 'help':
          output = generateHelp();
          break;
        case 'commands':
          output = generateCommandsList();
          break;
        case 'whoami':
          output = 'user';
          break;
        case 'date':
          output = new Date().toString();
          break;
        case 'uname':
          output = 'Linux dev-machine 5.15.0-91-generic x86_64 GNU/Linux';
          break;
        case 'history':
          output = commandHistory.map((c, i) => (i + 1) + '  ' + c).join('\n');
          break;
        case 'exit':
          output = 'logout\nConnection closed.';
          break;
        case 'sudo':
          output = '[sudo] password for user: \nSorry, try again.\n[sudo] password for user: \nsudo: 3 incorrect password attempts';
          type = 'error';
          break;
        case 'nano':
        case 'vim':
        case 'vi':
          output = baseCmd + ': command not found. Use the editor tabs instead.';
          type = 'warning';
          break;
        default:
          output = 'bash: ' + baseCmd + ': command not found\nType \'help\' for available commands or \'commands\' for full list.';
          type = 'error';
      }
    }

    if (output) {
      const outputLines = output.split('\n');
      outputLines.forEach(line => {
        const lineEl = document.createElement('div');
        lineEl.className = 'terminal-line terminal-' + type;
        lineEl.textContent = line;
        terminalBody.appendChild(lineEl);
      });
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function autoComplete() {
    const input = terminalInput.value;
    const matches = Object.keys(commandsDB).filter(cmd => cmd.startsWith(input));
    if (matches.length === 1) {
      terminalInput.value = matches[0] + ' ';
    } else if (matches.length > 1) {
      const line = document.createElement('div');
      line.className = 'terminal-line terminal-info';
      line.textContent = matches.join('  ');
      terminalBody.appendChild(line);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  function clearTerminal() {
    terminalBody.innerHTML = '';
    printWelcome();
  }

  function printWelcome() {
    const welcome = document.createElement('div');
    welcome.className = 'terminal-line terminal-info';
    welcome.innerHTML = 'VS Code Terminal v1.0.0 - Interactive Command Learning Environment<br>Type \'help\' for quick start or \'commands\' for full command list.<br>';
    terminalBody.appendChild(welcome);
  }

  function generateHelp() {
    return 'VS Code Terminal - Help\n======================\n\nQuick Commands:\n  help       Show this help message\n  commands   List all available commands\n  clear      Clear terminal screen\n  history    Show command history\n  cd <dir>   Change directory\n  pwd        Print working directory\n\nCategories:\n  Git, NPM, Docker, Linux, Node.js, Python, Database, System\n\nTips:\n  - Use Tab for auto-completion\n  - Use Up/Down arrows for history\n  - Press Ctrl+L to clear screen\n  - Click on a command in the sidebar to see details';
  }

  function generateCommandsList() {
    let output = 'Available Commands\n==================\n\n';
    for (const category in commandCategories) {
      output += '[' + category + ']\n';
      commandCategories[category].forEach(cmd => {
        const info = commandsDB[cmd];
        output += '  ' + cmd.padEnd(20) + ' ' + (info ? info.desc : '') + '\n';
      });
      output += '\n';
    }
    return output;
  }

  // Command Details Panel
  function showCommandDetails(cmd) {
    const info = commandsDB[cmd];
    if (!info) return;

    document.getElementById('details-title').textContent = cmd;
    document.getElementById('detail-desc').textContent = info.desc;
    document.getElementById('detail-usage').textContent = info.usage;
    
    const flagsEl = document.getElementById('detail-flags');
    if (info.flags && Object.keys(info.flags).length > 0) {
      flagsEl.innerHTML = Object.entries(info.flags)
        .map(([flag, desc]) => flag + '\n  ' + desc)
        .join('\n\n');
    } else {
      flagsEl.textContent = 'No flags available';
    }

    document.getElementById('detail-output').textContent = info.output || 'No output';
    
    detailsVisible = true;
    detailsPanel.classList.add('active');
  }

  function hideDetails() {
    detailsVisible = false;
    detailsPanel.classList.remove('active');
  }

  document.getElementById('details-close').addEventListener('click', hideDetails);

  // Tabs
  function initTabs() {
    renderTabs();
  }

  function renderTabs() {
    tabsBar.innerHTML = '';
    openTabs.forEach(tab => {
      const tabEl = document.createElement('div');
      tabEl.className = 'tab ' + (tab.id === activeTab ? 'active' : '');
      tabEl.innerHTML = '<span class="tab-icon">' + getFileIcon(tab.type) + '</span><span>' + tab.name + '</span><span class="tab-close" data-id="' + tab.id + '">&times;</span>';
      tabEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('tab-close')) {
          switchTab(tab.id);
        }
      });
      tabsBar.appendChild(tabEl);
    });

    document.querySelectorAll('.tab-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeTab(btn.dataset.id);
      });
    });
  }

  function switchTab(tabId) {
    activeTab = tabId;
    renderTabs();
    renderEditorContent();
  }

  function closeTab(tabId) {
    if (openTabs.length <= 1) return;
    openTabs = openTabs.filter(t => t.id !== tabId);
    if (activeTab === tabId) {
      activeTab = openTabs[openTabs.length - 1].id;
    }
    renderTabs();
    renderEditorContent();
  }

  function openFile(fileName, fileType) {
    const id = 'file-' + fileName;
    if (!openTabs.find(t => t.id === id)) {
      openTabs.push({ id: id, name: fileName, type: fileType });
    }
    activeTab = id;
    renderTabs();
    renderEditorContent();
  }

  function renderEditorContent() {
    const tab = openTabs.find(t => t.id === activeTab);
    if (!tab) return;

    if (tab.type === 'welcome') {
      renderWelcomePage();
    } else {
      renderCodeEditor(tab.name, tab.type);
    }
  }

  function renderWelcomePage() {
    editorContent.innerHTML = '<div class="welcome-page"><div class="welcome-logo">VS</div><div class="welcome-title">VS Code Terminal</div><div class="welcome-subtitle">Interactive Command Learning Environment</div><div class="welcome-section"><div class="welcome-section-title">Start</div><div class="welcome-item" onclick="openFile(\'README.md\', \'md\')"><span>📄</span> Open README</div><div class="welcome-item" onclick="openFile(\'package.json\', \'json\')"><span>📦</span> Open package.json</div><div class="welcome-item" onclick="focusTerminal()"><span>⌨️</span> Open Terminal</div></div><div class="welcome-section" style="margin-top: 24px;"><div class="welcome-section-title">Recent Commands</div><div class="welcome-item" onclick="runCommand(\'git status\')"><span>🔀</span> git status <span class="shortcut">Terminal</span></div><div class="welcome-item" onclick="runCommand(\'npm install\')"><span>📦</span> npm install <span class="shortcut">Terminal</span></div><div class="welcome-item" onclick="runCommand(\'docker ps\')"><span>🐳</span> docker ps <span class="shortcut">Terminal</span></div></div></div>';
  }

  function renderCodeEditor(fileName, fileType) {
    const code = getFileContent(fileName);
    const lines = code.split('\n');
    
    editorContent.innerHTML = '<div class="code-editor"><div class="line-numbers">' + lines.map((_, i) => '<div>' + (i + 1) + '</div>').join('') + '</div><div class="code-area">' + highlightCode(code, fileType) + '</div></div>';
  }

  function getFileContent(fileName) {
    const files = {
      'README.md': '# Project\n\nA sample Node.js project for learning commands.\n\n## Getting Started\n\n```bash\nnpm install\nnpm start\n```\n\n## Commands\n\n- Git: Version control\n- NPM: Package management\n- Docker: Containerization\n- Linux: System commands',
      'package.json': '{\n  "name": "project",\n  "version": "1.0.0",\n  "description": "Learning project",\n  "main": "src/index.js",\n  "scripts": {\n    "start": "node src/index.js",\n    "test": "jest",\n    "dev": "nodemon src/index.js"\n  },\n  "dependencies": {\n    "express": "^4.18.2",\n    "mongoose": "^7.0.3",\n    "dotenv": "^16.0.3"\n  },\n  "devDependencies": {\n    "jest": "^29.7.0",\n    "nodemon": "^3.0.1"\n  }\n}',
      'src/app.js': 'const express = require(\'express\');\nconst mongoose = require(\'mongoose\');\nconst dotenv = require(\'dotenv\');\n\ndotenv.config();\n\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\n// Middleware\napp.use(express.json());\napp.use(express.urlencoded({ extended: true }));\n\n// Routes\napp.use(\'/api/users\', require(\'./routes/users\'));\napp.use(\'/api/auth\', require(\'./routes/auth\'));\n\n// Database connection\nmongoose.connect(process.env.MONGODB_URI)\n  .then(() => console.log(\'Connected to MongoDB\'))\n  .catch(err => console.error(\'MongoDB error:\', err));\n\n// Start server\napp.listen(PORT, () => {\n  console.log(\'Server running on port \' + PORT);\n});',
      'src/routes.js': 'const router = require(\'express\').Router();\nconst { getUsers, createUser } = require(\'../controllers/users\');\nconst { authenticate } = require(\'../middleware/auth\');\n\nrouter.get(\'/\', getUsers);\nrouter.post(\'/\', authenticate, createUser);\n\nmodule.exports = router;',
      '.env': 'PORT=3000\nMONGODB_URI=mongodb://localhost:27017/myapp\nJWT_SECRET=your-secret-key\nNODE_ENV=development',
      'Dockerfile': 'FROM node:18-alpine\n\nWORKDIR /app\n\nCOPY package*.json ./\nRUN npm ci --only=production\n\nCOPY . .\n\nEXPOSE 3000\n\nCMD ["node", "src/index.js"]',
      'docker-compose.yml': 'version: \'3.8\'\n\nservices:\n  app:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - NODE_ENV=production\n    depends_on:\n      - db\n\n  db:\n    image: mongo:6.0\n    ports:\n      - "27017:27017"\n    volumes:\n      - mongo-data:/data/db\n\nvolumes:\n  mongo-data:'
    };
    return files[fileName] || '// File content not available';
  }

  function highlightCode(code, type) {
    let highlighted = escapeHtml(code);
    
    if (type === 'js') {
      highlighted = highlighted
        .replace(/\b(const|let|var|function|return|if|else|for|while|import|from|require|export|default|class|extends|new|this|async|await|try|catch)\b/g, '<span class="code-keyword">$1</span>')
        .replace(/(['"`].*?['"`])/g, '<span class="code-string">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>')
        .replace(/\b(console|process|module|exports|require)\b/g, '<span class="code-function">$1</span>');
    } else if (type === 'json') {
      highlighted = highlighted
        .replace(/(".*?"):/g, '<span class="code-variable">$1</span>:')
        .replace(/: (".*?")/g, ': <span class="code-string">$1</span>')
        .replace(/: (\d+)/g, ': <span class="code-number">$1</span>')
        .replace(/\b(true|false|null)\b/g, '<span class="code-keyword">$1</span>');
    }
    
    return highlighted.replace(/\n/g, '<br>');
  }

  // File Tree
  function initFileTree() {
    const fileTree = document.getElementById('file-tree');
    
    const files = [
      { name: 'project', type: 'folder', open: true, children: [
        { name: 'src', type: 'folder', open: true, children: [
          { name: 'app.js', type: 'js' },
          { name: 'routes.js', type: 'js' },
        ]},
        { name: 'config', type: 'folder', open: false, children: [
          { name: 'database.js', type: 'js' },
        ]},
        { name: 'package.json', type: 'json' },
        { name: 'README.md', type: 'md' },
        { name: '.env', type: 'env' },
        { name: 'Dockerfile', type: 'file' },
        { name: 'docker-compose.yml', type: 'file' },
      ]}
    ];

    function renderTree(items, level) {
      level = level || 0;
      let html = '';
      items.forEach(item => {
        const padding = level * 12 + 8;
        const icon = item.type === 'folder' ? '📁' : getFileIcon(item.type);
        
        html += '<div class="file-item ' + (item.type === 'folder' ? 'folder' : '') + '" style="padding-left: ' + padding + 'px" data-name="' + item.name + '" data-type="' + item.type + '">';
        html += item.type === 'folder' ? '<span class="chevron ' + (item.open ? '' : 'collapsed') + '">▼</span>' : '<span style="width:14px"></span>';
        html += '<span class="file-icon ' + item.type + '">' + icon + '</span>';
        html += '<span class="file-name">' + item.name + '</span>';
        html += '</div>';
        
        if (item.children && item.open) {
          html += renderTree(item.children, level + 1);
        }
      });
      return html;
    }

    fileTree.innerHTML = renderTree(files);

    fileTree.querySelectorAll('.file-item').forEach(item => {
      item.addEventListener('click', () => {
        const name = item.dataset.name;
        const type = item.dataset.type;
        
        if (type === 'folder') {
          const chevron = item.querySelector('.chevron');
          if (chevron) {
            chevron.classList.toggle('collapsed');
          }
        } else {
          openFile(name, type);
        }
      });
    });
  }

  function getFileIcon(type) {
    const icons = {
      js: '{ }',
      json: '{ }',
      html: '<>',
      css: '#',
      md: '📝',
      env: '🔧',
      folder: '📁',
      file: '📄'
    };
    return icons[type] || '📄';
  }

  // Activity Bar
  function initActivityBar() {
    document.querySelectorAll('.activity-icon').forEach(icon => {
      icon.addEventListener('click', () => {
        document.querySelectorAll('.activity-icon').forEach(i => i.classList.remove('active'));
        icon.classList.add('active');
        
        const view = icon.dataset.view;
        if (view === 'explorer') {
          sidebarVisible = !sidebarVisible;
          sidebar.classList.toggle('collapsed', !sidebarVisible);
        } else if (view === 'search') {
          showCommandPalette();
        } else if (view === 'terminal') {
          terminalVisible = !terminalVisible;
          terminalContainer.style.display = terminalVisible ? 'flex' : 'none';
        }
      });
    });
  }

  // Command Palette
  function initCommandPalette() {
    paletteInput.addEventListener('input', filterCommands);
    paletteInput.addEventListener('keydown', handlePaletteKeys);
    overlay.addEventListener('click', hideCommandPalette);
  }

  function showCommandPalette() {
    commandPalette.classList.add('active');
    overlay.classList.add('active');
    paletteInput.value = '';
    paletteInput.focus();
    filterCommands();
  }

  function hideCommandPalette() {
    commandPalette.classList.remove('active');
    overlay.classList.remove('active');
  }

  function filterCommands() {
    const query = paletteInput.value.toLowerCase();
    let html = '';
    let index = 0;

    for (const category in commandCategories) {
      const matched = commandCategories[category].filter(cmd => 
        cmd.toLowerCase().includes(query) || 
        (commandsDB[cmd] && commandsDB[cmd].desc.toLowerCase().includes(query))
      );
      
      if (matched.length > 0) {
        matched.forEach(cmd => {
          const info = commandsDB[cmd];
          html += '<div class="palette-item ' + (index === 0 ? 'selected' : '') + '" data-cmd="' + cmd + '">';
          html += '<span class="cmd-name">' + cmd + '</span>';
          html += '<span class="cmd-desc">' + (info ? info.desc : '') + '</span>';
          html += '<span class="cmd-category">' + category + '</span>';
          html += '</div>';
          index++;
        });
      }
    }

    paletteResults.innerHTML = html || '<div class="palette-item">No commands found</div>';

    paletteResults.querySelectorAll('.palette-item[data-cmd]').forEach(item => {
      item.addEventListener('click', () => {
        runCommand(item.dataset.cmd);
        hideCommandPalette();
      });
    });
  }

  function handlePaletteKeys(e) {
    const items = paletteResults.querySelectorAll('.palette-item[data-cmd]');
    const selected = paletteResults.querySelector('.palette-item.selected');
    let index = Array.from(items).indexOf(selected);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      index = Math.min(index + 1, items.length - 1);
      items.forEach(i => i.classList.remove('selected'));
      if (items[index]) items[index].classList.add('selected');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      index = Math.max(index - 1, 0);
      items.forEach(i => i.classList.remove('selected'));
      if (items[index]) items[index].classList.add('selected');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selected && selected.dataset.cmd) {
        runCommand(selected.dataset.cmd);
        hideCommandPalette();
      }
    } else if (e.key === 'Escape') {
      hideCommandPalette();
    }
  }

  // Keyboard Shortcuts
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'p') {
        e.preventDefault();
        showCommandPalette();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'p' && !e.shiftKey) {
        e.preventDefault();
        showCommandPalette();
      } else if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        terminalVisible = !terminalVisible;
        terminalContainer.style.display = terminalVisible ? 'flex' : 'none';
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        sidebarVisible = !sidebarVisible;
        sidebar.classList.toggle('collapsed', !sidebarVisible);
      }
    });
  }

  // Utility Functions
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function runCommand(cmd) {
    terminalInput.value = cmd;
    executeCommand(cmd);
    terminalInput.value = '';
    terminalInput.focus();
  }

  function focusTerminal() {
    terminalInput.focus();
  }

  // Expose functions globally
  window.openFile = openFile;
  window.runCommand = runCommand;
  window.focusTerminal = focusTerminal;

})();
'''

with open(f"{base_dir}/app.js", "w", encoding="utf-8") as f:
    f.write(app_js_content)

print("app.js created successfully")
