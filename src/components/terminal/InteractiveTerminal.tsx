import React, { useState, useEffect, useRef } from 'react';
import { VirtualFSEngine } from '../../services/virtualFS';
import { VirtualFSConfig } from '../../types';
import { Terminal, RotateCcw, Copy, Check, Sparkles } from 'lucide-react';

interface TerminalProps {
  title?: string;
  subtitle?: string;
  fsConfig?: VirtualFSConfig;
  initialWelcome?: string;
  onCommandExecuted?: (command: string, output: string) => void;
  heightClass?: string;
  showShortcuts?: boolean;
}

const defaultFSConfig: VirtualFSConfig = {
  initialDir: '/home/cadet',
  currentUser: 'cadet',
  hostname: 'flagforge-box',
  root: {
    name: '/',
    type: 'dir',
    children: {
      bin: {
        name: 'bin',
        type: 'dir',
        children: {
          'sh': { name: 'sh', type: 'file', permissions: '-rwxr-xr-x' },
          'bash': { name: 'bash', type: 'file', permissions: '-rwxr-xr-x' },
          'grep': { name: 'grep', type: 'file', permissions: '-rwxr-xr-x' }
        }
      },
      home: {
        name: 'home',
        type: 'dir',
        children: {
          cadet: {
            name: 'cadet',
            type: 'dir',
            children: {
              'readme.txt': {
                name: 'readme.txt',
                type: 'file',
                content: `Selamat Datang di Terminal FlagForge!
Ketik "help" untuk melihat daftar perintah yang didukung.
Gunakan "ls -la" untuk melihat berkas tersembunyi.
Gunakan "cat <filename>" untuk membaca konten berkas.`,
                permissions: '-rw-r--r--'
              },
              'notes.txt': {
                name: 'notes.txt',
                type: 'file',
                content: `Tips CTF:
1. Selalu periksa file berekstensi aneh.
2. Gunakan perintah "file" dan "strings" untuk analisis awal.
3. String base64 berakhiran "=" sering memuat rahasia.`,
                permissions: '-rw-r--r--'
              }
            }
          }
        }
      }
    }
  }
};

export const InteractiveTerminal: React.FC<TerminalProps> = ({
  title,
  subtitle: _subtitle,
  fsConfig,
  initialWelcome,
  onCommandExecuted,
  heightClass = 'min-h-[260px] sm:min-h-[300px] max-h-[420px] sm:max-h-[500px]',
  showShortcuts = true,
}) => {
  const [engine, setEngine] = useState<VirtualFSEngine>(() => new VirtualFSEngine(fsConfig || defaultFSConfig));
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output' | 'system'; text: string; prompt?: string }>>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const terminalBodyRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initialize engine and welcome message
  useEffect(() => {
    setEngine(new VirtualFSEngine(fsConfig || defaultFSConfig));
    setHistory([
      {
        type: 'system',
        text: initialWelcome || `FlagForge Interactive Shell Ready. Type "help" or "ls -la" to start.`
      }
    ]);
  }, [fsConfig, initialWelcome]);

  // Safe inner-only scroll (never scrolls the outer window or parent page)
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    // Don't steal focus if the user has selected text (they may want to copy it)
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }
    inputRef.current?.focus();
    setIsFocused(true);
  };

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
    }
  };

  const handleQuickCommand = (cmd: string) => {
    focusInput();
    const promptStr = engine.getPrompt();
    const output = engine.execute(cmd);

    setCmdHistory(prev => [...prev, cmd]);
    setHistory(prev => [
      ...prev,
      { type: 'input', text: cmd, prompt: promptStr },
      ...(output ? [{ type: 'output' as const, text: output }] : [])
    ]);

    if (onCommandExecuted) {
      onCommandExecuted(cmd, output);
    }
  };

  const handleResetTerminal = () => {
    setEngine(new VirtualFSEngine(fsConfig || defaultFSConfig));
    setHistory([
      {
        type: 'system',
        text: `Terminal di-reset ke kondisi awal. Filesystem siap.`
      }
    ]);
    setInputVal('');
    focusInput();
  };

  const handleCopyHistory = () => {
    const rawText = history
      .map(item => item.prompt ? `${item.prompt} ${item.text}` : item.text)
      .join('\n');
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={focusInput}
      className={`rounded-2xl sm:rounded-3xl bg-[#0A0A0C] border transition-all duration-200 shadow-2xl overflow-hidden flex flex-col cursor-text select-text ${
        isFocused ? 'border-flag/40 shadow-orange-glow-sm' : 'border-white/10'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-[#131316] border-b border-white/5 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#EF4444] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#10B981] inline-block shadow-sm" />
          </div>
          <span className="text-txt-subtle text-[11px] font-mono flex items-center gap-1.5 ml-2 font-medium">
            <Terminal className="w-3.5 h-3.5 text-flag" />
            <span>{title || 'flagforge-virtual-shell'}</span>
          </span>
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopyHistory();
            }}
            title="Salin log terminal"
            className="p-1.5 rounded-md hover:bg-white/10 text-txt-muted hover:text-txt-on-dark transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-state-solved" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleResetTerminal();
            }}
            title="Reset filesystem terminal"
            className="p-1.5 rounded-md hover:bg-white/10 text-txt-muted hover:text-txt-on-dark transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div 
        ref={terminalBodyRef}
        onClick={focusInput}
        className={`p-3.5 sm:p-4 font-mono text-xs md:text-sm overflow-y-auto leading-relaxed bg-[#0E0E12] text-[#E0DFDB] ${heightClass} cursor-text scrollbar-thin relative scanline-overlay`}
      >
        <div className="relative z-10 space-y-1.5">
          {history.map((item, idx) => (
            <div key={idx} className="whitespace-pre-wrap break-all">
              {item.type === 'system' && (
                <div className="text-txt-subtle text-xs border-l-2 border-flag/40 pl-2 py-0.5 my-1 font-mono">
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
                <div className="text-[#C8C7C2] pl-2 border-l border-white/5 text-[11px] sm:text-xs">
                  {item.text}
                </div>
              )}
            </div>
          ))}

          {/* Current Active Input Line */}
          <div 
            onClick={focusInput}
            className="flex items-center gap-1.5 mt-2 cursor-text"
          >
            <span className="text-flag font-semibold shrink-0 select-none">{engine.getPrompt()}</span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-white font-mono text-xs md:text-sm focus:outline-none border-none p-0 tracking-wide"
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
              />
              {/* Blinking glowing signature orange cursor */}
              <span className={`w-2 h-4 bg-flag shadow-orange-glow-sm inline-block shrink-0 ${isFocused ? 'animate-blink' : 'opacity-30'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Quick Commands Bar */}
      {showShortcuts && (
        <div className="flex items-center justify-between flex-wrap gap-2 px-3 py-2 bg-[#131316] border-t border-white/5 text-[11px] font-mono text-txt-subtle select-none">
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none w-full sm:w-auto">
            <span className="text-txt-muted text-[10px] uppercase font-bold shrink-0">Quick Cmds:</span>
            {['ls -la', 'cat notes.txt', 'help', 'whoami', 'pwd'].map((cmd) => (
              <button
                key={cmd}
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickCommand(cmd);
                }}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-flag/20 hover:text-flag transition-colors border border-white/5 shrink-0 text-[10px] font-mono"
              >
                {cmd}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] text-txt-subtle">
            <span>[↑/↓] history</span>
            <span className="text-flag flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Interactive Shell
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
