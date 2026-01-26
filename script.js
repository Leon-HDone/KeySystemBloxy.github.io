document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music');
    const glassWindow = document.getElementById('glass-window');
    const startOverlay = document.getElementById('start-overlay');
    const copyKeyBtn = document.getElementById('copy-key-btn');
    const theKey = document.getElementById('the-key');

    audio.volume = 0.5;

    function startExperience() {
        startOverlay.classList.add('hide');
        audio.play().catch(error => {
            console.log("Autoplay blocked.");
        });
        startOverlay.removeEventListener('click', startExperience);
        document.removeEventListener('keydown', startExperience);
    }
    startOverlay.addEventListener('click', startExperience);
    document.addEventListener('keydown', startExperience);

    // 2. 3D Tilt Effekt (EXTREM SCHWACH eingestellt)
    document.addEventListener('mousemove', (e) => {
        // Hier teilen wir durch 120 (statt 25). 
        // Je höher die Zahl, desto schwächer die Neigung.
        const xAxis = (window.innerWidth / 2 - e.pageX) / 120;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 120;
        
        glassWindow.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    document.addEventListener('mouseleave', () => {
        glassWindow.style.transition = 'transform 0.5s ease';
        glassWindow.style.transform = `rotateY(0deg) rotateX(0deg)`;
        setTimeout(() => {
             glassWindow.style.transition = 'none';
        }, 500);
    });

    // 3. Ripple Effekt
    document.querySelectorAll('.button-effect').forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            const rect = btn.getBoundingClientRect();
            if(btn.querySelector('.ripple')) return;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            
            ripple.style.left = (size/2 * -0.5) + 'px';
            ripple.style.top = (size/2 * -0.5) + 'px';
            
            btn.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });

    // 4. Key Copy Logik
    if (copyKeyBtn && theKey) {
        copyKeyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(theKey.textContent).then(() => {
                copyKeyBtn.classList.add('copied');
                const originalIcon = copyKeyBtn.innerHTML;
                copyKeyBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;
                setTimeout(() => { 
                    copyKeyBtn.classList.remove('copied'); 
                    copyKeyBtn.innerHTML = originalIcon;
                }, 2000);
            });
        });
    }
});