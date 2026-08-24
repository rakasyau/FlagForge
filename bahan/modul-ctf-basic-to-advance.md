# Modul Pembelajaran Capture The Flag (CTF)
### Dari Basic hingga Advance

---

## Daftar Isi

1. [Pengantar CTF](#1-pengantar-ctf)
2. [Persiapan Environment](#2-persiapan-environment)
3. [Dasar Linux & Command Line](#3-dasar-linux--command-line)
4. [Dasar Jaringan Komputer](#4-dasar-jaringan-komputer)
5. [Cryptography](#5-cryptography)
6. [Web Exploitation](#6-web-exploitation)
7. [Forensics](#7-forensics)
8. [Steganography](#8-steganography)
9. [Reverse Engineering](#9-reverse-engineering)
10. [Binary Exploitation (Pwn)](#10-binary-exploitation-pwn)
11. [OSINT](#11-osint)
12. [Scripting & Automasi dengan Python](#12-scripting--automasi-dengan-python)
13. [Strategi Lomba & Roadmap Latihan](#13-strategi-lomba--roadmap-latihan)
14. [Sumber Belajar & Platform Latihan](#14-sumber-belajar--platform-latihan)

---

## 1. Pengantar CTF

### 1.1 Apa itu CTF?

**Capture The Flag (CTF)** adalah kompetisi keamanan siber di mana peserta memecahkan tantangan (*challenge*) untuk menemukan sebuah string rahasia yang disebut **flag**, biasanya berformat:

```
flag{contoh_flag_disini}
CTF{c0nt0h_l41nnY4}
```

Setiap flag yang berhasil ditemukan disubmit ke platform lomba untuk mendapatkan poin. Tujuannya adalah belajar keamanan siber secara praktis dan legal — semua sistem yang diserang memang sengaja dibuat rentan untuk keperluan latihan.

### 1.2 Kenapa Belajar CTF?

- Mengasah kemampuan berpikir kritis dan problem solving
- Memahami cara kerja celah keamanan dari sisi penyerang (offensive) sekaligus cara menutupnya (defensive)
- Portofolio yang kuat untuk karier di bidang cybersecurity (pentester, security analyst, bug hunter)
- Komunitas yang aktif dan kolaboratif

### 1.3 Format Kompetisi

| Format | Deskripsi | Cocok untuk |
|---|---|---|
| **Jeopardy** | Soal dikelompokkan per kategori dengan bobot poin; peserta bebas memilih soal mana yang dikerjakan | Pemula–menengah |
| **Attack-Defense** | Tim memiliki server sendiri berisi service rentan; harus menyerang server tim lain sekaligus mempertahankan server sendiri | Tim berpengalaman |
| **Mixed** | Kombinasi keduanya | Semua level |

### 1.4 Kategori Soal

| Kategori | Fokus |
|---|---|
| Web Exploitation | Celah pada aplikasi web |
| Cryptography | Memecahkan enkripsi/encoding lemah |
| Forensics | Analisis file, memory, network capture |
| Reverse Engineering | Membedah logika program dari binary |
| Pwn / Binary Exploitation | Eksploitasi memory pada program native |
| Steganography | Data tersembunyi di dalam media (gambar, audio) |
| OSINT | Mengumpulkan informasi dari sumber publik |
| Misc | Puzzle, logika, atau kombinasi kategori lain |

### 1.5 Etika CTF

CTF adalah **hacking legal**. Prinsip yang wajib dipegang:
- Hanya menyerang sistem yang memang disediakan untuk latihan/lomba
- Tidak menyebarkan flag orang lain (no flag sharing antar tim di luar aturan)
- Ilmu yang didapat digunakan untuk kebaikan (responsible disclosure jika menemukan celah di sistem nyata)

---

## 2. Persiapan Environment

### 2.1 Sistem Operasi

Disarankan menggunakan distro Linux yang sudah dilengkapi tools security:
- **Kali Linux** — paling populer, banyak dokumentasi
- **Parrot OS** — lebih ringan, cocok untuk laptop spek rendah

Bisa dijalankan sebagai:
- Virtual Machine (VirtualBox/VMware) — direkomendasikan untuk pemula
- Dual boot
- WSL2 (Windows Subsystem for Linux) untuk kebutuhan dasar

### 2.2 Tools Wajib

| Tools | Fungsi |
|---|---|
| Burp Suite (Community) | Intercept & modifikasi HTTP request untuk web exploitation |
| Wireshark | Analisis paket jaringan (.pcap) |
| CyberChef | "Swiss army knife" untuk encoding/decoding/cipher |
| Ghidra / IDA Free | Reverse engineering binary |
| radare2 / Cutter | Alternatif reverse engineering (open source) |
| GDB + pwndbg/GEF | Debugging untuk binary exploitation |
| Python 3 | Scripting otomatisasi solusi |
| pwntools | Library Python khusus untuk pwn/exploit dev |
| `file`, `strings`, `binwalk`, `exiftool` | Forensics dasar |
| Netcat (`nc`) | Koneksi ke service CTF (remote shell, dsb) |

### 2.3 Setup Cepat (Debian/Ubuntu-based)

```bash
sudo apt update && sudo apt install -y \
    netcat-openbsd binwalk exiftool steghide \
    python3 python3-pip gdb git
pip3 install pwntools requests pycryptodome
```

---

## 3. Dasar Linux & Command Line

CTF sangat bergantung pada kemampuan menggunakan terminal Linux.

### 3.1 Navigasi & File

```bash
pwd                 # tampilkan direktori saat ini
ls -la               # list file termasuk hidden files
cd folder/           # pindah direktori
cat file.txt         # tampilkan isi file
find / -name "flag*" # cari file bernama flag di seluruh sistem
```

### 3.2 Permission

```bash
chmod +x script.sh   # jadikan file executable
sudo -l               # cek command apa saja yang bisa dijalankan sebagai root
```

### 3.3 Analisis File Dasar

```bash
file namafile         # identifikasi tipe file sebenarnya
strings namafile       # tampilkan semua string yang terbaca di file binary
xxd namafile | head    # lihat isi file dalam hex
```

### 3.4 Text Processing

```bash
grep "flag" file.txt          # cari kata "flag"
grep -r "flag{" .              # cari recursive di semua file
cut -d: -f1 /etc/passwd        # ambil kolom tertentu
awk '{print $1}' file.txt      # ambil kolom dengan awk
sed 's/foo/bar/g' file.txt     # cari-ganti teks
```

> **Latihan:** Selesaikan **OverTheWire: Bandit** (level 0–15) untuk melatih dasar command line ini secara praktik langsung.

---

## 4. Dasar Jaringan Komputer

### 4.1 Konsep Penting

- **TCP/IP model**: physical → data link → network → transport → application
- **Port & Protocol umum**: HTTP (80), HTTPS (443), FTP (21), SSH (22), Telnet (23), SMB (445), DNS (53)
- **Three-way handshake** TCP (SYN → SYN-ACK → ACK)

### 4.2 Tools Jaringan

```bash
nmap -sV -p- target_ip        # scan semua port + versi service
nc target_ip 1337              # konek ke service via netcat
curl http://target_ip/         # request HTTP dari terminal
```

### 4.3 Analisis Traffic dengan Wireshark

Alur dasar analisis file `.pcap` dalam soal forensics:
1. Buka file dengan Wireshark
2. Gunakan filter, misalnya `http`, `ftp`, atau `dns`
3. Klik kanan paket → **Follow → TCP Stream** untuk melihat percakapan penuh
4. Cari kredensial, file yang ditransfer, atau string flag di dalam stream

> **Latihan:** picoCTF kategori "General Skills" dan "Networking" sangat cocok untuk pemula.

---

## 5. Cryptography

### 5.1 Level Basic — Encoding (Bukan Enkripsi!)

Encoding **bukan** enkripsi — tidak butuh kunci untuk dibalikkan. Contoh: Base64, Hex, Binary, ROT13, Morse.

```bash
echo "ZmxhZ3t0ZXN0fQ==" | base64 -d
# Output: flag{test}
```

Gunakan **CyberChef** untuk decode berlapis (misal Base64 → Hex → ROT13) secara visual.

### 5.2 Classic Cipher

| Cipher | Cara Kerja Singkat |
|---|---|
| Caesar Cipher | Geser setiap huruf sejumlah N posisi di alfabet |
| Vigenère Cipher | Caesar cipher dengan kunci kata berulang |
| Substitution Cipher | Setiap huruf diganti huruf lain secara konsisten |
| XOR Cipher | Setiap byte di-XOR dengan byte kunci |

Untuk substitution cipher, teknik **frequency analysis** (huruf yang paling sering muncul dalam bahasa Inggris adalah E, T, A, O) sangat membantu memecahkan tanpa tahu kuncinya.

### 5.3 Level Menengah — Kriptografi Modern (Simetris)

- **AES (Advanced Encryption Standard)** — symmetric cipher, soal CTF biasanya mengeksploitasi *mode operasi* yang salah (misal ECB mode membocorkan pola karena blok identik menghasilkan ciphertext identik)
- Kenali perbedaan mode: ECB (rentan pola), CBC, CTR, GCM

### 5.4 Level Advance — Kriptografi Asimetris

- **RSA** — soal CTF sering mengeksploitasi kesalahan implementasi, bukan algoritma RSA itu sendiri, misalnya:
  - Modulus `n` terlalu kecil → bisa difaktorkan (gunakan tools seperti `factordb` atau `sympy`)
  - Nilai `e` kecil dengan pesan pendek (*low exponent attack*)
  - Dua ciphertext berbeda memakai `n` yang sama (*common modulus attack*)
- Pelajari dasar teori bilangan: bilangan prima, GCD, modular inverse — libary Python `pycryptodome` dan `sympy` sangat membantu untuk eksperimen

### 5.5 Alur Berpikir Soal Cryptography

1. Identifikasi jenis data (base64? hex? panjang ciphertext mengindikasikan cipher apa?)
2. Cek apakah ini encoding sederhana dulu sebelum asumsi cipher rumit
3. Kalau ada source code enkripsi yang diberikan, baca baik-baik — celah biasanya ada di situ
4. Gunakan CyberChef "Magic" wand untuk deteksi otomatis

---

## 6. Web Exploitation

### 6.1 Fondasi

Pahami dulu cara kerja HTTP request/response, cookie, session, dan struktur aplikasi web (client-server, database backend).

### 6.2 Tools Utama

- **Burp Suite** untuk intercept & modifikasi request
- **Browser DevTools** (Inspect Element, Network tab, Console)
- `curl` untuk request cepat dari terminal

### 6.3 Kerentanan Umum (Basic → Advance)

**a. Directory/Path Enumeration**
Cek file tersembunyi seperti `/robots.txt`, `/.git/`, `/admin`, atau gunakan tools seperti `gobuster`/`ffuf` untuk brute-force direktori.

**b. SQL Injection (SQLi)**
Terjadi ketika input pengguna langsung digabung ke query database tanpa filter.
```
Contoh input pada form login:
Username: admin' OR '1'='1
```
Ini bisa membuat query logikanya selalu bernilai true sehingga login berhasil tanpa password yang benar. Level lanjut: *UNION-based*, *blind SQLi*, dan *time-based blind SQLi* untuk mengekstrak data dari database tanpa melihat output langsung.

**c. Cross-Site Scripting (XSS)**
Menyisipkan script ke halaman yang dilihat pengguna lain, karena input tidak di-sanitasi sebelum ditampilkan kembali. Ada tiga jenis: *Reflected*, *Stored*, dan *DOM-based*.

**d. Insecure Direct Object Reference (IDOR)**
Terjadi saat aplikasi mengizinkan akses ke data pengguna lain hanya dengan mengubah ID di URL/parameter, tanpa validasi kepemilikan data (misal `/profile?id=101` diubah jadi `id=102`).

**e. Local/Remote File Inclusion (LFI/RFI)**
Aplikasi memuat file berdasarkan input pengguna tanpa validasi, sehingga penyerang bisa membaca file sistem seperti `/etc/passwd`.

**f. Command Injection**
Input pengguna dieksekusi sebagai perintah sistem oleh aplikasi karena tidak difilter.

**g. Server-Side Request Forgery (SSRF)**
Aplikasi diminta melakukan request ke URL yang dikontrol penyerang, bisa dimanfaatkan untuk mengakses layanan internal yang seharusnya tidak bisa diakses dari luar.

**h. Authentication & Session Flaws**
JWT (JSON Web Token) dengan algoritma lemah atau secret yang bisa ditebak, session token yang predictable, atau logika autentikasi yang bisa dilewati (*auth bypass*).

### 6.4 Alur Berpikir Soal Web

1. Eksplorasi manual dulu (lihat halaman, fitur, cookie, response header)
2. Cek source code halaman (`Ctrl+U`) dan komentar developer yang tertinggal
3. Coba input tidak wajar di setiap form/parameter
4. Perhatikan pesan error — sering membocorkan struktur backend
5. Gunakan Burp Suite untuk memodifikasi request secara presisi

> **Latihan:** picoCTF kategori Web, lalu lanjut ke **PortSwigger Web Security Academy** (gratis, sangat terstruktur dari basic hingga advance).

---

## 7. Forensics

### 7.1 Analisis File & Metadata

```bash
file gambar.jpg          # cek tipe file asli (kadang ekstensi dipalsukan)
exiftool gambar.jpg      # lihat metadata (GPS, device, software, dsb)
binwalk gambar.jpg       # cek apakah ada file lain disisipkan di dalamnya
binwalk -e gambar.jpg    # extract file yang tersembunyi
```

### 7.2 Memory Forensics

Soal sering memberikan *memory dump* (`.mem`/`.raw`) yang dianalisis dengan **Volatility** untuk menemukan proses berjalan, koneksi jaringan aktif, atau file yang dibuka saat dump diambil.

### 7.3 Disk Image Forensics

File system image (`.dd`, `.img`) dianalisis dengan tools seperti **Autopsy** atau `mount` manual untuk menemukan file yang dihapus atau disembunyikan.

### 7.4 Network Forensics

Sama seperti bagian 4.3 — analisis `.pcap` dengan Wireshark untuk menemukan file yang ditransfer, kredensial dalam plaintext, atau percakapan tersembunyi.

### 7.5 Alur Berpikir Soal Forensics

1. Selalu cek `file` dan metadata dulu sebelum asumsi apa pun
2. Cek apakah ada data tersembunyi dengan `binwalk`/`foremost`
3. Kalau file terlihat corrupt, cek hex header-nya — mungkin header sengaja dirusak

---

## 8. Steganography

Steganografi adalah teknik menyembunyikan data di dalam media lain (gambar, audio, video) sehingga tidak terlihat mencurigakan.

### 8.1 Tools

```bash
steghide extract -sf gambar.jpg     # extract data tersembunyi (butuh password kadang)
zsteg gambar.png                     # khusus PNG/BMP, cek LSB dan metadata
stegsolve                             # tool GUI untuk analisis bit-plane gambar
```

### 8.2 Konsep LSB (Least Significant Bit)

Data disisipkan dengan mengubah bit paling tidak signifikan dari tiap piksel gambar — perubahan ini nyaris tidak terlihat oleh mata tapi bisa diekstrak secara terprogram.

### 8.3 Audio Steganography

Cek spektrogram file audio dengan **Sonic Visualiser** atau **Audacity** — kadang pesan/flag disembunyikan secara visual dalam bentuk gelombang frekuensi.

---

## 9. Reverse Engineering

### 9.1 Konsep Dasar

Reverse engineering adalah proses memahami cara kerja program tanpa (atau dengan sedikit) source code, biasanya dengan membaca hasil disassembly (kode assembly) dari file binary.

### 9.2 Tools

| Tools | Kegunaan |
|---|---|
| Ghidra | Disassembler + decompiler gratis dari NSA, paling populer |
| IDA Free | Alternatif Ghidra, decompiler terbatas di versi gratis |
| radare2/Cutter | Open-source, ringan, punya GUI (Cutter) |

### 9.3 Alur Analisis Basic

1. Cek tipe file: `file program` (ELF untuk Linux, PE untuk Windows)
2. Cek proteksi: `checksec program` (apakah ada stack canary, NX, PIE, ASLR)
3. Buka di Ghidra, cari fungsi `main`
4. Baca alur logika dalam bentuk pseudo-code hasil decompile
5. Perhatikan fungsi pembanding string (`strcmp`) — sering jadi kunci validasi flag

### 9.4 Level Menengah — Crackme

Program sederhana yang meminta input password/serial, tugasnya menemukan input yang benar dengan membaca logika validasinya di disassembly.

### 9.5 Level Advance — Obfuscation & Anti-Debugging

Program bisa memiliki teknik anti-analisis seperti:
- Pengecekan apakah program dijalankan di dalam debugger
- Kode yang dienkripsi dan baru didekripsi saat runtime (*packing*)
- Control flow yang sengaja dibuat rumit (*obfuscation*)

---

## 10. Binary Exploitation (Pwn)

> Kategori paling teknis — pahami dulu bagian Reverse Engineering sebelum masuk ke sini.

### 10.1 Konsep Dasar Memory

- Program menyimpan data di **stack** (local variable, return address) dan **heap** (alokasi dinamis)
- Setiap proses berjalan dalam ruang alamat memorinya sendiri

### 10.2 Proteksi Modern yang Perlu Dipahami

| Proteksi | Fungsi |
|---|---|
| Stack Canary | Nilai acak untuk deteksi jika stack di-overwrite |
| NX (No-Execute) | Mencegah eksekusi kode di area data/stack |
| ASLR | Mengacak alamat memori setiap kali program dijalankan |
| PIE | Executable-nya sendiri juga di-*load* di alamat acak |

Gunakan `checksec` untuk mengecek proteksi mana saja yang aktif pada binary target.

### 10.3 Kelas Kerentanan (Konsep, Basic → Advance)

- **Buffer Overflow** — program menulis data melebihi ukuran buffer yang dialokasikan, berpotensi menimpa data penting lain di memori termasuk return address
- **Format String Vulnerability** — fungsi seperti `printf` dipanggil dengan input pengguna langsung sebagai format string, bisa dimanfaatkan untuk membaca/menulis memori
- **Use-After-Free & Heap Exploitation** — memanfaatkan memori heap yang sudah dibebaskan tapi masih direferensikan
- **Return-Oriented Programming (ROP)** — teknik menyusun potongan-potongan instruksi yang sudah ada di binary untuk melewati proteksi NX

### 10.4 Tools

```bash
gdb ./program              # debugging manual
# dengan plugin pwndbg atau GEF untuk visualisasi memory yang lebih baik
```

Python dengan library **pwntools** digunakan untuk menyusun exploit secara terprogram dan berinteraksi dengan service remote:

```python
from pwn import *

io = remote('target_host', 1337)
# io.sendline(...), io.recvuntil(...), dsb — sesuaikan dengan alur program target
```

> Kategori ini membutuhkan pemahaman assembly (x86/x86-64) dan bahasa C yang cukup kuat. Disarankan mempelajari lewat jalur khusus seperti **pwn.college** atau **Nightmare CTF writeups repo** setelah menguasai dasar reverse engineering.

---

## 11. OSINT (Open Source Intelligence)

### 11.1 Konsep

Mengumpulkan informasi dari sumber-sumber yang tersedia secara publik (media sosial, mesin pencari, metadata, dokumen publik) untuk menjawab pertanyaan soal.

### 11.2 Teknik & Tools Umum

- **Google Dorking** — menggunakan operator pencarian lanjutan, misal `site:`, `filetype:`, `intitle:`
- **Reverse Image Search** (Google Images, TinEye, Yandex) — mencari asal-usul sebuah gambar
- **Metadata gambar** dengan `exiftool` (lihat bagian 7.1) — bisa membocorkan lokasi GPS, device, waktu pengambilan
- **Wayback Machine** — melihat versi lama sebuah halaman web
- **WHOIS lookup** — mencari informasi registrasi domain

### 11.3 Alur Berpikir

1. Baca soal dengan sangat teliti — biasanya ada petunjuk tersembunyi di kalimat soal
2. Kumpulkan semua data yang diberikan (username, gambar, email) sebagai titik awal pencarian
3. Hubungkan temuan satu sumber ke sumber lain (misal username yang sama dipakai di platform berbeda)

---

## 12. Scripting & Automasi dengan Python

Banyak soal CTF butuh otomatisasi karena harus dicoba berkali-kali (brute force ringan, decode berlapis, interaksi berulang dengan remote service).

### 12.1 Interaksi dengan Remote Service

```python
from pwn import *

io = remote('ctf.example.com', 1337)
print(io.recvline())
io.sendline(b'jawaban')
print(io.recvall())
```

### 12.2 Library Penting

| Library | Kegunaan |
|---|---|
| `requests` | Interaksi dengan web (untuk soal web exploitation) |
| `pwntools` | Interaksi remote service & exploit development |
| `pycryptodome` | Operasi kriptografi (AES, RSA, dsb) |
| `sympy` | Perhitungan matematis/teori bilangan (untuk RSA) |

### 12.3 Contoh: Decode Berlapis

```python
import base64
data = "ZmxhZ3t0ZXN0fQ=="
decoded = base64.b64decode(data).decode()
print(decoded)
```

---

## 13. Strategi Lomba & Roadmap Latihan

### 13.1 Roadmap Belajar Bertahap

| Tahap | Fokus | Estimasi Durasi |
|---|---|---|
| 1. Fondasi | Linux, networking dasar, Python dasar | 2–4 minggu |
| 2. Basic CTF | picoCTF, OverTheWire Bandit | 4–6 minggu |
| 3. Fokus Kategori | Pilih 1–2 kategori favorit, perdalam (web atau crypto disarankan untuk pemula) | 1–2 bulan |
| 4. Lomba Beginner | Ikut CTF beginner-friendly, kerja tim | Berkelanjutan |
| 5. Kategori Advance | Mulai pwn/reverse engineering setelah dasar kuat | 2–3 bulan+ |
| 6. Kompetitif | Ikut lomba reguler, baca write-up setelah setiap lomba | Berkelanjutan |

### 13.2 Tips Saat Lomba

- Kerja tim: bagi tugas per kategori sesuai kekuatan masing-masing anggota
- Jangan terpaku lama di satu soal — kalau stuck lebih dari waktu tertentu, pindah dulu ke soal lain
- Selalu baca soal dua kali — banyak petunjuk tersembunyi di deskripsi soal
- Simpan catatan setiap teknik yang dipelajari, karena teknik yang sama sering muncul lagi
- Setelah lomba selesai, **selalu baca write-up** soal yang tidak terpecahkan — ini bagian belajar paling efektif di CTF

---

## 14. Sumber Belajar & Platform Latihan

| Platform | Cocok untuk |
|---|---|
| **picoCTF** | Pemula, materi terstruktur dari basic |
| **OverTheWire (Bandit, Natas, dll)** | Dasar Linux & web, step-by-step |
| **TryHackMe** | Pemula–menengah, ada jalur belajar terpandu |
| **HackTheBox** | Menengah–advance |
| **PortSwigger Web Security Academy** | Web exploitation, gratis dan sangat lengkap |
| **CryptoHack** | Fokus khusus cryptography, dari basic ke advance |
| **pwn.college** | Fokus khusus binary exploitation/pwn |
| **CTFtime.org** | Kalender lomba CTF dari seluruh dunia + arsip write-up |

---

## Penutup

Modul ini adalah peta jalan awal, bukan buku lengkap — setiap bab bisa dikembangkan lebih dalam. Kunci utama menguasai CTF adalah **praktik konsisten** dan **membaca write-up** setelah setiap tantangan/lomba. Selamat belajar dan selamat hunting flag! 🚩
