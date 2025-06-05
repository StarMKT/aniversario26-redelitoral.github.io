document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.raspadinha-container');
    const canvas = container.querySelector('.raspadinha-canvas');
    const ctx = canvas.getContext('2d');

    const overlayImage = new Image();
    overlayImage.src = 'assets/images/bilhete.png';

    function resizeCanvasAndDraw() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Parâmetros de escala e posição
        const scale = 0.25;
        const offsetX = -(canvas.width * (scale - 1)) / 2;
        const offsetY = -(canvas.height * (scale - 1)) / 2;

        // Desenho da imagem principal do bilhete
        ctx.drawImage(
            overlayImage,
            0, 0, overlayImage.width, overlayImage.height,
            offsetX, offsetY,
            canvas.width * scale, canvas.height * scale
        );

        // Fundo branco para transparência
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Composição da raspagem
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(
            overlayImage,
            0, 0, overlayImage.width, overlayImage.height,
            offsetX, offsetY,
            canvas.width * scale, canvas.height * scale
        );

        ctx.globalCompositeOperation = 'source-over';
    }

    function triggerDraw() {
        resizeCanvasAndDraw();
        window.addEventListener('resize', resizeCanvasAndDraw);
    }

    if (overlayImage.complete) {
        triggerDraw();
    } else {
        overlayImage.onload = triggerDraw;
    }

    let isDrawing = false;

    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseleave', () => isDrawing = false);

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
    });
});
