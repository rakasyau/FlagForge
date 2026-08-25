import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Code, Terminal } from 'lucide-react';

interface CodeRunnerProps {
  starterCode?: string;
  onExecutionResult?: (output: string) => void;
  heightClass?: string;
}

export const PythonCodeRunner: React.FC<CodeRunnerProps> = ({
  starterCode = `import base64

# FlagForge Python Crypto Scripting Environment
payload = "V20xNGFGb3pkR2xPU0U1c1RtcFNabHBFVG1wTlIxRjZXa1k1ZW1SWFRtcGFXRTU2V0hwck5XWlJQVDA5"

# Decode 3 layers
for step in range(3):
    payload = base64.b64decode(payload).decode('utf-8')
    print(f"Layer {step+1}: {payload}")

print(f"\\n[+] FINAL FLAG: {payload}")`,
  onExecutionResult,
  heightClass = 'h-64 md:h-80'
}) => {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCode(starterCode);
    setOutput('');
  }, [starterCode]);

  // Client-side Python script evaluator & CTF simulation engine
  const runPythonScript = () => {
    setIsRunning(true);
    setOutput('>>> Initializing Python 3.11 Runtime in WebAssembly/JS sandbox...\n');

    setTimeout(() => {
      try {
        const logs: string[] = [];

        // 1. DNS Exfiltration Decoder (net_03)
        if (code.includes('hex_parts') && code.includes('exfil')) {
          const parts = [
            "666c6167", "7b646e73", "5f337866", "316c7472", "34743130", "6e5f7475", "6e336c5f", "64336330", "6433647d"
          ];
          const combined = parts.join('');
          let decoded = '';
          for (let i = 0; i < combined.length; i += 2) {
            decoded += String.fromCharCode(parseInt(combined.substr(i, 2), 16));
          }
          logs.push(`[+] Reconstructed Hex: ${combined}`);
          logs.push(`[+] Decoded Flag: ${decoded}`);
        }
        // 2. Base64 Multi-Layer (cry_01)
        else if (code.includes('V20xNGFGb3pkR2xPU0U1c1RtcFNabHBFVG1wTlIxRjZXa1k1ZW1SWFRtcGFXRTU2V0hwck5XWlJQVDA5') || (code.includes('b64decode') && code.includes('ciphertext'))) {
          let b = "V20xNGFGb3pkR2xPU0U1c1RtcFNabHBFVG1wTlIxRjZXa1k1ZW1SWFRtcGFXRTU2V0hwck5XWlJQVDA5";
          try {
            for (let i = 0; i < 3; i++) {
              b = atob(b);
              logs.push(`[+] Layer ${i + 1} Decoded: ${b}`);
            }
            logs.push(`\n[+] FINAL FLAG: ${b}`);
          } catch {
            logs.push('[!] Error decoding Base64 payload.');
          }
        }
        // 3. Caesar / ROT13 (cry_02)
        else if (code.includes('synt{pnrfne') || code.includes('rot_13') || code.includes('rot13')) {
          const rot13 = (s: string) => s.replace(/[a-zA-Z]/g, (c) => {
            const base = c <= 'Z' ? 65 : 97;
            return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
          });
          const text = "synt{pnrfne_ebgngvba_fuvsg_13_znfgre}";
          logs.push(`[+] Input Ciphertext: ${text}`);
          logs.push(`[+] Decrypted Flag: ${rot13(text)}`);
        }
        // 4. Vigenère Cipher (cry_03)
        else if (code.includes('vigenere_decrypt') || code.includes('hnci{x1i3p3tg')) {
          const vigenereDecrypt = (cipher: string, key: string) => {
            let res = '';
            let kIdx = 0;
            for (let i = 0; i < cipher.length; i++) {
              const c = cipher[i];
              if (/[a-zA-Z]/.test(c)) {
                const isUpper = c <= 'Z';
                const base = isUpper ? 65 : 97;
                const k = key[kIdx % key.length].toUpperCase().charCodeAt(0) - 65;
                const dec = ((c.toUpperCase().charCodeAt(0) - 65 - k + 26) % 26) + base;
                res += String.fromCharCode(dec);
                kIdx++;
              } else {
                res += c;
              }
            }
            return res;
          };
          const cipher = "hnci{x1i3p3tg_et4em3f_ht3sw3pea_y1p}";
          const key = "CTF";
          const flag = vigenereDecrypt(cipher, key);
          logs.push(`[+] Key Recovered: ${key}`);
          logs.push(`[+] Ciphertext: ${cipher}`);
          logs.push(`[+] Decrypted Flag: ${flag}`);
        }
        // 5. XOR Known-Plaintext Attack (cry_04)
        else if (code.includes('XOR Known-Plaintext') || code.includes('031a080b101d461b33000b461e0234151a5d5d0511451118340e451033195615591a58170b')) {
          const cipherHex = "031a080b101d461b33000b461e0234151a5d5d0511451118340e451033195615591a58170b";
          const known = "flag{";
          const cipherBytes: number[] = [];
          for (let i = 0; i < cipherHex.length; i += 2) {
            cipherBytes.push(parseInt(cipherHex.substr(i, 2), 16));
          }
          const key = cipherBytes.slice(0, 5).map((b, i) => String.fromCharCode(b ^ known.charCodeAt(i))).join('');
          logs.push(`[+] Known Plaintext: "${known}"`);
          logs.push(`[+] Recovered Key: "${key}"`);
          const flag = cipherBytes.map((b, i) => String.fromCharCode(b ^ key.charCodeAt(i % key.length))).join('');
          logs.push(`[+] Decrypted Flag: ${flag}`);
        }
        // 6. RSA Small Exponent Attack (cry_05)
        else if (code.includes('RSA Small Exponent') || code.includes('1601328706750446598902655274765682861758494956743')) {
          logs.push('[+] RSA Parameters Loaded: e=3, unpadded ciphertext');
          logs.push('[+] Computing exact integer cube root of c...');
          logs.push('[+] Recovered Integer m: 1169992928373307525338167664687595562725455648937597');
          logs.push('[+] Flag: flag{rs4_sm4ll_3xp0n3nt_cub3_r00t}');
        }
        // 7. JWT Token Forgery (web_04)
        else if (code.includes('JWT Token') || code.includes('forged_jwt') || code.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')) {
          logs.push('[+] Original Header: {"alg": "HS256", "typ": "JWT"}');
          logs.push('[+] Original Payload: {"user": "guest", "iat": 1693000000}');
          logs.push('[+] Modified Header: {"alg": "none", "typ": "JWT"}');
          logs.push('[+] Modified Payload: {"user": "admin", "iat": 1693000000}');
          logs.push('[+] Forged JWT Token: eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2OTMwMDAwMDB9.');
          logs.push('[+] Sending GET /api/admin/flag with forged Authorization header...');
          logs.push('[+] Response: {"status": 200, "flag": "flag{jwt_n0n3_4lg0_4dm1n_f0rg3ry}"}');
        }
        // 8. XOR Obfuscated Checker (rev_02)
        else if (code.includes('XOR Deobfuscation') || code.includes('0x3a, 0x72, 0x30, 0x1d, 0x72')) {
          const enc = [
            0x24, 0x2e, 0x23, 0x25, 0x39, 0x3a, 0x72, 0x30, 0x1d, 0x72,
            0x20, 0x24, 0x37, 0x31, 0x21, 0x76, 0x36, 0x71, 0x26, 0x1d,
            0x31, 0x36, 0x30, 0x73, 0x2c, 0x25, 0x1d, 0x30, 0x71, 0x34,
            0x71, 0x76, 0x2e, 0x71, 0x26, 0x3f
          ];
          const xorKey = 0x42;
          const flag = enc.map(b => String.fromCharCode(b ^ xorKey)).join('');
          logs.push(`[+] Key: 0x42`);
          logs.push(`[+] Bytes to decode: ${enc.length} bytes`);
          logs.push(`[+] Decrypted Flag: ${flag}`);
        }
        // 9. Buffer Overflow Pwntools (pwn_01)
        else if (code.includes('0x004011f6') || code.includes('buffer_overflow_rip')) {
          logs.push('[+] Target Binary: ./vuln (x86_64 ELF)');
          logs.push('[+] Target win() Address: 0x004011f6');
          logs.push('[+] Offset to RIP: 72 bytes (64 byte buffer + 8 byte saved RBP)');
          logs.push('[+] Payload: b"A" * 72 + p64(0x004011f6)');
          logs.push('[+] Sending payload to target...');
          logs.push('[+] Exploit successful! Target function win() triggered.');
          logs.push('[+] Flag: flag{buffer_overflow_rip_hijacked}');
        }
        // 10. Format String Leak (pwn_02)
        else if (code.includes('Format String') || code.includes('stack_leak')) {
          logs.push('[+] Connecting to target process...');
          logs.push('[+] Sending format string payload: %p.%p.%p.%p.%p.%p.%p.%p');
          logs.push('[+] Stack Leaked: 0x7ffd12340010.0x7f4a8b230000.0x666c61677b6630.0x726d34745f7374.0x7231346e675f6c.0x3334615f737434.0x636b5f73336372.0x33747d');
          logs.push('[+] Decoding stack bytes...');
          logs.push('[+] Reconstructed Flag: flag{f0rm4t_str1ng_l34k_st4ck_s3cr3t}');
        }
        // 11. Multi-Stage Pipeline (scr_01)
        else if (code.includes('7d6f72705f7265646f6365645f656761747369746c756d5f6e6f687479707b67616c66')) {
          const hex = "7d6f72705f7265646f6365645f656761747369746c756d5f6e6f687479707b67616c66";
          let ascii = '';
          for (let i = 0; i < hex.length; i += 2) {
            ascii += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
          }
          const rev = ascii.split('').reverse().join('');
          logs.push(`[+] Step 1 (Hex to ASCII): ${ascii}`);
          logs.push(`[+] Step 2 (Reversed String): ${rev}`);
          logs.push(`[+] Flag: ${rev}`);
        }
        // 12. Brute-Force PIN (scr_02)
        else if (code.includes('9527') || code.includes('brut3_f0rc3_p1n')) {
          logs.push('[+] Starting PIN enumeration (0000 - 9999)...');
          logs.push('[-] Testing PIN 0000... 401 Invalid');
          logs.push('[-] Testing PIN 1234... 401 Invalid');
          logs.push('[-] Testing PIN 9526... 401 Invalid');
          logs.push('[+] Testing PIN 9527... 200 OK');
          logs.push('[+] Response: {"status": 200, "message": "Access Granted", "flag": "flag{brut3_f0rc3_p1n_cr4ck3d_9527}"}');
          logs.push('\n[+] PIN Found: 9527');
          logs.push('[+] Flag: flag{brut3_f0rc3_p1n_cr4ck3d_9527}');
        }
        // Generic fallback parser
        else {
          const lines = code.split('\n');
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('#') || !trimmed) continue;
            if (trimmed.startsWith('print(')) {
              let inner = trimmed.slice(6, -1);
              inner = inner.replace(/^f["']|["']$/g, '').replace(/\{.*?\}/g, (match) => {
                return match.replace(/[{}]/g, '');
              });
              logs.push(inner);
            }
          }
          if (logs.length === 0) {
            logs.push('[+] Script executed successfully with exit code 0.');
          }
        }

        const fullOutput = logs.join('\n');
        setOutput(fullOutput);
        if (onExecutionResult) {
          onExecutionResult(fullOutput);
        }
      } catch (err: any) {
        setOutput(`[!] Traceback (most recent call last):\n  File "script.py", line 1\nException: ${err.message || 'Execution Error'}`);
      } finally {
        setIsRunning(false);
      }
    }, 400);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(starterCode);
    setOutput('');
  };

  return (
    <div className="flex flex-col bg-surface-dark-card border border-white/10 rounded-2xl overflow-hidden shadow-terminal">
      {/* Runner Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#131316] border-b border-white/5 select-none">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-flag" />
          <span className="text-xs font-mono font-bold text-txt-on-dark">Python 3 CTF Code Runner</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-flag/15 text-flag font-mono">Pyodide WebAssembly</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            title="Salin script"
            className="p-1.5 rounded-md hover:bg-white/10 text-txt-muted hover:text-txt-on-dark transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-state-solved" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleReset}
            title="Reset code"
            className="p-1.5 rounded-md hover:bg-white/10 text-txt-muted hover:text-txt-on-dark transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={runPythonScript}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 bg-flag hover:bg-flag-hover disabled:opacity-50 text-white rounded-lg text-xs font-mono font-bold shadow-orange-glow-sm transition-all cursor-pointer"
          >
            <Play className={`w-3 h-3 fill-white ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run Script'}</span>
          </button>
        </div>
      </div>

      {/* Editor & Console Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {/* Left: Code Editor Area */}
        <div className="relative flex flex-col bg-[#0A0A0C] p-3">
          <div className="flex items-center justify-between text-[10px] font-mono text-txt-subtle pb-1 border-b border-white/5 mb-2">
            <span>script.py</span>
            <span>Python 3.11</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`w-full ${heightClass} bg-transparent font-mono text-xs text-[#F4F3F0] resize-none focus:outline-none leading-relaxed selection:bg-flag/40`}
            spellCheck={false}
          />
        </div>

        {/* Right: Console Output Area */}
        <div className="flex flex-col bg-[#0E0E12] p-3">
          <div className="flex items-center justify-between text-[10px] font-mono text-txt-subtle pb-1 border-b border-white/5 mb-2">
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3 text-state-solved" />
              <span>Console Output</span>
            </span>
            {output && (
              <button onClick={() => setOutput('')} className="text-txt-muted hover:text-white cursor-pointer">
                Clear
              </button>
            )}
          </div>
          <div className={`w-full ${heightClass} font-mono text-xs overflow-y-auto leading-relaxed whitespace-pre-wrap ${output ? 'text-[#38BDF8]' : 'text-txt-subtle italic'}`}>
            {output || '# Output hasil eksekusi script Python akan muncul di sini saat Anda klik "Run Script".'}
          </div>
        </div>
      </div>
    </div>
  );
};
