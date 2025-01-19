let coins = 0;
let energy = 1000;

// Tuxum bosilganda tanga yig'ish
function clickEgg() {
    if (energy > 0) {
        coins++;
        energy--;
        updateStats();
    } else {
        alert("Energiya tugadi!");
    }
}

// Statistika yangilash
function updateStats() {
    document.getElementById("coins").textContent = coins;
    document.getElementById("energy").textContent = energy;
}

// Har sekundda energiya oshirish
setInterval(() => {
    if (energy < 1000) energy++;
    updateStats();
}, 1000);