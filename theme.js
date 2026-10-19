/* Analyst Hub appearance toggle. No libraries needed. */
(function () {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    // Restore saved preference, or follow the device setting initially.
    let saved = null;
    try { saved = localStorage.getItem('analyst-hub-theme'); } catch (error) {}
    const devicePrefersDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    let theme = saved === 'dark' || saved === 'light'
        ? saved : (devicePrefersDark ? 'dark' : 'light');

    function applyTheme(nextTheme) {
        theme = nextTheme;
        document.documentElement.setAttribute('data-theme', theme);
        const dark = theme === 'dark';
        button.setAttribute('aria-pressed', String(dark));
        button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
        button.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
        button.querySelector('.theme-label').textContent = dark ? 'Light mode' : 'Dark mode';
    }

    applyTheme(theme);
    button.addEventListener('click', function () {
        applyTheme(theme === 'dark' ? 'light' : 'dark');
        try { localStorage.setItem('analyst-hub-theme', theme); } catch (error) {}
    });
})();
