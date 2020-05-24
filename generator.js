// Baseline minimum values, no check can go lower than this:
const BASELINE_CHECK_DIFFICULTY = 2;
const BASELINE_NUMBER_OF_SUCCESSFUL_CHECKS = 1;

// These could chance from mission to mission:
// const CHANCE_OF_VARIATION_IN_ENEMY_HP = 25;
// const CHANCE_OF_VARIATION_IN_ENEMY_DIFFICULTY = 25;
// const BASELINE_OPPORTUNITIES_FOR_ADDITIONAL_NASTINESS = 1;

const generateRandomPercent = () => Math.floor(Math.random() * 100) + 1;

const doesThisThingHappen = (percentChance) => {
    return generateRandomPercent() <= percentChance;
};

const generateWeakness = () => {
    const rando = generateRandomPercent();
    if (rando < 31) {
        return "arms";
    } else if (rando < 61) {
        return "legs";
    } else if (rando < 91) {
        return "abs";
    }
    return "none";
}

const maybeIncreaseNumber = (number, percentChanceIncrease) => {
    return doesThisThingHappen(percentChanceIncrease) ? number + 1 : number;
};

const generateOpponentList = (checksToPassEncounter, highestCheckDifficulty, isBoss) => {
    let remainingChecks = checksToPassEncounter - 1;
    const unitList = [{
        HP: 1,
        difficulty: highestCheckDifficulty,
        weakness: generateWeakness(),
    }];
    // break the HP out into units, each with at least 1 HP
    while (remainingChecks) {
        remainingChecks--;
        // either create a new unit or strengthen an existing unit
        if (doesThisThingHappen(isBoss ? 90 : 50)) {
            unitList[Math.floor(Math.random() * unitList.length)].HP += 1;
        } else {
            unitList.push({
                HP: 1,
                difficulty: Math.floor(Math.random() * (highestCheckDifficulty - BASELINE_CHECK_DIFFICULTY + 1) + BASELINE_CHECK_DIFFICULTY),
                weakness: generateWeakness(),
            })
        };
    }
    // give each unit a difficulty between BASELINE_CHECK_DIFFICULTY and highestCheckDifficulty
    // and give it a weakness
    return unitList.map(unit => {
        return `${unit.HP}HP, ${unit.difficulty} difficulty, weak to ${unit.weakness}`
    })
};

const generateEncounter = (
    chanceMoreChecks, // lower in earlier encounters
    chanceHigherDifficulty, // lower in earlier encounters
    nastinessPoints, // for particularly bad situations (bosses, or tight scrapes for the player)
    // sort of an indication of the character being caught off guard or unprepared,
    // a measure of uncertainty/variation
    isBoss, // whether all the HP/Difficulty increases should go to a single unit
    ) => {
    let checksToPassEncounter = maybeIncreaseNumber(BASELINE_NUMBER_OF_SUCCESSFUL_CHECKS, chanceMoreChecks);
    let highestCheckDifficulty = maybeIncreaseNumber(BASELINE_CHECK_DIFFICULTY, chanceHigherDifficulty);
    let remainingNastinessPoints = nastinessPoints;

    while (remainingNastinessPoints && doesThisThingHappen(50)) {
        remainingNastinessPoints--;
        // check to increase one of the values again
        doesThisThingHappen(50)
            ? checksToPassEncounter  = maybeIncreaseNumber(checksToPassEncounter, chanceMoreChecks)
            : highestCheckDifficulty = maybeIncreaseNumber(highestCheckDifficulty, chanceHigherDifficulty)
    }

    // break the HP out into units, and give each unit a difficulty between BASELINE_CHECK_DIFFICULTY and highestCheckDifficulty
    return generateOpponentList(checksToPassEncounter, highestCheckDifficulty, isBoss);
};

const generateMission = () => {
    return {
        encounter1: generateEncounter(25, 25, 1, false),
        encounter2: generateEncounter(25, 25, 1, false),
        boss: generateEncounter(75, 75, 3, true),
    };
}

console.log(generateMission());
