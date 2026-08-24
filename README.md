# 🚩 FlagForge — Interactive CTF Learning Platform & Cybersecurity Workbench

<div align="center">

![FlagForge Banner](https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80)

**Platform Pembelajaran Capture The Flag (CTF) dan Keamanan Siber Interaktif Berbasis Browser.**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.16-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas_Cloud-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)

[Tentang FlagForge](#-tentang-flagforge) • [Fitur Utama](#-fitur-utama) • [Kurikulum 14 Bab](#-kurikulum-pembelajaran-14-bab) • [Kategori Tantangan](#-kategori-tantangan-ctf) • [Mekanisme Belajar](#-mekanisme-reveal-on-surrender) • [Teknologi](#-arsitektur-dan-teknologi)

---

</div>

## 🌌 Tentang FlagForge

**FlagForge** adalah platform edukasi keamanan siber modern yang dirancang untuk menjembatani kesenjangan antara teori teoritis dan praktik nyata dalam kompetisi *Capture The Flag* (CTF). 

Sering kali pemula merasa terintimidasi oleh instalasi Virtual Machine (VM) yang berat, konfigurasi tool yang rumit, atau merasa buntu saat mengerjakan soal tanpa panduan terarah. FlagForge menyelesaikan masalah ini dengan menyediakan **lingkungan simulasi terminal Linux dan code runner Python langsung di dalam peramban web (browser)**, kurikulum komprehensif 14 bab dari level dasar hingga mahir, serta sistem validasi flag aman tanpa spoiler.

Antarmuka FlagForge mengusung konsep visual **"Instrument-Panel Device"** bertema *deep space void*, panel perangkat melayang (*floating device chassis*), navigasi vertikal minimalis, dan aksen *cybernetic orange* yang menghadirkan sensasi menggunakan workstation intelijen canggih.

---

## ⚡ Fitur Utama

### 1. 📖 Kurikulum CTF 14 Bab Terstruktur
- Memuat materi pembelajaran komprehensif berbahasa Indonesia dari pengenalan dasar hingga eksploitasi tingkat lanjut.
- Dilengkapi **Rich Markdown Renderer** yang memformat tabel perbandingan, peringatan, diagram konsep, dan blok kode dengan tombol salin cepat.
- Setiap bab memiliki tombol direct **"Coba Soal Kategori Ini"** untuk langsung mempraktikkan materi yang baru dipelajari.

### 2. 💻 Embedded Virtual Linux Shell & Python Code Runner
- **Terminal Linux Virtual Tertanam**: Menjalankan simulasi perintah Unix riil seperti `ls -la`, `cd`, `cat`, `file`, `strings`, `grep`, `find`, `base64 -d`, `nc`, dan `curl` dengan sistem berkas (*virtual filesystem*) terisolasi per soal.
- **Python Decoder Scripting**: Area eksekusi kode Python interaktif di browser untuk memecahkan cipher kriptografi, decoding string bertingkat (Base64/Hex/ROT13), dan pembuatan payload sederhana tanpa perlu menginstal Python di komputer lokal.
- **Standalone Terminal Sandbox**: Shell bebas untuk eksplorasi perintah Linux dan cheatsheet keamanan.

### 3. 🚩 Sistem Latihan Soal & Workspace CTF Dinamis
- Puluhan soal latihan yang mencakup 8 kategori utama CTF dengan variasi tingkat kesulitan (**Basic**, **Menengah**, **Advance**).
- **Validasi Flag Aman (SHA-256)**: Flag pengguna diverifikasi secara instan menggunakan cryptographic hash tanpa membocorkan plaintext di sisi klien.
- Filter multi-dimensi berdasarkan kategori, tingkat kesulitan, dan status pengerjaan.

### 4. 🤝 Sistem Belajar Jujur *"Reveal-on-Surrender"*
- Menghilangkan budaya spoiler tanpa meninggalkan siswa yang buntu.
- Jika pengguna menemui jalan buntu, mereka dapat memilih **"Menyerah"** melalui dialog konfirmasi berbobot.
- Soal akan ditandai secara permanen dan transparan sebagai **REVEALED** (bukan Solved) dan panduan *write-up* resmi langkah demi langkah akan terbuka otomatis.

### 5. 📊 Dashboard, Trophy Room & Audit Trail
- **Category Mastery Progress**: Grafik persentase penguasaan untuk setiap kategori CTF.
- **Statistik Terpisah**: Memisahkan metrik *Solved Mandiri* dengan *Dilihat Jawabannya (Revealed)* untuk menjaga integritas belajar.
- **Trophy Room & Milestone Badges**: Lencana pencapaian dinamis seperti *First Blood*, *Terminal Ninja*, *Cipher Breaker*, *Web Exploiter*, dan *Persistent Solver*.
- **Submission History Log**: Audit trail riwayat percobaan flag dan aktivitas penyerahan.

### 6. 🔐 Autentikasi Terintegrasi & Protected Routes
- Sistem navigasi berbasis URL nyata (`/dashboard`, `/modul`, `/latihan`, `/terminal`, `/profile`).
- Seluruh area latihan dan pembelajaran dilindungi oleh sistem autentikasi sesi berbasis JWT dengan penyimpanan profil di cloud database.

---

## 📚 Kurikulum Pembelajaran (14 Bab)

FlagForge menyusun materi secara bertahap agar pemula dapat belajar secara runtut dan terarah:

| No | Bab | Topik Utama |
|:---:|:---|:---|
| **01** | **Pengantar CTF & Mindset Hacker** | Format kompetisi (Jeopardy vs Attack-Defense), etika keamanan siber, dan cara berpikir analitis. |
| **02** | **Persiapan Lingkungan & Tooling** | Pengenalan Kali Linux, WSL2, Burp Suite, Wireshark, Ghidra, CyberChef, dan Python. |
| **03** | **Dasar Linux & Command Line** | Navigasi direktori, izin akses file (chmod/chown), text processing (grep, awk, sed), piping, dan file analysis. |
| **04** | **Dasar Jaringan & Analisis Trafik** | Model OSI vs TCP/IP, protokol web (HTTP/HTTPS), DNS, analisis file `.pcap` via Wireshark, dan socket `nc`. |
| **05** | **Cryptography (Kriptografi)** | Perbedaan Encoding vs Hashing vs Encryption, Classic Ciphers (Caesar, Vigenère), Modern Crypto (AES, RSA), dan XOR. |
| **06** | **Web Exploitation** | OWASP Top 10, SQL Injection (Auth Bypass & UNION), Cross-Site Scripting (XSS), LFI/RFI, dan IDOR. |
| **07** | **Digital Forensics** | File signatures & Magic Bytes, analisis metadata file (ExifTool), hexdump (xxd), dan memori forensics dasar. |
| **08** | **Steganography** | Penyembunyian data rahasia dalam file gambar/audio, teknik Least Significant Bit (LSB), dan ekstraksi Binwalk. |
| **09** | **Reverse Engineering** | Dasar arsitektur x86/x64, assembly instructions, dekompilasi binary menggunakan Ghidra, dan static analysis. |
| **10** | **Binary Exploitation (Pwn)** | Memori stack layout, kerentanan Buffer Overflow klasik, overwrite EIP/RIP, dan shellcode execution. |
| **11** | **OSINT (Open Source Intelligence)** | Investigasi jejak digital, Google Dorking, pencarian metadata domain/IP (WHOIS/DNS), dan verifikasi citra satelit. |
| **12** | **Scripting & Otomatisasi Python** | Penggunaan library `requests` untuk brute-force web, `pwntools` untuk koneksi socket remote, dan skrip pemecah cipher. |
| **13** | **Strategi & Manajemen Waktu Lomba** | Trik triage soal, time-boxing, dokumentasi write-up rapi saat lomba, dan manajemen tim CTF. |
| **14** | **Sumber Belajar & Langkah Selanjutnya** | Platform latihan lanjutan (PicoCTF, HackTheBox, TryHackMe), sertifikasi keamanan, dan portofolio karir. |

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

Sistem ini memastikan setiap pelajar memiliki kesempatan belajar yang adil: mereka yang memecahkan sendiri mendapatkan poin dan apresiasi penuh, sementara mereka yang belajar melalui kunci jawaban tetap mendapatkan pemahaman tanpa mencemari skor kompetisi.

---

## 💻 Arsitektur dan Teknologi

FlagForge dibangun dengan arsitektur web modern yang mengutamakan performa, keamanan, dan pengalaman pengguna:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          FLAGFORGE PLATFORM                            │
├────────────────────────────────┬───────────────────────────────────────┤
│ FRONTEND (CLIENT-SIDE)         │ BACKEND & PERSISTENCE                 │
├────────────────────────────────┼───────────────────────────────────────┤
│ • React 18 & TypeScript        │ • Node.js & Express.js REST API       │
│ • Vite Lightning Fast Bundler  │ • MongoDB Atlas Cloud Database        │
│ • Tailwind CSS Custom Tokens   │ • Mongoose ODM Schemas                │
│ • Lucide Icons & React Router  │ • Bcrypt Password Hashing             │
│ • In-Browser Virtual UNIX FS   │ • JWT Stateless Session Tokens        │
│ • In-Browser Python Runner     │ • Web Crypto API (SHA-256 Verification│
│ • Marked GFM Markdown Engine   │ • Strict Environment Isolation (.env) │
│ • Cosmic Canvas Particles      │ • Zero-Slop Impeccable Design Standard│
└────────────────────────────────┴───────────────────────────────────────┘
```

---

<div align="center">

**FlagForge — Forge Your Cybersecurity Mastery, One Flag at a Time.**

*Developed with high craft standards, tactile instrument aesthetics, and passion for cybersecurity education.*

</div>
