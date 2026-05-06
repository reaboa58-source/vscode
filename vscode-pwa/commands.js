
base_dir = "/mnt/agents/output/vscode-pwa"

# commands.js - 80 commands database
cmds_content = r'''const commandsDB = {
  "git init": {
    desc: "Initialize a new Git repository",
    usage: "git init [directory]",
    flags: { "--bare": "Create a bare repository", "--quiet": "Suppress output" },
    output: "Initialized empty Git repository in /project/.git/"
  },
  "git clone": {
    desc: "Clone a repository into a new directory",
    usage: "git clone <repository> [directory]",
    flags: { "--depth": "Create a shallow clone", "--branch": "Clone specific branch" },
    output: "Cloning into 'repo'...\nremote: Enumerating objects: 1243, done.\nremote: Total 1243 (delta 0), reused 0 (delta 0)\nReceiving objects: 100% (1243/1243), 2.45 MiB | 5.20 MiB/s, done.\nResolving deltas: 100% (856/856), done."
  },
  "git status": {
    desc: "Show working tree status",
    usage: "git status",
    flags: { "--short": "Give output in short format", "--branch": "Show branch info" },
    output: "On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges not staged for commit:\n  (use \"git add <file>...\" to update what will be committed)\n  (use \"git restore <file>...\" to discard changes in working directory)\n        modified:   src/app.js\n        modified:   package.json\n\nUntracked files:\n  (use \"git add <file>...\" to include in what will be committed)\n        config.env\n        logs/\n\nno changes added to commit (use \"git add\" and/or \"git commit -a\")"
  },
  "git add": {
    desc: "Add file contents to the index",
    usage: "git add <path>",
    flags: { "--all": "Add all changes", "--patch": "Interactively choose hunks" },
    output: ""
  },
  "git commit": {
    desc: "Record changes to the repository",
    usage: "git commit -m <message>",
    flags: { "--amend": "Amend previous commit", "--no-verify": "Bypass pre-commit hooks" },
    output: "[main 3f4a9b2] Update authentication module\n 2 files changed, 45 insertions(+), 12 deletions(-)\n create mode 100644 config.env"
  },
  "git push": {
    desc: "Update remote refs along with associated objects",
    usage: "git push <remote> <branch>",
    flags: { "--force": "Force push", "--tags": "Push all tags" },
    output: "Enumerating objects: 15, done.\nCounting objects: 100% (15/15), done.\nDelta compression using up to 8 threads\nCompressing objects: 100% (8/8), done.\nWriting objects: 100% (9/9), 1.24 KiB | 1.24 MiB/s, done.\nTotal 9 (delta 4), reused 0 (delta 0)\nTo github.com:user/project.git\n   a1b2c3d..3f4a9b2  main -> main"
  },
  "git pull": {
    desc: "Fetch from and integrate with another repository",
    usage: "git pull <remote> <branch>",
    flags: { "--rebase": "Rebase current branch", "--no-commit": "Merge without commit" },
    output: "remote: Enumerating objects: 32, done.\nremote: Counting objects: 100% (32/32), done.\nremote: Compressing objects: 100% (18/18), done.\nremote: Total 32 (delta 14), reused 30 (delta 12)\nUnpacking objects: 100% (32/32), 4.56 KiB | 389.00 KiB/s, done.\nFrom github.com:user/project\n   7d8e9f0..a1b2c3d  main       -> origin/main\nUpdating 7d8e9f0..a1b2c3d\nFast-forward\n src/utils.js    | 23 +++++++++++++++--------\n src/api.js      | 45 ++++++++++++++++++++++++++++++---------------\n 2 files changed, 53 insertions(+), 15 deletions(-)"
  },
  "git branch": {
    desc: "List, create, or delete branches",
    usage: "git branch [options] [branch-name]",
    flags: { "--list": "List branches", "--delete": "Delete branch", "--move": "Rename branch" },
    output: "  develop\n  feature/auth\n  feature/dashboard\n* main\n  release/v2.0"
  },
  "git checkout": {
    desc: "Switch branches or restore working tree files",
    usage: "git checkout <branch>",
    flags: { "--b": "Create and switch to new branch", "--force": "Force checkout" },
    output: "Switched to branch 'feature/auth'\nYour branch is up to date with 'origin/feature/auth'."
  },
  "git merge": {
    desc: "Join two or more development histories together",
    usage: "git merge <branch>",
    flags: { "--no-ff": "Create merge commit", "--squash": "Squash commits" },
    output: "Updating a1b2c3d..7d8e9f0\nFast-forward\n src/auth.js     | 89 ++++++++++++++++++++++++++++++++----------------\n src/middleware.js | 34 +++++++++++++------\n 2 files changed, 95 insertions(+), 28 deletions(-)"
  },
  "git log": {
    desc: "Show commit logs",
    usage: "git log [options]",
    flags: { "--oneline": "Show one commit per line", "--graph": "Show ASCII graph" },
    output: "commit 3f4a9b2c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a\nAuthor: Developer <dev@example.com>\nDate:   Mon May 5 14:32:18 2026 +0300\n\n    Update authentication module\n\n    - Add JWT token validation\n    - Implement refresh token rotation\n    - Fix session timeout handling\n\ncommit a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0\nAuthor: Developer <dev@example.com>\nDate:   Sun May 4 09:15:42 2026 +0300\n\n    Refactor database queries\n\n    - Optimize user lookup\n    - Add connection pooling\n    - Implement query caching"
  },
  "git diff": {
    desc: "Show changes between commits, commit and working tree, etc",
    usage: "git diff [options] [commit] [commit]",
    flags: { "--cached": "Show staged changes", "--stat": "Show diffstat" },
    output: "diff --git a/src/app.js b/src/app.js\nindex 7a8b9c0..1d2e3f4 100644\n--- a/src/app.js\n+++ b/src/app.js\n@@ -45,7 +45,12 @@ app.use(express.json());\n app.use('/api/users', userRoutes);\n app.use('/api/auth', authRoutes);\n \\n-app.listen(PORT, () => {\n+const server = app.listen(PORT, () => {\n     console.log('Server running on port ' + PORT);\n });\n \\n+process.on('SIGTERM', () => {\n+    server.close(() => {\n+        console.log('Server closed');\n+    });\n+});"
  },
  "git stash": {
    desc: "Stash changes in a dirty working directory",
    usage: "git stash [push|pop|list]",
    flags: { "--include-untracked": "Stash untracked files", "--message": "Stash message" },
    output: "Saved working directory and index state WIP on main: 3f4a9b2 Update authentication module"
  },
  "git remote": {
    desc: "Manage set of tracked repositories",
    usage: "git remote [add|remove|show] <name> <url>",
    flags: { "--verbose": "Be verbose", "--track": "Track branch" },
    output: "origin  git@github.com:user/project.git (fetch)\norigin  git@github.com:user/project.git (push)\nupstream        git@github.com:company/project.git (fetch)\nupstream        git@github.com:company/project.git (push)"
  },
  "git reset": {
    desc: "Reset current HEAD to the specified state",
    usage: "git reset [mode] <commit>",
    flags: { "--soft": "Keep changes staged", "--hard": "Discard changes" },
    output: "HEAD is now at a1b2c3d Refactor database queries"
  },

  "npm init": {
    desc: "Create a package.json file",
    usage: "npm init [-y|--yes]",
    flags: { "--yes": "Use default values", "--scope": "Create scoped package" },
    output: "Wrote to /project/package.json:\n\n{\n  \"name\": \"project\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"test\": \"echo \\\\\"Error: no test specified\\\\\" && exit 1\"\n  },\n  \"keywords\": [],\n  \"author\": \"\",\n  \"license\": \"ISC\"\n}"
  },
  "npm install": {
    desc: "Install a package",
    usage: "npm install <package>[@<version>]",
    flags: { "--save-dev": "Save as dev dependency", "--global": "Install globally" },
    output: "added 156 packages, and audited 157 packages in 3s\n\n23 packages are looking for funding\n  run 'npm fund' for details\n\nfound 0 vulnerabilities"
  },
  "npm uninstall": {
    desc: "Remove a package",
    usage: "npm uninstall <package>",
    flags: { "--save-dev": "Remove from dev dependencies", "--global": "Remove globally" },
    output: "removed 1 package, and audited 156 packages in 2s\n\nfound 0 vulnerabilities"
  },
  "npm update": {
    desc: "Update a package",
    usage: "npm update [<package>]",
    flags: { "--global": "Update global packages", "--dev": "Update dev dependencies" },
    output: "\nchanged 12 packages, and audited 157 packages in 5s\n\n23 packages are looking for funding\n  run 'npm fund' for details\n\nfound 0 vulnerabilities"
  },
  "npm run": {
    desc: "Run a script defined in package.json",
    usage: "npm run <script>",
    flags: { "--silent": "Suppress output", "--if-present": "Ignore missing script" },
    output: "\n> project@1.0.0 start\n> node src/index.js\n\nServer running on port 3000\nConnected to database\nEnvironment: development"
  },
  "npm start": {
    desc: "Run the start script",
    usage: "npm start [-- <args>]",
    flags: { "--silent": "Suppress output" },
    output: "\n> project@1.0.0 start\n> node src/index.js\n\nServer running on port 3000\nConnected to database\nEnvironment: development"
  },
  "npm test": {
    desc: "Run the test script",
    usage: "npm test [-- <args>]",
    flags: { "--watch": "Watch mode", "--coverage": "Generate coverage report" },
    output: "\n> project@1.0.0 test\n> jest\n\n PASS  src/tests/auth.test.js\n PASS  src/tests/user.test.js\n PASS  src/tests/api.test.js\n\nTest Suites: 3 passed, 3 total\nTests:       24 passed, 24 total\nSnapshots:   0 total\nTime:        4.234 s\nRan all test suites."
  },
  "npm audit": {
    desc: "Run a security audit",
    usage: "npm audit [fix]",
    flags: { "--fix": "Automatically fix vulnerabilities", "--json": "Output in JSON" },
    output: "\n                       === npm audit security report ===                        \n\nfound 0 vulnerabilities\n in 157 scanned packages"
  },
  "npm publish": {
    desc: "Publish a package",
    usage: "npm publish [<folder>]",
    flags: { "--access": "Set access level", "--tag": "Register with tag" },
    output: "npm notice \nnpm notice package: @scope/package@1.2.3\nnpm notice === Tarball Contents === \nnpm notice 1.2kB package.json\nnpm notice 3.4kB README.md\nnpm notice 12kB  index.js\nnpm notice === Tarball Details === \nnpm notice name:          @scope/package\nnpm notice version:       1.2.3\nnpm notice filename:      scope-package-1.2.3.tgz\nnpm notice package size:  5.6 kB\nnpm notice unpacked size: 16.6 kB\nnpm notice shasum:        a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c\nnpm notice integrity:     sha512-abc123...\nnpm notice total files:   3\nnpm notice \n+ @scope/package@1.2.3"
  },
  "npm list": {
    desc: "List installed packages",
    usage: "npm list [<package>]",
    flags: { "--global": "List global packages", "--depth": "Limit depth" },
    output: "project@1.0.0 /project\n+-- express@4.18.2\n| +-- body-parser@1.20.1\n| +-- cookie@0.5.0\n| +-- debug@2.6.9\n| +-- depd@2.0.0\n| +-- merge-descriptors@1.0.1\n| +-- methods@1.1.2\n| +-- parseurl@1.3.3\n| +-- path-to-regexp@0.1.7\n| +-- proxy-addr@2.0.7\n| +-- qs@6.11.0\n| +-- range-parser@1.2.1\n| +-- safe-buffer@5.2.1\n| +-- send@0.18.0\n| +-- serve-static@1.15.0\n| +-- setprototypeof@1.2.0\n| +-- statuses@2.0.1\n| +-- type-is@1.6.18\n| +-- utils-merge@1.0.1\n| +-- vary@1.1.2\n+-- mongoose@7.0.3\n| +-- bson@5.1.0\n| +-- kareem@2.5.1\n| +-- mongodb@5.1.0\n| +-- mpath@0.9.0\n| +-- mquery@5.0.0\n| +-- ms@2.1.3\n| +-- sift@16.0.1\n+-- dotenv@16.0.3"
  },
  "npm outdated": {
    desc: "Check for outdated packages",
    usage: "npm outdated [<package>]",
    flags: { "--global": "Check global packages", "--json": "Output JSON" },
    output: "Package      Current   Wanted   Latest  Location\nexpress      4.18.2    4.18.2   4.19.2  node_modules/express\nmongoose     7.0.3     7.6.8    8.3.2   node_modules/mongoose\ndotenv       16.0.3    16.4.5   16.4.5  node_modules/dotenv\nlodash       4.17.20   4.17.21  4.17.21 node_modules/lodash"
  },
  "npm cache": {
    desc: "Manipulates packages cache",
    usage: "npm cache [add|clean|verify]",
    flags: { "--force": "Force operation" },
    output: "Cache verified and compressed (~/.npm/_cacache)\nContent verified: 2345 (234500000 bytes)\nIndex entries: 3456\nFinished in 2.345s"
  },

  "docker run": {
    desc: "Run a command in a new container",
    usage: "docker run [options] <image> [command]",
    flags: { "--detach": "Run in background", "--publish": "Publish ports", "--env": "Set environment variables" },
    output: "Unable to find image 'node:18-alpine' locally\n18-alpine: Pulling from library/node\na1b2c3d4: Pull complete\ne5f6a7b8: Pull complete\nc9d0e1f2: Pull complete\nDigest: sha256:abc123...\nStatus: Downloaded newer image for node:18-alpine\n3f4a9b2c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0"
  },
  "docker ps": {
    desc: "List containers",
    usage: "docker ps [options]",
    flags: { "--all": "Show all containers", "--quiet": "Only display IDs" },
    output: "CONTAINER ID   IMAGE            COMMAND                  CREATED          STATUS          PORTS                    NAMES\n3f4a9b2c8d7e   node:18-alpine   \"node src/index.js\"      2 hours ago      Up 2 hours      0.0.0.0:3000->3000/tcp   app-server\na1b2c3d4e5f6   mongo:6.0        \"docker-entrypoint...\"   3 hours ago      Up 3 hours      0.0.0.0:27017->27017/tcp   database\n7d8e9f0a1b2c   redis:7-alpine   \"docker-entrypoint...\"   4 hours ago      Up 4 hours      0.0.0.0:6379->6379/tcp   cache"
  },
  "docker build": {
    desc: "Build an image from a Dockerfile",
    usage: "docker build [options] <path>",
    flags: { "--tag": "Name and tag", "--file": "Name of Dockerfile", "--no-cache": "Do not use cache" },
    output: "[+] Building 15.4s (12/12) FINISHED\n => [internal] load build definition from Dockerfile\n => => transferring dockerfile: 1.23kB\n => [internal] load .dockerignore\n => => transferring context: 45B\n => [internal] load metadata for docker.io/library/node:18-alpine\n => [1/7] FROM docker.io/library/node:18-alpine@sha256:abc123...\n => [internal] load build context\n => => transferring context: 2.34MB\n => [2/7] WORKDIR /app\n => [3/7] COPY package*.json ./\n => [4/7] RUN npm ci --only=production\n => [5/7] COPY . .\n => [6/7] RUN npm run build\n => [7/7] EXPOSE 3000\n => exporting to image\n => => exporting layers\n => => writing image sha256:def456...\n => => naming to docker.io/library/myapp:1.0.0"
  },
  "docker images": {
    desc: "List images",
    usage: "docker images [options] [repository[:tag]]",
    flags: { "--all": "Show all images", "--quiet": "Only show IDs" },
    output: "REPOSITORY          TAG           IMAGE ID       CREATED         SIZE\nmyapp               1.0.0         def456789abc   2 hours ago     156MB\nnode                18-alpine     abc123def456   3 days ago      176MB\nmongo               6.0           789abc123def   1 week ago      693MB\nredis               7-alpine      456def789abc   2 weeks ago     28.4MB\nnginx               latest        123abc456def   3 weeks ago     187MB"
  },
  "docker stop": {
    desc: "Stop one or more running containers",
    usage: "docker stop [options] <container>",
    flags: { "--time": "Seconds to wait before killing" },
    output: "3f4a9b2c8d7e"
  },
  "docker rm": {
    desc: "Remove one or more containers",
    usage: "docker rm [options] <container>",
    flags: { "--force": "Force removal", "--volumes": "Remove volumes" },
    output: "3f4a9b2c8d7e"
  },
  "docker rmi": {
    desc: "Remove one or more images",
    usage: "docker rmi [options] <image>",
    flags: { "--force": "Force removal", "--no-prune": "Do not delete untagged parents" },
    output: "Untagged: myapp:1.0.0\nDeleted: sha256:def456789abc123def456789abc123def456789abc123def456789abc123\nDeleted: sha256:abc123def456789abc123def456789abc123def456789abc123def456789"
  },
  "docker logs": {
    desc: "Fetch the logs of a container",
    usage: "docker logs [options] <container>",
    flags: { "--follow": "Follow log output", "--tail": "Number of lines", "--timestamps": "Show timestamps" },
    output: "2026-05-05T14:32:18.234Z Server running on port 3000\n2026-05-05T14:32:18.456Z Connected to database at mongodb://localhost:27017\n2026-05-05T14:32:19.123Z GET /api/users 200 45ms\n2026-05-05T14:32:20.789Z POST /api/auth/login 200 123ms\n2026-05-05T14:32:22.345Z GET /api/dashboard 200 67ms\n2026-05-05T14:32:25.678Z PUT /api/users/123 200 89ms"
  },
  "docker exec": {
    desc: "Run a command in a running container",
    usage: "docker exec [options] <container> <command>",
    flags: { "--interactive": "Keep STDIN open", "--tty": "Allocate pseudo-TTY" },
    output: "root@3f4a9b2c8d7e:/app# node -v\nv18.20.2\nroot@3f4a9b2c8d7e:/app# npm -v\n10.5.0"
  },
  "docker network": {
    desc: "Manage networks",
    usage: "docker network [create|ls|rm|inspect]",
    flags: { "--driver": "Driver to manage network", "--subnet": "Subnet in CIDR format" },
    output: "NETWORK ID     NAME            DRIVER    SCOPE\nabc123def456   bridge          bridge    local\ndef456abc123   host            host      local\n789abc123def   myapp-network   bridge    local\n123def456abc   none            null      local"
  },
  "docker volume": {
    desc: "Manage volumes",
    usage: "docker volume [create|ls|rm|inspect]",
    flags: { "--driver": "Specify volume driver" },
    output: "DRIVER    VOLUME NAME\nlocal     myapp-data\nlocal     myapp-logs\nlocal     myapp-cache"
  },
  "docker-compose": {
    desc: "Define and run multi-container applications",
    usage: "docker-compose [up|down|build]",
    flags: { "--detach": "Run in background", "--build": "Build images before starting" },
    output: "[+] Running 4/4\n Container database   Started\n Container cache      Started\n Container app-server Started\n Container nginx      Started"
  },

  "ls": {
    desc: "List directory contents",
    usage: "ls [options] [file...]",
    flags: { "--all": "Show hidden files", "--long": "Long listing format", "--human-readable": "Human readable sizes" },
    output: "total 48\ndrwxr-xr-x  8 user user 4096 May  5 14:32 .\ndrwxr-xr-x  3 user user 4096 May  4 09:15 ..\n-rw-r--r--  1 user user  234 May  5 12:45 .env\ndrwxr-xr-x  2 user user 4096 May  5 10:20 config\n-rw-r--r--  1 user user 1234 May  5 14:00 package.json\ndrwxr-xr-x  4 user user 4096 May  5 11:30 public\ndrwxr-xr-x  2 user user 4096 May  5 13:15 src\n-rw-r--r--  1 user user 5678 May  5 14:30 README.md"
  },
  "cd": {
    desc: "Change the working directory",
    usage: "cd [directory]",
    flags: {},
    output: ""
  },
  "pwd": {
    desc: "Print name of current working directory",
    usage: "pwd",
    flags: { "--logical": "Use PWD from environment", "--physical": "Avoid all symlinks" },
    output: "/home/user/projects/myapp"
  },
  "mkdir": {
    desc: "Make directories",
    usage: "mkdir [options] <directory>",
    flags: { "--parents": "No error if exists, make parent dirs", "--verbose": "Print message for each created" },
    output: "mkdir: created directory 'src/components'\nmkdir: created directory 'src/utils'\nmkdir: created directory 'src/hooks'"
  },
  "rm": {
    desc: "Remove files or directories",
    usage: "rm [options] <file...>",
    flags: { "--recursive": "Remove directories and contents", "--force": "Ignore non-existent files" },
    output: ""
  },
  "cp": {
    desc: "Copy files and directories",
    usage: "cp [options] <source> <destination>",
    flags: { "--recursive": "Copy directories recursively", "--verbose": "Explain what is being done" },
    output: "'src/config.js' -> 'backup/config.js'\n'src/utils.js' -> 'backup/utils.js'"
  },
  "mv": {
    desc: "Move (rename) files",
    usage: "mv [options] <source> <destination>",
    flags: { "--force": "Do not prompt before overwriting", "--verbose": "Explain what is being done" },
    output: "renamed 'old-name.js' -> 'new-name.js'"
  },
  "cat": {
    desc: "Concatenate files and print on the standard output",
    usage: "cat [options] [file...]",
    flags: { "--number": "Number all output lines", "--show-ends": "Display $ at end of each line" },
    output: "const express = require('express');\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\napp.use(express.json());\napp.use('/api', require('./routes'));\n\napp.listen(PORT, () => {\n    console.log('Server running on port ' + PORT);\n});"
  },
  "touch": {
    desc: "Change file timestamps or create empty files",
    usage: "touch [options] <file...>",
    flags: { "--no-create": "Do not create any files", "--date": "Parse STRING and use it" },
    output: ""
  },
  "chmod": {
    desc: "Change file mode bits",
    usage: "chmod [options] <mode> <file...>",
    flags: { "--recursive": "Change files and directories recursively", "--verbose": "Output diagnostics" },
    output: "mode of 'deploy.sh' changed from 0644 (rw-r--r--) to 0755 (rwxr-xr-x)"
  },
  "chown": {
    desc: "Change file owner and group",
    usage: "chown [options] <owner>[:<group>] <file...>",
    flags: { "--recursive": "Operate on files and directories recursively", "--reference": "Use RFILE's owner and group" },
    output: ""
  },
  "grep": {
    desc: "Print lines that match patterns",
    usage: "grep [options] <pattern> [file...]",
    flags: { "--recursive": "Read all files under each directory", "--line-number": "Prefix each line with line number", "--ignore-case": "Ignore case distinctions" },
    output: "src/app.js:45:app.use(express.json());\nsrc/app.js:46:app.use('/api/users', userRoutes);\nsrc/app.js:47:app.use('/api/auth', authRoutes);\nsrc/routes.js:12:router.get('/users', getUsers);\nsrc/routes.js:23:router.post('/auth/login', login);"
  },
  "find": {
    desc: "Search for files in a directory hierarchy",
    usage: "find [path...] [expression]",
    flags: { "--name": "Base of file name", "--type": "File type", "--size": "File size" },
    output: "./src\n./src/app.js\n./src/routes.js\n./src/controllers\n./src/controllers/user.js\n./src/controllers/auth.js\n./src/models\n./src/models/user.js\n./src/middleware\n./src/middleware/auth.js"
  },
  "ps": {
    desc: "Report a snapshot of the current processes",
    usage: "ps [options]",
    flags: { "--all": "Select all processes", "--forest": "ASCII art process tree" },
    output: "  PID TTY          TIME CMD\n 1234 pts/0    00:00:01 bash\n 5678 pts/0    00:00:00 node\n 5679 pts/0    00:00:00 node\n 9012 pts/0    00:00:00 ps"
  },
  "kill": {
    desc: "Send a signal to a process",
    usage: "kill [options] <pid>",
    flags: { "--signal": "Specify signal to send", "--list": "List signal names" },
    output: ""
  },
  "top": {
    desc: "Display Linux processes",
    usage: "top",
    flags: { "--batch-mode": "Batch mode operation", "--pid": "Monitor PIDs" },
    output: "top - 14:32:18 up 3 days,  5:23,  1 user,  load average: 0.52, 0.58, 0.61\nTasks: 234 total,   1 running, 233 sleeping,   0 stopped,   0 zombie\n%Cpu(s):  2.3 us,  1.2 sy,  0.0 ni, 96.0 id,  0.3 wa,  0.0 hi,  0.2 si,  0.0 st\nMiB Mem :  15923.4 total,   4521.3 free,   6789.2 used,   4612.9 buff/cache\nMiB Swap:   4096.0 total,   3987.4 free,    108.6 used.   8765.4 avail Mem\n\n  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n 1234 user      20   0  234567  45678  12345 S   2.3   0.3   0:12.34 node\n 5678 user      20   0  345678  56789  23456 S   1.2   0.4   0:08.90 mongod"
  },
  "df": {
    desc: "Report file system disk space usage",
    usage: "df [options] [file...]",
    flags: { "--human-readable": "Print sizes in human readable format", "--total": "Produce grand total" },
    output: "Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1       234G   89G  134G  40% /\n/dev/sdb1       466G  123G  320G  28% /data\ntmpfs           7.8G  234M  7.6G   3% /run\ntmpfs            16G   45M   16G   1% /dev/shm"
  },
  "du": {
    desc: "Estimate file space usage",
    usage: "du [options] [file...]",
    flags: { "--human-readable": "Print sizes in human readable format", "--summarize": "Display only total" },
    output: "4.0K    ./config\n12M     ./node_modules/express\n8.5M    ./node_modules/mongoose\n234M    ./node_modules\n1.2M    ./src\n456K    ./public\n245M    ."
  },
  "tar": {
    desc: "An archiving utility",
    usage: "tar [options] [archive] [file...]",
    flags: { "--create": "Create archive", "--extract": "Extract archive", "--gzip": "Filter through gzip", "--verbose": "Verbosely list files processed" },
    output: "src/\nsrc/app.js\nsrc/routes.js\nsrc/controllers/\nsrc/controllers/user.js\nsrc/controllers/auth.js\nsrc/models/\nsrc/models/user.js\nconfig/\nconfig/database.js\npackage.json\nREADME.md"
  },
  "curl": {
    desc: "Transfer data from or to a server",
    usage: "curl [options] <URL>",
    flags: { "--request": "Specify request method", "--header": "Pass custom header", "--data": "HTTP POST data" },
    output: "{\n  \"status\": \"success\",\n  \"data\": {\n    \"id\": 123,\n    \"name\": \"John Doe\",\n    \"email\": \"john@example.com\",\n    \"role\": \"admin\",\n    \"created_at\": \"2026-05-01T10:00:00Z\"\n  },\n  \"meta\": {\n    \"timestamp\": \"2026-05-05T14:32:18Z\",\n    \"request_id\": \"abc-123-def-456\"\n  }\n}"
  },
  "wget": {
    desc: "The non-interactive network downloader",
    usage: "wget [options] <URL>",
    flags: { "--output-document": "Write documents to FILE", "--continue": "Resume getting partially-downloaded file" },
    output: "--2026-05-05 14:32:18--  https://example.com/file.zip\nResolving example.com (example.com)... 93.184.216.34\nConnecting to example.com (example.com)|93.184.216.34|:443... connected.\nHTTP request sent, awaiting response... 200 OK\nLength: 5242880 (5.0M) [application/zip]\nSaving to: 'file.zip'\n\nfile.zip            100%[===================>]   5.00M  12.3MB/s    in 0.4s\n\n2026-05-05 14:32:19 (12.3 MB/s) - 'file.zip' saved [5242880/5242880]"
  },

  "node": {
    desc: "Node.js JavaScript runtime",
    usage: "node [options] [script.js]",
    flags: { "--version": "Print version", "--inspect": "Activate inspector" },
    output: "v18.20.2"
  },
  "node -v": {
    desc: "Show Node.js version",
    usage: "node -v",
    flags: {},
    output: "v18.20.2"
  },
  "npm -v": {
    desc: "Show npm version",
    usage: "npm -v",
    flags: {},
    output: "10.5.0"
  },
  "npx": {
    desc: "Execute Node.js packages",
    usage: "npx [options] <package>[@<version>] [command]",
    flags: { "--package": "Package to install", "--call": "String of code to evaluate" },
    output: "Need to install the following packages:\n  create-react-app@5.0.1\nOk to proceed? (y) y\n\nCreating a new React app in /project/my-app.\n\nInstalling packages. This might take a couple of minutes.\nInstalling react, react-dom, and react-scripts with cra-template...\n\nadded 1484 packages in 45s"
  },
  "nodemon": {
    desc: "Simple monitor script for use during development",
    usage: "nodemon [options] [script.js]",
    flags: { "--watch": "Watch directory", "--ext": "Extensions to watch" },
    output: "[nodemon] 3.0.1\n[nodemon] to restart at any time, enter 'rs'\n[nodemon] watching path(s): src/**/*\n[nodemon] watching extensions: js,mjs,cjs,json\n[nodemon] starting 'node src/index.js'\nServer running on port 3000\nConnected to database"
  },
  "pm2 start": {
    desc: "Start a process with PM2",
    usage: "pm2 start <app.js|json|config>",
    flags: { "--name": "Set application name", "--watch": "Watch for changes" },
    output: "[PM2] Starting /project/src/index.js in fork_mode (1 instance)\n[PM2] Done.\n+----+---------+----------+------+---------+----------+----------+\n| id | name    | mode     | pid  | status  | restart  | uptime   |\n+----+---------+----------+------+---------+----------+----------+\n| 0  | app     | fork     | 1234 | online  | 0        | 0s       |\n+----+---------+----------+------+---------+----------+----------+"
  },
  "pm2 list": {
    desc: "List all running processes",
    usage: "pm2 list",
    flags: {},
    output: "+----+---------+----------+------+---------+----------+----------+\n| id | name    | mode     | pid  | status  | restart  | uptime   |\n+----+---------+----------+------+---------+----------+----------+\n| 0  | app     | fork     | 1234 | online  | 0        | 2h       |\n| 1  | worker  | cluster  | 5678 | online  | 1        | 1h       |\n+----+---------+----------+------+---------+----------+----------+"
  },
  "pm2 logs": {
    desc: "Display logs",
    usage: "pm2 logs [process]",
    flags: { "--lines": "Output the last N lines", "--timestamp": "Add timestamp prefix" },
    output: "[PM2] Tailing last 15 lines for [all] processes\n\napp     | 2026-05-05T14:32:18: Server running on port 3000\napp     | 2026-05-05T14:32:18: Connected to database\napp     | 2026-05-05T14:32:19: GET /api/users 200 45ms\nworker  | 2026-05-05T14:32:20: Processing job #12345\nworker  | 2026-05-05T14:32:21: Job #12345 completed in 234ms"
  },

  "python": {
    desc: "Python interpreter",
    usage: "python [options] [script.py]",
    flags: { "--version": "Print version", "--help": "Print help" },
    output: "Python 3.11.4"
  },
  "python -m venv": {
    desc: "Create virtual environment",
    usage: "python -m venv <env-directory>",
    flags: { "--system-site-packages": "Give access to system packages", "--clear": "Clear contents" },
    output: ""
  },
  "pip install": {
    desc: "Install Python packages",
    usage: "pip install <package>",
    flags: { "--upgrade": "Upgrade package", "--requirement": "Install from requirements file" },
    output: "Collecting requests\n  Downloading requests-2.31.0-py3-none-any.whl (62 kB)\n     ---------------------------------------- 62.6/62.6 kB 1.2 MB/s eta 0:00:00\nCollecting charset-normalizer<4,>=2\n  Downloading charset_normalizer-3.3.2-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (140 kB)\n     ---------------------------------------- 140.3/140.3 kB 2.3 MB/s eta 0:00:00\nCollecting idna<4,>=2.5\n  Downloading idna-3.6-py3-none-any.whl (61 kB)\n     ---------------------------------------- 61.6/61.6 kB 1.8 MB/s eta 0:00:00\nCollecting urllib3<3,>=1.21.1\n  Downloading urllib3-2.1.0-py3-none-any.whl (104 kB)\n     ---------------------------------------- 104.6/104.6 kB 2.1 MB/s eta 0:00:00\nCollecting certifi>=2017.4.17\n  Downloading certifi-2024.2.2-py3-none-any.whl (163 kB)\n     ---------------------------------------- 163.8/163.8 kB 2.5 MB/s eta 0:00:00\nInstalling collected packages: urllib3, idna, charset-normalizer, certifi, requests\nSuccessfully installed certifi-2024.2.2 charset-normalizer-3.3.2 idna-3.6 requests-2.31.0 urllib3-2.1.0"
  },
  "pip list": {
    desc: "List installed packages",
    usage: "pip list",
    flags: { "--outdated": "List outdated packages", "--format": "Output format" },
    output: "Package            Version\n------------------ ---------\ncertifi            2024.2.2\ncharset-normalizer 3.3.2\nidna               3.6\npip                24.0\nrequests           2.31.0\nsetuptools         69.0.3\nurllib3            2.1.0\nwheel              0.42.0"
  },
  "pip freeze": {
    desc: "Output installed packages in requirements format",
    usage: "pip freeze",
    flags: { "--all": "Do not skip packages" },
    output: "certifi==2024.2.2\ncharset-normalizer==3.3.2\nidna==3.6\nrequests==2.31.0\nurllib3==2.1.0"
  },
  "django-admin": {
    desc: "Django command-line utility",
    usage: "django-admin <command> [options]",
    flags: { "--version": "Show version", "--help": "Show help" },
    output: "Type 'django-admin help <subcommand>' for help on a specific subcommand.\n\nAvailable subcommands:\n\n[django]\n    check\n    compilemessages\n    createcachetable\n    dbshell\n    diffsettings\n    dumpdata\n    flush\n    inspectdb\n    loaddata\n    makemessages\n    makemigrations\n    migrate\n    runserver\n    sendtestemail\n    shell\n    showmigrations\n    sqlflush\n    sqlmigrate\n    sqlsequencereset\n    squashmigrations\n    startapp\n    startproject\n    test\n    testserver"
  },
  "flask run": {
    desc: "Run Flask development server",
    usage: "flask run [options]",
    flags: { "--host": "Interface to bind", "--port": "Port to bind", "--debug": "Enable debug mode" },
    output: " * Debug mode: on\n * Running on http://127.0.0.1:5000\n\nPress CTRL+C to quit\n * Restarting with stat\n * Debugger is active!\n * Debugger PIN: 123-456-789"
  },
  "pytest": {
    desc: "Run Python tests",
    usage: "pytest [options] [file_or_dir]",
    flags: { "--verbose": "Increase verbosity", "--coverage": "Measure coverage" },
    output: "============================= test session starts ==============================\nplatform linux -- Python 3.11.4, pytest-8.1.1, pluggy-1.4.0\nrootdir: /project\nplugins: cov-4.1.0\ncollected 24 items\n\ntests/test_auth.py ........                                              [ 33%]\ntests/test_user.py ...........                                           [ 79%]\ntests/test_api.py .....                                                  [100%]\n\n============================== 24 passed in 4.23s ==============================="
  },

  "mongosh": {
    desc: "MongoDB Shell",
    usage: "mongosh [options] [connection string]",
    flags: { "--eval": "Evaluate JavaScript", "--file": "Execute JavaScript from file" },
    output: "Current Mongosh Log ID: 6637a8b2c4d5e6f7a8b9c0d1\nConnecting to:          mongodb://localhost:27017/test\nUsing MongoDB:          6.0.14\nUsing Mongosh:          2.2.5\n\nFor mongosh info see: https://docs.mongodb.com/mongodb-shell/\n\ntest> db.users.findOne()\n{\n  _id: ObjectId('6637a8b2c4d5e6f7a8b9c0d2'),\n  name: 'John Doe',\n  email: 'john@example.com',\n  role: 'admin',\n  createdAt: ISODate('2026-05-01T10:00:00.000Z')\n}"
  },
  "mysql": {
    desc: "MySQL client",
    usage: "mysql [options] [database]",
    flags: { "--user": "User name", "--password": "Password", "--host": "Connect to host" },
    output: "Welcome to the MySQL monitor.  Commands end with ; or g.\nYour MySQL connection id is 12345\nServer version: 8.0.36 MySQL Community Server - GPL\n\nCopyright (c) 2000, 2024, Oracle and/or its affiliates.\n\nOracle is a registered trademark of Oracle Corporation and/or its\naffiliates. Other names may be trademarks of their respective\nowners.\n\nType 'help;' or 'h' for help. Type 'c' to clear the current input statement.\n\nmysql> SELECT * FROM users LIMIT 3;\n+----+----------+------------------+-------+---------------------+\n| id | name     | email            | role  | created_at          |\n+----+----------+------------------+-------+---------------------+\n|  1 | John Doe | john@example.com | admin | 2026-05-01 10:00:00 |\n|  2 | Jane Doe | jane@example.com | user  | 2026-05-02 11:30:00 |\n|  3 | Bob Smith| bob@example.com  | user  | 2026-05-03 09:15:00 |\n+----+----------+------------------+-------+---------------------+\n3 rows in set (0.01 sec)"
  },
  "redis-cli": {
    desc: "Redis command line interface",
    usage: "redis-cli [options] [cmd [arg [arg ...]]]",
    flags: { "--raw": "Use raw output format", "--no-raw": "Force formatted output" },
    output: "127.0.0.1:6379> PING\nPONG\n127.0.0.1:6379> SET user:123 \"John Doe\"\nOK\n127.0.0.1:6379> GET user:123\n\"John Doe\"\n127.0.0.1:6379> HSET session:abc token \"xyz789\" expiry 1714919538\n(integer) 2\n127.0.0.1:6379> HGETALL session:abc\n1) \"token\"\n2) \"xyz789\"\n3) \"expiry\"\n4) \"1714919538\""
  },
  "psql": {
    desc: "PostgreSQL interactive terminal",
    usage: "psql [options] [dbname [username]]",
    flags: { "--host": "Database server host", "--port": "Database server port", "--username": "Database user name" },
    output: "psql (15.6)\nType \"help\" for help.\n\nmydb=# SELECT id, name, email, created_at FROM users LIMIT 3;\n id |   name   |      email       |     created_at      \n----+----------+------------------+---------------------\n  1 | John Doe | john@example.com | 2026-05-01 10:00:00\n  2 | Jane Doe | jane@example.com | 2026-05-02 11:30:00\n  3 | Bob Smith| bob@example.com  | 2026-05-03 09:15:00\n(3 rows)\n\nmydb=# "
  },

  "systemctl": {
    desc: "Control the systemd system and service manager",
    usage: "systemctl [options] <command> [name]",
    flags: { "--status-all": "Show status of all units", "--type": "List units of type" },
    output: "● nginx.service - A high performance web server and a reverse proxy server\n     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)\n     Active: active (running) since Mon 2026-05-05 08:00:00 UTC; 6h ago\n       Docs: man:nginx(8)\n   Main PID: 1234 (nginx)\n      Tasks: 5 (limit: 2345)\n     Memory: 12.3M\n        CPU: 456ms\n     CGroup: /system.slice/nginx.service\n             ├─1234 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;\n             ├─1235 nginx: worker process\n             ├─1236 nginx: worker process\n             ├─1237 nginx: worker process\n             └─1238 nginx: worker process"
  },
  "ufw": {
    desc: "Uncomplicated Firewall",
    usage: "ufw <command> [rule]",
    flags: { "--enable": "Enable firewall", "--disable": "Disable firewall", "--status": "Show status" },
    output: "Status: active\n\nTo                         Action      From\n--                         ------      ----\n22/tcp                     ALLOW       Anywhere\n80/tcp                     ALLOW       Anywhere\n443/tcp                    ALLOW       Anywhere\n3000/tcp                   ALLOW       192.168.1.0/24\n27017/tcp                  DENY        Anywhere\n\n22/tcp (v6)                ALLOW       Anywhere (v6)\n80/tcp (v6)                ALLOW       Anywhere (v6)\n443/tcp (v6)               ALLOW       Anywhere (v6)"
  },
  "crontab": {
    desc: "Maintain crontab files for individual users",
    usage: "crontab [options] [file]",
    flags: { "--list": "List current crontab", "--remove": "Remove current crontab", "--edit": "Edit current crontab" },
    output: "# Edit this file to introduce tasks to be run by cron.\n# \n# m h  dom mon dow   command\n  0 2  *   *   *     /usr/local/bin/backup.sh\n  */5 *  *   *   *    cd /project && /usr/bin/node cron/health-check.js\n  0 0  1   *   *     /usr/bin/python3 /project/scripts/monthly-report.py\n  30 6  *   *   1     /usr/local/bin/notify-weekly.sh"
  },
  "ssh": {
    desc: "OpenSSH remote login client",
    usage: "ssh [options] [user@]hostname [command]",
    flags: { "--port": "Port to connect", "--identity": "Identity file", "--verbose": "Verbose mode" },
    output: "The authenticity of host 'server.example.com (192.168.1.100)' can't be established.\nED25519 key fingerprint is SHA256:abc123def456789abc123def456789abc123def456.\nThis key is not known by any other names\nAre you sure you want to continue connecting (yes/no/[fingerprint])? yes\nWarning: Permanently added 'server.example.com' (ED25519) to the list of known hosts.\nuser@server.example.com's password: \n\nWelcome to Ubuntu 22.04.4 LTS (GNU/Linux 5.15.0 x86_64)\n\n * Documentation:  https://help.ubuntu.com\n * Management:     https://landscape.canonical.com\n * Support:        https://ubuntu.com/pro\n\nLast login: Mon May  5 08:30:15 2026 from 192.168.1.50\nuser@server:~$"
  },
  "scp": {
    desc: "Secure copy (remote file copy program)",
    usage: "scp [options] <source> <destination>",
    flags: { "--recursive": "Copy directories recursively", "--port": "Port to connect" },
    output: "config.env                           100%  234     2.3KB/s   00:00\npackage.json                         100% 1234    12.1KB/s   00:00\nsrc/app.js                           100% 5678    45.6KB/s   00:00\nsrc/routes.js                        100% 3456    34.2KB/s   00:00"
  }
};

const commandCategories = {
  "Git": ["git init", "git clone", "git status", "git add", "git commit", "git push", "git pull", "git branch", "git checkout", "git merge", "git log", "git diff", "git stash", "git remote", "git reset"],
  "NPM": ["npm init", "npm install", "npm uninstall", "npm update", "npm run", "npm start", "npm test", "npm audit", "npm publish", "npm list", "npm outdated", "npm cache"],
  "Docker": ["docker run", "docker ps", "docker build", "docker images", "docker stop", "docker rm", "docker rmi", "docker logs", "docker exec", "docker network", "docker volume", "docker-compose"],
  "Linux": ["ls", "cd", "pwd", "mkdir", "rm", "cp", "mv", "cat", "touch", "chmod", "chown", "grep", "find", "ps", "kill", "top", "df", "du", "tar", "curl", "wget"],
  "Node.js": ["node", "node -v", "npm -v", "npx", "nodemon", "pm2 start", "pm2 list", "pm2 logs"],
  "Python": ["python", "python -m venv", "pip install", "pip list", "pip freeze", "django-admin", "flask run", "pytest"],
  "Database": ["mongosh", "mysql", "redis-cli", "psql"],
  "System": ["systemctl", "ufw", "crontab", "ssh", "scp"]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { commandsDB, commandCategories };
}
'''

with open(f"{base_dir}/commands.js", "w", encoding="utf-8") as f:
    f.write(cmds_content)

print("commands.js created successfully with 80 commands")
