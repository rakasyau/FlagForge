import { CategoryInfo, ModuleChapter } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'pengantar',
    name: 'Pengantar CTF',
    shortName: 'Intro',
    tag: 'FUNDAMENTAL',
    icon: 'Flag',
    description: 'Konsep dasar Capture The Flag, format Jeopardy vs Attack-Defense, dan etika hacker.',
    difficultyTier: 'basic',
    color: '#FF5A1F',
    chapterNumber: 1
  },
  {
    id: 'linux',
    name: 'Dasar Linux & CLI',
    shortName: 'Linux',
    tag: 'OPERATING SYSTEM',
    icon: 'Terminal',
    description: 'Navigasi terminal, file permissions, inspeksi binary, dan text processing dengan grep & awk.',
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
    description: 'TCP/IP handshake, port scanning nmap, netcat listener, dan analisis paket Wireshark.',
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
    description: 'Encoding (Base64, Hex), Classic Ciphers (Caesar, Vigenère, XOR), AES, dan RSA attack.',
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
    description: 'SQL Injection, XSS, IDOR, LFI/RFI, Command Injection, SSRF, dan Auth Token flaws.',
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
    description: 'Analisis metadata, file carving binwalk, disk forensics, memory Volatility, dan PCAP stream.',
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
    description: 'Teknik LSB image encoding, steghide, zsteg, dan visualisasi audio spectrogram.',
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
    description: 'Analisis binary ELF/PE, decompilation Ghidra & IDA, checksec, dan cracking logic.',
    difficultyTier: 'advance',
    color: '#06B6D4',
    chapterNumber: 9
  },
  {
    id: 'pwn',
    name: 'Binary Exploitation (Pwn)',
    shortName: 'Pwn',
    tag: 'MEMORY CORRUPTION',
    icon: 'Flame',
    description: 'Buffer overflow, Stack canary bypass, Format string bug, ROP gadgets, dan pwntools.',
    difficultyTier: 'advance',
    color: '#EF4444',
    chapterNumber: 10
  },
  {
    id: 'osint',
    name: 'OSINT Intelligence',
    shortName: 'OSINT',
    tag: 'OPEN RECON',
    icon: 'Compass',
    description: 'Google Dorking, reverse image search, EXIF GPS tracking, dan Wayback Machine archival.',
    difficultyTier: 'basic',
    color: '#10B981',
    chapterNumber: 11
  },
  {
    id: 'scripting',
    name: 'Python Automation',
    shortName: 'Scripting',
    tag: 'PWNTOOLS & REQUESTS',
    icon: 'Code',
    description: 'Automasi socket remote connection, brute force decoder, dan scripting eksploitasi.',
    difficultyTier: 'menengah',
    color: '#EAB308',
    chapterNumber: 12
  },
  {
    id: 'strategi',
    name: 'Strategi & Roadmap',
    shortName: 'Strategy',
    tag: 'ROADMAP & TIPS',
    icon: 'Award',
    description: 'Manajemen tim lomba CTF, alur pembagian kategori, write-up habits, dan mental juara.',
    difficultyTier: 'basic',
    color: '#8B5CF6',
    chapterNumber: 13
  },
  {
    id: 'resources',
    name: 'Sumber Belajar CTF',
    shortName: 'Resources',
    tag: 'PLATFORMS & TOOLS',
    icon: 'BookOpen',
    description: 'Koleksi platform latihan: picoCTF, OverTheWire, PortSwigger, TryHackMe, dan CTFtime.',
    difficultyTier: 'basic',
    color: '#64748B',
    chapterNumber: 14
  }
];

export const MODULE_CHAPTERS: ModuleChapter[] = [
  {
    id: 'pengantar',
    chapterNumber: 1,
    title: '1. Pengantar Capture The Flag (CTF)',
    subtitle: 'Visi, Format Pertandingan, dan Etika Hacking',
    summary: 'Pahami apa itu CTF, kenapa bidang ini menjadi batu loncatan terkuat di industri cybersecurity, format lomba (Jeopardy vs Attack-Defense), dan etika etis dalam berburu flag.',
    readingTimeMinutes: 6,
    practiceChallengeIds: ['lin_01', 'net_01'],
    sections: [
      {
        id: '1.1',
        title: '1.1 Apa itu CTF?',
        content: `**Capture The Flag (CTF)** adalah kompetisi keamanan siber di mana peserta memecahkan tantangan (*challenge*) untuk menemukan sebuah string rahasia yang disebut **flag**, biasanya berformat:

\`\`\`text
flag{contoh_flag_disini}
CTF{c0nt0h_l41nnY4}
\`\`\`

Setiap flag yang berhasil ditemukan disubmit ke platform lomba untuk mendapatkan poin. Tujuannya adalah belajar keamanan siber secara praktis dan legal — semua sistem yang diserang memang sengaja dibuat rentan untuk keperluan latihan.`
      },
      {
        id: '1.2',
        title: '1.2 Kenapa Belajar CTF?',
        content: `- Mengasah kemampuan berpikir kritis dan problem solving
- Memahami cara kerja celah keamanan dari sisi penyerang (offensive) sekaligus cara menutupnya (defensive)
- Portofolio yang kuat untuk karier di bidang cybersecurity (pentester, security analyst, bug hunter)
- Komunitas yang aktif dan kolaboratif di skala global`
      },
      {
        id: '1.3',
        title: '1.3 Format Kompetisi: Jeopardy vs Attack-Defense',
        content: `Terdapat dua format utama dalam kompetisi CTF:

1. **Jeopardy**: Soal dikelompokkan per kategori dengan bobot poin (misal 100 s.d. 500 poin). Peserta bebas memilih soal mana yang dikerjakan lebih dahulu. Sangat ramah untuk pemula hingga menengah.
2. **Attack-Defense**: Setiap tim memiliki server sendiri yang menjalankan layanan (service) rentan. Tim harus menyerang service lawan sembari menambal (patch) service miliknya sendiri.
3. **Mixed**: Kombinasi Jeopardy di babak penyisihan dan Attack-Defense di babak final.`
      },
      {
        id: '1.4',
        title: '1.4 Etika CTF (Code of Conduct)',
        content: `CTF adalah **hacking legal**. Prinsip yang wajib dipegang setiap praktisi:
- **Hanya serang sistem latihan**: Jangan pernah menguji teknik hacking pada server publik tanpa izin tertulis.
- **No Flag Sharing**: Dilarang membagikan flag secara langsung saat kompetisi berlangsung.
- **Responsible Disclosure**: Jika menemukan kerentanan pada sistem nyata di dunia kerja, laporkan melalui saluran resmi secara etis.`
      }
    ]
  },
  {
    id: 'linux',
    chapterNumber: 3,
    title: '3. Dasar Linux & Command Line untuk Hacker',
    subtitle: 'Navigasi, Hak Akses File, dan Analisis Data di Terminal',
    summary: 'Kuasai instrumen terpenting seorang hacker: shell UNIX. Pelajari navigasi direktori, command piping, permission chmod, file analysis, dan text filtering.',
    readingTimeMinutes: 10,
    practiceChallengeIds: ['lin_01', 'lin_02'],
    sections: [
      {
        id: '3.1',
        title: '3.1 Navigasi & Manipulasi File',
        content: `Kemampuan navigasi terminal adalah syarat mutlak dalam memecahkan soal CTF. Berikut adalah perintah fundamental:`,
        codeSnippets: [
          {
            language: 'bash',
            code: `pwd                 # Tampilkan direktori saat ini
ls -la               # List semua file termasuk hidden (.dotfiles)
cd /var/log          # Pindah direktori
cat flag.txt         # Cetak isi file ke terminal
find / -name "flag*" # Cari file bernama flag di seluruh sistem`,
            description: 'Perintah navigasi standar Linux'
          }
        ]
      },
      {
        id: '3.2',
        title: '3.2 Permission & Privileges',
        content: `Hak akses file Linux terdiri dari 3 segmen: User (u), Group (g), dan Other (o).`,
        codeSnippets: [
          {
            language: 'bash',
            code: `chmod +x script.sh   # Jadikan script executable
chmod 700 secret.key # Hanya pemilik yang boleh read/write/execute
sudo -l              # Cek hak istimewa sudo yang dimiliki user saat ini`,
            description: 'Manajemen permission & sudo check'
          }
        ]
      },
      {
        id: '3.3',
        title: '3.3 Analisis File & Header',
        content: `Ekstensi file di Linux sering kali dipalsukan oleh pembuat soal CTF. Gunakan perintah berikut untuk mengetahui tipe file sebenarnya:`,
        codeSnippets: [
          {
            language: 'bash',
            code: `file evidence.bin     # Cek magic byte header sebenarnya
strings evidence.bin  # Ekstrak seluruh string ASCII yang terbaca
xxd evidence.bin | head # Lihat hexdump raw 16-byte pertama`,
            description: 'Inspeksi binary dan format file'
          }
        ]
      },
      {
        id: '3.4',
        title: '3.4 Text Processing dengan Grep, Awk, dan Sed',
        content: `Saat menghadapi file log sebesar ratusan megabyte, regex filtering adalah senjata utama Anda:`,
        codeSnippets: [
          {
            language: 'bash',
            code: `grep -r "flag{" .              # Cari string flag rekursif di semua file
cat access.log | grep "200 OK" | cut -d' ' -f1 # Ekstrak IP pengunjung
awk '{print $1, $4}' system.log # Ambil kolom ke-1 dan ke-4`,
            description: 'Piping data dan regex filtering'
          }
        ]
      }
    ]
  },
  {
    id: 'networking',
    chapterNumber: 4,
    title: '4. Dasar Jaringan Komputer & Wireshark',
    subtitle: 'Protokol TCP/IP, Port Scanning, dan Packet Capture Analysis',
    summary: 'Pahami cara kerja paket data di jaringan, three-way handshake TCP, probing port dengan Nmap, interaksi Netcat, dan teknik membedah PCAP di Wireshark.',
    readingTimeMinutes: 8,
    practiceChallengeIds: ['net_01', 'net_02'],
    sections: [
      {
        id: '4.1',
        title: '4.1 Konsep Protokol & Port Standar',
        content: `- **HTTP (Port 80) / HTTPS (Port 443)**: Web application traffic
- **SSH (Port 22)**: Secure shell remote administration
- **FTP (Port 21)**: File transfer protocol (kerap mengirim kredensial plaintext!)
- **DNS (Port 53)**: Domain name resolution
- **TCP Three-Way Handshake**: SYN -> SYN-ACK -> ACK untuk membangun koneksi handal.`
      },
      {
        id: '4.2',
        title: '4.2 Tools Jaringan & Netcat',
        content: `Netcat (\`nc\`) dijuluki sebagai pisau lipat Swiss jaringan. Digunakan untuk berinteraksi langsung dengan port socket CTF:`,
        codeSnippets: [
          {
            language: 'bash',
            code: `nc target.flagforge.io 1337   # Terhubung ke challenge remote service
nmap -sV -p- 10.10.10.50      # Scan seluruh 65535 port dan deteksi versi service
curl -i http://target/api/v1  # Request HTTP dan tampilkan response header`,
            description: 'Perintah esensial koneksi socket dan recon jaringan'
          }
        ]
      },
      {
        id: '4.3',
        title: '4.3 Analisis File .PCAP dengan Wireshark',
        content: `Langkah analisis saat menemukan file capture jaringan:
1. Buka file \`.pcap\` di Wireshark.
2. Gunakan display filter protokol seperti \`http\`, \`ftp\`, atau \`dns\`.
3. Klik kanan pada paket mencurigakan -> **Follow -> TCP Stream**.
4. Cari string sensitive seperti authorization header, password POST, atau format \`flag{...}\`.`
      }
    ]
  },
  {
    id: 'crypto',
    chapterNumber: 5,
    title: '5. Cryptography: Ciphers, Hashes, & Attacks',
    subtitle: 'Dari Base64 Encoding hingga Serangan Asimetris RSA',
    summary: 'Pelajari perbedaan krusial antara encoding vs enkripsi, algoritma klasik (Caesar, Vigenere, XOR), mode block cipher AES, dan cacat implementasi matematika RSA.',
    readingTimeMinutes: 12,
    practiceChallengeIds: ['cry_01', 'cry_02'],
    sections: [
      {
        id: '5.1',
        title: '5.1 Encoding vs Enkripsi',
        content: `**Encoding BUKAN enkripsi!** Encoding tidak membutuhkan kunci rahasia untuk dikembalikan ke bentuk semula. Contoh: Base64, Hex, Binary, ROT13, Morse Code.`,
        codeSnippets: [
          {
            language: 'bash',
            code: `echo "ZmxhZ3tiNHNlNjRfZDNjMGQzZF9zdWNjZXNzfQ==" | base64 -d
# Output: flag{b4se64_d3c0d3d_success}`,
            description: 'Decode Base64 instan di command line'
          }
        ]
      },
      {
        id: '5.2',
        title: '5.2 Classic Ciphers & Frequency Analysis',
        content: `- **Caesar Cipher**: Menggeser setiap huruf sebanyak $N$ alfabet.
- **Vigenère Cipher**: Caesar cipher dinamis menggunakan kata kunci berulang.
- **XOR Cipher**: Operasi bitwise $A \\oplus B = C$ dan $C \\oplus B = A$. Jika kita mengetahui format awal \`flag{\`, kita bisa menemukan kunci XOR dengan mudah!
- **Frequency Analysis**: Dalam teks bahasa Inggris, huruf **E, T, A, O, I, N** memiliki frekuensi kemunculan tertinggi.`
      },
      {
        id: '5.3',
        title: '5.3 Kriptografi Modern (AES & RSA)',
        content: `- **AES (Symmetric)**: Enkripsi kunci simetris. Di soal CTF, celah sering terletak pada penggunaan **ECB Mode (Electronic Codebook)** yang tidak menyamarkan pola blok identik.
- **RSA (Asymmetric)**: Keamanan RSA bergantung pada sulitnya memfaktorkan bilangan besar $N = p \\times q$. Celah umum pada CTF:
  - Nilai $N$ kecil (dapat difaktorkan via \`factordb.com\`)
  - Eksponen $e = 3$ dengan pesan pendek (*Small Public Exponent Attack*)
  - Common Modulus Attack (enkripsi pesan sama dengan dua kunci privat berbeda).`
      }
    ]
  },
  {
    id: 'web',
    chapterNumber: 6,
    title: '6. Web Exploitation: OWASP Vulnerabilities',
    subtitle: 'SQL Injection, XSS, Path Traversal, IDOR, dan LFI',
    summary: 'Eksplorasi celah keamanan aplikasi web modern. Pelajari cara membajak query database, menyisipkan payload client-side, dan membocorkan file rahasia server.',
    readingTimeMinutes: 14,
    practiceChallengeIds: ['web_01', 'web_02'],
    sections: [
      {
        id: '6.1',
        title: '6.1 SQL Injection (SQLi)',
        content: `SQL Injection terjadi ketika input pengguna disatukan langsung ke query database tanpa parameterization atau sanitasi.`,
        codeSnippets: [
          {
            language: 'sql',
            code: `-- Query asli backend:
SELECT * FROM users WHERE username = 'USER_INPUT' AND password = 'PASSWORD';

-- Payload Bypass Auth:
admin' OR '1'='1' --

-- Hasil query yang dieksekusi database:
SELECT * FROM users WHERE username = 'admin' OR '1'='1' --' AND password = '';`,
            description: 'Auth bypass via single-quote injection'
          }
        ]
      },
      {
        id: '6.2',
        title: '6.2 Cross-Site Scripting (XSS)',
        content: `Menyisipkan kode JavaScript jahat ke browser korban melalui input yang direfleksikan atau disimpan di database:
- **Reflected XSS**: Payload dieksekusi via URL parameter langsung.
- **Stored XSS**: Payload disimpan di database (misal komentar blog) dan dieksekusi setiap kali korban membuka halaman.
- **DOM-based XSS**: Celah berada pada manipulasi DOM script client.`
      },
      {
        id: '6.3',
        title: '6.3 Local File Inclusion (LFI) & Path Traversal',
        content: `Terjadi saat aplikasi memuat file lokal berdasarkan parameter \`page\` atau \`file\` tanpa validasi ketat:`,
        codeSnippets: [
          {
            language: 'http',
            code: `GET /view.php?file=../../../../etc/passwd HTTP/1.1
Host: vulnerable-target.com

# Respons Server membocorkan file /etc/passwd!`,
            description: 'Directory traversal menuju file sensitif sistem'
          }
        ]
      },
      {
        id: '6.4',
        title: '6.4 IDOR & Session Flaws',
        content: `- **IDOR (Insecure Direct Object Reference)**: Mengakses data user lain dengan mengubah \`/api/invoice?id=1001\` menjadi \`id=1002\`.
- **JWT (JSON Web Token)**: Algoritma \`none\` bypass, atau brute-force weak secret HMAC-SHA256.`
      }
    ]
  },
  {
    id: 'forensics',
    chapterNumber: 7,
    title: '7. Digital Forensics & File Carving',
    subtitle: 'Metadata Exif, Magic Bytes, Volatility Memory, dan Network Dump',
    summary: 'Teknik investigasi digital untuk menemukan bukti tersembunyi. Pelajari cara memperbaiki file corrupt, ekstraksi embedding data dengan binwalk, dan analisis dump memori.',
    readingTimeMinutes: 9,
    practiceChallengeIds: ['for_01', 'for_02'],
    sections: [
      {
        id: '7.1',
        title: '7.1 Metadata & Magic Bytes',
        content: `Setiap format file memiliki signature hex (Magic Bytes) pada awal file:
- **PNG**: \`89 50 4E 47 0D 0A 1A 0A\`
- **JPEG**: \`FF D8 FF E0\` atau \`FF D8 FF E1\`
- **ZIP/DOCX/JAR**: \`50 4B 03 04\` (PK..)
- **PDF**: \`25 50 44 46\` (%PDF)

Jika gambar tidak bisa dibuka, cek apakah header sengaja dirusak menggunakan hexdump editor.`,
        codeSnippets: [
          {
            language: 'bash',
            code: `exiftool suspicious.jpg   # Lihat metadata kamera, waktu, GPS coordinates
binwalk suspicious.jpg    # Deteksi apakah ada file ZIP tersembunyi di dalam JPG
binwalk -e suspicious.jpg # Ekstrak otomatis isi file yang terkandung di dalamnya`,
            description: 'Perintah analisis metadata dan ekstraksi file carving'
          }
        ]
      },
      {
        id: '7.2',
        title: '7.2 Memory Forensics dengan Volatility',
        content: `Soal forensics tingkat menengah sering memberikan snapshot RAM (\`.raw\` / \`.dmp\`). Gunakan Volatility untuk mendeteksi:
- Daftar proses yang sedang aktif (\`pslist\` / \`pstree\`)
- Koneksi soket jaringan yang terbuka (\`netscan\`)
- Password hash di registry SAM (\`hivelist\` & \`hashdump\`)`
      }
    ]
  },
  {
    id: 'stego',
    chapterNumber: 8,
    title: '8. Steganography: The Art of Concealment',
    subtitle: 'Least Significant Bit (LSB), Steghide, dan Audio Spectrogram',
    summary: 'Pelajari cara mendeteksi dan mengekstrak pesan tersembunyi di dalam file gambar dan audio tanpa mengubah tampilan visualnya.',
    readingTimeMinutes: 7,
    practiceChallengeIds: ['stg_01', 'stg_02'],
    sections: [
      {
        id: '8.1',
        title: '8.1 Konsep LSB (Least Significant Bit)',
        content: `Piksel gambar RGB tersusun dari 8-bit per kanal (0–255). Mengubah bit terakhir (bit ke-0) dari \`11111111\` menjadi \`11111110\` hanya mengubah nilai warna dari 255 ke 254 — perbedaan yang 100% mustahil dideteksi mata manusia, namun dapat menyimpan ratusan kilobyte pesan teks rahasia.`
      },
      {
        id: '8.2',
        title: '8.2 Steganography Tools',
        content: `Tools esensial untuk membongkar stego:`,
        codeSnippets: [
          {
            language: 'bash',
            code: `zsteg secret.png            # Cek LSB pada file PNG dan BMP
steghide extract -sf art.jpg # Ekstrak payload dari JPG (membutuhkan passphrase)
stegsolve                    # GUI tool untuk mengecek color plane & bit inverted`,
            description: 'Stego extraction workflow'
          }
        ]
      },
      {
        id: '8.3',
        title: '8.3 Audio Spectrogram Steganography',
        content: `Pada file suara (\`.wav\` / \`.mp3\`), pembuat soal sering menyembunyikan teks atau gambar QR Code ke dalam spektrum frekuensi tinggi. Buka file audio di **Sonic Visualiser** atau **Audacity**, ubah tampilan track menjadi **Spectrogram Mode** untuk membaca flag visual!`
      }
    ]
  },
  {
    id: 'reverse',
    chapterNumber: 9,
    title: '9. Reverse Engineering: Decompiling Binaries',
    subtitle: 'Ghidra, Assembly x86_64, Logic Analysis, dan Crackmes',
    summary: 'Bedah cara kerja program terkompilasi tanpa melihat source code asli. Pelajari decompilation Ghidra, struktur fungsi main, dan teknik memecahkan validasi serial key.',
    readingTimeMinutes: 11,
    practiceChallengeIds: ['rev_01', 'rev_02'],
    sections: [
      {
        id: '9.1',
        title: '9.1 Anatomi File Binary (ELF & PE)',
        content: `Program Linux terkompilasi dalam format **ELF (Executable and Linkable Format)**. Sebelum membongkar kode, selalu lakukan verifikasi proteksi keamanan:`,
        codeSnippets: [
          {
            language: 'bash',
            code: `file ./crackme_v1
checksec --file=./crackme_v1
# Output:
#   Arch:     amd64-64-little
#   RELRO:    Partial RELRO
#   Stack:    No canary found
#   NX:       NX enabled
#   PIE:      No PIE`,
            description: 'Pengecekan arsitektur dan mitigasi proteksi memory'
          }
        ]
      },
      {
        id: '9.2',
        title: '9.2 Decompilation dengan Ghidra / IDA',
        content: `Ghidra mampu menerjemahkan kode mesin assembly x86_64 kembali menjadi pseudocode bahasa C:
1. Cari fungsi \`main\` atau \`entry\`.
2. Identifikasi variabel input pengguna (misal \`fgets\` atau \`scanf\`).
3. Cari perulangan transformasi enkripsi (XOR loop, string shuffling).
4. Analisis fungsi perbandingan string seperti \`strcmp(input, target_secret)\`.`
      }
    ]
  },
  {
    id: 'pwn',
    chapterNumber: 10,
    title: '10. Binary Exploitation (Pwn): Memory Corruption',
    subtitle: 'Stack Overflow, Return Address Hijacking, dan ROP Chain',
    summary: 'Kategori paling teknikal dalam dunia CTF. Kuasai mekanisme stack memory, eksploitasi buffer overflow, mitigasi proteksi (ASLR, NX, Canary), dan pwntools.',
    readingTimeMinutes: 15,
    practiceChallengeIds: ['pwn_01', 'pwn_02'],
    sections: [
      {
        id: '10.1',
        title: '10.1 Konsep Stack & Buffer Overflow',
        content: `Ketika fungsi memanggil \`gets(buffer)\` dengan alokasi buffer 64-byte tanpa batas panjang input, penyerang dapat mengirimkan 72 byte data. 8 byte ekstra akan menimpa **Saved Return Pointer (RIP/EIP)** di stack, sehingga alur eksekusi CPU bisa diarahkan ke fungsi tersembunyi (\`win()\` atau \`get_flag()\`).`
      },
      {
        id: '10.2',
        title: '10.2 Exploit Scripting dengan Pwntools',
        content: `Pwntools adalah library Python standar emas untuk exploit dev:`,
        codeSnippets: [
          {
            language: 'python',
            code: `from pwn import *

# Target service lokal atau remote
io = remote('target.flagforge.io', 1337)

# Padding 72 byte + alamat fungsi win() (0x4011d6)
payload = b'A' * 72 + p64(0x4011d6)

io.sendline(payload)
print(io.recvall().decode())`,
            description: 'Script exploit Buffer Overflow via pwntools'
          }
        ]
      }
    ]
  },
  {
    id: 'osint',
    chapterNumber: 11,
    title: '11. OSINT: Open Source Intelligence Recon',
    subtitle: 'Google Dorking, Reverse Image Search, dan Tracking Jejak Digital',
    summary: 'Kumpulkan informasi intelijen dari data publik internet. Gunakan operator mesin pencari canggih, geolokasi foto, dan arsip histori web untuk memecahkan puzzle.',
    readingTimeMinutes: 6,
    practiceChallengeIds: ['osi_01'],
    sections: [
      {
        id: '11.1',
        title: '11.1 Google Dorking Operator',
        content: `- \`site:example.com\` : Batasi pencarian hanya pada domain target.
- \`filetype:pdf\` atau \`filetype:env\` : Cari ekstensi file sensitif.
- \`intitle:"index of /"\` : Temukan web server dengan directory listing terbuka.
- \`inurl:admin\` : Cari halaman login atau panel administrator.`
      },
      {
        id: '11.2',
        title: '11.2 Reverse Image & Archival Tools',
        content: `- **Yandex & Google Lens**: Sangat akurat untuk mencari lokasi landmark dan foto sumber.
- **Wayback Machine (archive.org)**: Melihat versi lama halaman web sebelum dihapus.
- **WHOIS & Shodan.io**: Melihat pemilik domain dan port terbuka pada server internet.`
      }
    ]
  },
  {
    id: 'scripting',
    chapterNumber: 12,
    title: '12. Scripting & Automasi dengan Python',
    subtitle: 'Automasi Interaksi Socket, Brute-Force, dan Web Scraping',
    summary: 'Tingkatkan kecepatan menyelesaikan soal CTF dengan membuat script automasi Python untuk decode multi-lapis, interaksi soket cepat, dan brute-forcing.',
    readingTimeMinutes: 8,
    practiceChallengeIds: ['scr_01'],
    sections: [
      {
        id: '12.1',
        title: '12.1 Scripting Dekripsi Multi-Lapis',
        content: `Sering kali flag di-encode bertingkat (misal: Hex -> Base64 -> Caesar). Script Python menyelesaikannya dalam milidetik:`,
        codeSnippets: [
          {
            language: 'python',
            code: `import base64

raw = "5a6d78685a337473615735316543317a59334a7063485270626d633366513d3d"
# Tahap 1: Hex decode
step1 = bytes.fromhex(raw).decode('utf-8')
# Tahap 2: Base64 decode
flag = base64.b64decode(step1).decode('utf-8')

print(f"[+] Decoded Flag: {flag}")`,
            description: 'Automasi decoding pipeline dengan Python standard library'
          }
        ]
      }
    ]
  },
  {
    id: 'strategi',
    chapterNumber: 13,
    title: '13. Strategi Lomba CTF & Manajemen Tim',
    subtitle: 'Manajemen Waktu, Pembagian Peran, dan Writeup Habits',
    summary: 'Tips dan taktik sukses saat mengikuti kompetisi CTF 24/48 jam. Hindari rabbit hole, prioritaskan soal, dan bangun kebiasaan membaca writeup pasca-lomba.',
    readingTimeMinutes: 5,
    practiceChallengeIds: ['lin_01', 'cry_01'],
    sections: [
      {
        id: '13.1',
        title: '13.1 Taktik Saat Kompetisi Berjalan',
        content: `- **Bagi Peran Berdasarkan Spesialisasi**: Tentukan siapa yang memegang Web, Crypto, Forensics, dan Pwn.
- **Batasi Waktu Rabbit Hole**: Jika stuck di satu soal lebih dari 45 menit tanpa progress baru, beralihlah ke soal lain atau minta rekan tim melihat dengan sudut pandang segar.
- **Simpan Catatan Command & Payload**: Jangan mengetik ulang dari nol; miliki *cheatsheet repo* tim sendiri.`
      },
      {
        id: '13.2',
        title: '13.2 Kekuatan Membaca Write-Up',
        content: `Perkembangan 80% seorang pemain CTF terjadi **SETELAH** lomba selesai:
Saat lomba berakhir, buka repositori writeup dari tim-tim papan atas. Pelajari cara mereka memecahkan soal yang sebelumnya membuat Anda buntu. Trik baru tersebut akan langsung menjadi amunisi Anda di lomba berikutnya!`
      }
    ]
  },
  {
    id: 'resources',
    chapterNumber: 14,
    title: '14. Sumber Belajar & Platform Latihan CTF',
    subtitle: 'Rekomendasi Wargames dan Kalender Turnamen Dunia',
    summary: 'Daftar kurasi platform latihan interaktif terbaik dunia untuk mempertajam skill cybersecurity Anda secara konsisten.',
    readingTimeMinutes: 4,
    practiceChallengeIds: ['web_01', 'for_01'],
    sections: [
      {
        id: '14.1',
        title: '14.1 Platform Wargames & Lab Rekomendasi',
        content: `- **picoCTF**: Sangat direkomendasikan untuk pemula, dibuat oleh Carnegie Mellon University.
- **OverTheWire (Bandit & Natas)**: Latihan dasar command line Linux dan web level demi level.
- **PortSwigger Web Security Academy**: Materi Web Security paling komprehensif dan gratis di dunia.
- **CryptoHack**: Platform interaktif khusus mendalami kriptografi modern dan RSA.
- **TryHackMe & HackTheBox**: Lab penetrasi mesin dan jaringan virtual.
- **CTFtime.org**: Kalender resmi lomba CTF internasional beserta ranking tim dunia.`
      }
    ]
  }
];
