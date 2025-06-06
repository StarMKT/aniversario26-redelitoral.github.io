document.addEventListener("DOMContentLoaded", () => {

    // Desbloqueia o áudio com um clique em qualquer lugar
window.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().then(() => audio.pause()).catch(() => {});
    }
}, { once: true });



    const container = document.querySelector('.raspadinha-container');
    const canvas = container.querySelector('.raspadinha-canvas');
    const ctx = canvas.getContext('2d');

    const overlayImage = new Image();
    overlayImage.src = 'assets/images/bilhete.png';

    const audio = new Audio('assets/sfx/scraping.mp3');
    audio.loop = true;

    let isDrawing = false;
    let hasInteracted = false;
    let autoScrapeStarted = false;
    let fadeTimeout;

    function resizeCanvasAndDraw() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        if (overlayImage.complete) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);
        }
    }

    overlayImage.onload = () => {
        resizeCanvasAndDraw();
        window.addEventListener('resize', resizeCanvasAndDraw);
    };

    function startDrawing() {
        isDrawing = true;
        hasInteracted = true;
        clearTimeout(fadeTimeout);
        if (audio.paused) {
            audio.currentTime = 0;
            audio.play().catch(() => {});
        }
    }

    function stopDrawing() {
        isDrawing = false;
        if (!audio.paused) audio.pause();
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 70, 0, Math.PI * 2, false);
        ctx.fill();
    });

    // Auto raspagem animada
    function autoScrape() {
        if (autoScrapeStarted) return;
        autoScrapeStarted = true;
        let frame = 0;
        const total = 100;
        const radius = 65;
        const amplitude = canvas.height / 4;
        audio.currentTime = 0;
        audio.play().catch(() => {});

        const animate = () => {
            if (frame > total) {
                audio.pause();
                return;
            }
            const x = (canvas.width / total) * frame;
            const y = canvas.height / 2 + Math.sin(frame / 5) * amplitude;
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.fill();
            frame++;
            requestAnimationFrame(animate);
        };
        animate();
    }

    // Observer para iniciar auto raspagem
    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasInteracted) {
            fadeTimeout = setTimeout(autoScrape, 3000);
        } else {
            clearTimeout(fadeTimeout);
        }
    }, { threshold: 0.6 });

    observer.observe(container);
});