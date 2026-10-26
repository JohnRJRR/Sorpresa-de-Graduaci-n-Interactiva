const envelope = document.getElementById('envelope');
const musicControl = document.getElementById('musicControl');
const bgMusic = document.getElementById('bgMusic');
const heartsContainer = document.getElementById('floatingHearts');

// --- LÓGICA DE FOTOS ---
const totalPhotos = 6; 
const photoContainer = document.getElementById('photo-container');

const safePositions = [
    { top: '15%', left: '15%' },    
    { top: '15%', right: '15%' },   
    { bottom: '20%', left: '15%' }, 
    { bottom: '20%', right: '15%' },
    { top: '45%', left: '8%' },     
    { top: '45%', right: '8%' }     
];

function spawnPhoto() {
    const photoIndex = Math.floor(Math.random() * totalPhotos) + 1;
    const posIndex = Math.floor(Math.random() * safePositions.length);
    const pos = safePositions[posIndex];
    const rotation = Math.floor(Math.random() * 50) - 25; 

    const div = document.createElement('div');
    div.classList.add('polaroid');
    div.style.setProperty('--rotation', rotation + 'deg');
    
    if (pos.top) div.style.top = pos.top;
    if (pos.bottom) div.style.bottom = pos.bottom;
    if (pos.left) div.style.left = pos.left;
    if (pos.right) div.style.right = pos.right;

    const img = document.createElement('img');
    // ATENCIÓN: Aquí actualicé la ruta para que busque en tu carpeta assets/img
    img.src = `assets/img/foto${photoIndex}.jpg`;
    img.onerror = function() { this.style.display = 'none'; };

    div.appendChild(img);
    photoContainer.appendChild(div);

    setTimeout(() => div.classList.add('visible'), 100);

    setTimeout(() => {
        div.style.opacity = '0';
        div.style.transform = 'scale(0.8)';
        setTimeout(() => div.remove(), 1000);
    }, 5000);
}

setInterval(spawnPhoto, 1200);
spawnPhoto(); 

musicControl.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicControl.textContent = '🎵';
    } else {
        bgMusic.pause();
        musicControl.textContent = '🔇';
    }
});

envelope.addEventListener('click', () => {
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        bgMusic.volume = 0.6;
        bgMusic.play().catch(() => musicControl.textContent = '🔇');
        createHearts();
    }
});

function createHearts() {
    const symbols = ['🥰', '😍', '😘', '😻', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '❤️‍🔥', '❤️‍🩹', '❤️', '🩷', '🧡', '💛', '💚', '💙', '🩵', '💜', '🤎', '🖤', '🩶', '🤍',];
    for(let i=0; i<400; i++) {
        setTimeout(() => {
            const h = document.createElement('div');
            h.className = 'floating-heart';
            h.textContent = symbols[Math.floor(Math.random()*symbols.length)];
            h.style.left = Math.random()*100 + '%';
            h.style.fontSize = (Math.random()*20 + 15) + 'px';
            h.style.animationDuration = (4 + Math.random()*4) + 's';
            heartsContainer.appendChild(h);
            setTimeout(()=>h.remove(), 8000);
        }, i*150);
    }
}
