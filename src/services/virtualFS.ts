import { VirtualFile, VirtualFSConfig } from '../types';

export class VirtualFSEngine {
  private root: VirtualFile;
  private currentPath: string[];
  public currentUser: string;
  public hostname: string;
  private commandHistory: string[] = [];
  private envVars: Record<string, string> = {};

  constructor(config: VirtualFSConfig) {
    this.root = JSON.parse(JSON.stringify(config.root)); // Deep clone
    this.currentUser = config.currentUser || 'challenger';
    this.hostname = config.hostname || 'flagforge-box';
    this.currentPath = config.initialDir ? config.initialDir.split('/').filter(Boolean) : ['home', this.currentUser];
    this.envVars = {
      HOME: `/home/${this.currentUser}`,
      USER: this.currentUser,
      HOSTNAME: this.hostname,
      PATH: '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin',
      SHELL: '/bin/bash',
      TERM: 'xterm-256color',
      LANG: 'en_US.UTF-8',
      PWD: config.initialDir || `/home/${this.currentUser}`,
      EDITOR: 'vim',
      LOGNAME: this.currentUser,
    };
  }

  public getPrompt(): string {
    const dirDisplay = this.currentPath.length === 0 
      ? '/' 
      : (this.currentPath[0] === 'home' && this.currentPath[1] === this.currentUser && this.currentPath.length === 2)
        ? '~'
        : `/${this.currentPath.join('/')}`;
    return `${this.currentUser}@${this.hostname}:${dirDisplay}$`;
  }

  public getCwd(): string {
    return '/' + this.currentPath.join('/');
  }

  public getCommandHistory(): string[] {
    return this.commandHistory;
  }

  private resolveNode(pathStr: string): { node: VirtualFile | null; parent: VirtualFile | null; name: string; fullPath: string[] } {
    if (!pathStr || pathStr === '.') {
      return { node: this.getCurrentDirNode(), parent: null, name: '.', fullPath: [...this.currentPath] };
    }

    let parts: string[];

    if (pathStr.startsWith('/')) {
      parts = pathStr.split('/').filter(Boolean);
    } else if (pathStr.startsWith('~')) {
      const sub = pathStr.slice(1).split('/').filter(Boolean);
      parts = ['home', this.currentUser, ...sub];
    } else {
      parts = [...this.currentPath, ...pathStr.split('/').filter(Boolean)];
    }

    const normalizedParts: string[] = [];
    for (const part of parts) {
      if (part === '..') {
        normalizedParts.pop();
      } else if (part !== '.') {
        normalizedParts.push(part);
      }
    }

    let current: VirtualFile = this.root;
    let parent: VirtualFile | null = null;
    let name = '/';

    for (let i = 0; i < normalizedParts.length; i++) {
      name = normalizedParts[i];
      if (!current.children || !current.children[name]) {
        return { node: null, parent: current, name, fullPath: normalizedParts };
      }
      parent = current;
      current = current.children[name];
    }

    return { node: current, parent, name, fullPath: normalizedParts };
  }

  private getCurrentDirNode(): VirtualFile {
    let current = this.root;
    for (const part of this.currentPath) {
      if (current.children && current.children[part]) {
        current = current.children[part];
      }
    }
    return current;
  }

  private resolveParentAndName(pathStr: string): { parentNode: VirtualFile | null; fileName: string; parentPath: string[] } {
    let parts: string[];
    if (pathStr.startsWith('/')) {
      parts = pathStr.split('/').filter(Boolean);
    } else if (pathStr.startsWith('~')) {
      const sub = pathStr.slice(1).split('/').filter(Boolean);
      parts = ['home', this.currentUser, ...sub];
    } else {
      parts = [...this.currentPath, ...pathStr.split('/').filter(Boolean)];
    }

    const normalizedParts: string[] = [];
    for (const part of parts) {
      if (part === '..') normalizedParts.pop();
      else if (part !== '.') normalizedParts.push(part);
    }

    if (normalizedParts.length === 0) return { parentNode: this.root, fileName: '', parentPath: [] };

    const fileName = normalizedParts[normalizedParts.length - 1];
    const parentParts = normalizedParts.slice(0, -1);

    let current = this.root;
    for (const p of parentParts) {
      if (!current.children || !current.children[p]) return { parentNode: null, fileName, parentPath: parentParts };
      current = current.children[p];
    }

    return { parentNode: current, fileName, parentPath: parentParts };
  }

  public execute(commandLine: string): string {
    const trimmed = commandLine.trim();
    if (!trimmed) return '';

    // Record to history
    this.commandHistory.push(trimmed);

    // Handle output redirection (> and >>)
    let redirectFile: string | null = null;
    let redirectAppend = false;
    let actualCmd = trimmed;

    // Check for redirection BEFORE pipeline (redirect applies to final output)
    const redirectMatch = trimmed.match(/^(.*?)\s*(>>|>)\s*(\S+)\s*$/);
    if (redirectMatch && !trimmed.includes('|')) {
      actualCmd = redirectMatch[1].trim();
      redirectAppend = redirectMatch[2] === '>>';
      redirectFile = redirectMatch[3];
    }

    // Handle piping
    let output: string;
    if (actualCmd.includes('|')) {
      output = this.handlePipeline(actualCmd);
    } else {
      output = this.executeSingle(actualCmd);
    }

    // Apply output redirection
    if (redirectFile && output !== '__CLEAR__') {
      const { parentNode, fileName } = this.resolveParentAndName(redirectFile);
      if (parentNode && parentNode.type === 'dir') {
        if (!parentNode.children) parentNode.children = {};
        if (redirectAppend && parentNode.children[fileName]) {
          parentNode.children[fileName].content = (parentNode.children[fileName].content || '') + output;
        } else {
          parentNode.children[fileName] = {
            name: fileName,
            type: 'file',
            content: output,
            permissions: '-rw-r--r--',
            owner: this.currentUser,
          };
        }
        return ''; // Redirected output goes to file, not terminal
      }
      return `bash: ${redirectFile}: No such file or directory`;
    }

    return output;
  }

  private executeSingle(commandLine: string): string {
    const trimmed = commandLine.trim();
    if (!trimmed) return '';

    const args = trimmed.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
    const unquotedArgs = args.map(a => a.replace(/^['"]|['"]$/g, ''));
    const cmd = unquotedArgs[0]?.toLowerCase();
    const cmdArgs = unquotedArgs.slice(1);

    switch (cmd) {
      case 'help':
        return `FlagForge Virtual Shell v3.0 (x86_64-linux-gnu)
Available Built-in Commands:

  NAVIGATION & INFO:
    ls [-la] [path]         List directory contents
    cd <dir>                Change working directory
    pwd                     Print working directory
    whoami                  Display current user
    id                      Display user and group IDs
    hostname                Display system hostname
    uname [-a]              System information
    date                    Display current date/time
    uptime                  Display system uptime
    which <cmd>             Show command path
    env / printenv          Display environment variables
    export VAR=value        Set environment variable
    history                 Show command history

  FILE OPERATIONS:
    cat <file>              Display file content
    head [-n N] <file>      Show first N lines (default 10)
    tail [-n N] <file>      Show last N lines (default 10)
    touch <file>            Create empty file
    mkdir [-p] <dir>        Create directory
    rm [-rf] <path>         Remove file or directory
    cp <src> <dest>         Copy file
    mv <src> <dest>         Move/rename file
    chmod <mode> <file>     Change file permissions

  TEXT PROCESSING & ANALYSIS:
    grep [-i] <pat> <file>  Search pattern in file
    wc [-l|-w|-c] <file>    Count lines/words/chars
    sort <file>             Sort lines alphabetically
    uniq <file>             Remove adjacent duplicates
    cut -d<d> -f<n> <file>  Extract columns
    rev <file>              Reverse each line
    strings <file>          Find printable strings
    xxd <file>              Hex dump of file

  SEARCH:
    find <path> -name <p>   Search files by name
    file <file>             Determine file type

  ENCODING & CRYPTO:
    base64 -d <file>        Base64 decode content
    echo [text]             Print text

  NETWORK:
    nc <host> <port>        Simulated netcat connection
    curl <url>              Fetch simulated endpoint
    ping <host>             Simulated ping

  MISC:
    man <cmd>               Brief command manual
    clear                   Clear the terminal
    help                    Show this help manual

  PIPELINE & REDIRECTION:
    cmd1 | cmd2             Pipe output between commands
    cmd > file              Redirect output to file
    cmd >> file             Append output to file`;

      case 'pwd':
        return this.getCwd();

      case 'whoami':
        return this.currentUser;

      case 'id':
        return `uid=1000(${this.currentUser}) gid=1000(${this.currentUser}) groups=1000(${this.currentUser}),27(sudo),100(users)`;

      case 'hostname':
        return this.hostname;

      case 'date':
        return new Date().toString();

      case 'uptime':
        return ` ${new Date().toTimeString().split(' ')[0]} up 14 days, 7:32,  1 user,  load average: 0.12, 0.08, 0.03`;

      case 'uname':
        if (cmdArgs.includes('-a')) {
          return `Linux ${this.hostname} 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`;
        }
        if (cmdArgs.includes('-r')) return '6.8.0-45-generic';
        if (cmdArgs.includes('-m')) return 'x86_64';
        return 'Linux';

      case 'which': {
        if (cmdArgs.length === 0) return 'which: missing operand';
        const target = cmdArgs[0];
        const knownCmds: Record<string, string> = {
          ls: '/usr/bin/ls', cat: '/usr/bin/cat', grep: '/usr/bin/grep',
          find: '/usr/bin/find', python3: '/usr/bin/python3', python: '/usr/bin/python3',
          base64: '/usr/bin/base64', strings: '/usr/bin/strings', file: '/usr/bin/file',
          nc: '/usr/bin/nc', curl: '/usr/bin/curl', nmap: '/usr/bin/nmap',
          xxd: '/usr/bin/xxd', sort: '/usr/bin/sort', uniq: '/usr/bin/uniq',
          wc: '/usr/bin/wc', head: '/usr/bin/head', tail: '/usr/bin/tail',
          bash: '/usr/bin/bash', sh: '/bin/sh', chmod: '/usr/bin/chmod',
          mkdir: '/usr/bin/mkdir', rm: '/usr/bin/rm', cp: '/usr/bin/cp',
          mv: '/usr/bin/mv', touch: '/usr/bin/touch',
        };
        return knownCmds[target] || `${target} not found`;
      }

      case 'env':
      case 'printenv': {
        if (cmdArgs.length > 0) {
          return this.envVars[cmdArgs[0]] || '';
        }
        return Object.entries(this.envVars).map(([k, v]) => `${k}=${v}`).join('\n');
      }

      case 'export': {
        if (cmdArgs.length === 0) {
          return Object.entries(this.envVars).map(([k, v]) => `declare -x ${k}="${v}"`).join('\n');
        }
        for (const arg of cmdArgs) {
          const eqIdx = arg.indexOf('=');
          if (eqIdx > 0) {
            const key = arg.substring(0, eqIdx);
            const val = arg.substring(eqIdx + 1).replace(/^['"]|['"]$/g, '');
            this.envVars[key] = val;
          }
        }
        return '';
      }

      case 'history': {
        return this.commandHistory.map((cmd, i) => `  ${(i + 1).toString().padStart(4)} ${cmd}`).join('\n');
      }

      case 'cd': {
        const target = cmdArgs[0] || '~';
        if (target === '~' || target === '') {
          this.currentPath = ['home', this.currentUser];
          this.envVars.PWD = this.getCwd();
          return '';
        }
        if (target === '-') {
          // Go to previous directory (simplified: go home)
          this.currentPath = ['home', this.currentUser];
          this.envVars.PWD = this.getCwd();
          return this.getCwd();
        }
        if (target === '/') {
          this.currentPath = [];
          this.envVars.PWD = '/';
          return '';
        }

        const { node } = this.resolveNode(target);
        if (!node) {
          return `cd: no such file or directory: ${target}`;
        }
        if (node.type !== 'dir') {
          return `cd: not a directory: ${target}`;
        }

        // Update current path
        if (target.startsWith('/')) {
          this.currentPath = target.split('/').filter(Boolean);
        } else if (target.startsWith('~')) {
          this.currentPath = ['home', this.currentUser, ...target.slice(1).split('/').filter(Boolean)];
        } else {
          const parts = target.split('/').filter(Boolean);
          const newPath = [...this.currentPath];
          for (const p of parts) {
            if (p === '..') {
              newPath.pop();
            } else if (p !== '.') {
              newPath.push(p);
            }
          }
          this.currentPath = newPath;
        }
        this.envVars.PWD = this.getCwd();
        return '';
      }

      case 'ls': {
        const showAll = cmdArgs.some(a => a.startsWith('-') && a.includes('a'));
        const showLong = cmdArgs.some(a => a.startsWith('-') && a.includes('l'));
        const pathArg = cmdArgs.find(a => !a.startsWith('-')) || '.';
        const { node } = this.resolveNode(pathArg);

        if (!node) {
          return `ls: cannot access '${pathArg}': No such file or directory`;
        }

        if (node.type === 'file') {
          if (showLong) {
            const perm = node.permissions || '-rw-r--r--';
            const owner = node.owner || this.currentUser;
            const size = node.size || (node.content ? node.content.length : 128);
            return `${perm} 1 ${owner} ${owner} ${size.toString().padStart(6, ' ')} Aug 24 10:15 ${node.name}`;
          }
          return node.name;
        }

        const children = node.children || {};
        const entries = Object.keys(children).sort().filter(name => showAll || !name.startsWith('.'));

        if (showLong) {
          const lines = [`total ${entries.length * 4}`];
          if (showAll) {
            lines.push(`drwxr-xr-x 2 ${this.currentUser} ${this.currentUser}  4096 Aug 24 10:00 .`);
            lines.push(`drwxr-xr-x 4 root root  4096 Aug 24 09:30 ..`);
          }
          for (const name of entries) {
            const item = children[name];
            const perm = item.permissions || (item.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--');
            const owner = item.owner || this.currentUser;
            const size = item.size || (item.content ? item.content.length : (item.type === 'dir' ? 4096 : 128));
            const date = 'Aug 24 10:15';
            lines.push(`${perm} 1 ${owner} ${owner} ${size.toString().padStart(6, ' ')} ${date} ${name}${item.type === 'dir' ? '/' : ''}`);
          }
          return lines.join('\n');
        }

        return entries.map(name => children[name].type === 'dir' ? `${name}/` : name).join('  ');
      }

      case 'cat': {
        if (cmdArgs.length === 0) return 'cat: missing operand';
        const results: string[] = [];
        for (const target of cmdArgs) {
          const { node } = this.resolveNode(target);
          if (!node) {
            results.push(`cat: ${target}: No such file or directory`);
            continue;
          }
          if (node.type === 'dir') {
            results.push(`cat: ${target}: Is a directory`);
            continue;
          }
          results.push(node.content || '');
        }
        return results.join('\n');
      }

      case 'head': {
        let nLines = 10;
        let fileArg = '';
        for (let i = 0; i < cmdArgs.length; i++) {
          if (cmdArgs[i] === '-n' && cmdArgs[i + 1]) {
            nLines = parseInt(cmdArgs[i + 1]) || 10;
            i++;
          } else if (cmdArgs[i].startsWith('-') && !isNaN(parseInt(cmdArgs[i].slice(1)))) {
            nLines = parseInt(cmdArgs[i].slice(1));
          } else if (!cmdArgs[i].startsWith('-')) {
            fileArg = cmdArgs[i];
          }
        }
        if (!fileArg) return 'head: missing operand';
        const { node } = this.resolveNode(fileArg);
        if (!node) return `head: cannot open '${fileArg}' for reading: No such file or directory`;
        if (node.type === 'dir') return `head: error reading '${fileArg}': Is a directory`;
        const lines = (node.content || '').split('\n');
        return lines.slice(0, nLines).join('\n');
      }

      case 'tail': {
        let nLines = 10;
        let fileArg = '';
        for (let i = 0; i < cmdArgs.length; i++) {
          if (cmdArgs[i] === '-n' && cmdArgs[i + 1]) {
            nLines = parseInt(cmdArgs[i + 1]) || 10;
            i++;
          } else if (cmdArgs[i].startsWith('-') && !isNaN(parseInt(cmdArgs[i].slice(1)))) {
            nLines = parseInt(cmdArgs[i].slice(1));
          } else if (!cmdArgs[i].startsWith('-')) {
            fileArg = cmdArgs[i];
          }
        }
        if (!fileArg) return 'tail: missing operand';
        const { node } = this.resolveNode(fileArg);
        if (!node) return `tail: cannot open '${fileArg}' for reading: No such file or directory`;
        if (node.type === 'dir') return `tail: error reading '${fileArg}': Is a directory`;
        const lines = (node.content || '').split('\n');
        return lines.slice(Math.max(0, lines.length - nLines)).join('\n');
      }

      case 'wc': {
        const countLines = cmdArgs.includes('-l');
        const countWords = cmdArgs.includes('-w');
        const countChars = cmdArgs.includes('-c');
        const fileArg = cmdArgs.find(a => !a.startsWith('-'));
        if (!fileArg) return 'wc: missing operand';
        const { node } = this.resolveNode(fileArg);
        if (!node) return `wc: ${fileArg}: No such file or directory`;
        if (node.type === 'dir') return `wc: ${fileArg}: Is a directory`;
        const content = node.content || '';
        const lines = content.split('\n').length;
        const words = content.split(/\s+/).filter(w => w.length > 0).length;
        const chars = content.length;

        if (countLines) return `${lines} ${fileArg}`;
        if (countWords) return `${words} ${fileArg}`;
        if (countChars) return `${chars} ${fileArg}`;
        return `  ${lines}  ${words} ${chars} ${fileArg}`;
      }

      case 'sort': {
        const fileArg = cmdArgs.find(a => !a.startsWith('-'));
        if (!fileArg) return 'sort: missing operand';
        const { node } = this.resolveNode(fileArg);
        if (!node) return `sort: cannot read: ${fileArg}: No such file or directory`;
        const content = node.content || '';
        const lines = content.split('\n');
        if (cmdArgs.includes('-r')) {
          return lines.sort().reverse().join('\n');
        }
        if (cmdArgs.includes('-n')) {
          return lines.sort((a, b) => parseFloat(a) - parseFloat(b)).join('\n');
        }
        return lines.sort().join('\n');
      }

      case 'uniq': {
        const fileArg = cmdArgs.find(a => !a.startsWith('-'));
        if (!fileArg) return 'uniq: missing operand';
        const { node } = this.resolveNode(fileArg);
        if (!node) return `uniq: ${fileArg}: No such file or directory`;
        const lines = (node.content || '').split('\n');
        const result: string[] = [];
        const countMode = cmdArgs.includes('-c');
        let prev = '';
        let count = 0;
        for (const line of lines) {
          if (line === prev) {
            count++;
          } else {
            if (prev !== '' || count > 0) {
              result.push(countMode ? `      ${count} ${prev}` : prev);
            }
            prev = line;
            count = 1;
          }
        }
        if (count > 0) result.push(countMode ? `      ${count} ${prev}` : prev);
        return result.join('\n');
      }

      case 'cut': {
        let delimiter = '\t';
        let fields: number[] = [];
        let fileArg = '';
        for (let i = 0; i < cmdArgs.length; i++) {
          const a = cmdArgs[i];
          if (a.startsWith('-d')) {
            delimiter = a.length > 2 ? a.slice(2) : (cmdArgs[++i] || '\t');
          } else if (a.startsWith('-f')) {
            const fStr = a.length > 2 ? a.slice(2) : (cmdArgs[++i] || '1');
            fields = fStr.split(',').map(n => parseInt(n) - 1).filter(n => !isNaN(n));
          } else if (!a.startsWith('-')) {
            fileArg = a;
          }
        }
        if (!fileArg) return 'cut: missing operand';
        const { node } = this.resolveNode(fileArg);
        if (!node) return `cut: ${fileArg}: No such file or directory`;
        const lines = (node.content || '').split('\n');
        return lines.map(line => {
          const parts = line.split(delimiter);
          return fields.map(f => parts[f] || '').join(delimiter);
        }).join('\n');
      }

      case 'rev': {
        const fileArg = cmdArgs.find(a => !a.startsWith('-'));
        if (!fileArg) return 'rev: missing operand';
        const { node } = this.resolveNode(fileArg);
        if (!node) return `rev: cannot open ${fileArg}: No such file or directory`;
        const lines = (node.content || '').split('\n');
        return lines.map(l => l.split('').reverse().join('')).join('\n');
      }

      case 'xxd': {
        const fileArg = cmdArgs.find(a => !a.startsWith('-'));
        if (!fileArg) return 'xxd: missing operand';
        const { node } = this.resolveNode(fileArg);
        if (!node) return `xxd: ${fileArg}: No such file or directory`;
        const content = node.content || '';
        const lines: string[] = [];
        for (let i = 0; i < Math.min(content.length, 256); i += 16) {
          const offset = i.toString(16).padStart(8, '0');
          const chunk = content.slice(i, i + 16);
          const hexParts: string[] = [];
          const asciiParts: string[] = [];
          for (let j = 0; j < 16; j++) {
            if (j < chunk.length) {
              const code = chunk.charCodeAt(j);
              hexParts.push(code.toString(16).padStart(2, '0'));
              asciiParts.push(code >= 32 && code <= 126 ? chunk[j] : '.');
            } else {
              hexParts.push('  ');
              asciiParts.push(' ');
            }
          }
          const hexStr = hexParts.join(' ').replace(/(.{24}) /, '$1  ');
          lines.push(`${offset}: ${hexStr}  ${asciiParts.join('')}`);
        }
        return lines.join('\n');
      }

      case 'touch': {
        if (cmdArgs.length === 0) return 'touch: missing file operand';
        for (const target of cmdArgs) {
          const { node } = this.resolveNode(target);
          if (node) continue; // File exists, just "update timestamp" (no-op)
          const { parentNode, fileName } = this.resolveParentAndName(target);
          if (!parentNode || parentNode.type !== 'dir') {
            return `touch: cannot touch '${target}': No such file or directory`;
          }
          if (!parentNode.children) parentNode.children = {};
          parentNode.children[fileName] = {
            name: fileName,
            type: 'file',
            content: '',
            permissions: '-rw-r--r--',
            owner: this.currentUser,
          };
        }
        return '';
      }

      case 'mkdir': {
        if (cmdArgs.length === 0) return 'mkdir: missing operand';
        const makeParents = cmdArgs.includes('-p');
        const dirArgs = cmdArgs.filter(a => !a.startsWith('-'));
        for (const target of dirArgs) {
          if (makeParents) {
            // Create intermediate directories
            let parts: string[];
            if (target.startsWith('/')) {
              parts = target.split('/').filter(Boolean);
            } else if (target.startsWith('~')) {
              parts = ['home', this.currentUser, ...target.slice(1).split('/').filter(Boolean)];
            } else {
              parts = [...this.currentPath, ...target.split('/').filter(Boolean)];
            }
            let current = this.root;
            for (const p of parts) {
              if (!current.children) current.children = {};
              if (!current.children[p]) {
                current.children[p] = { name: p, type: 'dir', children: {}, permissions: 'drwxr-xr-x', owner: this.currentUser };
              }
              current = current.children[p];
            }
          } else {
            const { parentNode, fileName } = this.resolveParentAndName(target);
            if (!parentNode || parentNode.type !== 'dir') {
              return `mkdir: cannot create directory '${target}': No such file or directory`;
            }
            if (parentNode.children && parentNode.children[fileName]) {
              return `mkdir: cannot create directory '${target}': File exists`;
            }
            if (!parentNode.children) parentNode.children = {};
            parentNode.children[fileName] = {
              name: fileName,
              type: 'dir',
              children: {},
              permissions: 'drwxr-xr-x',
              owner: this.currentUser,
            };
          }
        }
        return '';
      }

      case 'rm': {
        if (cmdArgs.length === 0) return 'rm: missing operand';
        const recursive = cmdArgs.some(a => a.startsWith('-') && a.includes('r'));
        const force = cmdArgs.some(a => a.startsWith('-') && a.includes('f'));
        const targets = cmdArgs.filter(a => !a.startsWith('-'));
        for (const target of targets) {
          const { parentNode, fileName } = this.resolveParentAndName(target);
          if (!parentNode || !parentNode.children || !parentNode.children[fileName]) {
            if (!force) return `rm: cannot remove '${target}': No such file or directory`;
            continue;
          }
          const node = parentNode.children[fileName];
          if (node.type === 'dir' && !recursive) {
            return `rm: cannot remove '${target}': Is a directory`;
          }
          delete parentNode.children[fileName];
        }
        return '';
      }

      case 'cp': {
        if (cmdArgs.length < 2) return 'cp: missing file operand';
        const src = cmdArgs[0];
        const dest = cmdArgs[1];
        const { node: srcNode } = this.resolveNode(src);
        if (!srcNode) return `cp: cannot stat '${src}': No such file or directory`;
        if (srcNode.type === 'dir') return `cp: -r not specified; omitting directory '${src}'`;
        
        const { parentNode: destParent, fileName: destName } = this.resolveParentAndName(dest);
        const { node: destNode } = this.resolveNode(dest);
        
        if (destNode && destNode.type === 'dir') {
          // Copy into directory
          if (!destNode.children) destNode.children = {};
          destNode.children[srcNode.name] = JSON.parse(JSON.stringify(srcNode));
        } else if (destParent && destParent.type === 'dir') {
          if (!destParent.children) destParent.children = {};
          const clone = JSON.parse(JSON.stringify(srcNode));
          clone.name = destName;
          destParent.children[destName] = clone;
        } else {
          return `cp: cannot create '${dest}': No such file or directory`;
        }
        return '';
      }

      case 'mv': {
        if (cmdArgs.length < 2) return 'mv: missing file operand';
        const src = cmdArgs[0];
        const dest = cmdArgs[1];
        const { parentNode: srcParent, fileName: srcName } = this.resolveParentAndName(src);
        if (!srcParent || !srcParent.children || !srcParent.children[srcName]) {
          return `mv: cannot stat '${src}': No such file or directory`;
        }
        const srcNode = srcParent.children[srcName];
        
        const { parentNode: destParent, fileName: destName } = this.resolveParentAndName(dest);
        const { node: destNode } = this.resolveNode(dest);
        
        if (destNode && destNode.type === 'dir') {
          if (!destNode.children) destNode.children = {};
          destNode.children[srcNode.name] = srcNode;
        } else if (destParent && destParent.type === 'dir') {
          if (!destParent.children) destParent.children = {};
          srcNode.name = destName;
          destParent.children[destName] = srcNode;
        } else {
          return `mv: cannot move '${src}' to '${dest}': No such file or directory`;
        }
        delete srcParent.children[srcName];
        return '';
      }

      case 'chmod': {
        if (cmdArgs.length < 2) return 'chmod: missing operand';
        const mode = cmdArgs[0];
        const target = cmdArgs[1];
        const { node } = this.resolveNode(target);
        if (!node) return `chmod: cannot access '${target}': No such file or directory`;
        // Simulate permission change display
        if (/^[0-7]{3,4}$/.test(mode)) {
          const modeStr = mode.padStart(4, '0');
          const isDir = node.type === 'dir';
          const permChars = (octal: string) => {
            const map: Record<string, string> = { '0': '---', '1': '--x', '2': '-w-', '3': '-wx', '4': 'r--', '5': 'r-x', '6': 'rw-', '7': 'rwx' };
            return (isDir ? 'd' : '-') + (map[octal[1]] || '---') + (map[octal[2]] || '---') + (map[octal[3]] || '---');
          };
          node.permissions = permChars(modeStr);
        }
        return '';
      }

      case 'man': {
        if (cmdArgs.length === 0) return 'What manual page do you want?\nFor example, try \'man grep\'.';
        const topic = cmdArgs[0].toLowerCase();
        const manPages: Record<string, string> = {
          grep: `GREP(1)

NAME
       grep - print lines that match patterns

SYNOPSIS
       grep [OPTIONS] PATTERN [FILE...]

DESCRIPTION
       grep searches for PATTERN in each FILE. PATTERN is a basic regular expression.

OPTIONS
       -i     Ignore case distinctions in patterns and data.
       -r     Read all files under each directory, recursively.
       -n     Prefix each line with the line number.
       -v     Invert the sense of matching, selecting non-matching lines.
       -c     Count the number of matching lines.

EXAMPLES
       grep "flag{" /var/log/access.log
       grep -i "password" config.txt`,
          find: `FIND(1)

NAME
       find - search for files in a directory hierarchy

SYNOPSIS
       find [path] [expression]

DESCRIPTION
       find searches the directory tree rooted at each given path.

OPTIONS
       -name pattern    Base of file name matches pattern.
       -type f          Regular file.
       -type d          Directory.
       -perm mode       File permission bits are exactly mode.

EXAMPLES
       find / -name "*.txt" -type f
       find . -name "*flag*"
       find / -perm -4000 -type f 2>/dev/null`,
          cat: `CAT(1)

NAME
       cat - concatenate files and print on standard output

SYNOPSIS
       cat [FILE]...

EXAMPLES
       cat secret.txt
       cat file1.txt file2.txt`,
          ls: `LS(1)

NAME
       ls - list directory contents

SYNOPSIS
       ls [OPTION]... [FILE]...

OPTIONS
       -a     do not ignore entries starting with .
       -l     use a long listing format
       -la    combination of -l and -a`,
          base64: `BASE64(1)

NAME
       base64 - base64 encode/decode data

SYNOPSIS
       base64 [OPTION]... [FILE]

OPTIONS
       -d, --decode    Decode base64 encoded data.

EXAMPLES
       base64 -d encoded.txt
       cat encoded.txt | base64 -d`,
          strings: `STRINGS(1)

NAME
       strings - print printable character sequences in files

SYNOPSIS
       strings [OPTIONS] FILE

DESCRIPTION
       For each file given, strings prints the sequences of printable
       characters that are at least 4 characters long.

EXAMPLES
       strings binary.elf
       strings image.png | grep "flag{"`,
          xxd: `XXD(1)

NAME
       xxd - make a hexdump

SYNOPSIS
       xxd [options] [file]

DESCRIPTION
       xxd creates a hex dump of a given file or standard input.

EXAMPLES
       xxd mystery.bin
       xxd -r hexdump.txt > binary.out`,
          nc: `NC(1)

NAME
       nc - arbitrary TCP and UDP connections and listens

SYNOPSIS
       nc [options] host port

DESCRIPTION
       The nc (netcat) utility is used for TCP/UDP connections.

EXAMPLES
       nc target.com 1337
       nc -l -p 4444`,
          curl: `CURL(1)

NAME
       curl - transfer a URL

SYNOPSIS
       curl [options] URL

DESCRIPTION
       curl transfers data from or to a server using protocols like HTTP.

OPTIONS
       -X METHOD    Specify request method (GET, POST, etc.)
       -d DATA      Send data in POST request
       -H HEADER    Add custom header
       -v           Verbose mode
       -s           Silent mode
       -o FILE      Write output to file

EXAMPLES
       curl http://target.com/api/v1/flag
       curl -X POST -d "user=admin" http://target.com/login`,
        };
        return manPages[topic] || `No manual entry for ${topic}`;
      }

      case 'file': {
        if (cmdArgs.length === 0) return 'file: missing operand';
        const target = cmdArgs[0];
        const { node } = this.resolveNode(target);
        if (!node) {
          return `file: cannot open '${target}' (No such file or directory)`;
        }
        if (node.type === 'dir') {
          return `${target}: directory`;
        }
        const content = node.content || '';
        if (target.endsWith('.pcap') || target.endsWith('.cap')) {
          return `${target}: pcap capture file, microsecond ts (little-endian) - version 2.4 (Ethernet, capture length 262144)`;
        }
        if (target.endsWith('.elf') || target.endsWith('.bin') || content.includes('\\x7fELF') || content.startsWith('ELF')) {
          return `${target}: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, not stripped`;
        }
        if (target.endsWith('.png')) {
          return `${target}: PNG image data, 800 x 600, 8-bit/color RGBA, non-interlaced`;
        }
        if (target.endsWith('.jpg') || target.endsWith('.jpeg')) {
          return `${target}: JPEG image data, JFIF standard 1.01, aspect ratio, density 1x1, segment length 16`;
        }
        if (target.endsWith('.py')) {
          return `${target}: Python script, ASCII text executable`;
        }
        if (target.endsWith('.c') || target.endsWith('.h')) {
          return `${target}: C source, ASCII text`;
        }
        if (target.endsWith('.sh')) {
          return `${target}: Bourne-Again shell script, ASCII text executable`;
        }
        if (target.endsWith('.zip')) {
          return `${target}: Zip archive data, at least v2.0 to extract`;
        }
        if (target.endsWith('.gz') || target.endsWith('.tar.gz')) {
          return `${target}: gzip compressed data`;
        }
        if (target.endsWith('.pdf')) {
          return `${target}: PDF document, version 1.7`;
        }
        if (target.endsWith('.b64') || content.match(/^[A-Za-z0-9+/=\s]+$/)) {
          return `${target}: ASCII text (base64 encoded data)`;
        }
        return `${target}: ASCII text, with CRLF line terminators`;
      }

      case 'strings': {
        if (cmdArgs.length === 0) return 'strings: missing operand';
        const target = cmdArgs[cmdArgs.length - 1];
        const { node } = this.resolveNode(target);
        if (!node) {
          return `strings: '${target}': No such file`;
        }
        const content = node.content || '';
        // Extract printable lines >= 4 chars
        const matches = content.match(/[A-Za-z0-9_\-!@#$%^&*()+=~`{}[\]:;"'<>,.?/\\|]{4,}/g);
        if (matches && matches.length > 0) {
          return matches.slice(0, 50).join('\n');
        }
        return content;
      }

      case 'grep': {
        // Parse flags
        const flags: string[] = [];
        const nonFlagArgs: string[] = [];
        for (const a of cmdArgs) {
          if (a.startsWith('-') && !a.startsWith('--')) {
            flags.push(a);
          } else {
            nonFlagArgs.push(a);
          }
        }
        if (nonFlagArgs.length < 2) return 'grep: missing pattern or file';
        
        const pattern = nonFlagArgs[0];
        const target = nonFlagArgs[1];
        const caseInsensitive = flags.some(f => f.includes('i'));
        const invertMatch = flags.some(f => f.includes('v'));
        const showLineNums = flags.some(f => f.includes('n'));
        const countOnly = flags.some(f => f.includes('c'));

        const { node } = this.resolveNode(target);
        if (!node) {
          return `grep: ${target}: No such file or directory`;
        }
        const lines = (node.content || '').split('\n');
        const regexFlags = caseInsensitive ? 'i' : '';
        let regex: RegExp;
        try {
          regex = new RegExp(pattern, regexFlags);
        } catch {
          regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), regexFlags);
        }

        let matched = lines.map((l, i) => ({ line: l, num: i + 1 })).filter(({ line }) => {
          const m = regex.test(line);
          return invertMatch ? !m : m;
        });

        if (countOnly) return matched.length.toString();
        if (showLineNums) return matched.map(({ line, num }) => `${num}:${line}`).join('\n');
        return matched.map(({ line }) => line).join('\n');
      }

      case 'find': {
        const pathArg = cmdArgs[0] || '.';
        const nameIdx = cmdArgs.indexOf('-name');
        const typeIdx = cmdArgs.indexOf('-type');
        const permIdx = cmdArgs.indexOf('-perm');
        const pattern = nameIdx !== -1 ? cmdArgs[nameIdx + 1] : null;
        const typeFilter = typeIdx !== -1 ? cmdArgs[typeIdx + 1] : null;
        const permFilter = permIdx !== -1 ? cmdArgs[permIdx + 1] : null;
        const results: string[] = [];

        const globMatch = (name: string, pat: string): boolean => {
          // Convert glob to regex
          const regexStr = '^' + pat.replace(/\*/g, '.*').replace(/\?/g, '.') + '$';
          try {
            return new RegExp(regexStr).test(name);
          } catch {
            return name.includes(pat.replace(/\*/g, ''));
          }
        };

        const traverse = (node: VirtualFile, currPath: string) => {
          let include = true;
          if (pattern && !globMatch(node.name, pattern)) include = false;
          if (typeFilter === 'f' && node.type !== 'file') include = false;
          if (typeFilter === 'd' && node.type !== 'dir') include = false;
          if (permFilter) {
            const perm = node.permissions || '';
            if (permFilter === '-4000' && !perm.includes('s')) include = false;
          }
          if (include) results.push(currPath);
          if (node.type === 'dir' && node.children) {
            for (const childName of Object.keys(node.children)) {
              traverse(node.children[childName], `${currPath === '/' ? '' : currPath}/${childName}`);
            }
          }
        };

        const { node } = this.resolveNode(pathArg);
        if (node) {
          traverse(node, pathArg === '.' ? '.' : pathArg);
          return results.join('\n');
        }
        return `find: '${pathArg}': No such file or directory`;
      }

      case 'base64': {
        if (cmdArgs.includes('-d') || cmdArgs.includes('--decode')) {
          const fileArg = cmdArgs.find(a => !a.startsWith('-'));
          if (fileArg) {
            const { node } = this.resolveNode(fileArg);
            if (!node || !node.content) return `base64: ${fileArg}: No such file or empty`;
            try {
              return atob(node.content.trim());
            } catch {
              return 'base64: invalid input';
            }
          }
        }
        // Encode mode
        const fileArg = cmdArgs.find(a => !a.startsWith('-'));
        if (fileArg) {
          const { node } = this.resolveNode(fileArg);
          if (!node || !node.content) return `base64: ${fileArg}: No such file or empty`;
          return btoa(node.content);
        }
        return 'base64: please supply -d <file> or <file>';
      }

      case 'echo': {
        // Handle $VAR expansion
        const result = cmdArgs.map(a => {
          if (a.startsWith('$')) {
            const varName = a.slice(1);
            return this.envVars[varName] || '';
          }
          return a;
        }).join(' ');
        return result;
      }

      case 'ping': {
        const host = cmdArgs[0] || 'localhost';
        return `PING ${host} (10.10.10.100) 56(84) bytes of data.
64 bytes from ${host} (10.10.10.100): icmp_seq=1 ttl=64 time=0.42 ms
64 bytes from ${host} (10.10.10.100): icmp_seq=2 ttl=64 time=0.38 ms
64 bytes from ${host} (10.10.10.100): icmp_seq=3 ttl=64 time=0.41 ms

--- ${host} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 0.380/0.403/0.420/0.017 ms`;
      }

      case 'nc':
      case 'netcat': {
        const host = cmdArgs[0] || 'localhost';
        const port = cmdArgs[1] || '1337';
        return `Connection to ${host} ${port} port [tcp/*] succeeded!
[+] Welcome to FlagForge CTF Remote Challenge Service v1.0
[+] Authentic Handshake Initialized.
[+] Service payload ready. Type input or inspect challenge file.`;
      }

      case 'curl': {
        const url = cmdArgs.find(a => !a.startsWith('-')) || 'http://localhost';
        const verbose = cmdArgs.includes('-v');
        const headerPrefix = verbose ? `> GET / HTTP/1.1
> Host: ${url}
> User-Agent: curl/8.5.0
> Accept: */*
> 
< HTTP/1.1 200 OK
< Server: FlagForge-Internal/1.4.2
< Content-Type: text/html; charset=UTF-8
< X-Powered-By: Express
< 
` : '';

        return `${headerPrefix}HTTP/1.1 200 OK
Host: ${url}
Server: FlagForge-Internal/1.4.2
Content-Type: text/html; charset=UTF-8

<!DOCTYPE html>
<html>
  <!-- [DEBUG] Secret development endpoint located at /hidden_backup_7749.txt -->
  <body>
    <h1>Internal Web Portal</h1>
    <p>Authentication Required.</p>
  </body>
</html>`;
      }

      case 'clear':
        return '__CLEAR__';

      case 'exit':
      case 'logout':
        return '[Process completed]';

      default:
        return `bash: ${cmd}: command not found (try 'help' for available commands)`;
    }
  }

  private handlePipeline(pipeCmd: string): string {
    const parts = pipeCmd.split('|').map(p => p.trim());
    let currentOutput = '';

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === 0) {
        // Execute first command without pipe detection (use executeSingle)
        currentOutput = this.executeSingle(part);
      } else {
        const subArgs = part.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
        const unquotedSubArgs = subArgs.map(a => a.replace(/^['"]|['"]$/g, ''));
        const subCmd = unquotedSubArgs[0]?.toLowerCase();
        const subCmdArgs = unquotedSubArgs.slice(1);

        if (subCmd === 'base64' && (subCmdArgs.includes('-d') || subCmdArgs.includes('--decode'))) {
          try {
            currentOutput = atob(currentOutput.trim());
          } catch {
            return 'base64: invalid input';
          }
        } else if (subCmd === 'grep') {
          const flags: string[] = [];
          const nonFlagArgs: string[] = [];
          for (const a of subCmdArgs) {
            if (a.startsWith('-')) flags.push(a);
            else nonFlagArgs.push(a);
          }
          const pattern = nonFlagArgs[0] || '';
          const caseInsensitive = flags.some(f => f.includes('i'));
          const invertMatch = flags.some(f => f.includes('v'));
          const lines = currentOutput.split('\n');
          const regexFlags = caseInsensitive ? 'i' : '';
          let regex: RegExp;
          try {
            regex = new RegExp(pattern, regexFlags);
          } catch {
            regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), regexFlags);
          }
          currentOutput = lines.filter(l => {
            const m = regex.test(l);
            return invertMatch ? !m : m;
          }).join('\n');
        } else if (subCmd === 'head') {
          let n = 10;
          const nIdx = subCmdArgs.indexOf('-n');
          if (nIdx !== -1 && subCmdArgs[nIdx + 1]) n = parseInt(subCmdArgs[nIdx + 1]) || 10;
          currentOutput = currentOutput.split('\n').slice(0, n).join('\n');
        } else if (subCmd === 'tail') {
          let n = 10;
          const nIdx = subCmdArgs.indexOf('-n');
          if (nIdx !== -1 && subCmdArgs[nIdx + 1]) n = parseInt(subCmdArgs[nIdx + 1]) || 10;
          const lines = currentOutput.split('\n');
          currentOutput = lines.slice(Math.max(0, lines.length - n)).join('\n');
        } else if (subCmd === 'sort') {
          const lines = currentOutput.split('\n');
          if (subCmdArgs.includes('-r')) {
            currentOutput = lines.sort().reverse().join('\n');
          } else if (subCmdArgs.includes('-n')) {
            currentOutput = lines.sort((a, b) => parseFloat(a) - parseFloat(b)).join('\n');
          } else {
            currentOutput = lines.sort().join('\n');
          }
        } else if (subCmd === 'uniq') {
          const lines = currentOutput.split('\n');
          const result: string[] = [];
          const countMode = subCmdArgs.includes('-c');
          let prev = '';
          let count = 0;
          for (const line of lines) {
            if (line === prev) {
              count++;
            } else {
              if (prev !== '' || count > 0) {
                result.push(countMode ? `      ${count} ${prev}` : prev);
              }
              prev = line;
              count = 1;
            }
          }
          if (count > 0) result.push(countMode ? `      ${count} ${prev}` : prev);
          currentOutput = result.join('\n');
        } else if (subCmd === 'wc') {
          const lines = currentOutput.split('\n');
          const words = currentOutput.split(/\s+/).filter(w => w.length > 0).length;
          if (subCmdArgs.includes('-l')) currentOutput = lines.length.toString();
          else if (subCmdArgs.includes('-w')) currentOutput = words.toString();
          else if (subCmdArgs.includes('-c')) currentOutput = currentOutput.length.toString();
          else currentOutput = `  ${lines.length}  ${words} ${currentOutput.length}`;
        } else if (subCmd === 'rev') {
          currentOutput = currentOutput.split('\n').map(l => l.split('').reverse().join('')).join('\n');
        } else if (subCmd === 'tr') {
          if (subCmdArgs.length >= 2) {
            const from = subCmdArgs[0].replace(/^['"]|['"]$/g, '');
            const to = subCmdArgs[1].replace(/^['"]|['"]$/g, '');
            let result = currentOutput;
            for (let i = 0; i < Math.min(from.length, to.length); i++) {
              result = result.split(from[i]).join(to[i]);
            }
            currentOutput = result;
          }
        } else if (subCmd === 'cut') {
          let delimiter = '\t';
          let fields: number[] = [];
          for (let j = 0; j < subCmdArgs.length; j++) {
            const a = subCmdArgs[j];
            if (a.startsWith('-d')) {
              delimiter = a.length > 2 ? a.slice(2) : (subCmdArgs[++j] || '\t');
            } else if (a.startsWith('-f')) {
              const fStr = a.length > 2 ? a.slice(2) : (subCmdArgs[++j] || '1');
              fields = fStr.split(',').map(n => parseInt(n) - 1).filter(n => !isNaN(n));
            }
          }
          currentOutput = currentOutput.split('\n').map(line => {
            const p = line.split(delimiter);
            return fields.map(f => p[f] || '').join(delimiter);
          }).join('\n');
        } else if (subCmd === 'tee') {
          // Tee writes to file AND passes through
          const fileArg = subCmdArgs.find(a => !a.startsWith('-'));
          if (fileArg) {
            const { parentNode, fileName } = this.resolveParentAndName(fileArg);
            if (parentNode && parentNode.type === 'dir') {
              if (!parentNode.children) parentNode.children = {};
              parentNode.children[fileName] = {
                name: fileName,
                type: 'file',
                content: currentOutput,
                permissions: '-rw-r--r--',
                owner: this.currentUser,
              };
            }
          }
          // Output passes through unchanged
        } else if (subCmd === 'xxd') {
          const content = currentOutput;
          const lines: string[] = [];
          for (let j = 0; j < Math.min(content.length, 256); j += 16) {
            const offset = j.toString(16).padStart(8, '0');
            const chunk = content.slice(j, j + 16);
            const hexParts: string[] = [];
            const asciiParts: string[] = [];
            for (let k = 0; k < 16; k++) {
              if (k < chunk.length) {
                const code = chunk.charCodeAt(k);
                hexParts.push(code.toString(16).padStart(2, '0'));
                asciiParts.push(code >= 32 && code <= 126 ? chunk[k] : '.');
              } else {
                hexParts.push('  ');
                asciiParts.push(' ');
              }
            }
            lines.push(`${offset}: ${hexParts.join(' ')}  ${asciiParts.join('')}`);
          }
          currentOutput = lines.join('\n');
        }
      }
    }
    return currentOutput;
  }
}
