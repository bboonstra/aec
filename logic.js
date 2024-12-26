function calculateDamage() {
    const attack = parseFloat(document.getElementById("attack").value);
    const defense = parseFloat(document.getElementById("defense").value);
    const multiplier = parseFloat(document.getElementById("multiplier").value);

    if (isNaN(attack) || isNaN(defense) || isNaN(multiplier)) {
        document.getElementById("result").innerText =
            "Please enter valid numbers.";
        return;
    }

    // Basic damage calculation formula
    const damage = attack * multiplier - defense;

    // Ensure damage is not negative
    const finalDamage = Math.max(0, damage);

    document.getElementById("result").innerText = `Damage: ${finalDamage}`;
}
