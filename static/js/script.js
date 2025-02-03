document.addEventListener("DOMContentLoaded", function () {
    let coin = document.getElementById("click-coin");
    let balanceCount = document.getElementById("balance-count");

    let balance = 0;
    let energy = 1000;

    coin.addEventListener("click", function () {
        if (energy > 0) {
            balance += 1;
            energy -= 1;
            balanceCount.textContent = balance;
            coin.style.transform = "scale(0.9)";
            setTimeout(() => {
                coin.style.transform = "scale(1)";
            }, 100);
        }
    });

    setInterval(function () {
        if (energy < 1000) {
            energy += 1;
        }
    }, 2000);
});