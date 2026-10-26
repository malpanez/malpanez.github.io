(function () {
    try {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark' || theme === 'light') {
            document.documentElement.dataset.theme = theme;
        }
    } catch {
        // Storage blocked (private mode, cookies off): the system theme applies.
    }
})();
