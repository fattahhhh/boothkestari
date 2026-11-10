# 🏗️ Plan: Website Open House Kestari HIMATIK

## Ringkasan Keputusan

| Item | Keputusan |
|------|-----------|
| **Leaderboard** | All-Time (persisten) — wajib di MVP |
| **Mode game** | Solo & Mabar (Co-op, 2 laptop di booth) — no Versus |
| **Bot** | Kalau cuma 1 pemain di mode Mabar, pemain 2 = bot |
| **Database** | Supabase (free tier) — leaderboard + realtime sync |
| **Hosting** | Localhost dulu (static files), bisa deploy Vercel nanti |
| **Warna** | Dominan Navy (#1B2A4A ~ #0D1B3E), aksen biru cerah dari logo |
| **Teks typing** | Placeholder dulu, konten menyusul dari tim |

---

## Arsitektur

```
┌─────────────────────────────────────────────────┐
│              FRONTEND (Static Site)              │
│         HTML + CSS + Vanilla JavaScript          │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Landing  │  │  About   │  │  Typing Game  │  │
│  │  Section  │  │  Kestari │  │  Solo / Mabar │  │
│  └──────────┘  └──────────┘  └───────┬───────┘  │
│                                      │          │
└──────────────────────────────────────┼──────────┘
                                       │
                              Supabase JS Client
                                       │
                    ┌──────────────────┼──────────────────┐
                    │           SUPABASE (Free)           │
                    │                                     │
                    │  ┌─────────────┐  ┌──────────────┐  │
                    │  │ Leaderboard │  │   Realtime   │  │
                    │  │   Table     │  │  (Co-op sync)│  │
                    │  └─────────────┘  └──────────────┘  │
                    │                                     │
                    │  ┌─────────────┐  ┌──────────────┐  │
                    │  │  Rooms      │  │  RLS Policy  │  │
                    │  │  Table      │  │  (security)  │  │
                    │  └─────────────┘  └──────────────┘  │
                    └─────────────────────────────────────┘
```

---

## Struktur File

```
d:\boothkestari\
├── index.html              ← Single page website
├── css/
│   └── style.css           ← Styling (navy theme, responsive)
├── js/
│   ├── app.js              ← Main app, navigasi, smooth scroll
│   ├── typing-game.js      ← Core typing engine (solo + co-op)
│   ├── bot.js              ← Bot AI untuk co-op mode
│   ├── leaderboard.js      ← CRUD leaderboard via Supabase
│   ├── realtime.js         ← Room management & realtime sync
│   └── supabase-config.js  ← Supabase client init
├── assets/
│   ├── images/
│   │   ├── logo-himatik.png
│   │   └── logo-kestari.png
│   └── icons/              ← SVG icons untuk kartu tugas
└── brief-website-open-house-kestari.md
```

---

## Fase Eksekusi

### Fase 1: Foundation (Single-page + Solo Game)
1. Setup `index.html` dengan semua section (Hero → About → What We Do → Why Kestari → Game → Leaderboard → Closing)
2. Styling CSS dengan tema navy, responsive (desktop-first, mobile-friendly)
3. Typing game engine — Solo mode:
   - Tampilkan teks random (placeholder dulu)
   - Timer 30 detik
   - Real-time visual feedback (karakter benar/salah)
   - Hitung WPM & akurasi
   - Tampilkan hasil + tombol main lagi
4. Navigasi smooth scroll antar section

### Fase 2: Supabase + Leaderboard All-Time
5. Setup Supabase project (table schema, RLS policies)
6. Integrasi leaderboard:
   - Input nama panggilan sebelum bermain
   - Submit skor ke Supabase setelah game selesai
   - Tampilkan Top 10/20 dengan tab: All-Time (default), Today
   - Tie-breaker: akurasi → timestamp
7. Validasi: batasi panjang nama, sanitize input, cek skor wajar

### Fase 3: Co-op Mode (Mabar)
8. Room system:
   - Pemain 1: buat room → dapat room code
   - Pemain 2: join room pakai code
   - Kalau 1 pemain aja → aktifkan bot sebagai partner
9. Realtime sync via Supabase Realtime:
   - Kedua pemain lihat progress masing-masing
   - Teks dibagi/bergantian antara 2 pemain
   - Timer sync dari host
10. Bot AI:
    - Simulasi typing dengan kecepatan random (40-80 WPM)
    - Ada variasi akurasi (90-98%) biar terasa natural
    - Typing speed bervariasi (kadang cepat, kadang lambat)
11. Hasil co-op: total progress tim, waktu, akurasi gabungan
12. Leaderboard co-op terpisah dari solo

### Fase 4: Polish & Finalisasi
13. Masukkan teks typing challenge resmi (dari tim)
14. Animasi & micro-interactions
15. Final responsive testing
16. QR code generation (kalau di-deploy)
17. Checklist booth

---

## Database Schema (Supabase)

### Table: `scores`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid (PK) | Auto-generated |
| `player_name` | text | Nama panggilan (max 20 char) |
| `mode` | text | `solo` atau `coop` |
| `team_name` | text (nullable) | Nama tim (co-op only) |
| `wpm` | integer | Words per minute |
| `accuracy` | real | Persentase akurasi |
| `score` | integer | Skor kalkulasi |
| `chars_correct` | integer | Jumlah karakter benar |
| `chars_wrong` | integer | Jumlah karakter salah |
| `created_at` | timestamptz | Server timestamp |

### Table: `rooms` (untuk co-op)
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid (PK) | Auto-generated |
| `room_code` | text (unique) | 4-6 digit code |
| `status` | text | `waiting`, `playing`, `finished` |
| `host_name` | text | Nama pemain host |
| `guest_name` | text (nullable) | Nama pemain guest / "Bot" |
| `challenge_text` | text | Teks yang harus diketik |
| `created_at` | timestamptz | Server timestamp |
| `expires_at` | timestamptz | Auto-expire setelah 30 menit |

### RLS Policies
- `scores`: INSERT allowed (anonymous), SELECT allowed (public read)
- `rooms`: INSERT/UPDATE/SELECT allowed (anonymous), DELETE restricted

---

## Palet Warna

| Token | Hex | Penggunaan |
|-------|-----|------------|
| Navy Dark | `#0A1628` | Background utama |
| Navy | `#1B2A4A` | Card backgrounds |
| Navy Light | `#2A3F6E` | Hover states |
| Blue Accent | `#3B82F6` | Tombol, link, elemen interaktif |
| Cyan Glow | `#22D3EE` | Highlight, aksen game |
| White | `#F8FAFC` | Teks utama |
| Gray Light | `#94A3B8` | Teks secondary |
| Green | `#22C55E` | Karakter benar |
| Red | `#EF4444` | Karakter salah |

---

## Tech Stack

| Layer | Teknologi | Alasan |
|-------|-----------|--------|
| Frontend | HTML + CSS + Vanilla JS | Ringan, no build step, bisa double-click buka |
| Database | Supabase (free tier) | Leaderboard All-Time + Realtime untuk co-op |
| Hosting | Localhost / Vercel (gratis) | Fleksibel |
| Font | Inter (Google Fonts) | Sans-serif, clean, modern |
| Icons | Inline SVG | Tanpa dependency tambahan |

> [!NOTE]
> Supabase free tier: 500MB database, 2GB bandwidth, 200 concurrent Realtime connections — lebih dari cukup untuk event Open House.

---

## Estimasi Waktu

| Fase | Durasi |
|------|--------|
| Fase 1: Foundation | ~3-4 jam |
| Fase 2: Supabase + Leaderboard | ~2-3 jam |
| Fase 3: Co-op + Bot | ~3-4 jam |
| Fase 4: Polish | ~1-2 jam |
| **Total** | **~9-13 jam kerja** |

---

## Langkah Selanjutnya

Kalau plan ini di-approve:
1. Gue mulai dari **Fase 1** — bikin full single-page website + solo typing game
2. Lu perlu **buat project Supabase** (gratis) dan kasih gue URL + anon key untuk Fase 2
3. Teks typing challenge bisa disusulkan kapan aja — gue pakai placeholder dulu
