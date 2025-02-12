// LocalStorage’dan foydalanuvchi ma’lumotlarini olish yoki yaratish
let username = localStorage.getItem("username") || generateRandomUsername();
let userId = localStorage.getItem("telegramUserId");
let coins = parseInt(localStorage.getItem("coins")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 1000;
let wallet = localStorage.getItem("wallet") || null;

// Telegram WebApp API integratsiyasi
if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.expand();

    const user = tg.initDataUnsafe?.user;
    if (user) {
        userId = user.id;
        username = user.first_name || generateRandomUsername();
        localStorage.setItem("username", username);
        localStorage.setItem("telegramUserId", userId);
    }
}

// Foydalanuvchiga random ism berish
function generateRandomUsername() {
    const names = ["James", "John", "Robert", "Michael", "William", "David"];
    return names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 1000);
}

// Statistika yangilash
function updateStats() {
    document.getElementById("coins").textContent = coins;
    document.getElementById("energy").textContent = energy;
    localStorage.setItem("coins", coins);
    localStorage.setItem("energy", energy);

    // Energiyani vizual yangilash
    let energyFill = document.getElementById("energy-fill");
    let energyPercent = (energy / 1000) * 100; // 1000 maksimum energiya
    energyFill.style.width = energyPercent + "%";
}

// Tuxum bosilganda tanga ishlash (energiyani kamaytirmaydi)
function clickEgg() {
    userId = localStorage.getItem("telegramUserId");
    if (!userId) {
        alert("Iltimos, avval Telegram orqali tizimga kiring!");
        return;
    }

    // Har bosishda tanga qo‘shiladi
    coins++;
    updateStats();
}

// Energiyani har sekund 1 tadan oshirish (agar 1000 dan past bo‘lsa)
setInterval(() => {
    if (energy < 1000) {
        energy++;
        updateStats();
    }
}, 1000);

// Sahifalarni ko‘rsatish
function showPage(page) {
    document.querySelectorAll(".page").forEach(el => el.classList.add("hidden"));
    document.getElementById(page).classList.remove("hidden");
}

// Profil tugmasi bosilganda ismni ko‘rsatish
function showProfileModal() {
    alert(`🆔 ID: ${userId} \n👤 Ism: ${username} \n💰 Tangalar: ${coins}`);
}

// 🟢 **WALLET FUNKSIYALARI** 🟢

// Wallet'ni ulash
function connectWallet() {
    let walletAddress = prompt("Hamyon manzilini kiriting:");
    if (walletAddress) {
        wallet = walletAddress;
        localStorage.setItem("wallet", wallet);
        document.getElementById("wallet-address").textContent = `📌 Wallet: ${wallet}`;
        document.getElementById("wallet-address").classList.remove("hidden");
        document.getElementById("disconnect-wallet").classList.remove("hidden");
        document.getElementById("connect-wallet").classList.add("hidden");
    }
}

// Wallet'ni uzish
function disconnectWallet() {
    localStorage.removeItem("wallet");
    wallet = null;
    document.getElementById("wallet-address").classList.add("hidden");
    document.getElementById("disconnect-wallet").classList.add("hidden");
    document.getElementById("connect-wallet").classList.remove("hidden");
}

// Agar oldin wallet ulangan bo'lsa, uni ko‘rsatish
if (wallet) {
    document.getElementById("wallet-address").textContent = `📌 Wallet: ${wallet}`;
    document.getElementById("wallet-address").classList.remove("hidden");
    document.getElementById("disconnect-wallet").classList.remove("hidden");
    document.getElementById("connect-wallet").classList.add("hidden");
}

// Dastlabki yuklash
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("egg").addEventListener("click", clickEgg);
    updateStats();
});