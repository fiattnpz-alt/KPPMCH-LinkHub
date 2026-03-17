// ========== Loading Screen ==========
window.addEventListener('load', () => {
    const loader = document.getElementById('loaderOverlay');
    if (loader) {
        // ให้เวลาเล่นอนิเมชันให้จบวงจร (ประมาณ 2.5 วินาที)
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2500);
    }
});

// ========== LINE QR Popup ==========
const linePopup = document.getElementById('linePopup');
const linePopupClose = document.getElementById('linePopupClose');

// Show popup after 2 seconds
if (linePopup) {
    setTimeout(() => {
        linePopup.classList.add('visible');
    }, 2000);

    // Close button
    if (linePopupClose) {
        linePopupClose.addEventListener('click', () => {
            linePopup.classList.remove('visible');
        });
    }
}

// ========== Link card ripple / tap feedback ==========
document.querySelectorAll('.link-card').forEach(card => {
    card.addEventListener('touchstart', () => {
        card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
    }, { passive: true });

    card.addEventListener('touchend', () => {
        card.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }, { passive: true });
});
