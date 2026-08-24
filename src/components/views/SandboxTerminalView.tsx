import React from 'react';
import { InteractiveTerminal } from '../terminal/InteractiveTerminal';
import { VirtualFSConfig } from '../../types';

export const SandboxTerminalView: React.FC = () => {
  const sandboxFS: VirtualFSConfig = {
    initialDir: '/home/cadet',
    currentUser: 'cadet',
    hostname: 'flagforge-sandbox',
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
                'cheatsheet.txt': {
                  name: 'cheatsheet.txt',
                  type: 'file',
                  content: `=== FLAGFORGE TERMINAL CHEATSHEET ===
1. Navigasi:
   pwd                  - Lihat direktori saat ini
   ls -la               - Lihat semua file (termasuk hidden dotfiles)
   cd <dir>             - Masuk ke direktori
   cd ..                - Kembali ke direktori sebelumnya

2. Text Processing & Forensics:
   cat <file>           - Tampilkan isi file teks
   strings <file>       - Ekstrak string ASCII dari file binary
   file <file>          - Deteksi magic bytes / tipe asli file
   grep "pattern" <file>- Filter baris teks

3. Decode & Network:
   base64 -d <file>     - Decode teks base64
   nc <host> <port>     - Netcat handshake simulasi
   curl <url>           - Fetch simulated HTTP response`
                },
                'demo_crypto.b64': {
                  name: 'demo_crypto.b64',
                  type: 'file',
                  content: 'ZmxhZ3tzYW5kYm94X2Jhc2U2NF9kZWNvZGVkXzc3Nzl9'
                },
                'sample_pcap.pcap': {
                  name: 'sample_pcap.pcap',
                  type: 'file',
                  content: 'PCAP_SIMULATED_NETWORK_STREAM_FLAG:flag{sandbox_pcap_sniffed_packet}'
                },
                'lab_targets': {
                  name: 'lab_targets',
                  type: 'dir',
                  children: {
                    'vulnerable_app.elf': {
                      name: 'vulnerable_app.elf',
                      type: 'file',
                      content: 'ELF_BINARY_x86_64_FLAG_KEY:flag{sandbox_reverse_elf_binary_strings}'
                    },
                    'hidden_flag.txt': {
                      name: 'hidden_flag.txt',
                      type: 'file',
                      content: 'flag{sandbox_explorer_found_hidden_target}'
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

  return (
    <div className="space-y-6 pb-12">
      {/* Header Info */}
      <section className="bg-surface-panel text-txt-on-light rounded-[32px] p-6 shadow-panel-card border border-white/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-state-solved animate-pulse" />
              <span className="text-xs font-mono font-bold text-flag uppercase tracking-wider">
                UNRESTRICTED CTF SHELL
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-txt-on-light">
              Sandbox Terminal Bebas
            </h2>
          </div>
          <p className="text-xs md:text-sm text-txt-subtle max-w-md">
            Eksplorasi command line Linux tanpa batas soal. Coba uji coba decoding, grep filtering, dan simulasi network packet.
          </p>
        </div>
      </section>

      {/* Terminal Display */}
      <div className="space-y-4">
        <InteractiveTerminal
          fsConfig={sandboxFS}
          title="STANDALONE SANDBOX WORKSTATION"
          subtitle="Full Virtual POSIX Shell Environment"
          initialWelcome={`[+] FlagForge Standalone Sandbox Matrix Initialized.
[+] Host: flagforge-sandbox (x86_64 Linux 6.8)
[+] Catatan: Coba perintah 'ls -la', 'cat cheatsheet.txt', atau 'base64 -d demo_crypto.b64'.`}
          heightClass="h-[520px]"
        />
      </div>
    </div>
  );
};
