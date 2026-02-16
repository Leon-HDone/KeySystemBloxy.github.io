document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music');
    const startOverlay = document.getElementById('start-overlay');
    const copyKeyBtn = document.getElementById('copy-key-btn');
    const theKey = document.getElementById('the-key');
    const toast = document.getElementById('toast');
    const particlesContainer = document.getElementById('particles-container');

    audio.volume = 0.1;

    // =====================================
    // 1. START OVERLAY
    // =====================================
    function startExperience() {
        startOverlay.classList.add('hide');
        audio.play().catch(() => console.log('Autoplay blocked.'));
        startOverlay.removeEventListener('click', startExperience);
        document.removeEventListener('keydown', startExperience);
    }
    startOverlay.addEventListener('click', startExperience);
    document.addEventListener('keydown', startExperience);

    // =====================================
    // 2. FLOATING PARTICLES
    // =====================================
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        const hue = Math.random() > 0.5 ? 260 : 195; // purple or cyan

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + '%';
        particle.style.background = `hsl(${hue}, 80%, 70%)`;
        particle.style.boxShadow = `0 0 ${size * 3}px hsl(${hue}, 80%, 60%)`;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        particlesContainer.appendChild(particle);

        // Remove after animation to prevent DOM bloat
        setTimeout(() => {
            particle.remove();
            createParticle(); // re-create
        }, (duration + delay) * 1000);
    }

    // Spawn initial particles
    for (let i = 0; i < 25; i++) {
        createParticle();
    }

    // =====================================
    // 3. TAB NAVIGATION
    // =====================================
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');

            // Remove active from all nav items
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            // Switch tab content
            tabContents.forEach(tab => {
                tab.classList.remove('active');
                tab.style.animation = 'none';
            });

            const target = document.getElementById('tab-' + targetTab);
            if (target) {
                // Trigger reflow for animation restart
                requestAnimationFrame(() => {
                    target.style.animation = '';
                    target.classList.add('active');
                });
            }
        });
    });

    // =====================================
    // 4. TOAST NOTIFICATION
    // =====================================
    function showToast(message = 'Copied!') {
        toast.querySelector('span').textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2200);
    }

    // =====================================
    // 5. KEY COPY
    // =====================================
    if (copyKeyBtn && theKey) {
        copyKeyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(theKey.textContent).then(() => {
                copyKeyBtn.classList.add('copied');
                const originalHTML = copyKeyBtn.innerHTML;
                copyKeyBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Copied!</span>
                `;
                showToast('Key copied!');
                setTimeout(() => {
                    copyKeyBtn.classList.remove('copied');
                    copyKeyBtn.innerHTML = originalHTML;
                }, 2000);
            });
        });
    }

    // =====================================
    // 6. SCRIPT COPY BUTTONS
    // =====================================
    document.querySelectorAll('.script-copy-btn:not(.disabled)').forEach(btn => {
        btn.addEventListener('click', () => {
            const script = btn.getAttribute('data-script');
            if (!script) return;

            navigator.clipboard.writeText(script).then(() => {
                btn.classList.add('copied');
                const originalHTML = btn.innerHTML;
                btn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Copied!</span>
                `;
                showToast('Script copied!');
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = originalHTML;
                }, 2000);
            });
        });
    });
    // =====================================
    // 7. OPEN SOURCE COPY BUTTONS
    // =====================================
    document.querySelectorAll('.os-copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const script = btn.getAttribute('data-script');
            if (!script) return;

            navigator.clipboard.writeText(script).then(() => {
                btn.classList.add('copied');
                const originalHTML = btn.innerHTML;
                btn.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Copied!</span>
                `;
                showToast('Script copied!');
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = originalHTML;
                }, 2000);
            });
        });
    });

    // =====================================
    // 8. HOVER GLOW EFFECT (Cards)
    // =====================================
    document.querySelectorAll('.script-card-inner, .executor-card, .os-card-inner').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });

    // =====================================
    // 8. KEYBOARD SHORTCUTS
    // =====================================
    document.addEventListener('keydown', (e) => {
        if (e.key === '1') document.getElementById('nav-scripts')?.click();
        if (e.key === '2') document.getElementById('nav-key')?.click();
        if (e.key === '3') document.getElementById('nav-discord')?.click();
        if (e.key === '4') document.getElementById('nav-executors')?.click();
        if (e.key === '5') document.getElementById('nav-opensource')?.click();
    });
});