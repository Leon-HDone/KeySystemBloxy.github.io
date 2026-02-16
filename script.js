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
    // 9. ANIMATED NEON LINES BACKGROUND
    // =====================================
    const neonCanvas = document.getElementById('neon-bg');
    if (neonCanvas) {
        const ctx = neonCanvas.getContext('2d');
        let w, h;

        function resizeCanvas() {
            w = neonCanvas.width = window.innerWidth;
            h = neonCanvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Simple noise function (value noise with smoothing)
        const noiseGrid = {};
        function seedNoise(seed) {
            // pseudo-random based on coordinates
            const n = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
            return n - Math.floor(n);
        }

        function smoothNoise(x, y) {
            const ix = Math.floor(x);
            const iy = Math.floor(y);
            const fx = x - ix;
            const fy = y - iy;
            // Smooth interpolation
            const sx = fx * fx * (3 - 2 * fx);
            const sy = fy * fy * (3 - 2 * fy);

            const n00 = seedNoise(ix + iy * 57);
            const n10 = seedNoise((ix + 1) + iy * 57);
            const n01 = seedNoise(ix + (iy + 1) * 57);
            const n11 = seedNoise((ix + 1) + (iy + 1) * 57);

            const nx0 = n00 + (n10 - n00) * sx;
            const nx1 = n01 + (n11 - n01) * sx;
            return nx0 + (nx1 - nx0) * sy;
        }

        function fbmNoise(x, y) {
            let val = 0;
            let amp = 0.5;
            let freq = 1;
            for (let i = 0; i < 4; i++) {
                val += amp * smoothNoise(x * freq, y * freq);
                amp *= 0.5;
                freq *= 2.0;
            }
            return val;
        }

        let time = 0;
        const lineCount = 18;
        const contourLevels = 14;

        function drawNeonLines() {
            ctx.fillStyle = '#060620';
            ctx.fillRect(0, 0, w, h);

            const cellSize = 8;
            const cols = Math.ceil(w / cellSize) + 1;
            const rows = Math.ceil(h / cellSize) + 1;

            // Precompute noise field
            const field = [];
            for (let j = 0; j < rows; j++) {
                field[j] = [];
                for (let i = 0; i < cols; i++) {
                    const nx = i * 0.035 + time * 0.15;
                    const ny = j * 0.035 + time * 0.08;
                    field[j][i] = fbmNoise(nx, ny);
                }
            }

            // Draw contour lines using marching squares (simplified)
            for (let level = 0; level < contourLevels; level++) {
                const threshold = level / contourLevels;
                const hue = 200 + level * 5; // blue to cyan range
                const lightness = 50 + level * 2;
                const alpha = 0.4 + (level / contourLevels) * 0.4;

                ctx.strokeStyle = `hsla(${hue}, 100%, ${lightness}%, ${alpha})`;
                ctx.lineWidth = 1.2;
                ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
                ctx.shadowBlur = 8;

                ctx.beginPath();
                let hasSegments = false;

                for (let j = 0; j < rows - 1; j++) {
                    for (let i = 0; i < cols - 1; i++) {
                        const tl = field[j][i];
                        const tr = field[j][i + 1];
                        const bl = field[j + 1][i];
                        const br = field[j + 1][i + 1];

                        // Marching squares case
                        const caseIndex =
                            (tl > threshold ? 8 : 0) |
                            (tr > threshold ? 4 : 0) |
                            (br > threshold ? 2 : 0) |
                            (bl > threshold ? 1 : 0);

                        if (caseIndex === 0 || caseIndex === 15) continue;

                        const x = i * cellSize;
                        const y = j * cellSize;

                        // Interpolation helpers
                        const lerp = (a, b) => (threshold - a) / (b - a);
                        const top = x + lerp(tl, tr) * cellSize;
                        const bottom = x + lerp(bl, br) * cellSize;
                        const left = y + lerp(tl, bl) * cellSize;
                        const right = y + lerp(tr, br) * cellSize;

                        const segments = [];
                        switch (caseIndex) {
                            case 1: case 14: segments.push([x, left, bottom, y + cellSize]); break;
                            case 2: case 13: segments.push([bottom, y + cellSize, x + cellSize, right]); break;
                            case 3: case 12: segments.push([x, left, x + cellSize, right]); break;
                            case 4: case 11: segments.push([top, y, x + cellSize, right]); break;
                            case 5: segments.push([x, left, top, y]); segments.push([bottom, y + cellSize, x + cellSize, right]); break;
                            case 6: case 9: segments.push([top, y, bottom, y + cellSize]); break;
                            case 7: case 8: segments.push([x, left, top, y]); break;
                            case 10: segments.push([top, y, x + cellSize, right]); segments.push([x, left, bottom, y + cellSize]); break;
                        }

                        for (const seg of segments) {
                            ctx.moveTo(seg[0], seg[1]);
                            ctx.lineTo(seg[2], seg[3]);
                            hasSegments = true;
                        }
                    }
                }

                if (hasSegments) ctx.stroke();
            }

            // Extra glow pass for the brighter lines
            ctx.shadowBlur = 0;
            ctx.shadowColor = 'transparent';

            time += 0.008;
            requestAnimationFrame(drawNeonLines);
        }

        drawNeonLines();
    }

    // =====================================
    // 10. KEYBOARD SHORTCUTS
    // =====================================
    document.addEventListener('keydown', (e) => {
        if (e.key === '1') document.getElementById('nav-scripts')?.click();
        if (e.key === '2') document.getElementById('nav-key')?.click();
        if (e.key === '3') document.getElementById('nav-discord')?.click();
        if (e.key === '4') document.getElementById('nav-executors')?.click();
        if (e.key === '5') document.getElementById('nav-opensource')?.click();
    });
});