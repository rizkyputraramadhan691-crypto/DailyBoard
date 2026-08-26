async function ambilKutipan() {
	const elKutipan = document.getElementById("kutipan-harian");
	try {
		const res = await fetch("https://randominspirationalquotes.onrender.com");
        
		if (!res.ok) {
			throw new Error("Gagal terhubung ke server kutipan.");
		}
        
		const data = await res.json();
		elKutipan.innerHTML = `<em>"${data.quote}"</em> — <strong>${data.author}</strong>`;
	} catch (error) {
		console.error("Gagal mengambil kutipan:", error);
		elKutipan.textContent = "⚠️ Gagal memuat kutipan harian. Periksa koneksi internet Anda.";
		elKutipan.style.color = "red";
	}
}

async function ambilCuaca(kota) {
	const apiKey = "f3266bdf7064b8c7c3a924ab5e9deb82";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${apiKey}&units=metric`;
	const divCuaca = document.getElementById("cuaca-harian");

	divCuaca.textContent = "Memuat cuaca...";

	try {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error("Kota tidak ditemukan");
		}
		const data = await res.json();
		divCuaca.innerHTML = `
			<h4>${data.name}</h4>
			<p>Suhu: ${data.main.temp}°C</p>
			<p>Kelembapan: ${data.main.humidity}%</p>
		`;
	} catch (error) {
		divCuaca.textContent = error.message;
	}
}

async function muatSemuaWidget() {
	document.getElementById("status").textContent = "Memuat data...";
	await Promise.all([ambilKutipan(), ambilCuaca("Jakarta")]);
	document.getElementById("status").textContent = "Data berhasil dimuat!";
}

export { ambilKutipan, ambilCuaca, muatSemuaWidget };