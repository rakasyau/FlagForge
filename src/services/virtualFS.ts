import { VirtualFile, VirtualFSConfig } from '../types';

export class VirtualFSEngine {
  private root: VirtualFile;
  private currentPath: string[];
  public currentUser: string;
  public hostname: string;

  constructor(config: VirtualFSConfig) {
    this.root = JSON.parse(JSON.stringify(config.root)); // Deep clone
    this.currentUser = config.currentUser || 'challenger';
    this.hostname = config.hostname || 'flagforge-box';
    this.currentPath = config.initialDir ? config.initialDir.split('/').filter(Boolean) : ['home', this.currentUser];
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

  private resolveNode(pathStr: string): { node: VirtualFile | null; parent: VirtualFile | null; name: string } {
    if (!pathStr || pathStr === '.') {
      return { node: this.getCurrentDirNode(), parent: null, name: '.' };
    }

    let parts: string[];
    let current: VirtualFile;

    if (pathStr.startsWith('/')) {
      parts = pathStr.split('/').filter(Boolean);
      current = this.root;
    } else if (pathStr.startsWith('~')) {
      const sub = pathStr.slice(1).split('/').filter(Boolean);
      parts = ['home', this.currentUser, ...sub];
      current = this.root;
    } else {
      parts = [...this.currentPath, ...pathStr.split('/').filter(Boolean)];
      current = this.root;
    }

    const normalizedParts: string[] = [];
    for (const part of parts) {
      if (part === '..') {
        normalizedParts.pop();
      } else if (part !== '.') {
        normalizedParts.push(part);
      }
    }

    let parent: VirtualFile | null = null;
    let name = '/';

    for (let i = 0; i < normalizedParts.length; i++) {
      name = normalizedParts[i];
      if (!current.children || !current.children[name]) {
        return { node: null, parent: current, name };
      }
      parent = current;
      current = current.children[name];
    }

    return { node: current, parent, name };
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

  public execute(commandLine: string): string {
    const trimmed = commandLine.trim();
    if (!trimmed) return '';

    // Handle piping for basic base64 / grep
    if (trimmed.includes('|')) {
      return this.handlePipeline(trimmed);
    }

    const args = trimmed.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
    const unquotedArgs = args.map(a => a.replace(/^['"]|['"]$/g, ''));
    const cmd = unquotedArgs[0]?.toLowerCase();
    const cmdArgs = unquotedArgs.slice(1);

    switch (cmd) {
      case 'help':
        return `FlagForge Virtual Shell v2.4 (x86_64-linux-gnu)
Available Built-in Commands:
  ls [-la] [path]       - List directory contents
  cd <dir>             - Change working directory
  pwd                  - Print working directory
  cat <file>           - Display file content
  file <file>          - Determine file type
  strings <file>       - Find printable strings in binary/data
  grep <pattern> <file>- Search pattern in file
  find <path> -name <p>- Search files by name
  whoami               - Display current user
  uname -a             - System information
  base64 -d <file>     - Base64 decode content
  nc <host> <port>     - Simulated network handshake
  curl <url>           - Fetch simulated web endpoint
  echo [text]          - Print arguments to terminal
  clear                - Clear the terminal screen
  help                 - Show this help manual`;

      case 'pwd':
        return this.getCwd();

      case 'whoami':
        return this.currentUser;

      case 'uname':
        if (cmdArgs.includes('-a')) {
          return `Linux ${this.hostname} 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`;
        }
        return 'Linux';

      case 'cd': {
        const target = cmdArgs[0] || '~';
        if (target === '~' || target === '') {
          this.currentPath = ['home', this.currentUser];
          return '';
        }
        if (target === '/') {
          this.currentPath = [];
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
          for (const p of parts) {
            if (p === '..') {
              this.currentPath.pop();
            } else if (p !== '.') {
              this.currentPath.push(p);
            }
          }
        }
        return '';
      }

      case 'ls': {
        const showAll = cmdArgs.some(a => a.includes('a'));
        const showLong = cmdArgs.some(a => a.includes('l'));
        const pathArg = cmdArgs.find(a => !a.startsWith('-')) || '.';
        const { node } = this.resolveNode(pathArg);

        if (!node) {
          return `ls: cannot access '${pathArg}': No such file or directory`;
        }

        if (node.type === 'file') {
          return node.name;
        }

        const children = node.children || {};
        const entries = Object.keys(children).filter(name => showAll || !name.startsWith('.'));

        if (showLong) {
          const lines = [`total ${entries.length * 4}`];
          if (showAll) {
            lines.push(`drwxr-xr-x 2 ${this.currentUser} ${this.currentUser} 4096 Aug 24 10:00 .`);
            lines.push(`drwxr-xr-x 4 root root 4096 Aug 24 09:30 ..`);
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
        const target = cmdArgs[0];
        const { node } = this.resolveNode(target);
        if (!node) {
          return `cat: ${target}: No such file or directory`;
        }
        if (node.type === 'dir') {
          return `cat: ${target}: Is a directory`;
        }
        return node.content || '';
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
        if (target.endsWith('.elf') || target.endsWith('.bin') || content.includes('\x7fELF') || content.startsWith('ELF')) {
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
        if (cmdArgs.length < 2) return 'grep: missing pattern or file';
        const pattern = cmdArgs[0];
        const target = cmdArgs[1];
        const { node } = this.resolveNode(target);
        if (!node) {
          return `grep: ${target}: No such file or directory`;
        }
        const lines = (node.content || '').split('\n');
        const regex = new RegExp(pattern, 'i');
        const matched = lines.filter(l => regex.test(l));
        return matched.join('\n');
      }

      case 'find': {
        const pathArg = cmdArgs[0] || '.';
        const nameIdx = cmdArgs.indexOf('-name');
        const pattern = nameIdx !== -1 ? cmdArgs[nameIdx + 1] : null;
        const results: string[] = [];

        const traverse = (node: VirtualFile, currPath: string) => {
          if (!pattern || node.name.includes(pattern.replace(/\*/g, ''))) {
            results.push(currPath);
          }
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
        return 'base64: please supply -d <file>';
      }

      case 'echo':
        return cmdArgs.join(' ');

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
        const url = cmdArgs[0] || 'http://localhost';
        return `HTTP/1.1 200 OK
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
        currentOutput = this.execute(part);
      } else {
        const subArgs = part.split(/\s+/);
        const subCmd = subArgs[0].toLowerCase();
        if (subCmd === 'base64' && (subArgs.includes('-d') || subArgs.includes('--decode'))) {
          try {
            currentOutput = atob(currentOutput.trim());
          } catch {
            return 'base64: invalid input';
          }
        } else if (subCmd === 'grep') {
          const pattern = subArgs[1] || '';
          const lines = currentOutput.split('\n');
          const regex = new RegExp(pattern, 'i');
          currentOutput = lines.filter(l => regex.test(l)).join('\n');
        } else if (subCmd === 'head') {
          currentOutput = currentOutput.split('\n').slice(0, 10).join('\n');
        } else if (subCmd === 'tail') {
          const lines = currentOutput.split('\n');
          currentOutput = lines.slice(Math.max(0, lines.length - 10)).join('\n');
        }
      }
    }
    return currentOutput;
  }
}
