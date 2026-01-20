// Data Varietas Bibit
const bibitData = [
    {
        id: 1,
        nama: "Cabai Merah Keriting",
        deskripsi: "Varietas unggulan dengan buah keriting, tingkat kepedasan tinggi, dan hasil panen melimpah. Cocok untuk bumbu masakan khas Indonesia.",
        icon: "fas fa-pepper-hot"
    },
    {
        id: 2,
        nama: "Cabai Rawit Hijau",
        deskripsi: "Rawit dengan buah lebat, tahan cuaca ekstrem, dan rasa pedas menyengat. Umur panen relatif cepat dan adaptif di berbagai kondisi.",
        icon: "fas fa-fire"
    },
    {
        id: 3,
        nama: "Cabai Besar Hibrida",
        deskripsi: "Hibrida unggul dengan buah besar, tebal daging, cocok untuk pasar modern. Produktivitas tinggi dengan ketahanan penyakit yang baik.",
        icon: "fas fa-apple-alt"
    },
    {
        id: 4,
        nama: "Cabai Paprika",
        deskripsi: "Paprika warna-warni (merah, kuning, hijau) untuk kebutuhan kuliner dan industri makanan sehat. Rasa manis renyah dengan nilai jual tinggi.",
        icon: "fas fa-pepper-hot"
    },
    {
        id: 5,
        nama: "Cabai Jalapeno",
        deskripsi: "Cabai asal Meksiko dengan rasa pedas sedang, cocok untuk saus, acar, dan makanan western. Permintaan pasar restoran terus meningkat.",
        icon: "fas fa-pepper-hot"
    },
    {
        id: 6,
        nama: "Cabai Hias",
        deskripsi: "Cabai ornamental dengan penampilan menarik, cocok untuk tabulampot dan taman. Buah warna-warni (ungu, oranye, merah) yang estetik.",
        icon: "fas fa-seedling"
    },
    {
        id: 7,
        nama: "Cabai Keriting Lokal",
        deskripsi: "Varietas lokal adaptif dengan aroma khas, tahan terhadap kondisi lahan marginal. Cocok untuk lahan kering dengan perawatan minimal.",
        icon: "fas fa-leaf"
    },
    {
        id: 8,
        nama: "Cabai Rawit Putih",
        deskripsi: "Rawit putih dengan tingkat kepedasan ekstrem, permintaan tinggi untuk industri. Warna putih krem dengan kandungan capsaicin tinggi.",
        icon: "fas fa-fire"
    },
    {
        id: 9,
        nama: "Cabai Merah Besar",
        deskripsi: "Buah besar dengan daging tebal, cocok untuk sambal dan bumbu halus. Warna merah cerah menarik dengan hasil panen konsisten.",
        icon: "fas fa-apple-alt"
    },
    {
        id: 10,
        nama: "Cabai Tahan Layu",
        deskripsi: "Rekayasa khusus tahan penyakit layu bakteri dan fusarium, umur panjang. Solusi untuk daerah endemik penyakit layu.",
        icon: "fas fa-shield-alt"
    }
];

// Fungsi untuk menampilkan varietas bibit
function renderBibit() {
    const container = document.getElementById('bibitContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    bibitData.forEach((bibit, index) => {
        const bibitCard = document.createElement('div');
        bibitCard.className = 'bibit-card fade-in';
        bibitCard.style.animationDelay = `${0.1 * index}s`;
        
        bibitCard.innerHTML = `
            <div class="bibit-img">
                <i class="${bibit.icon}"></i>
            </div>
            <div class="bibit-info">
                <h3>${bibit.nama}</h3>
                <p>${bibit.deskripsi}</p>
                <a href="https://wa.me/628984338479?text=Halo%20BibitCabai,%20saya%20tertarik%20dengan%20varietas%20${encodeURIComponent(bibit.nama)}" class="btn btn-primary" target="_blank">Konsultasi Gratis</a>
            </div>
        `;
        
        container.appendChild(bibitCard);
    });
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderBibit();
});