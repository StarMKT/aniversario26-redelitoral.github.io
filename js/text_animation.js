  document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll('.animate-fade');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible'); // reset ao sair
        }
      });
    }, {
      threshold: 0.5
    });

    animatedElements.forEach(el => observer.observe(el));
  });
