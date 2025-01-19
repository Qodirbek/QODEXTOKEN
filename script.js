let energy = 1000;
let coins = 0;

// Navigatsiya funksiyasi
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// Tuxumni bosganda tanga yig'ilishi
function clickEgg() {
    coins += 10;
    document.getElementById('coin-count').innerText = coins;
}

// Energiya har soniyada oshishi
setInterval(() => {
    if (energy < 1000) {
        energy++;
        document.getElementById('energy-text').innerText = energy;
        const energyFill = document.getElementById('energy-fill');
        energyFill.style.width = `${(energy / 1000) * 100}%`;
    }
}, 1000);