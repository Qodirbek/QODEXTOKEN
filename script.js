let coins = parseInt(localStorage.getItem("coins")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 100;

// Energiya barini yangilash funksiyasi
function updateEnergyBar() {
    const energyFill = document.getElementById("energy-fill");
    energyFill.style.width = `${energy}%`;
}

// Tuxum bosilganda
function clickEgg() {
    if (energy > 0) {
        coins++;
        energy -= 10; // Har bosishda energiya kamayadi
        document.getElementById("coins").textContent = coins;
        localStorage.setItem("coins", coins);
        updateEnergyBar();
    } else {
        alert("Energiya tugadi!");
    }
}

// Har sekundda energiya oshirish
setInterval(() => {
    if (energy < 100) {
        energy++;
        updateEnergyBar();
    }
}, 1000);

// Tugmani bosganda boshqa sahifaga o'tish
function navigateTo(page) {
    alert(`${page} sahifasi ochilmoqda!`);
}

// Dastlab energiya barini yangilash
updateEnergyBar();