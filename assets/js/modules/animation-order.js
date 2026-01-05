export function setAnimationOrder() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
}
