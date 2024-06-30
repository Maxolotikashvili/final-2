const mainGameBarDiv = document.querySelector('.wrapper-bar');
const backgroundBarDiv = document.querySelector('.background-bar');
const userMoneyDiv = document.querySelector('.money');
const upgradeButton = document.getElementById('upgrade-button');
let isMoneyGenerationInProggress = false;

const generatedMoneyByLevels = {
    1: 30,
    2: 60,
    3: 90,
    4: 150,
    5: 200
}

const upgradeCosts = {
    1: 100,
    2: 300,
    3: 700,
    4: 1500,
    5: 2000
}

const completionTime = {
    1: 1000,
    2: 700,
    3: 400,
    4: 100,
    5: 50
}

const currentStats = {
    money: 0,
    level: 1,
    upgradesDone: 0,
    completionTime: 1
}

function updateDom() {
    userMoneyDiv.innerHTML = `${currentStats.money}$`;
}

updateDom();

function giveUserMoney() {
    if (generatedMoneyByLevels[currentStats.level]) {
        currentStats.money += generatedMoneyByLevels[currentStats.level];
    } else {
        currentStats.money += generatedMoneyByLevels[currentStats.level - 1];
    }
}

function generateMoney() {
    if (isMoneyGenerationInProggress) {
        return;
    }
    startOrStopMoneyGeneratingAnimation(true);
    stopGeneratingMoney();
}

function stopGeneratingMoney() {
    isMoneyGenerationInProggress = true;
    setTimeout(() => {
        startOrStopMoneyGeneratingAnimation(false);
        giveUserMoney();
        updateDom();
        checkIfUpgradesAreAvailable();
        isMoneyGenerationInProggress = false;
    }, completionTime[currentStats.completionTime]);
}


function startOrStopMoneyGeneratingAnimation(state) {
    if (state) {
        backgroundBarDiv.style.transition = `width ${completionTime[currentStats.completionTime]}ms linear`;
        backgroundBarDiv.style.width = '100%';
    } else {
        backgroundBarDiv.style.transition = null;
        backgroundBarDiv.style.width = '0%';
    }
}

function checkIfUpgradesAreAvailable() {
    if (currentStats.money >= upgradeCosts[currentStats.level]) {
        upgradeButton.innerHTML = `Upgrade to level ${currentStats.level + 1}`;
        upgradeButton.style.background = 'green';
        upgradeButton.style.color = '#ffffff';
        upgradeButton.style.pointerEvents = 'all';
    } else {
        upgradeButton.innerHTML = 'Not enough money';
        upgradeButton.style.background = 'transparent';
        upgradeButton.style.color = 'red';
        upgradeButton.style.pointerEvents = 'none'
    }

    if (upgradeCosts[currentStats.level] === undefined) {
        upgradeButton.innerHTML = 'No more levels to upgrade';
        upgradeButton.style.background = 'lightblue';
        upgradeButton.style.color = '#ffffff';
        upgradeButton.style.pointerEvents = 'none';
        upgradeButton.style.border = 'none';
    }
}

function upgradeUserLevel() {
    currentStats.money -= upgradeCosts[currentStats.level];
    currentStats.level++;
    currentStats.completionTime++;
    currentStats.upgradesDone++;
    updateDom();
    checkIfUpgradesAreAvailable();
}

checkIfUpgradesAreAvailable();