document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {

    const isOpen = item.classList.contains('open');

    // Fecha todos antes
    document.querySelectorAll('.faq-item.open')
      .forEach(el => el.classList.remove('open'));

    // Só reabre se não era ele mesmo o que estava aberto
    if (!isOpen) {
      item.classList.add('open');
    }

  });
});
