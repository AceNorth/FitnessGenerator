// combat or noncombat
const optionDescriptors = ["COMBAT", "NONCOMBAT"];

const generateCombatDifficultyDescription = (stage) => {
    // return a description indicating the # of rerolls we'll use
    // when generating an opponent's difficulty to hit
    // minimum 0, maximum (stage +1)
    const numRerolls = Math.floor(Math.random() * (stage + 1));
    if (numRerolls === 0) {
        return "WEAK (0)";
    } else if (numRerolls === 1) {
        return  "TRAINED (1)";
    } else if (numRerolls === 2) {
        return  "INTIMIDATING (2)";
    } else if (numRerolls === 3) {
        return  "SCARY (3)";
    };
    return  "TERRIFYING (4)";
};

const generateCombatToughnessDescription = (stage) => {
    // return a description indicating the # of rerolls we'll use
    // when generating an opponent's likelihood to run away when hit
    // minimum 1, maximum (stage +1)
    const numRerolls = 1 + Math.floor(Math.random() * (stage + 1));
    if (numRerolls === 0) {
        return "COWARDLY (0)";
    } else if (numRerolls === 1) {
        return  "STEADFAST (1)";
    } else if (numRerolls === 2) {
        return  "BRAVE (2)";
    } else if (numRerolls === 3) {
        return  "DISCIPLINED (3)";
    };
    return  "UNSHAKEABLE (4)";
};


const generateNonCombatDifficultyDescription = (stage) => {
    // return a description indicating the # of rerolls we'll use
    // when generating the difficulty of hazards
    // minimum 1, maximum (stage +1)
    const numRerolls = 1 + Math.floor(Math.random() * (stage + 1));
    if (numRerolls === 0) {
        return "SIMPLE (0)";
    } else if (numRerolls === 1) {
        return  "TRICKY (1)";
    } else if (numRerolls === 2) {
        return  "DIFFICULT (2)";
    } else if (numRerolls === 3) {
        return  "DAUNTING (3)";
    };
    return  "IMPOSSIBLE (4)";
};

// missions are 3 stages long, so missionStage is which one you're in
const generateNextOptions = (missionStage = 1) => {
    // TODO: random chance of more options
    // also, what flags would unlock different options
    return `COMBAT: ${generateCombatDifficultyDescription(missionStage)}, ${generateCombatToughnessDescription(missionStage)} opponent\nNONCOMBAT: ${generateNonCombatDifficultyDescription(missionStage)}`;
};

module.exports = {
    generateNextOptions,
};
