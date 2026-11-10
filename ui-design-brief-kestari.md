# 🎨 UI Design Brief — Website Open House Kestari HIMATIK

---

## 1. Brand Reference

````carousel
![Logo HIMATIK](C:/Users/mynam/.gemini/antigravity/brain/45de2e41-3277-4135-8493-5d729ff131a4/logo-himatik.png)
<!-- slide -->
![Logo Kestari](C:/Users/mynam/.gemini/antigravity/brain/45de2e41-3277-4135-8493-5d729ff131a4/logo-kestari.png)
````

| Elemen | Observasi |
|--------|-----------|
| **Logo HIMATIK** | Badge hexagonal, warna biru royal (#2563EB) dan navy (#1E3A5F), detail buku/dokumen dengan pena, ribbon badge, teks "HIMATIK" dan "MMXV" |
| **Logo Kestari** | Figur manusia dinamis, gradien biru (#1D4ED8) → cyan (#22D3EE), kesan gesit dan modern |
| **Karakter** | Formal tapi nggak kaku. Terstruktur tapi energik. |

---

## 2. Design System

### 2.1 Color Palette

#### Primary — Navy Family (dari logo HIMATIK)
| Token | Hex | Preview | Penggunaan |
|-------|-----|---------|------------|
| `--navy-950` | `#070E1B` | 🟫 | Background paling gelap (body) |
| `--navy-900` | `#0B1629` | 🟫 | Background section genap |
| `--navy-800` | `#0F1F3D` | 🟫 | Background section ganjil / card bg |
| `--navy-700` | `#162D56` | 🟫 | Card hover / elevated surface |
| `--navy-600` | `#1E3D73` | 🟦 | Border, divider |

#### Accent — Blue & Cyan (dari logo Kestari)
| Token | Hex | Preview | Penggunaan |
|-------|-----|---------|------------|
| `--blue-500` | `#3B82F6` | 🔵 | Tombol primary, link, aktif |
| `--blue-400` | `#60A5FA` | 🔵 | Tombol hover |
| `--blue-600` | `#2563EB` | 🔵 | Tombol pressed |
| `--cyan-400` | `#22D3EE` | 🔵 | Glow effect, highlight angka/score |
| `--cyan-300` | `#67E8F9` | 🔵 | Aksen ringan, cursor typing |

#### Semantic
| Token | Hex | Penggunaan |
|-------|-----|------------|
| `--green-400` | `#4ADE80` | Karakter benar, sukses |
| `--green-500` | `#22C55E` | Badge sukses |
| `--red-400` | `#F87171` | Karakter salah, error |
| `--red-500` | `#EF4444` | Badge error |
| `--amber-400` | `#FBBF24` | Warning, "lumayan" |

#### Neutral — Text & Surface
| Token | Hex | Penggunaan |
|-------|-----|------------|
| `--white` | `#F8FAFC` | Heading text, text utama |
| `--gray-200` | `#E2E8F0` | Body text |
| `--gray-400` | `#94A3B8` | Secondary text, caption, placeholder |
| `--gray-500` | `#64748B` | Disabled text |
| `--gray-700` | `#334155` | Subtle border |

### 2.2 Typography

| Elemen | Font | Weight | Size (Desktop) | Size (Mobile) |
|--------|------|--------|----------------|---------------|
| **H1 (Hero)** | Inter | 800 (ExtraBold) | 56px / 3.5rem | 36px / 2.25rem |
| **H2 (Section)** | Inter | 700 (Bold) | 40px / 2.5rem | 28px / 1.75rem |
| **H3 (Sub)** | Inter | 600 (SemiBold) | 24px / 1.5rem | 20px / 1.25rem |
| **Body** | Inter | 400 (Regular) | 16px / 1rem | 15px |
| **Body Large** | Inter | 400 | 18px / 1.125rem | 16px / 1rem |
| **Caption** | Inter | 400 | 14px / 0.875rem | 13px |
| **Mono (Game)** | JetBrains Mono | 400 | 20px / 1.25rem | 16px / 1rem |
| **Score Number** | Inter | 800 | 48px / 3rem | 32px / 2rem |

- **Line height:** 1.5 untuk body, 1.2 untuk heading
- **Letter spacing:** -0.02em untuk heading, normal untuk body
- **Fallback:** `system-ui, -apple-system, sans-serif`
- **Monospace fallback:** `'Courier New', monospace`

### 2.3 Spacing Scale

Gunakan kelipatan 4px:

| Token | Value | Penggunaan |
|-------|-------|------------|
| `--space-1` | 4px | Micro gap |
| `--space-2` | 8px | Inline gap, icon-to-text |
| `--space-3` | 12px | Input padding-x |
| `--space-4` | 16px | Card padding, gap antar elemen kecil |
| `--space-6` | 24px | Card padding (large), gap antar komponen |
| `--space-8` | 32px | Gap antar card group |
| `--space-12` | 48px | Margin antar section content |
| `--space-16` | 64px | Section padding-y (desktop) |
| `--space-20` | 80px | Section padding-y besar |
| `--space-24` | 96px | Hero padding-y |

### 2.4 Border Radius

| Token | Value | Penggunaan |
|-------|-------|------------|
| `--radius-sm` | 6px | Badge, chip |
| `--radius-md` | 10px | Tombol, input |
| `--radius-lg` | 16px | Card |
| `--radius-xl` | 24px | Card besar, game container |
| `--radius-full` | 9999px | Pill button, avatar |

### 2.5 Elevation / Shadow

| Level | Shadow | Penggunaan |
|-------|--------|------------|
| **Flat** | none | Default card |
| **Raised** | `0 4px 24px rgba(0,0,0,0.25)` | Card hover, modal |
| **Glow** | `0 0 20px rgba(59,130,246,0.3)` | Active game element |
| **Cyan Glow** | `0 0 24px rgba(34,211,238,0.25)` | Score highlight |

---

## 3. Layout & Wireframes

### 3.0 Navbar (Fixed Top)

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Logo Kestari]  Kestari              About   Tugas   Game   🏆    │
│  (28px icon)     (text, bold)        (nav links, smooth scroll)    │
└─────────────────────────────────────────────────────────────────────┘
```

- **Posisi:** Fixed top, z-index tinggi
- **Background:** `--navy-950` dengan `backdrop-filter: blur(12px)` + opacity 90%
- **Height:** 64px
- **Behaviour:** 
  - Desktop: semua link tampil horizontal
  - Mobile: hamburger menu → slide-down menu
- **Active state:** Link yang sedang di-viewport diberi underline `--cyan-400`
- **Scroll:** Navbar sedikit lebih gelap setelah user scroll (tambah shadow)

---

### 3.1 Section A — Hero / Landing

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                     ┌──────────┐                                    │
│                     │  LOGO    │  ← Logo HIMATIK (80px)             │
│                     │  HIMATIK │                                    │
│                     └──────────┘                                    │
│                                                                     │
│            Biro Kesekretariatan HIMATIK                             │
│                  (subtitle, gray-200)                               │
│                                                                     │
│          ✦ The Power Behind an                                      │
│            Organized Organization. ✦                                │
│              (H1, white, extrabold)                                 │
│                                                                     │
│       Kenalan dengan Kestari, biro yang menjaga                     │
│       administrasi dan dokumentasi HIMATIK tetap tertata.           │
│              (body large, gray-400)                                 │
│                                                                     │
│        ┌─────────────────────┐   ┌───────────────────────┐         │
│        │  Kenalan dengan     │   │  🎮 Main Typing       │         │
│        │  Kestari ↓          │   │     Challenge          │         │
│        │  (outline button)   │   │  (primary button,     │         │
│        └─────────────────────┘   │   glow effect)        │         │
│                                  └───────────────────────┘         │
│                                                                     │
│                         ↓ scroll indicator                          │
│                    (animated bounce)                                 │
└─────────────────────────────────────────────────────────────────────┘
```

**Spesifikasi:**
- **Height:** 100vh (full viewport)
- **Background:** Gradient radial dari `--navy-800` (center) ke `--navy-950` (edge)
- **Background detail:** Subtle grid pattern atau dot pattern dengan opacity rendah (5-8%) untuk kesan tech
- **Logo:** Centered, 80px, dengan subtle glow animation
- **Headline:** `--white`, centered, max-width 700px
- **CTA buttons:** 2 tombol side-by-side, gap 16px
  - "Kenalan dengan Kestari" → outline/ghost button (border `--blue-500`)
  - "Main Typing Challenge" → filled button (`--blue-500`), dengan box-shadow glow
- **Scroll indicator:** Chevron kecil, animated bounce infinite

---

### 3.2 Section B — About Kestari

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│              Kestari Itu Apa, Sih?  (H2)                           │
│              ─────────────────  (underline accent cyan)             │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                                                             │   │
│   │  [Icon Kestari]                                             │   │
│   │                                                             │   │
│   │  Biro Kesekretariatan merupakan bagian organisasi yang      │   │
│   │  mendukung kelancaran tata kelola administrasi. Kestari     │   │
│   │  membantu memastikan informasi, dokumen, dan catatan        │   │
│   │  kegiatan dikelola secara sistematis sehingga kebutuhan     │   │
│   │  administratif organisasi dapat berjalan dengan baik.       │   │
│   │                                                             │   │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │   │
│   │  │   📄 XX+     │  │   📝 XX+     │  │   📁 XX+     │      │   │
│   │  │   Surat      │  │   Notulensi  │  │   Dokumen    │      │   │
│   │  │   Dikelola   │  │   Tercatat   │  │   Terarsip   │      │   │
│   │  └──────────────┘  └──────────────┘  └──────────────┘      │   │
│   │   (mini stat cards, angka besar cyan, label kecil gray)     │   │
│   │                                                             │   │
│   └─────────────────────────────────────────────────────────────┘   │
│       (card container, navy-800 bg, radius-xl)                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Spesifikasi:**
- **Background:** `--navy-900`
- **Container:** Max-width 800px, centered
- **Deskripsi:** Dalam card besar, teks `--gray-200`, line-height 1.7
- **Mini stat cards:** 3 kolom, angka besar (`--cyan-400`, font-weight 800), label kecil (`--gray-400`)
- **Logo Kestari:** 48px, ditampilkan di atas paragraf sebagai identitas visual

> [!NOTE]
> Angka stat (XX+) bisa diisi angka nyata dari data Kestari — misalnya jumlah surat yang pernah dikelola, jumlah rapat yang pernah dinotulensi, dsb. Kalau belum ada datanya, bisa dihilangkan atau pakai ilustrasi ikon saja.

---

### 3.3 Section C — What We Do

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│         Apa Saja yang Dikerjakan Kestari?  (H2)                    │
│                                                                     │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│   │  ✉️  ICON    │  │  📋  ICON    │  │  📝  ICON    │             │
│   │              │  │              │  │              │             │
│   │  Surat-      │  │  Pengelolaan │  │  Notulensi & │             │
│   │  Menyurat    │  │  Dokumen     │  │  Rapat       │             │
│   │              │  │              │  │              │             │
│   │  Membantu    │  │  Menata dan  │  │  Mencatat    │             │
│   │  proses adm  │  │  menyimpan   │  │  pembahasan  │             │
│   │  surat ...   │  │  dokumen ... │  │  keputusan.. │             │
│   │              │  │              │  │              │             │
│   │  [garis biru │  │  [garis biru │  │  [garis biru │             │
│   │   di bawah]  │  │   di bawah]  │  │   di bawah]  │             │
│   └──────────────┘  └──────────────┘  └──────────────┘             │
│                                                                     │
│   ┌──────────────┐  ┌──────────────┐                               │
│   │  📑  ICON    │  │  🗂️  ICON    │                               │
│   │              │  │              │                               │
│   │  Administrasi│  │  Arsip &     │                               │
│   │  Kegiatan    │  │  Dokumentasi │                               │
│   │              │  │              │                               │
│   │  Mendukung   │  │  Menjaga     │                               │
│   │  kebutuhan   │  │  rekam jejak │                               │
│   │  admin ...   │  │  kegiatan .. │                               │
│   └──────────────┘  └──────────────┘                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Spesifikasi:**
- **Background:** `--navy-950`
- **Layout:** CSS Grid, 3 kolom desktop → 2 kolom tablet → 1 kolom mobile
- **Card style:**
  - Background: `--navy-800`
  - Border: 1px `--navy-600`
  - Border-radius: `--radius-lg`
  - Padding: 24px
  - **Top accent:** 3px solid gradient (`--blue-500` → `--cyan-400`) di border-top card
  - Hover: translateY(-4px) + shadow Raised + border `--blue-500`
- **Icon:** SVG 40px, warna `--blue-400`, di atas judul
- **Judul card:** `--white`, font-weight 600
- **Deskripsi card:** `--gray-400`, font-size 14px, max 2-3 baris

---

### 3.4 Section D — Why Kestari Matters

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│              Kenapa Kestari Penting?  (H2)                         │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                                                             │   │
│   │   01 ─── Terorganisasi                                      │   │
│   │          Dokumen dan informasi lebih tertata,               │   │
│   │          mudah ditemukan saat dibutuhkan.                    │   │
│   │                                                             │   │
│   │   ─────────────────────────────── (divider tipis)           │   │
│   │                                                             │   │
│   │   02 ─── Terdokumentasi                                    │   │
│   │          Keputusan serta perjalanan organisasi               │   │
│   │          memiliki catatan yang jelas.                        │   │
│   │                                                             │   │
│   │   ─────────────────────────────── (divider tipis)           │   │
│   │                                                             │   │
│   │   03 ─── Akuntabel                                          │   │
│   │          Proses administrasi membantu organisasi bekerja     │   │
│   │          secara transparan dan dapat                         │   │
│   │          dipertanggungjawabkan.                              │   │
│   │                                                             │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Spesifikasi:**
- **Background:** `--navy-900`
- **Layout:** List vertikal dalam card besar, max-width 700px
- **Nomor:** `--cyan-400`, font-weight 800, font-size 20px
- **Judul poin:** `--white`, font-weight 600, inline setelah garis "───"
- **Deskripsi:** `--gray-200`, di bawah judul
- **Divider:** 1px `--navy-600`, margin-y 20px
- **Alternatif layout:** Bisa juga 3 card horizontal seperti section C jika dirasa lebih engaging

---

### 3.5 Section E — Typing Game

Ini section paling kompleks. Ada beberapa **state** yang perlu didesain:

#### State 1: Mode Selection (Default)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│              ⌨️  Kestari Typing Challenge  (H2)                    │
│              Seberapa cepat dan akurat kamu mengetik?               │
│                                                                     │
│   ┌────────────────────────────┐  ┌────────────────────────────┐   │
│   │                            │  │                            │   │
│   │         👤                 │  │         👥                 │   │
│   │    (icon besar)            │  │    (icon besar)            │   │
│   │                            │  │                            │   │
│   │       SOLO                 │  │       MABAR                │   │
│   │                            │  │                            │   │
│   │  Main sendiri, uji         │  │  Main bareng! Ketik       │   │
│   │  kecepatan dan             │  │  berdua di 2 laptop       │   │
│   │  ketelitianmu.             │  │  booth.                   │   │
│   │                            │  │                            │   │
│   │   ┌──────────────────┐     │  │   ┌──────────────────┐     │   │
│   │   │   Mulai Solo  →  │     │  │   │   Mulai Mabar →  │     │   │
│   │   └──────────────────┘     │  │   └──────────────────┘     │   │
│   │                            │  │                            │   │
│   └────────────────────────────┘  └────────────────────────────┘   │
│                                                                     │
│   ┌───────────────────────────────────────────────────────────┐     │
│   │  🏆 Lihat Leaderboard                              →     │     │
│   └───────────────────────────────────────────────────────────┘     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- **Background section:** `--navy-950`
- **Mode cards:** 2 kolom, bg `--navy-800`, border `--navy-600`, radius-xl
- **Hover:** Border berubah ke `--blue-500`, subtle glow
- **Icon mode:** SVG/emoji besar 48px
- **Leaderboard shortcut:** Full-width link/button di bawah

#### State 2: Name Input (setelah pilih mode)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│           Siapa nama panggilanmu?                                   │
│                                                                     │
│           ┌─────────────────────────────────┐                       │
│           │  Ketik nama...                  │  ← input, max 20char  │
│           └─────────────────────────────────┘                       │
│                                                                     │
│           ┌───────────────┐  ┌──────────────┐                       │
│           │    Kembali    │  │   Lanjut →   │                       │
│           └───────────────┘  └──────────────┘                       │
│                                                                     │
│    (untuk Mabar: juga tampilkan input room code / buat room)        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### State 3: Solo — Playing

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                                                             │   │
│   │  ⏱️ 00:24          SOLO           WPM: 52 | Akurasi: 94%   │   │
│   │  (timer, besar,    (label)        (live stats, kanan)       │   │
│   │   cyan glow)                                                │   │
│   │                                                             │   │
│   │  ┌─────────────────────────────────────────────────────┐    │   │
│   │  │                                                     │    │   │
│   │  │  Biro Kesekretariatan merupakan bagian organ        │    │   │
│   │  │  ████████████████████████████████████ █████         │    │   │
│   │  │  isasi yang mendukung kelancaran tata kelola        │    │   │
│   │  │  administrasi.                                      │    │   │
│   │  │                                                     │    │   │
│   │  │  ████ = sudah diketik (warna hijau)                 │    │   │
│   │  │  █ = cursor position (blinking, cyan)               │    │   │
│   │  │  teks biasa = belum diketik (warna gray-400)        │    │   │
│   │  │  merah = salah ketik                                │    │   │
│   │  │                                                     │    │   │
│   │  └─────────────────────────────────────────────────────┘    │   │
│   │   (text display area: bg navy-950, padding 24px,            │   │
│   │    monospace font, line-height 1.8)                         │   │
│   │                                                             │   │
│   │  ┌─────────────────────────────────────────────────────┐    │   │
│   │  │  Ketik di sini...                              │    │    │   │
│   │  └─────────────────────────────────────────────────────┘    │   │
│   │   (hidden input / focused typing area)                      │   │
│   │                                                             │   │
│   │  ┌──────────────────────────────────────────┐               │   │
│   │  │  ████████████████████████░░░░░░░░░░░░░░  │  68%          │   │
│   │  └──────────────────────────────────────────┘               │   │
│   │   (progress bar: gradient blue → cyan)                      │   │
│   │                                                             │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Detail game area:**
- **Container:** bg `--navy-800`, border `--navy-600`, radius-xl, padding 32px
- **Timer:** Font-size 32px, `--cyan-400`, monospace. Pulse animation di 10 detik terakhir (warna merah)
- **Live stats:** WPM dan akurasi update real-time, posisi kanan atas
- **Text display:**
  - Background: `--navy-950`
  - Font: JetBrains Mono, 20px
  - Karakter benar: `--green-400`
  - Karakter salah: `--red-400` + background `rgba(239,68,68,0.15)`
  - Karakter belum diketik: `--gray-500`
  - Cursor: `--cyan-300`, blinking animation
  - Line-height: 2.0 (spacious agar mudah dibaca)
- **Input area:** Bisa hidden (user fokus ke display) atau visible textarea
- **Progress bar:** Height 6px, rounded, gradient `--blue-500` → `--cyan-400`

#### State 4: Solo — Results

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                                                             │   │
│   │                    🎉  Hasil Kamu!                          │   │
│   │                                                             │   │
│   │          ┌──────────┐       ┌──────────┐                    │   │
│   │          │   72     │       │  96.2%   │                    │   │
│   │          │   WPM    │       │  Akurasi  │                    │   │
│   │          │ (cyan,   │       │ (green,  │                    │   │
│   │          │  glow)   │       │  glow)   │                    │   │
│   │          └──────────┘       └──────────┘                    │   │
│   │                                                             │   │
│   │    ┌────────────┐  ┌────────────┐  ┌────────────┐           │   │
│   │    │  ✅ 289    │  │  ❌ 12     │  │  ⏱️ 30s    │           │   │
│   │    │  Benar     │  │  Salah     │  │  Durasi    │           │   │
│   │    └────────────┘  └────────────┘  └────────────┘           │   │
│   │                                                             │   │
│   │    ┌─────────────────────────────────────────────┐          │   │
│   │    │  🔥  "Admin Mode: Activated!"               │          │   │
│   │    └─────────────────────────────────────────────┘          │   │
│   │    (pesan motivasi, bg blue-500/10, border-l blue-500)      │   │
│   │                                                             │   │
│   │    ┌──────────────────┐  ┌──────────────────┐               │   │
│   │    │  🔄 Main Lagi    │  │  🏆 Leaderboard  │               │   │
│   │    └──────────────────┘  └──────────────────┘               │   │
│   │                                                             │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Detail:**
- **WPM number:** Font-size 48px, `--cyan-400`, text-shadow glow
- **Akurasi number:** Font-size 48px, `--green-400` (kalau >90%), `--amber-400` (70-90%), `--red-400` (<70%)
- **Stat cards:** 3 mini card horizontal, masing-masing icon + angka + label
- **Pesan motivasi:** Contextual berdasarkan performa, style blockquote
- **Animasi:** Angka WPM & akurasi count-up animation dari 0

**Threshold pesan motivasi:**
| WPM | Akurasi | Pesan |
|-----|---------|-------|
| ≥70 | ≥95% | "🔥 Admin Mode: Activated! Kamu cocok di Kestari!" |
| ≥50 | ≥90% | "💪 Kamu punya potensi jadi bagian Kestari!" |
| ≥50 | <90% | "⚡ Lumayan cepat, tapi cek lagi ketelitiannya!" |
| <50 | ≥90% | "🎯 Teliti banget! Tinggal naikin kecepatannya." |
| <50 | <90% | "👍 Semangat! Latihan lagi dan coba pecahkan rekormu." |

#### State 5: Co-op — Room Lobby

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                                                             │   │
│   │              👥  Mode Mabar                                 │   │
│   │                                                             │   │
│   │   ┌──────────────────────────────────────────────┐          │   │
│   │   │                                              │          │   │
│   │   │    Room Code:   [ A 3 X 7 ]                  │          │   │
│   │   │                 (besar, monospace, cyan)      │          │   │
│   │   │                                              │          │   │
│   │   │    Status Pemain:                            │          │   │
│   │   │    ✅  Player 1: "Andi"     (Host - Ready)   │          │   │
│   │   │    ⏳  Player 2:  Menunggu...                │          │   │
│   │   │                                              │          │   │
│   │   │    ── atau ──                                │          │   │
│   │   │                                              │          │   │
│   │   │    ┌──────────────────────────┐               │          │   │
│   │   │    │  🤖 Main dengan Bot     │               │          │   │
│   │   │    └──────────────────────────┘               │          │   │
│   │   │                                              │          │   │
│   │   └──────────────────────────────────────────────┘          │   │
│   │                                                             │   │
│   │   Pemain 2: buka website dan masukkan kode room             │   │
│   │   di laptop sebelah.                                        │   │
│   │                                                             │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### State 6: Co-op — Playing

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                                                             │   │
│   │  ⏱️ 00:18              MABAR              Room: A3X7       │   │
│   │                                                             │   │
│   │  ┌──────────────────────────────────────────────────────┐   │   │
│   │  │                                                      │   │   │
│   │  │  Biro Kesekretariatan merupakan bagian organ         │   │   │
│   │  │  ████████████████ isasi yang mendukung kelancaran    │   │   │
│   │  │  tata kelola administrasi dan dokumentasi serta      │   │   │
│   │  │  menjaga agar semua proses tercatat dengan baik.     │   │   │
│   │  │                                                      │   │   │
│   │  │  ████ = kamu (biru/hijau)                            │   │   │
│   │  │  ████ = partner (ungu/magenta)                       │   │   │
│   │  │                                                      │   │   │
│   │  └──────────────────────────────────────────────────────┘   │   │
│   │                                                             │   │
│   │  Progress Tim:                                              │   │
│   │  ┌──────────────────────────────────────────┐               │   │
│   │  │  █████████████████████░░░░░░░░░░░░░░░░░  │  56%          │   │
│   │  └──────────────────────────────────────────┘               │   │
│   │                                                             │   │
│   │   👤 Andi: 34 WPM          👤 Budi: 28 WPM                 │   │
│   │      (atau 🤖 Bot)         (live stats per player)          │   │
│   │                                                             │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Detail Co-op gameplay UI:**
- Kedua pemain mengetik bagian teks yang **sama** — setiap pemain melanjutkan dari posisi masing-masing
- Warna teks tiap pemain dibedakan:
  - Pemain sendiri: `--green-400` (hijau)
  - Partner: `--violet-400` (#A78BFA, ungu muda)
  - Bot: warna sama dengan partner, dengan label 🤖
- Progress bar tunggal menunjukkan progress **gabungan** tim
- Live stat masing-masing pemain di bawah progress bar

---

### 3.6 Section F — Leaderboard

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│              🏆  Leaderboard                                       │
│                                                                     │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐                     │
│   │  All-Time  │ │   Today    │ │   Event    │  ← Tab filter       │
│   │  (active)  │ │            │ │            │                     │
│   └────────────┘ └────────────┘ └────────────┘                     │
│                                                                     │
│   ┌────────────┐ ┌────────────┐                                    │
│   │    Solo    │ │   Mabar    │  ← Mode filter                     │
│   │  (active)  │ │            │                                    │
│   └────────────┘ └────────────┘                                    │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                                                             │   │
│   │  🥇  1.  SpeedTyper       78 WPM    98.2%     7,640        │   │
│   │          ────────────────────────────────────────────       │   │
│   │  🥈  2.  AdminPro         72 WPM    96.5%     7,128        │   │
│   │          ────────────────────────────────────────────       │   │
│   │  🥉  3.  KeyMaster        71 WPM    95.1%     6,930        │   │
│   │          ────────────────────────────────────────────       │   │
│   │      4.  FastFingers      68 WPM    94.8%     6,510        │   │
│   │          ────────────────────────────────────────────       │   │
│   │      5.  KestariLover     65 WPM    97.3%     6,380        │   │
│   │          ────────────────────────────────────────────       │   │
│   │  ... (sampai top 10/20)                                     │   │
│   │                                                             │   │
│   │  ┌──────────────────────┐                                   │   │
│   │  │  Muat Selanjutnya ↓  │  (opsional, load more)           │   │
│   │  └──────────────────────┘                                   │   │
│   │                                                             │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Detail:**
- **Tab filter (period):** Pill-style buttons, active = filled `--blue-500`, inactive = ghost
- **Mode filter:** Pill-style, lebih kecil, di bawah tab period
- **Table/List style:**
  - Bukan tabel formal — gunakan list/card rows
  - Baris ganjil: `--navy-800`, baris genap: `--navy-900` (zebra stripe halus)
  - **Top 3:** Medal emoji (🥇🥈🥉), nama sedikit lebih besar
  - **Ranking 1:** Bisa punya background gradient halus atau border glow
  - Kolom: Rank, Nama, WPM, Akurasi, Skor
- **Hover:** Baris highlight dengan border-left `--blue-500`
- **Empty state:** "Belum ada skor. Jadi yang pertama!" dengan CTA ke game

---

### 3.7 Section G — Closing / CTA

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│              Now You Know What Kestari Does!  (H2)                 │
│                                                                     │
│       "Di balik kegiatan organisasi yang berjalan dengan baik,     │
│        ada proses administrasi yang perlu dijaga.                   │
│        Itulah salah satu peran Kestari."                           │
│                                                                     │
│       Punya ketelitian, suka keteraturan, dan tertarik             │
│       berkontribusi di balik layar?                                 │
│                                                                     │
│       ┌──────────────────────────────┐                              │
│       │  Kenalan Lebih Dekat  →      │  (primary button)           │
│       └──────────────────────────────┘                              │
│                                                                     │
│       ┌────┐  ┌────┐  ┌────┐                                       │
│       │ IG │  │ TW │  │ WA │  ← Social media icons                │
│       └────┘  └────┘  └────┘                                       │
│                                                                     │
│   ─────────────────────────────────────────────────────────────     │
│                                                                     │
│    © 2026 Biro Kesekretariatan HIMATIK    [Logo] [Logo]            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Detail:**
- **Background:** `--navy-900`, atau gradient halus
- **Quote:** Italic, font-size 18px, `--gray-200`
- **CTA button:** Primary filled, bisa link ke IG/media sosial HIMATIK
- **Social icons:** 32px, `--gray-400`, hover: `--blue-400`
- **Footer:** Minimalis, `--gray-500`, font-size 13px
- **Logo footer:** HIMATIK + Kestari kecil (24px) di samping copyright

---

## 4. Component Specifications

### 4.1 Buttons

| Variant | Background | Text | Border | Hover | Active |
|---------|-----------|------|--------|-------|--------|
| **Primary** | `--blue-500` | `--white` | none | `--blue-400` + shadow | `--blue-600` |
| **Secondary / Outline** | transparent | `--blue-400` | 1.5px `--blue-500` | bg `--blue-500/10` | bg `--blue-500/20` |
| **Ghost** | transparent | `--gray-400` | none | text `--white` | text `--gray-200` |
| **Danger** | `--red-500` | `--white` | none | `--red-400` | `--red-600` |

**Sizing:**
| Size | Padding | Font-size | Height |
|------|---------|-----------|--------|
| **Small** | 8px 16px | 14px | 36px |
| **Medium** | 12px 24px | 16px | 44px |
| **Large** | 16px 32px | 18px | 52px |

**Global button style:** border-radius `--radius-md`, font-weight 600, transition 200ms, cursor pointer

### 4.2 Input Field

```
┌─────────────────────────────────────┐
│  Ketik nama...                      │
└─────────────────────────────────────┘
```

- Background: `--navy-950`
- Border: 1.5px `--navy-600`
- Border-radius: `--radius-md`
- Padding: 12px 16px
- Font: Inter, 16px
- Color: `--white`
- Placeholder: `--gray-500`
- Focus: border `--blue-500`, box-shadow `0 0 0 3px rgba(59,130,246,0.2)`
- Error: border `--red-500`

### 4.3 Tabs / Pill Toggle

```
  ┌────────────┐ ┌────────────┐ ┌────────────┐
  │  All-Time  │ │   Today    │ │   Event    │
  │  (ACTIVE)  │ │            │ │            │
  └────────────┘ └────────────┘ └────────────┘
```

- Container: bg `--navy-800`, border-radius `--radius-full`, padding 4px
- Active tab: bg `--blue-500`, color `--white`, border-radius `--radius-full`
- Inactive tab: bg transparent, color `--gray-400`
- Hover (inactive): color `--gray-200`
- Transition: 200ms background + color

### 4.4 Modal / Overlay

Digunakan untuk: konfirmasi restart, input room code, detail hasil

- Overlay: bg `rgba(7,14,27,0.8)`, backdrop-filter blur(8px)
- Modal container: bg `--navy-800`, border `--navy-600`, radius-xl, padding 32px, max-width 480px
- Shadow: `0 24px 48px rgba(0,0,0,0.4)`
- Close button: icon ✕, kanan atas, `--gray-400`, hover `--white`
- Animasi: fade-in + scale dari 0.95 ke 1.0

### 4.5 Toast / Notification

Untuk feedback singkat: "Skor tersimpan!", "Room dibuat!", "Pemain bergabung!"

- Posisi: fixed bottom-center, 24px dari bawah
- Background: `--navy-700`, border-left 4px `--green-500` (sukses) / `--red-500` (error)
- Padding: 12px 20px
- Border-radius: `--radius-md`
- Auto-dismiss: 3 detik
- Animasi: slide-up fade-in, slide-down fade-out

---

## 5. Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| **Desktop** | ≥1024px | Laptop booth (prioritas utama) |
| **Tablet** | 768–1023px | Tablet / laptop kecil |
| **Mobile** | <768px | Handphone pengunjung |

### Penyesuaian per breakpoint:

| Komponen | Desktop | Tablet | Mobile |
|----------|---------|--------|--------|
| Navbar | Horizontal links | Horizontal links | Hamburger menu |
| Hero H1 | 56px | 44px | 36px |
| Mode cards | 2 kolom | 2 kolom | 1 kolom (stack) |
| Task cards | 3 kolom | 2 kolom | 1 kolom |
| Game text | 20px mono | 18px mono | 16px mono |
| Leaderboard | Full table row | Full table row | Card-style rows |
| Section padding | 80px vert | 64px vert | 48px vert |

---

## 6. Animasi & Transisi

| Elemen | Animasi | Durasi | Trigger |
|--------|---------|--------|---------|
| **Scroll reveal** | Fade-up (translateY 20px → 0, opacity 0 → 1) | 600ms | Section masuk viewport |
| **Card hover** | translateY(-4px) + shadow | 200ms | Mouse enter |
| **Button hover** | Background + shadow transition | 200ms | Mouse enter |
| **Timer pulse** | Scale 1.0 → 1.05 → 1.0, color shift ke merah | 800ms | Timer < 10 detik |
| **Score count-up** | Angka naik dari 0 ke nilai akhir | 1200ms | Result screen muncul |
| **Cursor blink** | Opacity 1 → 0 → 1 | 1000ms | Selama game berlangsung |
| **Progress bar** | Width grow + gradient shift | Continuous | Selama mengetik |
| **Toast** | Slide-up + fade-in / slide-down + fade-out | 300ms | Show/hide |
| **Mode select** | Card scale up sedikit | 200ms | On click |
| **Scroll indicator** | Bounce translateY(0 → 8px → 0) | 2000ms | Loop di hero |
| **Correct char** | Subtle flash hijau | 100ms | Setiap karakter benar |

> [!TIP]
> Gunakan `prefers-reduced-motion` media query untuk mengurangi/matikan animasi bagi user yang preferensi aksesibilitasnya meminta.

---

## 7. Icon Set

Gunakan **inline SVG** supaya bisa diatur warnanya via CSS dan tanpa request tambahan.

| Section | Icon | Deskripsi |
|---------|------|-----------|
| Surat-Menyurat | ✉️ | Amplop / surat |
| Pengelolaan Dokumen | 📋 | Clipboard / folder |
| Notulensi & Rapat | 📝 | Catatan / notepad |
| Administrasi Kegiatan | 📑 | Proposal / dokumen berlapis |
| Arsip & Dokumentasi | 🗂️ | Filing cabinet / arsip |
| Solo mode | 👤 | User tunggal |
| Mabar mode | 👥 | Dua user |
| Timer | ⏱️ | Stopwatch |
| Leaderboard | 🏆 | Trophy |
| WPM | ⚡ | Lightning / speed |
| Akurasi | 🎯 | Target |

> [!NOTE]
> Bisa pakai emoji langsung sebagai placeholder, lalu ganti ke SVG custom kalau ada waktu untuk polish. SVG icon library yang cocok: [Lucide](https://lucide.dev/) (free, MIT license, lightweight).

---

## 8. Accessibility Checklist

- [ ] Contrast ratio minimal 4.5:1 untuk teks body, 3:1 untuk teks besar
- [ ] Semua elemen interaktif punya focus ring visible (`--blue-500` outline)
- [ ] Game bisa dimainkan full keyboard (tanpa mouse)
- [ ] Timer dan progress punya aria-live untuk screen reader
- [ ] Warna bukan satu-satunya indikator benar/salah (tambah underline atau ikon)
- [ ] Font-size minimum 14px untuk teks terkecil
- [ ] Tombol minimum touch target 44x44px di mobile

---

## 9. Catatan Implementasi

1. **CSS Variables:** Semua token warna, spacing, radius, dan shadow didefinisikan sebagai CSS custom properties di `:root`. Ini memudahkan theming dan consistency.

2. **Dark-only:** Website ini dark theme only (navy). Tidak perlu light mode toggle.

3. **Font loading:** Gunakan `<link rel="preconnect">` untuk Google Fonts (Inter + JetBrains Mono) dan `font-display: swap` supaya teks tetap terbaca saat font loading.

4. **Performance:** Hindari animasi yang trigger layout/paint berlebihan. Gunakan `transform` dan `opacity` untuk animasi yang smooth (GPU-accelerated).

5. **Game input:** Pertimbangkan menggunakan invisible input field yang selalu focused selama game berlangsung, bukan menangkap keypress pada document level — ini lebih reliable di berbagai browser dan keyboard layout.
