const ticketImageSrc = "assets/images/ticket1.png";
const container = document.querySelector(".header-banner-container");

function createBigTicket() {
  const ticket = document.createElement("img");
  ticket.src = ticketImageSrc;
  ticket.alt = "Ticket ultra grande";
  ticket.className = "ticket front ticket-dynamic";

  // Tamanho aleatório grande (160–220px)
  const size = Math.floor(Math.random() * 60 + 160);
  ticket.style.setProperty("--size", `${size}px`);

  // Posição nas laterais ou meio (5% a 90%)
  const left = Math.floor(Math.random() * 85 + 5);
  ticket.style.left = `${left}%`;

  // Rotação aleatória
  const rotation = Math.random() < 0.5 ? 360 : -360;
  ticket.style.setProperty("--rotation", `${rotation}deg`);

  // Duração aleatória lenta (10–16s)
  const duration = Math.random() * 6 + 10;
  ticket.style.setProperty("--duration", `${duration}s`);

  // Z-index alto (sempre na frente)
  ticket.style.zIndex = 22;

  // Adiciona ao DOM
  container.appendChild(ticket);

  // Remove depois de 17s (garante que não acumule)
  setTimeout(() => {
    ticket.remove();
  }, (duration + 1) * 1000);
}

// Gera um novo ticket a cada 6–10s
setInterval(() => {
  if (Math.random() < 0.7) { // 70% chance de criar
    createBigTicket();
  }
}, 6000 + Math.random() * 4000);
