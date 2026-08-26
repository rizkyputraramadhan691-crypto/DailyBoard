# DailyBoard — Dashboard Produktivitas Harian

DailyBoard adalah aplikasi web dashboard produktivitas harian yang dibuat menggunakan **HTML, CSS, dan JavaScript murni (Vanilla JavaScript)** tanpa menggunakan framework.

Aplikasi ini dibuat sebagai proyek JavaScript satu semester dengan tujuan menerapkan manipulasi DOM, event handling, penyimpanan data menggunakan `localStorage`, penggunaan API eksternal, fitur drag-and-drop, dark mode, pencarian tugas, serta optimasi performa.

## 🚀 Fitur

### 1. To-Do List

DailyBoard menyediakan fitur untuk mengelola daftar tugas, yaitu:

* Menampilkan daftar tugas.
* Menambahkan tugas baru.
* Menghapus tugas.
* Menandai tugas sebagai selesai.
* Mengedit tugas.
* Memfilter tugas berdasarkan status:

  * Semua
  * Selesai
  * Belum selesai
* Mengubah urutan tugas menggunakan drag-and-drop.
* Menyimpan data tugas ke `localStorage`.

### 2. Catatan Cepat

Fitur catatan digunakan untuk menyimpan catatan sederhana.

Fitur yang tersedia:

* Menambahkan catatan.
* Menampilkan catatan dalam bentuk kartu.
* Menampilkan tanggal catatan.
* Menyimpan data catatan pada `localStorage`.
* Mengedit isi catatan.
* Validasi input agar catatan tidak kosong.

### 3. Pencarian Tugas

DailyBoard memiliki fitur pencarian tugas secara real-time.

Pencarian menggunakan kata kunci dari nama tugas dan mencocokkannya dengan data yang terdapat pada daftar tugas.

Pada tahap optimasi, pencarian menggunakan **debounce** agar proses pencarian tidak dijalankan pada setiap ketikan secara langsung.

### 4. Dark Mode

Pengguna dapat mengubah tampilan aplikasi menjadi mode gelap.

Preferensi tema disimpan menggunakan `localStorage`, sehingga tema yang dipilih dapat diterapkan kembali ketika halaman dibuka.

Mode yang tersedia:

* Mode terang
* Mode gelap

### 5. Widget Kutipan

DailyBoard mengambil kutipan secara dinamis dari API publik menggunakan `fetch()` dan `async/await`.

Jika proses pengambilan data gagal, aplikasi menampilkan pesan error melalui console.

### 6. Widget Cuaca

Aplikasi dapat menampilkan informasi cuaca berdasarkan nama kota.

Data cuaca diperoleh dari API cuaca publik menggunakan `fetch()`.

Informasi yang ditampilkan meliputi:

* Nama kota
* Suhu
* Deskripsi cuaca

Aplikasi juga menangani kondisi ketika kota tidak ditemukan atau terjadi kesalahan ketika mengambil data.

### 7. Loading dan Error Handling

DailyBoard menggunakan proses asynchronous untuk mengambil data dari API.

Beberapa kondisi yang ditangani:

* Data sedang dimuat.
* Data berhasil dimuat.
* API mengalami error.
* Kota tidak ditemukan.

### 8. Penyimpanan Data

Data aplikasi disimpan menggunakan `localStorage`.

Data yang disimpan meliputi:

* Daftar tugas.
* Status tugas.
* Catatan.
* Preferensi tema.

Dengan demikian, data tidak langsung hilang ketika halaman browser dimuat ulang.

---

## 📁 Struktur File

Struktur file DailyBoard dapat dibuat seperti berikut:

```text
dailyboard/
│
├── index.html
├── style.css
├── script.js
│
├── tugas.js
└── api.js
```

### Penjelasan File

| File         | Fungsi                                         |
| ------------ | ---------------------------------------------- |
| `index.html` | Struktur dasar halaman DailyBoard              |
| `style.css`  | Mengatur tampilan dan responsive layout        |
| `script.js`  | Menjalankan logika utama aplikasi              |
| `tugas.js`   | Modul yang menangani fungsi tugas              |
| `api.js`     | Modul untuk fungsi yang berhubungan dengan API |

Pada Fase 6, kode JavaScript direfactor menjadi beberapa modul menggunakan **ES Modules** agar kode lebih terorganisir.

Contoh penggunaan module:

```html
<script type="module" src="script.js"></script>
```

Kemudian fungsi dari modul tugas dapat digunakan menggunakan:

```javascript
import { tambahTugas } from "./tugas.js";
```

---

## ▶️ Cara Menjalankan

### 1. Download atau Clone Repository

Jika project berada di GitHub, clone repository menggunakan:

```bash
git clone <URL-REPOSITORY>
```

Kemudian masuk ke folder project:

```bash
cd dailyboard
```

### 2. Jalankan Project

Buka file:

```text
index.html
```

di browser.

Karena project menggunakan JavaScript dengan **ES Modules**, lebih baik menjalankannya menggunakan local server seperti Live Server.

### 3. Menggunakan DailyBoard

Setelah aplikasi terbuka:

1. Tambahkan tugas melalui form tugas.
2. Tandai tugas sebagai selesai dengan memilih tugas.
3. Hapus tugas menggunakan tombol hapus.
4. Edit tugas jika diperlukan.
5. Gunakan filter untuk melihat tugas berdasarkan status.
6. Gunakan kolom pencarian untuk mencari tugas.
7. Gunakan drag-and-drop untuk mengubah urutan tugas.
8. Gunakan tombol dark mode untuk mengubah tema.
9. Tambahkan catatan melalui bagian Catatan.
10. Gunakan widget cuaca untuk melihat kondisi cuaca berdasarkan kota.
11. Lihat kutipan yang diambil dari API.

---

## 🧪 Testing Manual

Sebelum melakukan deployment, lakukan pengujian terhadap fitur-fitur utama.

### Checklist Pengujian

* [ ] Menambahkan tugas berhasil.
* [ ] Menghapus tugas berhasil.
* [ ] Mengedit tugas berhasil.
* [ ] Menandai tugas sebagai selesai berhasil.
* [ ] Filter Semua berfungsi.
* [ ] Filter Selesai berfungsi.
* [ ] Filter Belum Selesai berfungsi.
* [ ] Drag-and-drop tugas berfungsi.
* [ ] Pencarian tugas berfungsi.
* [ ] Dark mode berfungsi.
* [ ] Preferensi dark mode tetap tersimpan setelah halaman dimuat ulang.
* [ ] Menambahkan catatan berhasil.
* [ ] Data tugas tersimpan di `localStorage`.
* [ ] Data catatan tersimpan di `localStorage`.
* [ ] Widget kutipan dapat mengambil data API.
* [ ] Widget cuaca dapat mengambil data berdasarkan kota.
* [ ] Error API dapat ditangani.
* [ ] Tidak terdapat error pada console browser.
* [ ] Tampilan tetap baik pada berbagai ukuran layar.

---

## ⚡ Optimasi Performa

Pada Fase 6, beberapa optimasi dilakukan untuk meningkatkan performa aplikasi.

### Debounce Pencarian

Fitur pencarian menggunakan konsep **debounce** sehingga fungsi pencarian tidak langsung dijalankan setiap kali pengguna mengetik.

Contoh logika:

```javascript
function debounce(fn, delay = 300) {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => fn(...args), delay);
    };
}
```

Kemudian digunakan untuk fitur pencarian:

```javascript
const cariTugasDebounced = debounce((kataKunci) => {
    // logika pencarian
}, 300);
```

Dengan cara ini, pencarian diberikan jeda sebelum diproses sehingga tidak terlalu sering menjalankan proses pencarian.

### Minifikasi

Sebelum deployment, file CSS dan JavaScript dapat diminifikasi untuk mengurangi ukuran file.

### Responsive Design

CSS menggunakan **media query** agar DailyBoard dapat digunakan pada berbagai ukuran layar, termasuk perangkat mobile.

---

## 🌐 Deployment

DailyBoard dapat di-deploy menggunakan **GitHub Pages** atau **Netlify**.

Contoh proses menggunakan Git:

```bash
git init

git add .

git commit -m "Deploy DailyBoard"

git push origin main
```

Setelah repository berhasil dibuat dan kode di-push, aktifkan **GitHub Pages** melalui pengaturan repository.

---

## 🛠️ Teknologi yang Digunakan

* HTML
* CSS
* JavaScript Vanilla
* DOM Manipulation
* Event Handling
* LocalStorage
* Fetch API
* Async/Await
* Promise
* ES Modules
* Drag and Drop API
* Git
* GitHub Pages / Netlify

---

## 📌 Tujuan Proyek

DailyBoard dibuat untuk menerapkan kemampuan JavaScript yang telah dipelajari selama satu semester, mulai dari dasar DOM dan event handling sampai dengan optimasi, testing, dan deployment.

Proyek ini menggabungkan beberapa konsep utama JavaScript menjadi sebuah dashboard produktivitas harian yang dapat digunakan untuk mengelola tugas, catatan, pencarian, tema, serta informasi dari API eksternal.

---

## 👨‍💻 Status Proyek

**DailyBoard — Final Project JavaScript Satu Semester**

Fase terakhir mencakup:

* Refactoring kode
* Pemisahan JavaScript menjadi modul
* Testing manual
* Optimasi pencarian menggunakan debounce
* Minifikasi CSS/JavaScript
* Responsive design
* Deployment
* Dokumentasi README