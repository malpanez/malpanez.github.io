(function () {
    const yearEl = document.querySelector('footer p:last-child');
    if (yearEl) {
        yearEl.textContent = yearEl.textContent.replace(/\b20\d{2}\b/, new Date().getFullYear());
    }
})();
