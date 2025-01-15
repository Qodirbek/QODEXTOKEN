let coins = parseInt(localStorage.getItem("coins")) || 0;
let energy = 1000;
let clickValue = 1;
let maxEnergy = 1000;

// Tangalar va energiyani yangilash funksiyasi
function updateStats() {
    document.getElementById("coins").textContent = coins;
    document.getElementById("energy").textContent = energy;
}

// Tuxum bosilganda
function clickEgg() {
    if (energy > 0) {
        coins += clickValue;
        energy--;
        localStorage.setItem("coins", coins); // Tangalarni saqlash
        updateStats();
    } else {
        document.getElementById("message").textContent = "Energiya tugadi!";
    }
}

// Har soniyada energiyani tiklash
setInterval(() => {
    if (energy < maxEnergy) {
        energy++;
        updateStats();
    }
}, 1000);

// Sahifalarni ko'rsatish
function showPage(page) {
    document.querySelectorAll("main, .hidden").forEach(el => el.classList.add("hidden"));
    document.getElementById(page).classList.remove("hidden");
}

// Reytingni qo'shish (namuna)
let leaderboard = [
    { name: "Ali", coins: 500 },
    { name: "Vali", coins: 450 },
    { name: "Olim", coins: 400 }
];
const ratingList = document.getElementById("leaderboard");
leaderboard.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.name} - ${user.coins} tangalar`;
    ratingList.appendChild(li);
});

// Boshlang'ich holatni yuklash
updateStats();