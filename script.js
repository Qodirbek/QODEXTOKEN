let username = localStorage.getItem("username");
let coins = parseInt(localStorage.getItem("coins")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 1000;
let clickValue = parseInt(localStorage.getItem("clickValue")) || 1;
let energyMax = parseInt(localStorage.getItem("energyMax")) || 1000;
let upgradeCost = 3500;
let energyUpgradeCost = 3500;
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Foydalanuvchi ismini saqlash
function saveUsername() {
    const input = document.getElementById("username-input").value;
    if (input) {
        username = input;
        localStorage.setItem("username", username);
        document.getElementById("username-modal").classList.add("hidden");
        updateStats();
    }
}

// Tangalar va energiyani yangilash
function updateStats() {
    document.getElementById("coins").textContent = coins;
    document.getElementById("energy").textContent = energy;
    localStorage.setItem("coins", coins);
    localStorage.setItem("energy", energy);
    updateLeaderboard();
}

// Tuxum bosilganda
function clickEgg() {
    if (energy > 0) {
        coins += clickValue;
        energy--;
        updateStats();
    } else {
        document.getElementById("message").textContent = "Energiya tugadi!";
    }
}

// Har soniyada energiyani tiklash
setInterval(() => {
    if (energy < energyMax) {
        energy++;
        updateStats();
    }
}, 1000);

// Sahifalarni ko'rsatish
function showPage(page) {
    document.querySelectorAll(".page").forEach(el => el.classList.add("hidden"));
    document.getElementById(page).classList.remove("hidden");
}

// Bosishni kuchaytirish
function upgradeClick() {
    if (coins >= upgradeCost) {
        coins -= upgradeCost;
        clickValue++;
        upgradeCost *= 2;
        updateStats();
    } else {
        alert("Tangalar yetarli emas!");
    }
}

// Energiyani kuchaytirish
function upgradeEnergy() {
    if (coins >= energyUpgradeCost) {
        coins -= energyUpgradeCost;
        energyMax += 500;
        energyUpgradeCost *= 2;
        updateStats();
    } else {
        alert("Tangalar yetarli emas!");
    }
}

// Reytingni yangilash
function updateLeaderboard() {
    const userIndex = leaderboard.findIndex(user => user.name === username);
    if (userIndex >= 0) {
        leaderboard[userIndex].coins = coins;
    } else {
        leaderboard.push({ name: username, coins });
    }
    leaderboard.sort((a, b) => b.coins - a.coins);
    leaderboard = leaderboard.slice(0, 10);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    const ratingList = document.getElementById("leaderboard");
    ratingList.innerHTML = "";
    leaderboard.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.coins} tangalar`;
        ratingList.appendChild(li);
    });
}

// Boshlang'ich holatni yuklash
if (!username) {
    document.getElementById("username-modal").classList.remove("hidden");
} else {
    updateStats();
}