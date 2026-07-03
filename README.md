# 🌟 Indah's Beauté Atelier

> Proyek tugas akhir KAIT II, Program Studi Administrasi Bisnis.

Website ini adalah prototype e-commerce statis untuk produk kecantikan, dibuat dengan HTML, CSS, dan JavaScript.

## Fitur Utama

- Katalog produk dan halaman detail produk
- Keranjang belanja dengan update jumlah dan hapus barang
- Checkout sederhana dengan formulir data pengiriman
- Halaman admin untuk mengelola produk dan melihat pesanan
 - Data produk, keranjang, ulasan, dan pesanan disimpan di server (SQLite: `data/db.sqlite`) melalui REST API.
	`data/db.json` hanya digunakan sebagai seed/migrasi awal — server akan memigrasi isi `data/db.json` ke SQLite pada startup jika database kosong.
	Browser `localStorage` hanya digunakan sebagai fallback untuk pengguna anonim.

## Struktur File Utama
Pastikan upload semua file berikut ke root repository GitHub:

- `index.html`
- `keranjang.html`
- `checkout.html`
- `order_success.html`
- `detail_produk.html`
- `login.html`
- `register.html`
- `profile.html`
- `tracking.html`
- `admin_dashboard.html`
- `admin_produk.html`
- `admin_pesanan.html`
- `admin_tambah_produk.html`
- `admin_edit_produk.html`
- `admin_login.html`
- `css/`
- `js/`
- `image/`

> Catatan: Folder gambar berada di `image/`, bukan `images/`.

## Cara Upload via GitHub Web

1. Buka repository GitHub baru.
2. Klik `Add file` -> `Upload files`.
3. Seret seluruh isi folder `indah` ke area upload.
4. Pastikan `index.html` dan folder `css`, `js`, serta `image` ikut terupload.
5. Tambahkan pesan commit, misalnya `Upload website files`.
6. Klik `Commit changes`.

## Setting GitHub Pages

1. Buka `Settings` di repo GitHub.
2. Pilih `Pages`.
3. Pada `Source`, pilih branch `main` dan folder `/(root)`.
4. Simpan.
5. Tunggu beberapa menit hingga website muncul.

## Catatan Penting

- Upload normal via GitHub Web sudah cukup.
- Tidak perlu Git atau command line jika Anda hanya ingin upload biasa.
- Jika halaman belum muncul, refresh browser beberapa kali.

## Akses Admin

Admin sebaiknya login lewat API (halaman `admin_login.html`) — setelah login, semua operasi CRUD produk dan update pesanan akan disimpan di server (`data/db.json`).

## Host API (Penting)

Catatan: GitHub Pages hanya melayani konten statis — **tidak menjalankan Node.js**. Untuk membuat sinkronisasi (SSoT) bekerja, Anda harus menjalankan `server.js` di host Node (VPS, Render, Fly, Heroku, dll.) atau menjalankan server secara lokal. Jika Anda hanya mengupload ke GitHub Pages tanpa backend, aplikasi akan berjalan dalam mode fallback (mostly localStorage) dan tidak akan tersinkron antar-perangkat.

 - Server menggunakan SQLite untuk penyimpanan lokal (`data/db.sqlite`). File ini dibuat otomatis pada saat server pertama kali dijalankan dan berisi data yang sebelumnya ada di `data/db.json`.
 - Jalankan `npm install` terlebih dahulu; beberapa environment mungkin perlu build tools untuk menginstall `better-sqlite3`.
 - Jika frontend dan backend dihost terpisah (mis. frontend di GitHub Pages, backend di Render), tambahkan sebelum `js/api_client.js` sebuah script kecil pada halaman HTML untuk meng-override `API_BASE`, contohnya:

```html
<script>window.API_BASE = 'https://your-backend.example.com/api';</script>
<script src="js/api_client.js"></script>

## Deploy Otomatis (GitHub Actions)

Saya sudah menambahkan dua workflow contoh di `.github/workflows/`:

- `deploy-frontend.yml` — membangun folder `public/` dan menerbitkannya ke GitHub Pages saat push ke branch `main`.
- `deploy-backend.yml` — contoh workflow untuk deploy ke Heroku. Anda perlu menambahkan tiga secrets di repo GitHub: `HEROKU_API_KEY`, `HEROKU_APP_NAME`, dan `HEROKU_EMAIL`.

Langkah cepat:
1. Push repo ke GitHub `main`.
2. Di Settings → Secrets, tambahkan `HEROKU_API_KEY`, `HEROKU_APP_NAME`, `HEROKU_EMAIL`.
3. Aktifkan GitHub Pages (Settings → Pages) untuk branch `gh-pages` atau workflow akan menerbitkan dari `public`.

Catatan: Jika Anda menggunakan provider lain (Render, Railway), Anda bisa menghubungkan repo langsung pada dashboard provider tanpa Actions.
```
## Catatan Tambahan

Jika Anda ingin saya cek ulang file yang sudah diupload, beri tahu saya.
