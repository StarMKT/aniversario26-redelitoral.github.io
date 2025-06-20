
const ticketImageSrc = "assets/images/ticket1.png";
const container = document.querySelector(".header-banner-container");

let activeTickets = 0;
const MAX_TICKETS = 30;

function createBigTicket() {
  if (activeTickets >= MAX_TICKETS) return;

  const ticket = document.createElement("img");
  ticket.src = ticketImageSrc;
  ticket.alt = "Ticket ultra grande";
  ticket.className = "ticket front ticket-dynamic";

  const size = Math.floor(Math.random() * 60 + 160);
  ticket.style.setProperty("--size", `${size}px`);

  const left = Math.floor(Math.random() * 85 + 5);
  ticket.style.left = `${left}%`;

  const rotation = Math.random() < 0.5 ? 360 : -360;
  ticket.style.setProperty("--rotation", `${rotation}deg`);

  const duration = Math.random() * 6 + 10;
  ticket.style.setProperty("--duration", `${duration}s`);

  ticket.style.zIndex = 22;
  container.appendChild(ticket);
  activeTickets++;

  ticket.addEventListener("animationend", () => {
    ticket.remove();
    activeTickets--;
  });
}

function animateTickets() {
  createBigTicket();
  requestAnimationFrame(() => {
    setTimeout(animateTickets, 300);
  });
}

animateTickets();
