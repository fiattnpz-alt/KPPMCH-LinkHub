// ========== Loading Screen ==========
window.addEventListener('load', () => {
    const loader = document.getElementById('loaderOverlay');
    if (loader) {
        // ให้เวลาเล่นอนิเมชันให้จบวงจร (ประมาณ 2.5 วินาที)
        setTimeout(() => {
            loader.classList.add('hidden');
            updateServiceStatus(); // อัปเดตสถานะหลังโหลด
        }, 2500);
    }
});

// ========== Dynamic Service Status ==========
function updateServiceStatus() {
    const statusBadge = document.getElementById('statusBadge');
    const statusText = document.getElementById('statusText');
    if (!statusBadge || !statusText) return;

    const now = new Date();
    const day = now.getDay(); // 0 = อาทิตย์, 1 = จันทร์, ..., 6 = เสาร์
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour * 100 + minute;

    const isOpenDay = day >= 1 && day <= 5; // จันทร์ - ศุกร์
    const isCurrentlyOpen = isOpenDay && (currentTime >= 830 && currentTime <= 1630);

    if (isOpenDay) {
        statusText.textContent = 'เปิดให้บริการอยู่';
        if (isCurrentlyOpen) {
            statusBadge.classList.remove('closed');
        } else {
            statusBadge.classList.add('closed');
        }
    } else {
        statusText.textContent = 'ปิดให้บริการ';
        statusBadge.classList.add('closed');
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

// ========== Particle Canvas ==========
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const particles = [];
    const COUNT = 55;
    const COLORS = ['#6366f1', '#a78bfa', '#818cf8', '#c4b5fd', '#38bdf8'];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < COUNT; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -(Math.random() * 0.35 + 0.1),
            size: Math.random() * 2.5 + 0.5,
            opacity: Math.random() * 0.35 + 0.05,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            type: Math.random() > 0.72 ? 'plus' : 'dot',
            arm: Math.random() * 4 + 2,
        });
    }

    function drawPlus(x, y, arm, alpha, color) {
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fillRect(x - arm / 4, y - arm, arm / 2, arm * 2);
        ctx.fillRect(x - arm, y - arm / 4, arm * 2, arm / 2);
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.y < -20) { p.y = canvas.height + 20; p.x = Math.random() * canvas.width; }
            if (p.x < -20) p.x = canvas.width + 20;
            if (p.x > canvas.width + 20) p.x = -20;

            if (p.type === 'plus') {
                drawPlus(p.x, p.y, p.arm, p.opacity, p.color);
            } else {
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}
