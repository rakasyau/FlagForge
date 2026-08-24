# 🚩 FlagForge — Interactive CTF Learning Platform & Cybersecurity Workbench

<div align="center">

![FlagForge Banner](https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80)

### 🌐 Live Production Platform
### 👉 [flagforge.rakasyau.my.id](https://flagforge.rakasyau.my.id) 👈

[![Production URL](https://img.shields.io/badge/Live_Website-flagforge.rakasyau.my.id-FF5A1F?style=for-the-badge&logo=googlechrome&logoColor=white)](https://flagforge.rakasyau.my.id)
[![Vercel Deployment](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Cloudflare DNS](https://img.shields.io/badge/DNS-Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://cloudflare.com)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.16-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js Express](https://img.shields.io/badge/Node.js-Express_Serverless-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas_Cloud-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)

**Platform Pembelajaran Capture The Flag (CTF) dan Keamanan Siber Interaktif Berbasis Browser.**

[Live Website](https://flagforge.rakasyau.my.id) • [Tentang FlagForge](#-tentang-flagforge) • [Fitur Utama](#-fitur-utama) • [Kurikulum 14 Bab](#-kurikulum-pembelajaran-14-bab) • [Kategori Tantangan](#-kategori-tantangan-ctf) • [Mekanisme Belajar](#-mekanisme-reveal-on-surrender) • [Teknologi](#-arsitektur-dan-teknologi)

---

</div>

## 🌌 Tentang FlagForge

**FlagForge** (`https://flagforge.rakasyau.my.id`) adalah platform edukasi keamanan siber modern yang dirancang untuk menjembatani kesenjangan antara teori teoritis dan praktik nyata dalam kompetisi *Capture The Flag* (CTF). 

Sering kali pemula merasa terintimidasi oleh instalasi Virtual Machine (VM) yang berat, konfigurasi tool yang rumit, atau merasa buntu saat mengerjakan soal tanpa panduan terarah. FlagForge menyelesaikan masalah ini dengan menyediakan **lingkungan simulasi terminal Linux dan code runner Python langsung di dalam peramban web (browser)**, kurikulum komprehensif 14 bab dari level dasar hingga mahir, serta sistem validasi flag aman tanpa spoiler.

Antarmuka FlagForge mengusung konsep visual **"Instrument-Panel Device"** bertema *deep space void*, panel perangkat melayang (*floating device chassis*), navigasi adaptif multi-device (desktop rail & mobile bottom dock), dan aksen *cybernetic orange* yang menghadirkan sensasi menggunakan workstation intelijen canggih.

---

## ⚡ Fitur Utama

### 1. 📖 Kurikulum CTF 14 Bab Terstruktur
- Memuat materi pembelajaran komprehensif berbahasa Indonesia dari pengenalan dasar, jaringan, kriptografi, web exploitation, forensics, reverse engineering, binary exploitation (pwn), OSINT, hingga scripting otomatisasi Python.
- Dilengkapi **Rich Markdown Renderer** yang memformat tabel perbandingan, diagram alur, peringatan alert, dan blok kode berwarna dengan tombol salin snippet instan.
- Setiap bab memiliki tombol direct **"Coba Soal Kategori Ini"** untuk langsung mempraktikkan materi yang baru dipelajari.

### 2. 🔍 Real-Time Global Search Engine (`Ctrl + K`)
- Pencarian cepat lintas modul dan soal latihan dengan shortcut keyboard `Ctrl+K` / `Cmd+K`.
- Dropdown navigasi cerdas yang langsung mengarahkan pengguna ke bab materi atau workspace soal yang relevan.

### 3. 💻 Embedded Virtual Linux Shell & Python Code Runner
- **Terminal Linux Virtual Tertanam**: Menjalankan simulasi perintah Unix riil seperti `ls -la`, `cd`, `cat`, `file`, `strings`, `grep`, `find`, `base64 -d`, `nc`, dan `curl` dengan sistem berkas (*virtual filesystem*) terisolasi per soal.
- **Python Decoder Scripting**: Area eksekusi kode Python interaktif di browser untuk memecahkan cipher kriptografi, decoding string bertingkat (Base64/Hex/ROT13), dan pembuatan payload tanpa perlu instalasi lokal.
- **Standalone Terminal Sandbox**: Shell mandiri untuk eksperimen bebas dan cheatsheet keamanan.

### 4. 🚩 Sistem Latihan Soal & Workspace CTF Dinamis
- Puluhan soal latihan yang mencakup 8 kategori utama CTF dengan variasi tingkat kesulitan (**Basic**, **Menengah**, **Advance**).
- **Validasi Flag Kriptografis (SHA-256)**: Flag diverifikasi secara instan menggunakan cryptographic hash tanpa mengekspos plaintext di sisi klien.
- Filter multi-dimensi berdasarkan kategori, tingkat kesulitan, dan status pengerjaan.

### 5. 🤝 Sistem Belajar Jujur *"Reveal-on-Surrender"*
- Menghilangkan budaya spoiler tanpa meninggalkan siswa yang buntu.
- Jika pengguna menemui jalan buntu, mereka dapat memilih **"Menyerah"** melalui dialog konfirmasi berbobot.
- Soal akan ditandai secara permanen dan transparan sebagai **REVEALED** (bukan Solved) dan panduan *write-up* resmi langkah demi langkah akan terbuka otomatis.

### 6. 📊 Dashboard, Trophy Room & Audit Trail
- **Category Mastery Progress**: Grafik persentase penguasaan untuk setiap kategori CTF.
- **Statistik Terpisah**: Memisahkan metrik *Solved Mandiri* dengan *Dilihat Jawabannya (Revealed)* untuk menjaga integritas belajar.
- **Trophy Room & Milestone Badges**: Lencana pencapaian dinamis seperti *First Blood*, *Terminal Ninja*, *Cipher Breaker*, *Web Exploiter*, dan *Persistent Solver*.
- **Submission History Log**: Audit trail riwayat percobaan flag dan aktivitas submission.

### 7. 📱 Antarmuka Responsif & Multi-Device
- Mendukung pengalaman mobile smartphone dengan *Floating Bottom Navigation Dock*, layout kartu elastis, dan drawer daftar bab yang fleksibel.

---

## 📚 Kurikulum Pembelajaran (14 Bab)

FlagForge menyusun materi secara bertahap agar pemula dapat belajar secara runtut dan terarah:

| No | Bab | Topik Utama |
|:---:|:---|:---|
| **01** | **Pengantar CTF & Mindset Hacker** | Format kompetisi (Jeopardy vs Attack-Defense), etika keamanan siber, dan cara berpikir analitis. |
| **02** | **Persiapan Lingkungan & Tooling** | Panduan Kali Linux, WSL2, Burp Suite, Wireshark, Ghidra, CyberChef, dan skrip lab otomatis. |
| **03** | **Dasar Linux & Command Line** | Navigasi direktori UNIX, izin akses file (chmod/chown/SUID), text processing (grep, awk, sed), dan GTFOBins. |
| **04** | **Dasar Jaringan & Analisis Trafik** | Model OSI vs TCP/IP, 3-Way Handshake, DNS, analisis file `.pcap` via Wireshark, dan socket Netcat (`nc`). |
| **05** | **Cryptography (Kriptografi)** | Encoding vs Hashing vs Encryption, Classic Ciphers (Caesar, Vigenère, XOR), Modern Crypto (AES, RSA), dan FactorDB. |
| **06** | **Web Exploitation** | OWASP Top 10, SQL Injection (Auth Bypass & UNION), Cross-Site Scripting (XSS), LFI/RFI dengan PHP Wrappers, dan Command Injection. |
| **07** | **Digital Forensics** | File signatures & Magic Bytes, analisis metadata berkas (ExifTool), file carving (Binwalk), dan memory forensics Volatility 3. |
| **08** | **Steganography** | Prinsip Least Significant Bit (LSB) citra RGB, zsteg, ekstraksi passphrase Steghide, dan analisis audio spectrogram. |
| **09** | **Reverse Engineering** | Register CPU x86_64, instruksi Assembly umum, dekompilasi biner via Ghidra, dan teknik binary patching. |
| **10** | **Binary Exploitation (Pwn)** | Anatomi memori stack frame, kerentanan Buffer Overflow klasik, overwrite EIP/RIP, proteksi NX/Canary, dan automasi Pwntools. |
| **11** | **OSINT (Open Source Intelligence)** | Investigasi jejak digital, Advanced Google Dorking, WHOIS & DNS footprinting, SOCMINT, dan geolokasi citra. |
| **12** | **Scripting & Otomatisasi Python** | Library `requests` untuk brute-force web, socket remote `pwntools`, multiprocessing, dan regex solver. |
| **13** | **Strategi & Manajemen Waktu Lomba** | Triage soal berbobot tinggi, aturan 30 menit time-boxing, kolaborasi tim, dan standarisasi write-up. |
| **14** | **Sumber Belajar & Roadmap Karir** | Platform wargames lanjutan (PicoCTF, HTB, TryHackMe, PortSwigger), sertifikasi industri (OSCP, CEH, Security+), dan portofolio. |

---

## 🎯 Kategori Tantangan CTF

FlagForge mencakup 8 disiplin ilmu keamanan siber utama:

```
                  ┌───────────────────────────────┐
                  │       FLAGFORGE MATRIX        │
                  └───────────────┬───────────────┘
                                  │
      ┌───────────────┬───────────┴───┬───────────────┬───────────────┐
      │               │               │               │               │
  [ Linux ]     [ Network ]      [ Crypto ]       [ Web ]       [ Forensics ]
 Command Line    Packet PCAP     Cipher & Key    SQLi & XSS     Magic Bytes
      │               │               │               │               │
      └───────────────┼───────────────┴───────────────┼───────────────┘
                      │                               │
                [ Stego ]                       [ Reverse ]
              Hidden Payloads                 Disassembly & ASM
                      │                               │
                [ Pwn / BinExp ]                [ OSINT & Scripting ]
              Buffer Overflow                   Python Automation
```

- 🐧 **Linux**: Navigasi izin berkas tersembunyi, analisis string binary, dan manipulasi permission UNIX.
- 🌐 **Networking**: Analisis stream kredensial plaintext dan rekonstruksi paket HTTP/FTP.
- 🔐 **Cryptography**: Pemecahan cipher bertingkat, deobfuscation XOR, dan analisis kunci publik RSA.
- 🌍 **Web Exploitation**: Eksploitasi injeksi SQL autentikasi, payload reflected XSS, dan traversal berkas lokal (LFI).
- 🔍 **Forensics**: Perbaikan magic bytes header gambar PNG/JPG yang rusak dan ekstraksi stream file tersembunyi.
- 🖼️ **Steganography**: Ekstraksi pesan tersembunyi pada bit citra (LSB) dan embedded zip file.
- ⚙️ **Reverse Engineering**: Analisis alur logika percabangan kode rahasia dan dekompilasi perbandingan password.
- 💥 **Binary Exploitation (Pwn)**: Eksploitasi alokasi buffer string memori C/C++ untuk mengontrol nilai variabel rahasia.

---

## 🛡️ Mekanisme *Reveal-on-Surrender*

```
                     ┌──────────────────────────────┐
                     │   Tantangan Latihan Dibuka   │
                     └──────────────┬───────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
       [ Pecahkan Mandiri ]                [ Buntu / Menyerah ]
                │                                   │
                ▼                                   ▼
      Submit Flag Valid 🚩                 Pilih "Menyerah?"
                │                                   │
                ▼                                   ▼
    Status: SOLVED (Hijau)                Konfirmasi Peringatan
        Poin Diberikan                              │
        Badge Unlocked                              ▼
                                          Status: REVEALED (Kuning)
                                            Poin Tidak Diberikan
                                            Write-up Lengkap Terbuka
```

---

## 💻 Arsitektur dan Teknologi

FlagForge dibangun dengan arsitektur web modern yang mengutamakan performa, keamanan, dan keandalan tinggi:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          FLAGFORGE PLATFORM                            │
│                  https://flagforge.rakasyau.my.id                      │
├────────────────────────────────┬───────────────────────────────────────┤
│ FRONTEND (CLIENT-SIDE)         │ BACKEND & SERVERLESS PERSISTENCE      │
├────────────────────────────────┼───────────────────────────────────────┤
│ • React 18 & TypeScript        │ • Node.js & Express.js REST API       │
│ • Vite Lightning Fast Bundler  │ • Vercel Serverless Architecture      │
│ • Tailwind CSS Custom Tokens   │ • MongoDB Atlas Cloud Database        │
│ • Lucide Icons & React Router  │ • Mongoose ODM Schemas                │
│ • In-Browser Virtual UNIX FS   │ • Bcrypt Password Hashing             │
│ • In-Browser Python Runner     │ • JWT Stateless Session Tokens        │
│ • Marked GFM Markdown Engine   │ • Web Crypto API (SHA-256 Validation) │
│ • Cosmic Canvas Particles      │ • Cloudflare DNS & SSL/TLS            │
│ • Zero-Slop Impeccable Design  │ • Strict Environment Security (.env)  │
└────────────────────────────────┴───────────────────────────────────────┘
```

---

<div align="center">

**FlagForge — Forge Your Cybersecurity Mastery, One Flag at a Time.**

🌐 **Live Platform:** [https://flagforge.rakasyau.my.id](https://flagforge.rakasyau.my.id)

*Crafted with high engineering standards, tactile instrument aesthetics, and passion for cybersecurity education.*

</div>
