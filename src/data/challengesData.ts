import { Challenge } from '../types';

export const CHALLENGES: Challenge[] = [
  // ==================== LINUX ====================
  {
    id: 'lin_01',
    category: 'linux',
    title: 'The Hidden Inode',
    difficulty: 'basic',
    points: 100,
    description: 'Sebuah flag rahasia telah disimpan di dalam filesystem target, namun disembunyikan menggunakan atribut tersembunyi (dotfile) dan direktori bersarang. Gunakan terminal untuk menemukan dan membaca file flag.',
    flagHash: '1efaef6acd4f7be379b08ac84d7920fca626d4bf8ba0a1f80f2bec283e27dee2',
    flagFormat: 'flag{...}',
    hints: [
      'Gunakan perintah `ls -la` untuk melihat file dan folder yang berawalan titik.',
      'Cari folder `.secret_vault/` atau gunakan perintah `find . -name "*flag*"`.'
    ],
    explanationMd: `### Write-up: The Hidden Inode

1. **Eksplorasi Direktori**:
   Jalankan \`ls -la\` di home directory untuk menampilkan file tersembunyi.
   \`\`\`bash
   cadet@flagforge-box:~$ ls -la
   \`\`\`
   Anda akan melihat folder tersembunyi bernama \`.secret_vault/\`.

2. **Masuk ke Direktori & Membaca Flag**:
   \`\`\`bash
   cadet@flagforge-box:~$ cd .secret_vault
   cadet@flagforge-box:~/.secret_vault$ ls -la
   cadet@flagforge-box:~/.secret_vault$ cat .flag.txt
   flag{l1nux_f1l3_p3rm1ss10ns_m4st3r}
   \`\`\`
3. **Alternatif Cepat via Find**:
   \`\`\`bash
   cadet@flagforge-box:~$ find ~ -name "*flag*" -exec cat {} +
   \`\`\``,
    hasTerminal: true,
    terminalFsConfig: {
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
                  'notes.txt': {
                    name: 'notes.txt',
                    type: 'file',
                    content: 'Catatan admin: Jangan lupa flag sudah dipindahkan ke folder rahasia dengan permission tersembunyi.'
                  },
                  '.secret_vault': {
                    name: '.secret_vault',
                    type: 'dir',
                    permissions: 'drwxr-x---',
                    children: {
                      '.flag.txt': {
                        name: '.flag.txt',
                        type: 'file',
                        content: 'flag{l1nux_f1l3_p3rm1ss10ns_m4st3r}'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  {
    id: 'lin_02',
    category: 'linux',
    title: 'Needle in a Giant Logfile',
    difficulty: 'basic',
    points: 150,
    description: 'Server web menyimpan file log akses sebesar ribuan baris di `/var/log/access.log`. Di dalamnya terselip satu entri request mencurigakan yang mengandung string flag. Filter log menggunakan text processing regex.',
    flagHash: '42f3601164fea3fd8b50d97ec0242e674366483220b5915b2cd9fea78b2dea9a',
    flagFormat: 'flag{...}',
    hints: [
      'Gunakan perintah `grep` untuk mencari pola teks tertentu.',
      'Contoh: `grep "flag{" /var/log/access.log`.'
    ],
    explanationMd: `### Write-up: Needle in a Giant Logfile

1. **Analisis File**:
   File \`/var/log/access.log\` berisi ribuan baris traffic Apache. Membacanya manual dengan \`cat\` akan memakan waktu lama.

2. **Eksekusi Filter Grep**:
   \`\`\`bash
   cadet@flagforge-box:~$ grep "flag{" /var/log/access.log
   \`\`\`
   Output:
   \`\`\`text
   192.168.1.45 - - [24/Aug/2026:08:14:22] "GET /api/v1/auth?token=flag{grep_is_a_hackers_best_friend} HTTP/1.1" 200 452
   \`\`\`
3. **Flag Ditemukan**: \`flag{grep_is_a_hackers_best_friend}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'flagforge-box',
      root: {
        name: '/',
        type: 'dir',
        children: {
          var: {
            name: 'var',
            type: 'dir',
            children: {
              log: {
                name: 'log',
                type: 'dir',
                children: {
                  'access.log': {
                    name: 'access.log',
                    type: 'file',
                    content: `10.0.0.1 - - [24/Aug/2026:08:00:01] "GET /index.html HTTP/1.1" 200 1024
10.0.0.2 - - [24/Aug/2026:08:01:14] "GET /assets/style.css HTTP/1.1" 200 2048
10.0.0.5 - - [24/Aug/2026:08:05:33] "POST /login HTTP/1.1" 401 512
192.168.1.45 - - [24/Aug/2026:08:14:22] "GET /api/v1/auth?token=flag{grep_is_a_hackers_best_friend} HTTP/1.1" 200 452
10.0.0.12 - - [24/Aug/2026:08:20:00] "GET /favicon.ico HTTP/1.1" 404 120`
                  }
                }
              }
            }
          },
          home: {
            name: 'home',
            type: 'dir',
            children: {
              cadet: {
                name: 'cadet',
                type: 'dir',
                children: {}
              }
            }
          }
        }
      }
    }
  },

  // ==================== NETWORKING ====================
  {
    id: 'net_01',
    category: 'networking',
    title: 'Captured In Transit',
    difficulty: 'basic',
    points: 100,
    description: 'Sebuah paket capture (.pcap) hasil sniffing jaringan intranet menangkap komunikasi HTTP plaintext antara klien dan server internal. Analisis percakapan stream untuk menemukan kredensial token flag.',
    flagHash: '264fd5c1a3a777d908cab846bc3de7b1c802a4059a022873158affe52038b27e',
    flagFormat: 'flag{...}',
    hints: [
      'Gunakan perintah `strings capture.pcap` di terminal untuk melihat seluruh string ASCII yang terekam di dalam file pcap.',
      'Gunakan `grep` untuk menyaring string berawalan `flag{`.'
    ],
    explanationMd: `### Write-up: Captured In Transit

1. **Analisis File PCAP di Terminal**:
   File pcap menyimpan data raw paket jaringan. Karena protokol yang digunakan adalah HTTP (tidak terenkripsi), teks request terbaca jelas:
   \`\`\`bash
   cadet@flagforge-box:~$ strings capture.pcap | grep "flag{"
   \`\`\`
2. **Output Stream HTTP**:
   \`\`\`http
   POST /login.php HTTP/1.1
   Host: internal.bank.local
   Authorization: Bearer flag{wireshark_http_stream_exposed_77}
   \`\`\`
3. **Flag**: \`flag{wireshark_http_stream_exposed_77}\``,
    hasTerminal: true,
    attachmentName: 'capture.pcap',
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'net-analyzer',
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
                  'capture.pcap': {
                    name: 'capture.pcap',
                    type: 'file',
                    content: `\x00\x00\x00\x00PCAP_DUMP_HEADER_ETHERNET
FRAME 1: IP 192.168.1.10 -> 192.168.1.200 TCP SYN
FRAME 2: IP 192.168.1.200 -> 192.168.1.10 TCP SYN-ACK
FRAME 3: IP 192.168.1.10 -> 192.168.1.200 TCP ACK
FRAME 4: HTTP POST /admin_auth.php HTTP/1.1
Host: internal.bank.local
User-Agent: Mozilla/5.0
X-Security-Flag: flag{wireshark_http_stream_exposed_77}
Content-Length: 32`
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  {
    id: 'net_02',
    category: 'networking',
    title: 'The Silent Daemon',
    difficulty: 'menengah',
    points: 200,
    description: 'Server remote menjalankan service rahasia pada port non-standar. Gunakan simulasi netcat `nc` untuk terhubung dan memicu banner respons flag.',
    flagHash: '76cac1e3b1d78c88b28f3ce3a602e036e604213aabc4df787c58ca66eeb11b8d',
    flagFormat: 'flag{...}',
    hints: [
      'Gunakan perintah `nc target.flagforge.io 8888` atau periksa script port scan.',
      'Periksa file `scan_results.txt` di direktori saat ini.'
    ],
    explanationMd: `### Write-up: The Silent Daemon

1. **Inspeksi Hasil Scan**:
   \`\`\`bash
   cadet@flagforge-box:~$ cat scan_results.txt
   \`\`\`
   Catatan menunjukkan port 8888 terbuka pada daemon internal.
2. **Koneksi Soket via Netcat**:
   \`\`\`bash
   cadet@flagforge-box:~$ nc target.flagforge.io 8888
   \`\`\`
   Output Response:
   \`\`\`text
   [+] Connected to FlagForge Daemon v3.1
   [+] Auth Token Validated.
   [+] FLAG: flag{nmap_open_secret_port_8888}
   \`\`\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'recon-station',
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
                  'scan_results.txt': {
                    name: 'scan_results.txt',
                    type: 'file',
                    content: `PORT      STATE SERVICE VERSION
22/tcp    open  ssh     OpenSSH 9.2p1
80/tcp    open  http    nginx 1.24.0
8888/tcp  open  custom  FlagForge CTF Daemon (Returns: flag{nmap_open_secret_port_8888})`
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  // ==================== CRYPTOGRAPHY ====================
  {
    id: 'cry_01',
    category: 'crypto',
    title: 'Triple Base Layer',
    difficulty: 'basic',
    points: 100,
    description: 'Pesan rahasia ini di-encode bertingkat menggunakan Base64 sebanyak 3 kali. Pecahkan rantai encoding untuk mendapatkan plaintext flag.',
    flagHash: '75c761398335785c822a3f1e5d4c40375a543b18d9f78d235149e26bcf8ea8ca',
    flagFormat: 'flag{...}',
    hints: [
      'Gunakan perintah `base64 -d` di terminal atau gunakan Python Code Runner.',
      'Lakukan decode 3 kali secara berurutan: Base64 -> Base64 -> Base64.'
    ],
    explanationMd: `### Write-up: Triple Base Layer

1. **Ciphertext Awal**:
   \`\`\`text
   Vm14a2VtVkdWWGxTYkd4VFlteEtXRmxyV25kV1JsWjVWRlpPVjFaV2VIcFphazVwVld4V1YyRkdXbUZhVm1SWFYwVndWVmRzV25GV1YzaFdWbTVTYVZWVU1Eaz0=
   \`\`\`
2. **Decode Tahap 1**:
   \`\`\`text
   VmxkemVGVGWWSlTYmxKWFlrXndWRlZ5VFZOV1ZWeHpZak5pVWxWV2FGWmRXV0VwVVdsVnFWRVdsVaVaVVU0MDk=
   \`\`\`
3. **Decode Tahap 2**:
   \`\`\`text
   ZmxhZ3tiNHNlNjRfZDNjMGQzZF9zdWNjZXNzXzk5fQ==
   \`\`\`
4. **Decode Tahap 3**:
   \`\`\`text
   flag{b4se64_d3c0d3d_success_99}
   \`\`\`
5. **Python 1-Liner**:
   \`\`\`python
   import base64
   t = "Vm14a2VtVkdWWGxTYkd4VFlteEtXRmxyV25kV1JsWjVWRlpPVjFaV2VIcFphazVwVld4V1YyRkdXbUZhVm1SWFYwVndWVmRzV25GV1YzaFdWbTVTYVZWVU1Eaz0="
   for _ in range(3): t = base64.b64decode(t).decode('utf-8')
   print(t)
   \`\`\``,
    hasTerminal: true,
    hasCodeRunner: true,
    codeRunnerStarter: `import base64

ciphertext = "Vm14a2VtVkdWWGxTYkd4VFlteEtXRmxyV25kV1JsWjVWRlpPVjFaV2VIcFphazVwVld4V1YyRkdXbUZhVm1SWFYwVndWVmRzV25GV1YzaFdWbTVTYVZWVU1Eaz0="

# Lakukan decode bertingkat:
step1 = base64.b64decode(ciphertext).decode('utf-8')
step2 = base64.b64decode(step1).decode('utf-8')
flag = base64.b64decode(step2).decode('utf-8')

print("Decoded Flag:", flag)`,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'crypto-lab',
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
                  'encoded.txt': {
                    name: 'encoded.txt',
                    type: 'file',
                    content: 'Vm14a2VtVkdWWGxTYkd4VFlteEtXRmxyV25kV1JsWjVWRlpPVjFaV2VIcFphazVwVld4V1YyRkdXbUZhVm1SWFYwVndWVmRzV25GV1YzaFdWbTVTYVZWVU1Eaz0='
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  {
    id: 'cry_02',
    category: 'crypto',
    title: 'The Roman Legion Shift',
    difficulty: 'basic',
    points: 120,
    description: 'Jenderal Julius Caesar mengirim pesan terenkripsi dengan pergeseran ROT13: `synt{pnrfne_ebgngvba_fuvsg_13_znfgre}`. Pulihkan teks aslinya.',
    flagHash: '6754f0d29c292f4c0fbd4a1ee7af679971ef5150ca1f187c24d92fcb01a6f99d',
    flagFormat: 'flag{...}',
    hints: [
      'ROT13 adalah pergeseran 13 karakter. Menggeser 13 kali lagi akan mengembalikan teks asli!',
      'Gunakan Python script atau hitung pergeseran huruf: s -> f, y -> l, n -> a, t -> g.'
    ],
    explanationMd: `### Write-up: The Roman Legion Shift

1. **Konsep ROT13**:
   Karena alfabet memiliki 26 huruf, pergeseran $N = 13$ bersifat simetris (enkripsi = dekripsi).
2. **Dekripsi**:
   \`synt\` $\\rightarrow$ \`flag\`
   \`pnrfne\` $\\rightarrow$ \`caesar\`
   \`ebgngvba\` $\\rightarrow$ \`rotation\`
   \`fuvsg\` $\\rightarrow$ \`shift\`
   \`13\` $\\rightarrow$ \`13\`
   \`znfgre\` $\\rightarrow$ \`master\`
3. **Flag**: \`flag{caesar_rotation_shift_13_master}\``,
    hasTerminal: true,
    hasCodeRunner: true,
    codeRunnerStarter: `import codecs

rot13_text = "synt{pnrfne_ebgngvba_fuvsg_13_znfgre}"
flag = codecs.decode(rot13_text, 'rot_13')
print("Decrypted Flag:", flag)`,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'crypto-lab',
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
                  'caesar.txt': {
                    name: 'caesar.txt',
                    type: 'file',
                    content: 'synt{pnrfne_ebgngvba_fuvsg_13_znfgre}'
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  // ==================== WEB EXPLOITATION ====================
  {
    id: 'web_01',
    category: 'web',
    title: 'Single Quote Bypass',
    difficulty: 'basic',
    points: 150,
    description: 'Aplikasi web portal internal memiliki form login yang rentan SQL Injection klasik. Temukan payload auth bypass untuk masuk sebagai administrator dan dapatkan session flag.',
    flagHash: 'daa10b0c7c50bccaaa96dd37858a6bc7f2120417de8bff19da973c367e0b1e85',
    flagFormat: 'flag{...}',
    hints: [
      'Gunakan single-quote injection: `admin\' OR \'1\'=\'1`',
      'Karakter `--` atau `#` digunakan untuk mengomentari sisa query SQL.'
    ],
    explanationMd: `### Write-up: Single Quote Bypass

1. **Analisis Backend Query**:
   \`\`\`sql
   SELECT * FROM users WHERE username = '$user' AND password = '$pwd';
   \`\`\`
2. **Payload Injection**:
   Input Username: \`admin' OR '1'='1' --\`
   Input Password: \`apapun\`
3. **Query yang Dieksekusi**:
   \`\`\`sql
   SELECT * FROM users WHERE username = 'admin' OR '1'='1' --' AND password = '...';
   \`\`\`
   Klausul \`'1'='1'\` selalu bernilai TRUE, sehingga sistem login mengembalikan record user admin pertama.
4. **Flag Response**: \`flag{sql_injection_auth_bypass_pwned}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'web-sandbox',
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
                  'sqli_poc.py': {
                    name: 'sqli_poc.py',
                    type: 'file',
                    content: `# FlagForge Web SQLi Challenge Test
# Payload auth bypass: admin' OR '1'='1' --
# Flag: flag{sql_injection_auth_bypass_pwned}`
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  {
    id: 'web_02',
    category: 'web',
    title: 'The Traversal Vault',
    difficulty: 'menengah',
    points: 200,
    description: 'Endpoint `/view.php?file=` menerima nama file dan menampilkannya tanpa sanitasi. Gunakan Path Traversal untuk membaca file rahasia `/etc/flag.txt`.',
    flagHash: '6a57d3453b0d28594cf6d150485d339e8d3072879d4d406eead2d519b7ed9adb',
    flagFormat: 'flag{...}',
    hints: [
      'Gunakan urutan `../` berulang untuk keluar dari direktori webroot `/var/www/html/`.',
      'Contoh payload: `../../../../etc/flag.txt`.'
    ],
    explanationMd: `### Write-up: The Traversal Vault

1. **Mekanisme LFI**:
   Aplikasi backend mengeksekusi \`include("/var/www/html/" . $_GET['file']);\`.
2. **Payload**:
   \`\`\`text
   GET /view.php?file=../../../../etc/flag.txt HTTP/1.1
   \`\`\`
3. **Ekstraksi**:
   Server melintasi direktori ke atas menuju root \`/\` lalu membaca \`/etc/flag.txt\`.
4. **Flag**: \`flag{lfi_directory_traversal_passwd}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'lfi-lab',
      root: {
        name: '/',
        type: 'dir',
        children: {
          etc: {
            name: 'etc',
            type: 'dir',
            children: {
              'flag.txt': {
                name: 'flag.txt',
                type: 'file',
                content: 'flag{lfi_directory_traversal_passwd}'
              }
            }
          },
          home: {
            name: 'home',
            type: 'dir',
            children: {
              cadet: {
                name: 'cadet',
                type: 'dir',
                children: {}
              }
            }
          }
        }
      }
    }
  },

  // ==================== FORENSICS ====================
  {
    id: 'for_01',
    category: 'forensics',
    title: 'The Camera Never Lies',
    difficulty: 'basic',
    points: 100,
    description: 'Sebuah foto pemandangan digital `evidence.jpg` diambil oleh tersangka. Metadata EXIF file ini menyimpan koordinat dan catatan rahasia pengambil foto.',
    flagHash: 'be77687310006456d3e2922dffa2ad8d99d98958e0e1d558488b77a2c3ed57b4',
    flagFormat: 'flag{...}',
    hints: [
      'Gunakan tool `strings evidence.jpg` atau periksa file `exif_dump.txt`.',
      'Cari field `User Comment` atau `Copyright` pada metadata.'
    ],
    explanationMd: `### Write-up: The Camera Never Lies

1. **Ekstraksi Metadata**:
   \`\`\`bash
   cadet@flagforge-box:~$ strings evidence.jpg | grep "flag{"
   \`\`\`
2. **Metadata EXIF**:
   \`\`\`text
   Camera: Canon EOS 5D Mark IV
   UserComment: flag{exif_metadata_gps_revealed}
   GPS Latitude: 7 deg 15' 32.4" S
   \`\`\`
3. **Flag**: \`flag{exif_metadata_gps_revealed}\``,
    hasTerminal: true,
    attachmentName: 'evidence.jpg',
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'forensics-lab',
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
                  'evidence.jpg': {
                    name: 'evidence.jpg',
                    type: 'file',
                    content: `\xFF\xD8\xFF\xE1EXIF_DATA_CANON_EOS
Model: Canon EOS 5D Mark IV
Artist: Agent_Spectre
UserComment: flag{exif_metadata_gps_revealed}
GPS: -7.2575, 112.7521`
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  {
    id: 'for_02',
    category: 'forensics',
    title: 'The Russian Nesting Image',
    difficulty: 'menengah',
    points: 200,
    description: 'File gambar `avatar.png` memiliki ukuran file yang tidak wajar. Analisis magic bytes dan file carving menunjukkan ada arsip ZIP tersembunyi yang disematkan di akhir file.',
    flagHash: 'b49c3d26af168323a185f72eb7f28a6a9152d57f95b8f863ba13be8cd3c94be2',
    flagFormat: 'flag{...}',
    hints: [
      'Gunakan perintah `strings avatar.png` atau periksa `binwalk` signature.',
      'Magic bytes `PK\x03\x04` mengindikasikan file ZIP terselip.'
    ],
    explanationMd: `### Write-up: The Russian Nesting Image

1. **Inspeksi Binary**:
   \`\`\`bash
   cadet@flagforge-box:~$ strings avatar.png | grep "flag{"
   \`\`\`
2. **Carving ZIP**:
   Di dalam file PNG terdapat ZIP terkompresi berisi \`secret_flag.txt\`.
3. **Flag**: \`flag{binwalk_carved_hidden_zip}\``,
    hasTerminal: true,
    attachmentName: 'avatar.png',
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'forensics-lab',
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
                  'avatar.png': {
                    name: 'avatar.png',
                    type: 'file',
                    content: `\x89PNG\r\n\x1a\nIHDR_DATA_BLOCK
[PNG IMAGE CHUNK END]
PK\x03\x04_ZIP_ARCHIVE_HEADER
secret_flag.txt
Content: flag{binwalk_carved_hidden_zip}
PK\x05\x06_END_OF_CENTRAL_DIR`
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  // ==================== STEGANOGRAPHY ====================
  {
    id: 'stg_01',
    category: 'stego',
    title: 'The Pixel Whisperer',
    difficulty: 'basic',
    points: 100,
    description: 'Pesan rahasia disematkan pada Least Significant Bit (LSB) kanal merah dan hijau pada gambar `art.png`. Ekstrak bit-plane untuk mengungkap flag.',
    flagHash: 'a1eb36df81d20e6160dee845808a30dcc4b2a18b42a28e61520237affa810d44',
    flagFormat: 'flag{...}',
    hints: [
      'Gunakan perintah `cat stego_report.txt` di terminal.',
      'LSB steganografi menyembunyikan payload di bit ke-0 setiap kanal warna.'
    ],
    explanationMd: `### Write-up: The Pixel Whisperer

1. **Analisis LSB dengan Zsteg**:
   \`\`\`bash
   cadet@flagforge-box:~$ cat stego_report.txt
   \`\`\`
   Output Zsteg:
   \`\`\`text
   b1,rgb,lsb,xy .. text: "flag{lsb_stego_hidden_pixel_data}"
   \`\`\`
2. **Flag**: \`flag{lsb_stego_hidden_pixel_data}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'stego-workstation',
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
                  'stego_report.txt': {
                    name: 'stego_report.txt',
                    type: 'file',
                    content: `[+] Zsteg Analysis for art.png:
b1,r,lsb,xy:      .. text: "flag{lsb_stego_hidden_pixel_data}"
b1,rgb,lsb,xy:    .. text: "flag{lsb_stego_hidden_pixel_data}"`
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  // ==================== REVERSE ENGINEERING ====================
  {
    id: 'rev_01',
    category: 'reverse',
    title: 'The Vault Key Validator',
    difficulty: 'menengah',
    points: 200,
    description: 'Binary Linux 64-bit `vault_check` meminta serial password untuk unlock. Decompile pseudocode logika perbandingannya untuk menemukan key yang valid.',
    flagHash: 'fea16110fd100a8dec407edfb2f6bfb23221d25e7ce22fbb80e2440de812b6d7',
    flagFormat: 'flag{...}',
    hints: [
      'Gunakan perintah `strings vault_check` atau buka pseudocode C hasil dekompilasi Ghidra di `decompiled_main.c`.',
      'Perhatikan fungsi `strcmp(input, "flag{...}")`.'
    ],
    explanationMd: `### Write-up: The Vault Key Validator

1. **Analisis Disassembly / Strings**:
   \`\`\`bash
   cadet@flagforge-box:~$ cat decompiled_main.c
   \`\`\`
   Kode fungsi main:
   \`\`\`c
   int main() {
     char buffer[64];
     printf("Enter Vault Password: ");
     fgets(buffer, 64, stdin);
     if (strcmp(buffer, "flag{reverse_decompiled_password_1337}\\n") == 0) {
       printf("[+] ACCESS GRANTED!\\n");
     }
   }
   \`\`\`
2. **Flag**: \`flag{reverse_decompiled_password_1337}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'reverse-station',
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
                  'decompiled_main.c': {
                    name: 'decompiled_main.c',
                    type: 'file',
                    content: `#include <stdio.h>
#include <string.h>

int main(int argc, char **argv) {
    char input[64];
    puts("=== FLAGFORGE SECURE VAULT v1.0 ===");
    printf("Enter Passcode: ");
    if (fgets(input, 64, stdin) == NULL) return 1;
    
    // Hardcoded secret comparison
    if (strncmp(input, "flag{reverse_decompiled_password_1337}", 38) == 0) {
        puts("[+] Access Authorized. Flag Accepted.");
        return 0;
    } else {
        puts("[-] Invalid Passcode!");
        return 1;
    }
}`
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  // ==================== BINARY EXPLOITATION (PWN) ====================
  {
    id: 'pwn_01',
    category: 'pwn',
    title: 'Return of the Pointer',
    difficulty: 'advance',
    points: 300,
    description: 'Binary C menggunakan fungsi rentan `gets(buf)` dengan buffer 64 byte tanpa proteksi Canary. Alamat fungsi tersembunyi `win()` berada pada `0x004011f6`. Susun payload overflow untuk memicu flag.',
    flagHash: 'f57e7e65b118bc87623e2743367f74176875d8b1d705ccb1703c988d0cba709a',
    flagFormat: 'flag{...}',
    hints: [
      'Offset menuju Return Address (RIP) adalah 72 byte (64 byte buffer + 8 byte saved RBP).',
      'Periksa file exploit `solve_pwn.py`.'
    ],
    explanationMd: `### Write-up: Return of the Pointer (Buffer Overflow)

1. **Analisis Vulnerability**:
   Fungsi \`gets()\` tidak membatasi panjang input.
2. **Struktur Memory**:
   - Buffer: 64 byte
   - Saved RBP: 8 byte
   - Total Padding: 72 byte
3. **Payload Construction**:
   \`\`\`python
   from pwn import *
   win_addr = 0x004011f6
   payload = b"A" * 72 + p64(win_addr)
   \`\`\`
4. **Hasil Eksekusi Fungsi win()**: \`flag{buffer_overflow_rip_hijacked}\``,
    hasTerminal: true,
    hasCodeRunner: true,
    codeRunnerStarter: `# Payload generator buffer overflow x86_64
padding = "A" * 72
win_addr = "0x004011f6" # Target function pointer
print(f"Generated Payload: {padding} + p64({win_addr})")
print("Target Flag: flag{buffer_overflow_rip_hijacked}")`,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'pwn-lab',
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
                  'vuln.c': {
                    name: 'vuln.c',
                    type: 'file',
                    content: `#include <stdio.h>
#include <stdlib.h>

void win() {
    puts("flag{buffer_overflow_rip_hijacked}");
}

void vuln() {
    char buf[64];
    puts("Enter your payload:");
    gets(buf); // VULNERABLE!
}

int main() {
    vuln();
    return 0;
}`
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  // ==================== OSINT ====================
  {
    id: 'osi_01',
    category: 'osint',
    title: 'The Leaked Developer Note',
    difficulty: 'basic',
    points: 100,
    description: 'Seorang developer secara tidak sengaja meninggalkan file konfigurasi `.env` dan catatan backup di server publik. Gunakan petunjuk dorking untuk menemukan flag.',
    flagHash: 'de197d7ede94a2047f50f55cf42083e5c9b718eb89107e3faa3de40a11d3da5f',
    flagFormat: 'flag{...}',
    hints: [
      'Gunakan perintah `cat .env` atau periksa file backup di direktori.',
      'Developer sering menyimpan token di file berawalan titik.'
    ],
    explanationMd: `### Write-up: The Leaked Developer Note

1. **Temukan File Rahasia**:
   \`\`\`bash
   cadet@flagforge-box:~$ cat .env
   \`\`\`
2. **Isi File**:
   \`\`\`text
   APP_ENV=production
   ADMIN_TOKEN=flag{osint_google_dork_exposed_endpoint}
   \`\`\`
3. **Flag**: \`flag{osint_google_dork_exposed_endpoint}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'osint-box',
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
                  '.env': {
                    name: '.env',
                    type: 'file',
                    content: `DATABASE_URL=postgres://admin:secret@10.0.0.5/flagdb
FLAGFORGE_TOKEN=flag{osint_google_dork_exposed_endpoint}`
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  // ==================== SCRIPTING ====================
  {
    id: 'scr_01',
    category: 'scripting',
    title: 'The Multi-Stage Pipeline',
    difficulty: 'menengah',
    points: 200,
    description: 'Data terenkripsi melewati pipeline: Hex -> Base64 -> Reverse String. Tulis script Python di Code Runner untuk mendekripsi flag dalam sekali jalan.',
    flagHash: '184bb81f32810ae37706d279af0f41313e675472337233fd2a0ce0feef0699ad',
    flagFormat: 'flag{...}',
    hints: [
      'Tahap 1: `bytes.fromhex(payload).decode()`',
      'Tahap 2: `base64.b64decode(...)`',
      'Tahap 3: Balikkan string dengan `[::-1]`.'
    ],
    explanationMd: `### Write-up: The Multi-Stage Pipeline

1. **Pipeline Script Python**:
   \`\`\`python
   import base64

   # Raw Hex Payload:
   hex_data = "6f72705f7265646f6365645f656761747369746c756d5f6e6f687479707b67616c66"
   
   # Step 1: Hex to ASCII
   ascii_reversed = bytes.fromhex(hex_data).decode('utf-8')
   
   # Step 2: Reverse String
   flag = ascii_reversed[::-1]
   
   print("Recovered Flag:", flag)
   \`\`\`
2. **Flag**: \`flag{python_multistage_decoder_pro}\``,
    hasTerminal: true,
    hasCodeRunner: true,
    codeRunnerStarter: `hex_data = "6f72705f7265646f6365645f656761747369746c756d5f6e6f687479707b67616c66"

# Step 1: Decode hex bytes
step1 = bytes.fromhex(hex_data).decode('utf-8')

# Step 2: Reverse string [::-1]
flag = step1[::-1]

print("Flag:", flag)`,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'python-dev',
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
                  'pipeline_challenge.txt': {
                    name: 'pipeline_challenge.txt',
                    type: 'file',
                    content: '6f72705f7265646f6365645f656761747369746c756d5f6e6f687479707b67616c66'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
];
