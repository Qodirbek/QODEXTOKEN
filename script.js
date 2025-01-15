let username = localStorage.getItem("username");
let coins = parseInt(localStorage.getItem("coins")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 1000;
let clickValue = parseInt(localStorage.getItem("clickValue")) || 1;
let energyMax = parseInt(localStorage.getItem("energyMax")) || 1000;

// Foydalanuvchi ismini saqlash
function saveUsername() {
    const input = document.getElementById("username-input").value.trim();
    if (input) {
        username = input;
        localStorage.setItem("username", username);
        document.getElementById("username-modal").classList.add("hidden");
        updateStats();
    } else {
        alert("Ism kiritilmadi! Iltimos, ismingizni kiriting.");
    }
}

// Statistika yangilash
function updateStats() {
    document.getElementById("coins").textContent = coins;
    document.getElementById("energy").textContent = energy;
    localStorage.setItem("coins", coins);
    localStorage.setItem("energy", energy);
}

// Tuxum bosilganda
function clickEgg() {
    if (energy > 0) {
        coins += clickValue;
        energy--;
        updateStats();
    } else {
        alert("Energiya tugadi!");
    }
}

// Sahifalarni ko'rsatish
function showPage(page) {
    document.querySelectorAll(".page").forEach(el => el.classList.add("hidden"));
    document.getElementById(page).classList.remove("hidden");
}

// Dastlabki holatni tekshirish
if (!username) {
    document.getElementById("username-modal").classList.remove("hidden");
} else {
    updateStats();
}