export function setAnimationOrder() {
    const cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;
    const style = document.createElement('style');
    style.textContent = Array.from(cards, (_, i) => `.project-card:nth-child(${i + 1}){--animation-order:${i}}`).join('');
    document.head.appendChild(style);
}
