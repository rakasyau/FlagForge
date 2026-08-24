# PRD: FlagForge — Platform Belajar Capture The Flag (CTF)

**Versi:** 1.0
**Jenis dokumen:** Product Requirements Document untuk implementasi oleh AI Coding Agent
**Status:** Draft siap-implementasi

---

## 1. Visi Produk

FlagForge adalah platform web interaktif untuk belajar CTF dari basic hingga advance. Berbeda dari platform latihan CTF pada umumnya yang tampil kaku dan teknis-mentah, FlagForge dibangun dengan bahasa visual **dark, premium, dan "instrument-like"** — user merasa sedang membuka sebuah alat canggih, bukan sekadar membaca dokumentasi.

**Pilar utama produk:**
1. **Modul pembelajaran terstruktur** per kategori (basic → advance), berbasis materi yang sudah disusun sebelumnya
2. **Soal latihan per kategori** dengan sistem *reveal-on-surrender* — jawaban & penjelasan hanya muncul jika user memilih menyerah
3. **Terminal interaktif** tertanam di browser untuk praktik command line secara langsung
4. **Landing page, autentikasi, dan progress tracking** sebagai fondasi produk

---

## 2. Design System

### 2.1 Filosofi Visual

Referensi desain menunjukkan panel-panel putih/off-white melayang di atas latar gelap berbintang, dengan sudut membulat besar (seperti bingkai perangkat), ikon sidebar minimalis, pill-shaped tag, dan aksen oranye yang muncul di titik fokus (kabel/neck robot). FlagForge mengadaptasi bahasa visual ini ke dunia CTF: **panel-panel "device" yang melayang di atas ruang gelap seperti terminal yang menyala di tengah kegelapan**, dengan aksen oranye sebagai warna "flag ditemukan" / status aktif.

### 2.2 Token Warna

| Token | Hex | Penggunaan |
|---|---|---|
| `--bg-void` | `#0A0A0C` | Latar belakang utama (dark space) |
| `--bg-void-alt` | `#131316` | Latar section sekunder, sedikit lebih terang |
| `--surface-panel` | `#F4F3F0` | Panel/card terang (mengikuti referensi — off-white, bukan putih murni) |
| `--surface-dark-card` | `#1C1C20` | Card gelap di atas bg-void (untuk kategori, soal) |
| `--accent-flag` | `#FF5A1F` | Aksen utama: tombol capture, status "solved", highlight fokus |
| `--accent-flag-dim` | `#7A3218` | Varian redup untuk border/glow halus |
| `--text-on-dark` | `#F4F3F0` | Teks di atas latar gelap |
| `--text-on-light` | `#131316` | Teks di atas panel terang |
| `--text-muted` | `#8A8A92` | Teks sekunder/caption |
| `--success-solved` | `#4ADE80` | Indikator soal terselesaikan |
| `--danger-locked` | `#F04438` | Indikator terkunci/gagal |

### 2.3 Tipografi

| Peran | Font | Alasan |
|---|---|---|
| Display (judul besar) | **Space Grotesk** | Geometris, sedikit teknikal, cocok nuansa "instrument panel" |
| Body | **Inter** | Netral, sangat terbaca di ukuran kecil untuk konten materi panjang |
| Utility/Terminal/Kode | **JetBrains Mono** | Wajib untuk terminal, snippet command, dan flag format `flag{...}` |

Skala: Display 48/36/28px (bold, tight tracking), Body 16/14px (regular/medium), Mono 14px.

### 2.4 Konsep Layout

```
┌─────────────────────────────────────────────┐
│  bg-void (starfield gelap, halus, subtle)     │
│   ┌───────────────────────────────────┐      │
│   │  PANEL (surface-panel, radius 32px) │      │
│   │  ┌────┐  Konten utama (materi/soal) │      │
│   │  │side│                             │      │
│   │  │rail│  [pill tags kategori]       │      │
│   │  └────┘                             │      │
│   └───────────────────────────────────┘      │
│         ┌─────────────┐                       │
│         │ terminal card │ (dark, mengambang,   │
│         │ (surface-dark)│  glow oranye tipis)  │
│         └─────────────┘                       │
└─────────────────────────────────────────────┘
```

Elemen "device frame" dari referensi (sudut sangat membulat, border tipis, shadow lembut) dipakai konsisten di: hero landing page, dashboard utama, dan kartu terminal — supaya web ini terasa seperti "alat", bukan halaman dokumentasi biasa.

### 2.5 Elemen Signature

**Signature element FlagForge:** *Terminal Card* — kartu gelap dengan cursor berkedip warna `--accent-flag`, mengambang dengan sedikit efek glow oranye di tepinya, muncul konsisten di landing page (sebagai demo animasi mengetik), di setiap halaman kategori (praktik langsung), dan sebagai elemen dekoratif di halaman soal. Ini menyatukan identitas "instrument panel" dari referensi dengan dunia terminal/hacking yang menjadi inti produk.

### 2.6 Motion

- Landing hero: sequence mengetik otomatis di terminal card (`nc target 1337` → respons palsu → `flag{...}`) saat halaman dimuat
- Hover pada kartu kategori: elevasi ringan + glow oranye tipis di border
- Reveal jawaban soal: transisi fade+slide, bukan muncul instan (memberi jeda psikologis "menyerah")
- Respect `prefers-reduced-motion`

---

## 3. Sitemap / Arsitektur Halaman

```
/                          → Landing Page (publik)
/login, /register          → Autentikasi
/dashboard                 → Home setelah login (progress overview)
/modules                   → Daftar semua kategori materi
/modules/[kategori]        → Materi lengkap kategori (dari modul MD yang sudah dibuat)
/practice                  → Daftar semua soal latihan (filter per kategori & difficulty)
/practice/[kategori]/[id]  → Halaman soal + terminal + area jawaban
/terminal                  → Sandbox terminal bebas (tanpa soal, untuk eksplorasi)
/profile                   → Progress, badge, riwayat soal terselesaikan
/leaderboard               → (opsional Fase lanjut) ranking user
```

---

## 4. Spesifikasi Fitur

### 4.1 Landing Page (`/`)

- **Hero:** Terminal card animasi mengetik otomatis (lihat 2.6) sebagai fokus utama — bukan gambar stok atau ilustrasi generik
- Penjelasan singkat pilar produk (materi terstruktur, latihan tanpa spoiler, terminal langsung di browser)
- Preview kategori (grid pill card seperti "CHOOSE STYLES" pada referensi, tapi isinya kategori CTF: Web, Crypto, Forensics, Pwn, dst.)
- Social proof/CTA sederhana (jumlah soal tersedia, jumlah kategori)
- CTA akhir → `/register`

### 4.2 Autentikasi (`/login`, `/register`)

- Email + password, opsional OAuth (Google/GitHub — GitHub relevan untuk audiens developer/security)
- Session tersimpan, redirect ke `/dashboard` setelah login
- Halaman lupa password (reset via email)

### 4.3 Dashboard (`/dashboard`)

- Ringkasan progress: jumlah soal terselesaikan per kategori (progress bar per kategori dengan warna `--accent-flag`)
- "Lanjutkan belajar" — shortcut ke materi/soal terakhir dibuka
- Rekomendasi soal berikutnya berdasarkan kategori yang belum banyak disentuh

### 4.4 Modul Materi (`/modules`, `/modules/[kategori]`)

- Konten diambil dari modul pembelajaran MD yang sudah disusun (14 bab: Pengantar, Setup, Linux, Networking, Crypto, Web, Forensics, Steganography, Reverse Engineering, Pwn, OSINT, Scripting, Strategi, Sumber Belajar)
- Setiap kategori jadi satu halaman/section dengan navigasi sidebar (basic → advance secara vertikal, mengikuti struktur bab yang sudah ada)
- Tombol "Coba soal kategori ini" di akhir setiap materi → redirect ke `/practice/[kategori]`
- Render markdown dengan syntax highlighting untuk blok kode/command

### 4.5 Soal Latihan (`/practice`, `/practice/[kategori]/[id]`) — Fitur Inti

**Alur inti yang diminta user:**
1. User membuka soal → hanya deskripsi soal dan (jika perlu) file/lampiran soal yang ditampilkan
2. User mengetik jawaban (flag) di input field
3. Jika jawaban benar → tampilkan status "Solved" (warna `--success-solved`), baru tampilkan penjelasan lengkap
4. Jika user memilih **"Menyerah / Lihat Jawaban"** → tampilkan konfirmasi ("Yakin? Ini akan menandai soal sebagai dilihat, bukan diselesaikan mandiri") → jika dikonfirmasi, tampilkan jawaban + penjelasan step-by-step
5. Status soal tersimpan 3 kondisi: **Belum dicoba / Solved mandiri / Dilihat jawabannya** — dibedakan di riwayat & progress supaya user tetap jujur ke diri sendiri soal mana yang benar-benar dikuasai

**Komponen halaman soal:**
- Panel deskripsi soal (kategori, tingkat kesulitan, poin)
- Panel lampiran (download file soal jika ada — untuk forensics/crypto/pwn)
- **Terminal Card** tertanam langsung di halaman (lihat 4.6) supaya user bisa praktik tanpa pindah tab
- Input jawaban dengan validasi format `flag{...}`
- Tombol sekunder redup "Saya menyerah, tampilkan jawaban"

### 4.6 Terminal Interaktif

**Cakupan realistis untuk MVP:** Terminal berbasis simulasi client-side (bukan shell sungguhan ke server) yang mendukung command umum CTF edukatif: `ls`, `cd`, `cat`, `file`, `strings`, `pwd`, `whoami`, `help`, serta command khusus yang disiapkan per soal (misalnya `cat flag.txt` menampilkan file dummy yang memang jadi bagian soal forensics/Linux basic).

- Dibangun dengan **xterm.js** di frontend untuk tampilan & interaksi terminal yang autentik
- Filesystem virtual per soal didefinisikan di backend/data soal (bukan akses sistem nyata — aman, tidak butuh sandboxing infrastruktur berat)
- Untuk soal kategori yang butuh eksekusi nyata (misalnya scripting Python untuk crypto), sediakan mini code-runner terpisah (lihat 4.7) alih-alih memperluas terminal jadi shell penuh
- Halaman `/terminal` sebagai sandbox bebas eksplorasi command dasar tanpa konteks soal tertentu

> **Catatan implementasi penting:** Jangan berikan shell akses nyata ke server tanpa isolasi container yang matang — ini soal keamanan produksi yang serius. Untuk MVP, simulasi virtual filesystem sudah cukup memenuhi kebutuhan edukatif tanpa risiko keamanan.

### 4.7 Mini Code Runner (pendukung kategori Crypto/Scripting)

- Editor kode ringan (Monaco Editor atau CodeMirror) khusus Python untuk soal yang membutuhkan eksperimen decode/scripting
- Eksekusi berbasis **Pyodide** (Python di browser via WebAssembly) — tidak butuh backend eksekusi kode, aman karena berjalan sepenuhnya di sisi client

### 4.8 Profile & Progress (`/profile`)

- Statistik total soal solved vs dilihat jawabannya, per kategori
- Riwayat aktivitas (timeline soal yang dikerjakan)
- Badge sederhana per milestone (misal "10 Soal Web Solved")

---

## 5. Skema Data (konsep, untuk diimplementasikan di database pilihan)

```
User
 - id, email, password_hash, username, created_at

Category
 - id, name (Web, Crypto, Forensics, Pwn, Reverse, Stego, OSINT, Networking), difficulty_tier

ModuleContent
 - id, category_id, title, order_index, content_md

Challenge (soal)
 - id, category_id, title, description, difficulty (basic/menengah/advance),
 - points, flag_hash (jangan simpan flag plaintext di DB!),
 - explanation_md, attachment_url (nullable),
 - terminal_fs_config (JSON — definisi virtual filesystem jika soal pakai terminal)

UserChallengeProgress
 - id, user_id, challenge_id, status (not_attempted / solved / revealed),
 - attempts_count, solved_at, revealed_at

Submission (log percobaan jawaban, untuk analitik/anti-bruteforce)
 - id, user_id, challenge_id, submitted_value, is_correct, submitted_at
```

**Catatan keamanan:** `flag_hash` disimpan dalam bentuk hash (misal SHA-256), bukan plaintext, supaya flag tidak bisa dibaca langsung dari database jika terjadi kebocoran data — validasi jawaban dilakukan dengan hashing input user lalu dibandingkan.

---

## 6. Rekomendasi Tumpukan Teknologi (Tech Stack)

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js (App Router) | SSR untuk landing/SEO, routing halaman modul & soal yang banyak |
| Styling | Tailwind CSS | Cepat untuk implementasi design token di atas |
| Animasi | Framer Motion | Untuk motion pada 2.6 |
| Auth | NextAuth.js + Supabase | Konsisten dengan pola yang pernah dipakai sebelumnya (portofolio CMS) |
| Database | Supabase (PostgreSQL) | Auth & DB dalam satu ekosistem |
| Terminal UI | xterm.js | Standar industri untuk terminal berbasis web |
| Code runner | Pyodide | Python di browser tanpa backend eksekusi |
| Markdown rendering | `react-markdown` + `rehype-highlight` | Untuk render modul materi + syntax highlighting command |
| Editor kode (opsional) | Monaco Editor | Untuk fitur mini code runner |

---

## 7. Roadmap Implementasi Multi-Fase

### Fase 1 — Fondasi & Design System
**Scope:** Setup project Next.js + Tailwind, implementasi design token (warna, tipografi, komponen dasar: Button, Card panel, Card dark, Pill tag), landing page statis dengan hero terminal card (animasi mengetik).

**Prompt untuk AI Coding Agent:**
```
Buat project Next.js (App Router) + Tailwind CSS. Implementasikan design token berikut sebagai
CSS variables/Tailwind theme extend: [salin tabel 2.2 & 2.3]. Buat komponen dasar reusable:
PanelCard (surface-panel, radius 32px, shadow lembut), DarkCard (surface-dark-card),
PillTag, Button (primary pakai accent-flag). Buat landing page dengan hero berisi terminal
card animasi mengetik otomatis menggunakan Framer Motion, menampilkan sequence:
"nc target.flagforge.io 1337" lalu balasan palsu lalu "flag{s3lam4t_d4t4ng}".
Ikuti prinsip layout "device frame" pada bagian 2.4 PRD ini — sudut sangat membulat,
panel melayang di atas latar gelap berbintang halus.
```

### Fase 2 — Autentikasi & Struktur Database
**Scope:** Setup Supabase, skema tabel sesuai bagian 5, integrasi NextAuth.js, halaman login/register/dashboard kosong (skeleton).

**Prompt untuk AI Coding Agent:**
```
Integrasikan Supabase sebagai database dan NextAuth.js untuk autentikasi email/password
(opsional tambahkan provider GitHub OAuth). Buat skema tabel PostgreSQL sesuai struktur
di bagian 5 PRD ini: User, Category, ModuleContent, Challenge, UserChallengeProgress,
Submission. Pastikan kolom flag pada tabel Challenge disimpan sebagai flag_hash (SHA-256),
bukan plaintext. Buat halaman /login dan /register dengan styling PanelCard dari Fase 1,
serta halaman /dashboard skeleton yang redirect otomatis jika belum login.
```

### Fase 3 — Modul Materi
**Scope:** Migrasi konten modul MD (14 bab yang sudah dibuat) ke database/CMS sederhana, halaman `/modules` dan `/modules/[kategori]` dengan rendering markdown + navigasi sidebar.

**Prompt untuk AI Coding Agent:**
```
Buat halaman /modules yang menampilkan grid kategori materi (Pengantar CTF, Cryptography,
Web Exploitation, Forensics, Steganography, Reverse Engineering, Binary Exploitation,
OSINT, Networking, Scripting) menggunakan PillTag/Card dari design system. Buat halaman
dinamis /modules/[kategori] yang me-render konten markdown (gunakan react-markdown +
rehype-highlight untuk blok kode) dengan sidebar navigasi sub-bab. Sediakan tombol
"Coba soal kategori ini" di akhir setiap halaman materi yang mengarah ke /practice/[kategori].
Sumber konten: [lampirkan isi modul MD basic-to-advance yang sudah dibuat sebelumnya].
```

### Fase 4 — Sistem Soal Latihan (Reveal-on-Surrender)
**Scope:** Halaman `/practice`, `/practice/[kategori]/[id]`, logic validasi jawaban via hash, mekanisme reveal jawaban dengan konfirmasi, update status di UserChallengeProgress.

**Prompt untuk AI Coding Agent:**
```
Buat halaman /practice/[kategori]/[id] dengan komponen: panel deskripsi soal, panel
lampiran (jika ada attachment_url), input jawaban dengan format placeholder "flag{...}",
dan tombol submit. Validasi jawaban dilakukan dengan hashing input (SHA-256) dan
membandingkan ke challenge.flag_hash di server (API route), TIDAK di client, supaya flag
tidak bisa dilihat dari network tab browser. Jika benar: update UserChallengeProgress
status="solved", tampilkan penjelasan (explanation_md) dengan animasi fade+slide.
Sediakan tombol sekunder redup "Saya menyerah, tampilkan jawaban" yang memunculkan
modal konfirmasi sebelum menampilkan explanation_md dan mengubah status jadi "revealed"
(bukan "solved") — dua status ini harus dibedakan secara visual di halaman /profile nanti.
```

### Fase 5 — Terminal Interaktif & Code Runner
**Scope:** Integrasi xterm.js dengan virtual filesystem per soal, halaman `/terminal` sandbox bebas, integrasi Pyodide untuk mini code runner di soal kategori Crypto/Scripting.

**Prompt untuk AI Coding Agent:**
```
Integrasikan xterm.js sebagai komponen TerminalCard yang bisa ditanam di halaman soal
maupun halaman /terminal (mode sandbox bebas). Implementasikan command handler client-side
yang mendukung: ls, cd, cat, pwd, file, strings, whoami, help — dijalankan terhadap virtual
filesystem yang didefinisikan dari field terminal_fs_config (JSON) pada tabel Challenge.
Styling TerminalCard mengikuti signature element di bagian 2.5 PRD ini: dark card dengan
cursor berkedip warna accent-flag dan glow tipis di border. Untuk kategori Crypto/Scripting,
tambahkan komponen CodeRunner terpisah menggunakan Pyodide (load Python runtime di browser),
dengan editor berbasis Monaco Editor, tombol "Run" menampilkan output di bawah editor.
```

### Fase 6 — Progress, Profile, Polish & Deploy
**Scope:** Halaman `/profile` dengan statistik dan riwayat, badge sederhana, responsive check menyeluruh, aksesibilitas (keyboard focus, reduced motion), deploy.

**Prompt untuk AI Coding Agent:**
```
Buat halaman /profile menampilkan: total soal solved vs revealed per kategori (progress
bar warna accent-flag untuk solved, warna netral untuk revealed), timeline riwayat aktivitas
dari tabel Submission, dan badge sederhana berbasis milestone (misal 10 soal solved di satu
kategori). Lakukan audit responsive di semua halaman (mobile, tablet, desktop mengikuti
breakpoint Tailwind default), pastikan semua interactive element punya visible keyboard
focus state, dan bungkus animasi Framer Motion dengan pengecekan prefers-reduced-motion.
Siapkan untuk deploy ke Vercel.
```

---

## 8. Prinsip Lintas-Fase untuk AI Coding Agent

- **Selalu ikuti token warna & tipografi di bagian 2** — jangan gunakan warna/font di luar token tanpa alasan eksplisit
- **Jangan pernah expose flag plaintext ke client** — validasi jawaban selalu lewat API route server-side, tidak pernah hardcode flag di kode frontend
- **Terminal tidak boleh berupa shell akses nyata ke server produksi** tanpa isolasi container — gunakan pendekatan simulasi virtual filesystem sesuai bagian 4.6
- **Bedakan status "solved" vs "revealed" secara konsisten** di seluruh UI (dashboard, profile, riwayat) — ini adalah kebutuhan inti produk untuk menjaga integritas belajar user
- Setiap fase sebaiknya diverifikasi berjalan (build sukses, halaman bisa diakses) sebelum lanjut ke fase berikutnya

---

## Penutup

PRD ini dirancang untuk dieksekusi bertahap oleh AI coding agent, fase demi fase, dengan prompt siap pakai di setiap bagian. Konten materi pembelajaran (bagian 4.4) mengacu langsung ke modul MD basic-to-advance yang sudah disusun sebelumnya — pastikan file tersebut disertakan sebagai konteks saat menjalankan prompt Fase 3.
