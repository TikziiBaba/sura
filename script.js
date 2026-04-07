// Sadece Şura'nın resimlerinin listesi (1'den 6'ya kadar)
const localImages = [
    'sura1.png',
    'sura2.png',
    'sura3.png',
    'sura4.png',
    'sura5.png',
    'sura6.png'
];

const galleryContainer = document.getElementById('gallery');

// Lightbox Elementleri
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxOverlay = document.getElementById('lightbox-overlay');
const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

// Sayfa yüklendiğinde galeriyi oluştur
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
});

// Galeriyi doldur
function loadGallery() {
    galleryContainer.innerHTML = '';

    localImages.forEach((src, index) => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        // Kademeli animasyon (ilk çıkanlar hızlı, sonrakiler gecikmeli gelir)
        item.style.animationDelay = `${index * 0.05}s`;
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Galeri Resmi ${index + 1}`;
        img.loading = "lazy";
        
        img.onerror = () => { img.style.opacity = '0'; };
        img.onload = () => { img.style.opacity = '1'; };

        item.appendChild(img);
        
        // Tıklanınca büyüteci aç (o anki dizilimdeki numarası ile)
        item.addEventListener('click', () => openLightbox(index));
        
        galleryContainer.appendChild(item);
    });
}

// Lightbox (Büyüteç) Fonksiyonları

function openLightbox(index) {
    if (localImages.length === 0) return;
    
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
        if (!lightbox.classList.contains('active')) {
            lightboxImg.src = ''; 
        }
    }, 400);
}

function updateLightboxImage() {
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        lightboxImg.src = localImages[currentIndex];
        
        lightboxImg.onload = () => {
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        };
        
        lightboxImg.onerror = () => {
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        };
    }, 200);
}

function showPrev(e) {
    if(e) e.stopPropagation();
    currentIndex = (currentIndex - 1 + localImages.length) % localImages.length;
    updateLightboxImage();
}

function showNext(e) {
    if(e) e.stopPropagation();
    currentIndex = (currentIndex + 1) % localImages.length;
    updateLightboxImage();
}

// Olay Dinleyicileri (Event Listeners)
closeBtn.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

// Klavye kontrolleri
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
});
