// Auto-highlight buy button based on browser language
(function() {
    const userLang = navigator.language.split('-')[0];
    const langButtons = {
        'es': document.querySelector('[data-lang="es"]'),
        'en': document.querySelector('[data-lang="en"]'),
        'pt': document.querySelector('[data-lang="pt"]')
    };

    if (langButtons[userLang]) {
        langButtons[userLang].style.background = '#ffb366';
        const label = document.createElement('span');
        label.textContent = ' (Recommended)';
        langButtons[userLang].appendChild(label);
    }

    // Update copyright year
    const yearSpan = document.querySelector('footer p:last-child');
    if (yearSpan) {
        yearSpan.textContent = yearSpan.textContent.replace('2025', new Date().getFullYear());
    }
})();
