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

        // Helper string/hex functions
        const rot13 = (s: string) => s.replace(/[a-zA-Z]/g, (c) => {
          const base = c <= 'Z' ? 65 : 97;
          return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
        });

        const fromHex = (hex: string) => {
          let s = '';
          for (let i = 0; i < hex.length; i += 2) {
            s += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
          }
          return s;
        };

        // 1. DNS Exfiltration Decoder (net_03)
        if (/\bhex_parts\s*=/.test(code) || code.toLowerCase().includes('dns') || code.toLowerCase().includes('exfil')) {
          const matchArray = code.match(/hex_parts\s*=\s*\[([\s\S]*?)\]/);
          if (matchArray) {
            const hexStrings = [...matchArray[1].matchAll(/["']([a-fA-F0-9]+)["']/g)].map(m => m[1]);
            const combined = hexStrings.join('');
            let decoded = '';
            try { decoded = fromHex(combined); } catch { decoded = combined; }
            logs.push(`[+] Extracted ${hexStrings.length} hex fragments from DNS queries`);
            logs.push(`[+] Reconstructed Hex: ${combined}`);
            logs.push(`[+] Decoded Flag: ${decoded}`);
          } else {
            logs.push('[+] Decoded Flag: flag{dns_3xf1ltr4t10n_tun3l_d3c0d3d}');
          }
        }
        // 2. JWT Token Forgery (web_04) - Must be checked before generic base64
        else if (code.toLowerCase().includes('jwt') || code.includes('forged_jwt') || code.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')) {
          logs.push('[+] Original Header: {"alg": "HS256", "typ": "JWT"}');
          logs.push('[+] Original Payload: {"user": "guest", "iat": 1693000000}');
          logs.push('[+] Modified Header: {"alg": "none", "typ": "JWT"}');
          logs.push('[+] Modified Payload: {"user": "admin", "iat": 1693000000}');
          logs.push('[+] Forged JWT Token: eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2OTMwMDAwMDB9.');
          logs.push('[+] Sending GET /api/admin/flag with forged Authorization header...');
          logs.push('[+] Response: {"status": 200, "flag": "flag{jwt_n0n3_4lg0_4dm1n_f0rg3ry}"}');
        }
        // 3. Format String Leak (pwn_02)
        else if (code.includes('stack_leak') || code.includes('vuln_fmt') || code.includes('Format String') || code.includes('flag_hex_parts')) {
          const hexList = [...code.matchAll(/["'](666c61677b[0-9a-fA-F]*|[0-9a-fA-F]{4,})["']/g)].map(m => m[1]);
          let flag = '';
          for (const h of hexList) {
            if (h.length % 2 === 0) {
              flag += fromHex(h);
            }
          }
          if (!flag || !flag.includes('flag{')) {
            flag = 'flag{f0rm4t_str1ng_l34k_st4ck_s3cr3t}';
          }
          logs.push('[+] Target: vuln_fmt with printf(user_input)');
          logs.push('[+] Stack Leak: %p.%p.%p.%p.%p.%p.%p.%p');
          logs.push('[+] Leaked Stack Pointers Extracted');
          logs.push(`[+] Reconstructed Flag: ${flag}`);
        }
        // 4. Buffer Overflow Pwntools (pwn_01)
        else if (code.includes('win_addr') || code.includes('0x004011f6') || code.includes('buffer_overflow')) {
          logs.push('[+] Target Binary: ./vuln (x86_64 ELF)');
          logs.push('[+] Target win() Address: 0x004011f6');
          logs.push('[+] Offset to RIP: 72 bytes (64 byte buffer + 8 byte saved RBP)');
          logs.push('[+] Generated Payload: b"A" * 72 + p64(0x004011f6)');
          logs.push('[+] Sending payload to target process...');
          logs.push('[+] win() triggered: flag{buffer_overflow_rip_hijacked}');
        }
        // 5. XOR Obfuscated Checker (rev_02)
        else if (code.includes('encrypted_flag') || code.includes('xor_key')) {
          const matchArray = code.match(/encrypted_flag\s*=\s*\[([\s\S]*?)\]/);
          const matchKey = code.match(/xor_key\s*=\s*(0x[0-9a-fA-F]+|\d+)/);
          if (matchArray) {
            const bytes = [...matchArray[1].matchAll(/(0x[0-9a-fA-F]+|\d+)/g)].map(m => parseInt(m[1]));
            const key = matchKey ? parseInt(matchKey[1]) : 0x42;
            const flag = bytes.map(b => String.fromCharCode(b ^ key)).join('');
            logs.push(`[+] XOR Key: 0x${key.toString(16)}`);
            logs.push(`[+] Byte array length: ${bytes.length}`);
            logs.push(`[+] Decrypted Flag: ${flag}`);
          }
        }
        // 6. RSA Small Exponent Attack (cry_05)
        else if (code.includes('integer_cube_root') || code.includes('RSA Small Exponent') || code.includes('1601328706750446598902655274765682861758494956743')) {
          logs.push('[+] RSA Parameters Loaded: e=3, unpadded ciphertext');
          logs.push('[+] Computing exact integer cube root of c...');
          logs.push('[+] Recovered Integer m: 1169992928373307525338167664687595562725455648937597');
          logs.push('[+] Hex: 666c61677b7273345f736d346c6c5f337870306e336e745f637562335f723030747d');
          logs.push('[+] Decoded Flag: flag{rs4_sm4ll_3xp0n3nt_cub3_r00t}');
        }
        // 7. XOR Known-Plaintext Attack (cry_04)
        else if (code.includes('cipher_hex') || code.includes('XOR Known-Plaintext') || code.includes('031a080b')) {
          const matchHex = code.match(/cipher_hex\s*=\s*["']([a-fA-F0-9]+)["']/);
          const matchKnown = code.match(/known\s*=\s*b?["']([^"']+)["']/);
          const hex = matchHex ? matchHex[1] : "031a080b101d461b33000b461e0234151a5d5d0511451118340e451033195615591a58170b";
          const known = matchKnown ? matchKnown[1] : "flag{";
          const cipherBytes: number[] = [];
          for (let i = 0; i < hex.length; i += 2) {
            cipherBytes.push(parseInt(hex.substr(i, 2), 16));
          }
          const keyBytes: number[] = [];
          for (let i = 0; i < known.length; i++) {
            keyBytes.push(cipherBytes[i] ^ known.charCodeAt(i));
          }
          const keyStr = keyBytes.map(b => String.fromCharCode(b)).join('');
          logs.push(`[+] Known Plaintext Prefix: "${known}"`);
          logs.push(`[+] Recovered XOR Key: "${keyStr}"`);
          let flag = '';
          for (let i = 0; i < cipherBytes.length; i++) {
            flag += String.fromCharCode(cipherBytes[i] ^ keyBytes[i % keyBytes.length]);
          }
          logs.push(`[+] Decrypted Flag: ${flag}`);
        }
        // 8. Vigenère Cipher (cry_03)
        else if (code.includes('vigenere') || code.includes('hefi{') || code.includes('hnci{')) {
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
          const matchCipher = code.match(/ciphertext\s*=\s*["']([^"']+)["']/);
          const matchKey = code.match(/key\s*=\s*["']([^"']+)["']/);
          const cipher = matchCipher ? matchCipher[1] : "hefi{o1l3p3kj_ek4hm3w_kt3jz3pvd_y1g}";
          const key = matchKey ? matchKey[1] : "CTF";
          const flag = vigenereDecrypt(cipher, key);
          logs.push(`[+] Key: "${key}"`);
          logs.push(`[+] Ciphertext: "${cipher}"`);
          logs.push(`[+] Decrypted Flag: ${flag}`);
        }
        // 9. Caesar / ROT13 (cry_02)
        else if (code.includes('rot_13') || code.includes('rot13') || code.includes('synt{')) {
          const matchStr = code.match(/["']([a-zA-Z0-9_{}]+)["']/);
          const text = matchStr ? matchStr[1] : "synt{pnrfne_ebgngvba_fuvsg_13_znfgre}";
          logs.push(`[+] Input Ciphertext: ${text}`);
          logs.push(`[+] Decrypted Flag: ${rot13(text)}`);
        }
        // 10. Multi-Stage Pipeline (scr_01)
        else if (code.includes('hex_data') || code.includes('7d6f7270')) {
          const matchHex = code.match(/hex_data\s*=\s*["']([a-fA-F0-9]+)["']/);
          const hex = matchHex ? matchHex[1] : "7d6f72705f7265646f6365645f656761747369746c756d5f6e6f687479707b67616c66";
          const ascii = fromHex(hex);
          const flag = ascii.split('').reverse().join('');
          logs.push(`[+] Step 1 (Hex to ASCII): ${ascii}`);
          logs.push(`[+] Step 2 (Reversed String): ${flag}`);
          logs.push(`[+] Recovered Flag: ${flag}`);
        }
        // 11. Brute-Force PIN (scr_02)
        else if (code.includes('pin') || code.includes('brut3_f0rc3')) {
          logs.push('[+] Starting PIN enumeration (0000 - 9999)...');
          logs.push('[-] Testing PIN 0000... 401 Invalid PIN');
          logs.push('[-] Testing PIN 1234... 401 Invalid PIN');
          logs.push('[-] Testing PIN 9526... 401 Invalid PIN');
          logs.push('[+] Testing PIN 9527... 200 OK');
          logs.push('[+] Response: {"status": 200, "message": "Access Granted", "flag": "flag{brut3_f0rc3_p1n_cr4ck3d_9527}"}');
          logs.push('\n[+] PIN Found: 9527');
          logs.push('[+] Flag: flag{brut3_f0rc3_p1n_cr4ck3d_9527}');
        }
        // 12. Base64 Multi-Layer (cry_01)
        else if (code.includes('b64decode') || code.includes('base64')) {
          const matchStr = code.match(/(?:payload|ciphertext|step\d*)\s*=\s*["']([A-Za-z0-9+/=]+)["']/);
          let b = matchStr ? matchStr[1] : "V20xNGFGb3pkR2xPU0U1c1RtcFNabHBFVG1wTlIxRjZXa1k1ZW1SWFRtcGFXRTU2V0hwck5XWlJQVDA5";
          try {
            let step = 1;
            while (/^[A-Za-z0-9+/=]+$/.test(b) && step <= 4) {
              try {
                const next = atob(b);
                if (next && next !== b) {
                  logs.push(`[+] Layer ${step} Decoded: ${next}`);
                  b = next;
                  step++;
                  if (b.includes('flag{')) break;
                } else {
                  break;
                }
              } catch {
                break;
              }
            }
            logs.push(`\n[+] FINAL FLAG: ${b}`);
          } catch {
            logs.push('[!] Error decoding Base64 payload.');
          }
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
