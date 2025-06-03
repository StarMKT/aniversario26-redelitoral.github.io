const car = document.querySelector('.carro-premio');
const prizeImage = document.querySelector('.prizes-bg');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      car.classList.remove('carro-saiu');
      car.classList.add('carro-ativo');
    } else {
      car.classList.remove('carro-ativo');
      car.classList.add('carro-saiu');
    }
  });
}, {
  root: null, // viewport
  threshold: 0.3 // dispara quando 30% da imagem estiver visível
});

observer.observe(prizeImage);



