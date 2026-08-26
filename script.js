import { ambilKutipan, ambilCuaca, muatSemuaWidget } from "../api.js";
import { tambahCatatan, muatCatatanDariStorage, renderCatatan } from "../catatan.js";
import { simpanTemaKeStorage, muatTemaDariStorage } from "../storage.js";
import { tambahTugas, renderTugas, muatTugasDariStorage, filterAktif } from "../tugas.js";

const app = document.getElementById("app");
// minggu 1
// minggu 2 seles(Header & Tema)
const judul = document.createElement("h2");
judul.textContent = "Selamat Datang di DailyBoard!";
app.appendChild(judul);

const statusText = document.createElement("p");
statusText.id = "status";
app.appendChild(statusText);

// WIDGET KUTIPAN HARI INI
const sectionKutipan = document.createElement("section");
sectionKutipan.innerHTML = "<h3>Kutipan Hari Ini</h3>";
app.appendChild(sectionKutipan);

const pKutipan = document.createElement("p");
pKutipan.id = "kutipan-harian";
pKutipan.textContent = "Memuat kutipan...";
sectionKutipan.appendChild(pKutipan);

// Tombol refresh kutipan
const tombolRefreshKutipan = document.createElement("button");
tombolRefreshKutipan.textContent = "Refresh Kutipan";
tombolRefreshKutipan.id = "refesh-kutipan";

sectionKutipan.appendChild(tombolRefreshKutipan);

// Saat tombol diklik, ambil kutipan baru
tombolRefreshKutipan.addEventListener("click", () => {
    ambilKutipan();
});

ambilKutipan();

const toggleTema = document.createElement("button");
toggleTema.id = "toggleTema";
app.appendChild(toggleTema);

function perbaruiLabelTema() {
    const modeAktif = document.body.classList.contains("dark-mode");
    toggleTema.textContent = modeAktif ? "☀️" : "🌙";
}

toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const modeAktif = document.body.classList.contains("dark-mode");
    simpanTemaKeStorage(modeAktif ? "dark" : "light");
    perbaruiLabelTema();
});

// SECTION TUGAS
const sectionTugas = document.createElement("section");
sectionTugas.innerHTML = "<h3>Tugas</h3>";
app.appendChild(sectionTugas);

const inputCari = document.createElement("input");
inputCari.placeholder = "Cari tugas";
inputCari.id = "input-cari-tugas";
sectionTugas.appendChild(inputCari);

// Tombol Cari Tugas
const tombolCari = document.createElement("button");
tombolCari.textContent = "Cari Tugas";
sectionTugas.appendChild(tombolCari);

sectionTugas.appendChild(document.createElement("br"));
const input1 = document.createElement("input");
input1.placeholder = "Tambah tugas ";
sectionTugas.appendChild(input1);

const tombol1 = document.createElement("button");
tombol1.textContent = "Tambah";
sectionTugas.appendChild(tombol1);

tombol1.addEventListener("click", () => {
    if (validasiInput(input1.value)) {
        tambahTugas(input1.value);
        input1.value = "";
    }
});

// Tambahkan tugas juga dengan menekan Enter di input
input1.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (validasiInput(input1.value)) {
            tambahTugas(input1.value);
            input1.value = "";
        }
    }
});

sectionTugas.appendChild(document.createElement("br"));

const containerFilter = document.createElement("div");
containerFilter.style.marginTop = "10px";

const filterSemua = document.createElement("button");
filterSemua.textContent = "Semua";
filterSemua.addEventListener("click", () => renderTugas("semua"));

const filterSelesai = document.createElement("button");
filterSelesai.textContent = "Selesai";
filterSelesai.addEventListener("click", () => renderTugas("selesai"));

const filterBelum = document.createElement("button");
filterBelum.textContent = "Belum Selesai";
filterBelum.addEventListener("click", () => renderTugas("belum"));

containerFilter.appendChild(filterSemua);
containerFilter.appendChild(filterSelesai);
containerFilter.appendChild(filterBelum);
sectionTugas.appendChild(containerFilter);

const ulTugas = document.createElement("ul");
ulTugas.id = "daftar-tugas";
sectionTugas.appendChild(ulTugas);

// Delay pencarian tugas
function debounce(fn, delay = 2000) {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// delay
const cariTugasDebounced = debounce(() => {
    renderTugas(filterAktif);
}, 700);

// Jalankan pencarian ketika mengetik
inputCari.addEventListener("input", () => {
    const list = document.getElementById("daftar-tugas");

    // Kalau input kosong, langsung tampilkan semua tugas
    if (inputCari.value.trim() === "") {
        renderTugas(filterAktif);
        return;
    }

    // Tampilkan pesan selama menunggu
    list.innerHTML = " ";

    // Jalankan pencarian
    cariTugasDebounced();
});

// SECTION CATATAN
const sectionCatatan = document.createElement("section");
sectionCatatan.innerHTML = "<h3>Catatan</h3>";
app.appendChild(sectionCatatan);

const textareaCatatan = document.createElement("textarea");
textareaCatatan.id = "input-catatan";
textareaCatatan.placeholder = "Tulis Catatan Baru";
textareaCatatan.rows = 3;
sectionCatatan.appendChild(textareaCatatan);

const tombol2 = document.createElement("button");
tombol2.textContent = "Tambah";
sectionCatatan.appendChild(tombol2);

tombol2.addEventListener("click", () => {
    if (validasiInput(textareaCatatan.value)) {
        tambahCatatan(textareaCatatan.value);
        textareaCatatan.value = "";
    }
});

const containerCatatan = document.createElement("div");
containerCatatan.id = "daftar-catatan";
sectionCatatan.appendChild(containerCatatan);

// SECTION CUACA
const sectionCuaca = document.createElement("section");
sectionCuaca.innerHTML = "<h3>Cuaca</h3>";
app.appendChild(sectionCuaca);

const input3 = document.createElement("input");
input3.placeholder = "Masukkan kota...";
sectionCuaca.appendChild(input3);

const tombol3 = document.createElement("button");
tombol3.textContent = "Cari Cuaca";
sectionCuaca.appendChild(tombol3);

const divCuaca = document.createElement("div");
divCuaca.id = "cuaca-harian";
divCuaca.textContent = "Memuat cuaca...";
sectionCuaca.appendChild(divCuaca);

tombol3.addEventListener("click", () => {
    if (validasiInput(input3.value)) {
        ambilCuaca(input3.value);
        input3.value = "";
    }
});

// VALIDASI & API
export function validasiInput(nilai) {
    if (nilai.trim() === "") {
        alert("Input tidak boleh kosong!");
        return false;
    }
    if (nilai.length > 100) {
        alert("Input tidak boleh lebih dari 100 karakter!");
        return false;
    }
    return true;
}

// EVENT INITIALIZATION
window.addEventListener("DOMContentLoaded", () => {
    if (muatTemaDariStorage() === "dark") {
        document.body.classList.add("dark-mode");
    }
    muatTugasDariStorage();
    muatCatatanDariStorage();
    renderTugas();
    renderCatatan();
    muatSemuaWidget();

});