const celular = document.querySelector('.celular-premio');
const bgCelular = document.querySelector('.prizes-bg');

if (celular && bgCelular) {
  const observerCelular = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        celular.classList.remove('celular-saiu');
        celular.classList.add('celular-ativo');
      } else {
        celular.classList.remove('celular-ativo');
        celular.classList.add('celular-saiu');
      }
    });
  }, {
    root: null,
    threshold: 0.3
  });

  observerCelular.observe(bgCelular);
}
