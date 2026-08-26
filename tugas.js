import { validasiInput } from "./script.js";
import { simpanKeStorage, muatDariStorage } from "./storage.js";

// LOGIKA TUGAS
let daftarTugas = [];
let nextId = 1;
let tugasSedangDiedit = null;
let idTugasDiseret = null;
let filterAktif = "semua";

function renderTugas(filter = filterAktif) {
	filterAktif = filter;
	const list = document.getElementById("daftar-tugas");
	const inputCari = document.getElementById("input-cari-tugas");
	const kataKunci = inputCari ? inputCari.value.toLowerCase() : "";

	list.innerHTML = "";

	const tugasTersaring = daftarTugas.filter((t) => {
		let cocokStatus = true;
		if (filter === "selesai") cocokStatus = t.selesai;
		if (filter === "belum") cocokStatus = !t.selesai;

		const cocokTeks = t.nama.toLowerCase().includes(kataKunci);
		return cocokStatus && cocokTeks;
	});

	tugasTersaring.forEach((tugas) => {
		const li = document.createElement("li");

		if (tugasSedangDiedit === tugas.id) {
			// edit inline db klik
			const inputEdit = document.createElement("input");
			inputEdit.type = "text";
			inputEdit.value = tugas.nama;
			inputEdit.className = "input-edit-inline";

			const simpanEdit = () => {
				if (validasiInput(inputEdit.value)) {
					editTugas(tugas.id, inputEdit.value);
					tugasSedangDiedit = null;
					renderTugas();
				}
				// Jika input kosong, validasiInput sudah menampilkan peringatan
			};

			inputEdit.addEventListener("keydown", (e) => {
				if (e.key === "Enter") simpanEdit();
				if (e.key === "Escape") {
					tugasSedangDiedit = null;
					renderTugas();
				}
			});
			inputEdit.addEventListener("blur", simpanEdit);

			li.appendChild(inputEdit);
			list.appendChild(li);
			inputEdit.focus();
			inputEdit.select();
			return;
		}

		//drag and drop (mengubah urutan prioritas)
		li.draggable = true;
		li.dataset.id = tugas.id;
		li.style.cursor = "grab";

		const handleSeret = document.createElement("span");
		handleSeret.textContent = "☰ ";
		handleSeret.title = "Seret untuk mengubah urutan";
		handleSeret.style.cursor = "grab";
		li.appendChild(handleSeret);

		const spanNama = document.createElement("span");
		spanNama.textContent = tugas.nama + " ";
		spanNama.style.textDecoration = tugas.selesai ? "line-through" : "none";
		li.appendChild(spanNama);

		li.addEventListener("click", () => toggleSelesai(tugas.id));
		li.addEventListener("dblclick", (e) => {
			e.stopPropagation();
			tugasSedangDiedit = tugas.id;
			renderTugas();
		});

		li.addEventListener("dragstart", (e) => {
			idTugasDiseret = tugas.id;
			li.style.opacity = "0.5";
			e.dataTransfer.effectAllowed = "move";
			e.dataTransfer.setData("text/plain", String(tugas.id));
		});

		li.addEventListener("dragend", () => {
			li.style.opacity = "1";
			idTugasDiseret = null;
		});

		li.addEventListener("dragover", (e) => {
			e.preventDefault();
			e.dataTransfer.dropEffect = "move";
			li.style.borderTop = "2px solid #4a90e2";
		});

		li.addEventListener("dragleave", () => {
			li.style.borderTop = "";
		});

		li.addEventListener("drop", (e) => {
			e.preventDefault();
			li.style.borderTop = "";
			if (idTugasDiseret === null || idTugasDiseret === tugas.id) return;
			pindahkanUrutanTugas(idTugasDiseret, tugas.id);
		});

		const tombolEdit = document.createElement("button");
		tombolEdit.textContent = "Edit";
		tombolEdit.addEventListener("click", (e) => {
			e.stopPropagation();
			tugasSedangDiedit = tugas.id;
			renderTugas();
		});
		li.appendChild(tombolEdit);

		const tombolHapus = document.createElement("button");
		tombolHapus.textContent = "Hapus";
		tombolHapus.addEventListener("click", (e) => {
			e.stopPropagation();
			hapusTugas(tugas.id);
		});

		li.appendChild(tombolHapus);
		list.appendChild(li);
	});
}

function tambahTugas(nama) {
	daftarTugas.push({ id: nextId++, nama: nama.trim(), selesai: false });
	simpanKeStorage(daftarTugas);
	renderTugas();
}

function toggleSelesai(id) {
	daftarTugas = daftarTugas.map((t) =>
		t.id === id ? { ...t, selesai: !t.selesai } : t
	);
	simpanKeStorage(daftarTugas);
	renderTugas();
}

function editTugas(id, namaBaru) {
	daftarTugas = daftarTugas.map((t) =>
		t.id === id ? { ...t, nama: namaBaru.trim() } : t
	);
	simpanKeStorage(daftarTugas);
	renderTugas();
}

function hapusTugas(id) {
	daftarTugas = daftarTugas.filter((t) => t.id !== id);
	if (tugasSedangDiedit === id) tugasSedangDiedit = null;
	simpanKeStorage(daftarTugas);
	renderTugas();
}

function pindahkanUrutanTugas(idSumber, idTarget) {
	const indexSumber = daftarTugas.findIndex((t) => t.id === idSumber);
	const indexTarget = daftarTugas.findIndex((t) => t.id === idTarget);
	if (indexSumber === -1 || indexTarget === -1) return;

	const [tugasDipindah] = daftarTugas.splice(indexSumber, 1);
	daftarTugas.splice(indexTarget, 0, tugasDipindah);

	simpanKeStorage(daftarTugas);
	renderTugas();
}

function muatTugasDariStorage() {
	daftarTugas = muatDariStorage();
	if (daftarTugas.length > 0) {
		nextId = Math.max(...daftarTugas.map((t) => t.id)) + 1;
	}
}

export { tambahTugas, renderTugas, muatTugasDariStorage, filterAktif };
