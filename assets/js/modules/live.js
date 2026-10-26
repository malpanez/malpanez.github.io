const DAY = 86400000;

export function startClocks() {
    const clocks = document.querySelectorAll('[data-clock]');
    if (!clocks.length) return;

    const format = new Intl.DateTimeFormat('en-IE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Dublin'
    });
    const tick = () => {
        const now = format.format(new Date());
        clocks.forEach((clock) => {
            clock.textContent = `${clock.dataset.clock} ${now}`;
        });
    };

    tick();
    setInterval(tick, 20000);
}

function relativeDay(iso) {
    const days = Math.floor((Date.now() - Date.parse(iso)) / DAY);
    const format = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    if (days < 60) return format.format(-days, 'day');
    if (days < 730) return format.format(-Math.round(days / 30), 'month');
    return format.format(-Math.round(days / 365), 'year');
}

function cached() {
    try {
        const saved = JSON.parse(globalThis.sessionStorage.getItem('last-push'));
        return saved?.at ? saved : null;
    } catch {
        return null;
    }
}

function cache(push) {
    try {
        globalThis.sessionStorage.setItem('last-push', JSON.stringify(push));
        return true;
    } catch {
        return false;
    }
}

async function latestPush(names) {
    const saved = cached();
    if (saved) return saved;

    const response = await fetch('https://api.github.com/users/malpanez/repos?sort=pushed&per_page=30', {
        headers: { Accept: 'application/vnd.github+json' }
    });
    if (!response.ok) return null;

    const repos = await response.json();
    const hit = repos.find((repo) => names.includes(repo.name));
    if (!hit) return null;

    const push = { name: hit.name, at: hit.pushed_at };
    cache(push);
    return push;
}

export function showLastPush() {
    const target = document.querySelector('[data-last-push]');
    if (!target) return;

    latestPush(target.dataset.lastPush.split(','))
        .then((push) => {
            if (push) {
                target.textContent = `Last push ${relativeDay(push.at)}, ${push.name}`;
            }
        })
        .catch(() => null);
}
