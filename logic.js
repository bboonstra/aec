function addBuff() {
    const buffType = document.getElementById("buffType").value;
    const buffValue = document.getElementById("buffValue").value;

    if (!buffType || isNaN(buffValue)) {
        alert("Please select a buff type and enter a valid percentage.");
        return;
    }

    const buffList = document.getElementById("playerBuffs");
    const listItem = document.createElement("li");

    listItem.innerHTML = `
        <input type="checkbox" value="${buffValue}" />${buffType} (${buffValue}%)
        <button type="button" onclick="removeBuff(this)">Remove</button>
    `;

    buffList.appendChild(listItem);

    // Clear input fields
    document.getElementById("buffValue").value = "";
}

function addEnemyBuff() {
    const buffType = document.getElementById("enemyBuffType").value;
    const buffValue = document.getElementById("enemyBuffValue").value;

    if (!buffType || isNaN(buffValue)) {
        alert("Please select a buff type and enter a valid percentage.");
        return;
    }

    const buffList = document.getElementById("enemyBuffs");
    const listItem = document.createElement("li");

    listItem.innerHTML = `
        <input type="checkbox" value="${buffValue}" />${buffType} (${buffValue}%)
        <button type="button" onclick="removeBuff(this)">Remove</button>
    `;

    buffList.appendChild(listItem);

    // Clear input fields
    document.getElementById("enemyBuffValue").value = "";
}

function removeBuff(button) {
    const listItem = button.parentElement;
    listItem.remove();
}

function calculateDamage() {
    const attack = parseFloat(document.getElementById("physicalAttack").value);
    const defense = parseFloat(document.getElementById("defense").value);

    if (isNaN(attack) || isNaN(defense)) {
        document.getElementById("result").innerText =
            "Please enter valid numbers.";
        return;
    }

    let totalBuff = 0;
    document
        .querySelectorAll("#playerBuffs input[type='checkbox']:checked")
        .forEach((checkbox) => {
            totalBuff += parseFloat(checkbox.value);
        });

    // Basic damage calculation formula with buffs
    const multiplier = 1 + totalBuff / 100;
    const damage = attack * multiplier - defense;

    // Ensure damage is not negative
    const finalDamage = Math.max(0, damage);

    document.getElementById("result").innerText = `Damage: ${finalDamage}`;
}

function filterBuffTypes() {
    const attackType = document.getElementById("attackType").value;
    const buffTypeSelect = document.getElementById("buffType");

    Array.from(buffTypeSelect.options).forEach((option) => {
        const types = option.getAttribute("data-attack-type").split(",");
        option.style.display = types.includes(attackType) ? "block" : "none";
    });

    // Reset the selected index to the first visible option
    buffTypeSelect.selectedIndex = Array.from(buffTypeSelect.options).findIndex(
        (option) => option.style.display === "block"
    );
}

// Call filterBuffTypes when the attack type changes
document
    .getElementById("attackType")
    .addEventListener("change", filterBuffTypes);

// Initial call to set the correct options on page load
filterBuffTypes();

function updateCharacterStatLabel() {
    const attackType = document.getElementById("attackType").value;
    const characterStatLabel = document.querySelector(
        "label[for='characterStat']"
    );
    const weaponAttackLabel = document.getElementById("weaponAttackLabel");
    const defenseLabel = document.getElementById("defenseLabel");

    switch (attackType) {
        case "physpwratk":
            characterStatLabel.innerText = "Power:";
            weaponAttackLabel.innerText = "Weapon Attack:";
            defenseLabel.innerText = "Endurance:";
            break;
        case "magpwratk":
            characterStatLabel.innerText = "Power:";
            weaponAttackLabel.innerText = "Weapon Attack:";
            defenseLabel.innerText = "Spirit:";
            break;
        case "physspdatk":
            characterStatLabel.innerText = "Speed:";
            weaponAttackLabel.innerText = "Weapon Attack:";
            defenseLabel.innerText = "Endurance:";
            break;
        case "physintmat":
            characterStatLabel.innerText = "Intelligence:";
            weaponAttackLabel.innerText = "Weapon Magical Attack:";
            defenseLabel.innerText = "Endurance:";
            break;
        case "magintmat":
            characterStatLabel.innerText = "Intelligence:";
            weaponAttackLabel.innerText = "Weapon Magical Attack:";
            defenseLabel.innerText = "Spirit:";
            break;
        default:
            characterStatLabel.innerText = "[???]:";
            weaponAttackLabel.innerText = "Weapon Attack:";
            defenseLabel.innerText = "Endurance:";
    }
}

// Call updateCharacterStatLabel when the attack type changes
document
    .getElementById("attackType")
    .addEventListener("change", updateCharacterStatLabel);

// Initial call to set the correct label on page load
updateCharacterStatLabel();
