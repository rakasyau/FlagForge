import React, { useState, useEffect, useRef } from 'react';
import { VirtualFSConfig } from '../../types';
import { VirtualFSEngine } from '../../services/virtualFS';
import { Terminal as TerminalIcon, Copy, Trash2, RotateCcw, Check } from 'lucide-react';

interface TerminalProps {
  fsConfig?: VirtualFSConfig;
  title?: string;
  subtitle?: string;
  initialWelcome?: string;
  heightClass?: string;
  onCommandExecuted?: (cmd: string, output: string) => void;
  showShortcuts?: boolean;
}

export const InteractiveTerminal: React.FC<TerminalProps> = ({
  fsConfig,
  title = 'FLAGFORGE SECURITY WORKBENCH',
  subtitle = 'Interactive Virtual Linux Environment',
  initialWelcome,
  heightClass = 'h-72 md:h-96',
  onCommandExecuted,
  showShortcuts = true,
}) => {
  const defaultFS: VirtualFSConfig = {
    initialDir: '/home/cadet',
    currentUser: 'cadet',
    hostname: 'flagforge-box',
    root: {
      name: '/',
      type: 'dir',
      children: {
        home: {
          name: 'home',
          type: 'dir',
          children: {
            cadet: {
              name: 'cadet',
              type: 'dir',
              children: {
                'welcome.txt': {
                  name: 'welcome.txt',
                  type: 'file',
                  content: 'Selamat datang di FlagForge Terminal! Ketik `help` untuk daftar command atau gunakan `ls -la` untuk melihat file.'
                },
                'tools': {
                  name: 'tools',
                  type: 'dir',
                  children: {
                    'notes.md': {
                      name: 'notes.md',
                      type: 'file',
                      content: '# CTF Tools Cheatsheet\n- Wireshark: Analisis pcap\n- Burp Suite: Intercept HTTP\n- Ghidra: Reverse engineering\n- CyberChef: Multi-layer decoding'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  const [engine, setEngine] = useState<VirtualFSEngine>(() => new VirtualFSEngine(fsConfig || defaultFS));
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output' | 'system'; text: string; prompt?: string }>>([
    {
      type: 'system',
      text: initialWelcome || `FlagForge Interactive Kernel 6.8.0-45 (x86_64)
System initialized with virtual root filesystem.
Type "help" for a list of available cybersecurity CLI commands.`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copied, setCopied] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setEngine(new VirtualFSEngine(fsConfig || defaultFS));
    setHistory([
      {
        type: 'system',
        text: initialWelcome || `FlagForge Interactive Shell Ready. Type "help" or "ls -la" to start.`
      }
    ]);
  }, [fsConfig, initialWelcome]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = inputVal.trim();
      if (!command) {
        setHistory(prev => [...prev, { type: 'input', text: '', prompt: engine.getPrompt() }]);
        setInputVal('');
        return;
      }

      // Add to command history
      setCmdHistory(prev => [...prev, command]);
      setHistoryIndex(-1);

      const promptStr = engine.getPrompt();
      const output = engine.execute(command);

      if (output === '__CLEAR__') {
        setHistory([]);
      } else {
        setHistory(prev => [
          ...prev,
          { type: 'input', text: command, prompt: promptStr },
          ...(output ? [{ type: 'output' as const, text: output }] : [])
        ]);
      }

      if (onCommandExecuted) {
        onCommandExecuted(command, output);
      }

      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(cmdHistory[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple autocompletion
      const tokens = inputVal.split(' ');
      const lastToken = tokens[tokens.length - 1];
      const commonCommands = ['ls', 'cd', 'cat', 'pwd', 'whoami', 'file', 'strings', 'grep', 'find', 'base64', 'curl', 'nc', 'clear', 'help'];
      const matches = commonCommands.filter(c => c.startsWith(lastToken));
      if (matches.length === 1) {
        tokens[tokens.length - 1] = matches[0];
        setInputVal(tokens.join(' ') + ' ');
      }
    }
  };

  const handleCopy = () => {
    const textToCopy = history
      .map(item => (item.type === 'input' ? `${item.prompt} ${item.text}` : item.text))
      .join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setEngine(new VirtualFSEngine(fsConfig || defaultFS));
    setHistory([
      {
        type: 'system',
        text: 'Terminal reset. Virtual filesystem refreshed to initial challenge state.'
      }
    ]);
  };

  const handleQuickCommand = (cmd: string) => {
    setInputVal(cmd);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col bg-surface-dark-card border border-white/10 rounded-2xl overflow-hidden shadow-terminal relative group transition-all duration-300">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#131316] border-b border-white/5 select-none">
        <div className="flex items-center gap-3">
          {/* Mac-like or Instrument Status Indicators */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
          </div>

          <div className="flex items-center gap-2">
            <TerminalIcon className="w-3.5 h-3.5 text-flag" />
            <span className="text-xs font-mono font-bold text-txt-on-dark tracking-wide">{title}</span>
            <span className="text-[10px] text-txt-subtle hidden sm:inline-block">({subtitle})</span>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            title="Salin log terminal"
            className="p-1.5 rounded-md hover:bg-white/10 text-txt-muted hover:text-txt-on-dark transition-colors text-xs flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-state-solved" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setHistory([])}
            title="Bersihkan layar (clear)"
            className="p-1.5 rounded-md hover:bg-white/10 text-txt-muted hover:text-txt-on-dark transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            title="Reset Filesystem"
            className="p-1.5 rounded-md hover:bg-white/10 text-txt-muted hover:text-txt-on-dark transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className={`p-4 font-mono text-xs md:text-sm overflow-y-auto leading-relaxed bg-[#0E0E12] text-[#E0DFDB] ${heightClass} cursor-text scanline-overlay`}
      >
        {history.map((item, idx) => (
          <div key={idx} className="mb-1.5 whitespace-pre-wrap break-all">
            {item.type === 'system' && (
              <div className="text-txt-subtle text-xs border-l-2 border-flag/40 pl-2 py-0.5 my-1">
                {item.text}
              </div>
            )}
            {item.type === 'input' && (
              <div className="flex items-center gap-1.5 text-txt-on-dark">
                <span className="text-flag font-semibold">{item.prompt}</span>
                <span className="text-white font-bold">{item.text}</span>
              </div>
            )}
            {item.type === 'output' && (
              <div className="text-[#C8C7C2] pl-2 border-l border-white/5">
                {item.text}
              </div>
            )}
          </div>
        ))}

        {/* Current Active Input Line */}
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-flag font-semibold shrink-0">{engine.getPrompt()}</span>
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white font-mono text-xs md:text-sm focus:outline-none border-none p-0 tracking-wide"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            {/* Blinking glowing signature orange cursor */}
            <span className="w-2 h-4 bg-flag shadow-orange-glow-sm inline-block animate-blink shrink-0" />
          </div>
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Bottom Quick Commands Bar */}
      {showShortcuts && (
        <div className="flex items-center justify-between flex-wrap gap-2 px-3 py-2 bg-[#131316] border-t border-white/5 text-[11px] font-mono text-txt-subtle">
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-txt-muted text-[10px] uppercase font-bold shrink-0">Quick Cmds:</span>
            {['ls -la', 'cat notes.txt', 'help', 'whoami', 'pwd'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleQuickCommand(cmd)}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-flag/20 hover:text-flag transition-colors border border-white/5 shrink-0"
              >
                {cmd}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] text-txt-subtle">
            <span>[Tab] autocomplete</span>
            <span>[↑/↓] history</span>
          </div>
        </div>
      )}
    </div>
  );
};
