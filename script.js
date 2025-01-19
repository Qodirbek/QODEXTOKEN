let energy = 1000;
let coins = 0;

// Navigatsiya funksiyasi
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// Tuxumni bosganda tanga qo'shish va energiyani kamaytirish
function clickEgg() {
    if (energy > 0) {
        coins += 1;
        energy -= 1;

        document.getElementById('coin-count').innerText = coins;
        document.getElementById('energy-text').innerText = energy;

        const energyFill = document.getElementById('energy-fill');
        energyFill.style.width = `${(energy / 1000) * 100}%`;
    } else {
        alert("Energiya tugadi! Kuting yoki uni to'ldiring.");
    }
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