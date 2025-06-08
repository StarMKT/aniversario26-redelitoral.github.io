function launchConfetti(targetElement) {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');

    // ▶️ TOCA O SOM DE ESTOURO
    // const pop = new Audio('assets/sfx/sharp-pop.mp3');
    // pop.play().catch(() => {});

    // Posicionamento baseado no elemento
    const rect = targetElement.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    confettiContainer.style.position = 'absolute';

    // 🎯 LÓGICA DE POSIÇÃO DIFERENCIADA
    if (targetElement.classList.contains('carro-premio')) {
        confettiContainer.style.left = `${rect.left + rect.width * 0.55}px`; // lateral do carro
        confettiContainer.style.top = `${rect.top + scrollTop + rect.height * 0.10}px`; // perto do laço azul
    } else {
        // padrão para celular
        confettiContainer.style.left = `${rect.left + rect.width * 0.50}px`;
        confettiContainer.style.top = `${rect.top + scrollTop + rect.height * 0.50}px`;
    }

    confettiContainer.style.transform = 'translate(-50%, -50%)';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '999';

    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 25; i++) {
        const isEmoji = Math.random() < 0.3;
        const particle = document.createElement(isEmoji ? 'span' : 'div');
        particle.classList.add('confetti');

        const size = isEmoji ? 20 : Math.random() * 6 + 4;
        const rotate = Math.random() * 360;
        const translateX = (Math.random() - 0.5) * 500;
        const translateY = (Math.random() - 0.5) * 600;

        particle.style.setProperty('--x', `${translateX}px`);
        particle.style.setProperty('--y', `${translateY}px`);
        particle.style.transform = `rotate(${rotate}deg)`;

        if (isEmoji) {
            const emojis = ['🎉', '🎈', '🎊', '🥳', '🎂', '🎁', '😍', '😛', '🤩'];
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.fontSize = `${size}px`;
        } else {
            const color = ['#FFD700', '#FF6347', '#1E90FF', '#32CD32', '#FF69B4'][Math.floor(Math.random() * 5)];
            particle.style.width = `${size}px`;
            particle.style.height = `${size * 0.4}px`;
            particle.style.backgroundColor = color;
        }

        confettiContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }

    setTimeout(() => confettiContainer.remove(), 2100);
}

// Ativadores de confetti para elementos específicos
['.carro-premio', '.celular-premio'].forEach(selector => {
    const el = document.querySelector(selector);
    if (el) {
        el.addEventListener('mouseenter', () => {
            launchConfetti(el);
        });
    }
});
