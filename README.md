# 💍 Undangan Pernikahan Digital — Intan & Irfan

Undangan pernikahan digital mewah dengan animasi 3D, hitungan mundur langsung,
permainan memori, kalender interaktif, dan pemutar musik otomatis.

---

## 🗂️ Struktur Proyek

```
wedding-invitation/
├── app/
│   ├── layout.tsx          ← Root layout (metadata SEO)
│   ├── page.tsx            ← Komponen utama (SEMUA fitur ada di sini)
│   └── globals.css         ← Variabel CSS & Tailwind
├── public/
│   ├── images/
│   │   ├── profile.jpg     ← ⚠️ WAJIB: Foto bersama Intan & Irfan
│   │   ├── photo1.jpg      ← ⚠️ WAJIB: Foto prewedding 1
│   │   ├── photo2.jpg      ← ⚠️ WAJIB: Foto prewedding 2
│   │   ├── photo3.jpg      ← ⚠️ WAJIB: Foto prewedding 3
│   │   └── photo4.jpg      ← ⚠️ WAJIB: Foto prewedding 4
│   └── audio/
│       └── Yiruma, River Flows in You.mp3  ← ⚠️ WAJIB: File musik
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## ⚙️ Prasyarat

Pastikan sudah terinstal di komputer Anda:

| Software | Versi Minimal | Cek dengan |
|----------|--------------|-----------|
| Node.js  | 18.x atau 20.x | `node -v` |
| npm      | 9.x ke atas  | `npm -v`  |

Jika belum ada Node.js, download di: https://nodejs.org

---

## 🚀 Cara Menjalankan (Langkah demi Langkah)

### Langkah 1 — Ekstrak ZIP

Ekstrak file ZIP ke folder pilihan Anda, misalnya:
- Windows: `C:\Users\NamaAnda\Desktop\wedding-invitation`
- Mac/Linux: `~/Desktop/wedding-invitation`

### Langkah 2 — Masukkan Aset (WAJIB)

**A. Foto-foto:**
Salin file foto ke folder `public/images/`:

```
public/images/profile.jpg    ← foto bersama (potret, ratio 4:5)
public/images/photo1.jpg     ← prewedding 1
public/images/photo2.jpg     ← prewedding 2
public/images/photo3.jpg     ← prewedding 3
public/images/photo4.jpg     ← prewedding 4
```

> 💡 **Tips foto:** Gunakan foto .jpg ukuran 800-1200px, tidak lebih dari 2MB per foto.
> Jika foto belum ada, aplikasi tetap berjalan dengan placeholder ikon bunga merah.

**B. File musik:**
Salin file MP3 ke folder `public/audio/`:
```
public/audio/Yiruma, River Flows in You.mp3
```

> ⚠️ **PENTING:** Nama file harus PERSIS sama termasuk spasi dan koma!
> Jika nama file berbeda, edit baris `audioSrc` di `app/page.tsx`.

### Langkah 3 — Install Dependencies

Buka Terminal / Command Prompt, navigasi ke folder proyek:

**Windows (Command Prompt / PowerShell):**
```cmd
cd C:\Users\NamaAnda\Desktop\wedding-invitation
npm install
```

**Mac / Linux (Terminal):**
```bash
cd ~/Desktop/wedding-invitation
npm install
```

Proses ini membutuhkan koneksi internet dan memakan waktu 1-3 menit.
Anda akan melihat banyak teks, tunggu sampai selesai.

### Langkah 4 — Jalankan Server Development

```bash
npm run dev
```

Tunggu sampai muncul pesan:
```
▲ Next.js 14.x.x
- Local:   http://localhost:3000
- Ready in X.Xs
```

### Langkah 5 — Buka di Browser

Buka browser (Chrome/Edge/Firefox) dan kunjungi:
```
http://localhost:3000
```

🎉 **Undangan digital Anda sudah berjalan!**

---

## 🎨 Cara Kustomisasi Data

Buka file `app/page.tsx` dan cari bagian **`§ 1. DATA LAYER`** di atas file:

```typescript
const WEDDING = {
  bride: {
    fullName: 'Syarifah Intan Maughfiroh',  // ← Ubah nama pengantin wanita
    nickname: 'Intan',
    father: 'Bapak Saifull',                // ← Ubah nama ayah
    mother: 'Ibu Jinani',                   // ← Ubah nama ibu
  },
  groom: {
    fullName: 'Irfan Efendi',               // ← Ubah nama pengantin pria
    nickname: 'Irfan',
    father: 'Bapak M. Hisap',
    mother: 'Ibu Sariti',
  },
  event: {
    targetDate: new Date('2026-06-13T10:00:00+07:00'), // ← Ubah tanggal
    dayLabel: 'Sabtu',                      // ← Ubah hari
    dateLabel: '13 Juni 2026',             // ← Ubah label tanggal
    akadTime: '08.00 WIB',
    resepsiTime: '10.00 – 14.00 WIB',
    venue: 'Gedung Serbaguna Al-Hikmah',   // ← Ubah venue
    address: 'Jl. Bahagia No. 13, Surabaya, Jawa Timur', // ← Ubah alamat
    mapsUrl: 'https://maps.google.com',    // ← Ubah link Google Maps
  },
  ...
};
```

Simpan file → browser otomatis refresh (hot reload).

---

## 📦 Build untuk Production (Deploy)

Jika ingin di-deploy ke Vercel, Netlify, atau server:

```bash
# Build production
npm run build

# Jalankan production server (opsional, untuk tes lokal)
npm run start
```

**Deploy ke Vercel (gratis, termudah):**
1. Buat akun di https://vercel.com
2. Install Vercel CLI: `npm i -g vercel`
3. Di folder proyek: `vercel`
4. Ikuti instruksi, dan dapatkan URL publik!

> ⚠️ Pastikan file foto dan audio sudah dimasukkan sebelum build.

---

## 🔧 Fitur-Fitur yang Tersedia

| Fitur | Keterangan |
|-------|-----------|
| 🪪 Wax Seal | Meterai lilin animasi 3D yang bisa diklik untuk membuka |
| ✉️ Envelope 3D | Animasi amplop terbuka dengan perspective 1200px |
| 🎵 Audio System | River Flows in You — fade-in 2500ms, bypass autoplay |
| 🎛️ Vinyl Controller | Tombol putar/pause floating kanan bawah, berputar |
| 📅 Chrono-Matrix | Kalender Juni 2026, tanggal 13 bersinar merah/emas |
| ⏱️ Live Countdown | Hitung mundur real-time HARI:JAM:MENIT:DETIK |
| 🖼️ Galeri 2×2 | 4 foto prewedding dengan bingkai renda doily |
| 🃏 Memory Game | 3×4 kartu balik animasi 3D, deteksi pasangan |
| ✨ Particle FX | Partikel emas melayang di layar intro |
| 📱 Responsive | Tampilan optimal di HP, tablet, dan desktop |

---

## 🐛 Troubleshooting

**❌ `npm install` gagal / error:**
```bash
# Coba hapus cache npm dulu
npm cache clean --force
npm install
```

**❌ Port 3000 sudah dipakai:**
```bash
# Jalankan di port lain
npm run dev -- -p 3001
# Buka: http://localhost:3001
```

**❌ Musik tidak keluar:**
- Pastikan nama file PERSIS: `Yiruma, River Flows in You.mp3`
- Klik di manapun pada halaman (browser membutuhkan interaksi)
- Periksa volume di tombol vinyl kanan bawah

**❌ Foto tidak muncul:**
- Pastikan nama file kecil semua: `profile.jpg`, bukan `Profile.JPG`
- Cek ekstensi: gunakan `.jpg` atau `.png`
- Placeholder otomatis muncul jika foto tidak ada

**❌ Halaman putih / error di browser:**
- Buka DevTools (F12) → Console → lihat error merah
- Pastikan `npm install` sudah selesai tanpa error
- Coba `npm run dev` ulang

---

## 📞 Informasi Teknis

- **Framework:** Next.js 14 (App Router)
- **Animasi:** Framer Motion 11
- **Styling:** Tailwind CSS 3 + Inline styles untuk 3D
- **Fonts:** Cormorant Garamond, EB Garamond, Pinyon Script (Google Fonts)
- **Rendering:** Client-side (`'use client'`)
- **Audio:** Web Audio API dengan autoplay bypass

---

*Dibuat dengan ❤️ untuk Intan & Irfan — 13 Juni 2026*
