// main.js - Update untuk menu baru

// Fungsi untuk toggle menu mobile
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            // Toggle icon menu
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
                // Prevent scrolling when menu is open
                document.body.classList.add('no-scroll');
            } else {
                icon.className = 'fas fa-bars';
                // Restore scrolling
                document.body.classList.remove('no-scroll');
            }
        });
        
        // Tutup menu mobile saat klik link
        const navLinks = navMenu.querySelectorAll('a:not(.mobile-order-btn)'); // Kecuali tombol Pesan Sekarang mobile
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                document.body.classList.remove('no-scroll');
            });
        });
        
        // Tutup menu saat klik di luar menu
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                document.body.classList.remove('no-scroll');
            }
        });
        
        // Tutup menu saat tekan ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                document.body.classList.remove('no-scroll');
            }
        });
        
        // Cegah event bubbling
        navMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    } else {
        console.error('Element mobile menu atau nav tidak ditemukan');
    }
}

// Fungsi untuk menambahkan tombol Pesan Sekarang di menu mobile
function addMobileOrderButton() {
    const navMenu = document.getElementById('navMenu');
    if (!navMenu) return;
    
    // Cek apakah tombol sudah ada
    const existingBtn = navMenu.querySelector('.mobile-order-btn');
    if (existingBtn) existingBtn.remove();
    
    // Hanya tambahkan tombol di mobile (lebar layar < 769px)
    if (window.innerWidth < 769) {
        // Buat tombol Pesan Sekarang untuk mobile
        const orderBtn = document.createElement('a');
        orderBtn.href = 'https://wa.me/628984338479?text=Halo%20BibitCabai,%20saya%20ingin%20pesan%20bibit%20cabai';
        orderBtn.target = '_blank';
        orderBtn.className = 'mobile-order-btn';
        orderBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Pesan Sekarang';
        
        // Tambahkan tombol ke menu
        navMenu.appendChild(orderBtn);
    }
}

// Fungsi untuk animasi scroll fade-in
function setupScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.style.animationDelay || '0s';
                entry.target.style.animationDelay = delay;
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        // Set animation to paused initially
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// Fungsi untuk mengaktifkan animasi pada elemen dengan delay berbeda
function animateElementsOnLoad() {
    const heroTitle = document.querySelector('.hero h1');
    const heroText = document.querySelector('.hero p');
    
    if (heroTitle) heroTitle.classList.add('fade-in-up');
    if (heroText) {
        heroText.classList.add('fade-in-up');
        heroText.style.animationDelay = '0.2s';
    }
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing mobile menu...');
    
    setupMobileMenu();
    addMobileOrderButton();
    animateElementsOnLoad();
    setupScrollAnimation();
    
    // Highlight active link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Reset animasi saat kembali ke halaman
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        setupScrollAnimation();
    }
});

// Pastikan menu ditutup saat resize window (jika diperlukan)
window.addEventListener('resize', () => {
    const navMenu = document.getElementById('navMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        }
        document.body.classList.remove('no-scroll');
    }
    
    // Update tombol Pesan Sekarang mobile saat resize
    addMobileOrderButton();
});