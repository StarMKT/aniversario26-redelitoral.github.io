document.addEventListener('DOMContentLoaded', (event) => {
    let activeItem = null;
    document.querySelectorAll('.faq-item').forEach(item => {
        const answer = item.querySelector('.faq-answer');
        answer.style.display = 'none';  // Explicitly set initial state
        item.addEventListener('click', () => {
            if (activeItem) {
                activeItem.style.display = 'none';
            }
            if (activeItem !== answer) {
                answer.style.display = 'block';
                activeItem = answer;
            } else {
                activeItem = null;
            }
        });
    });
});