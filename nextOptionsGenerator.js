const utils = require('./utils');

const {
    generateRandomPercent,
} = utils;

// combat or noncombat
const optionDescriptors = ["COMBAT", "NONCOMBAT"];

// TODO: turn all of the below into like selectOption(optionList, missionStage)
// that divides up the option list and randomly selects an outcome
// and makes the worse outcomes (the higher-level options) more likely the higher the missionStage
// (so calculates the offset and level targets below programmatically and returns one option)

// how likely it is that the encounter will have more checks
const generateLength = (missionStage) => {
    const offset = (missionStage - 1) * 10;
    const rando = generateRandomPercent(offset);
    if (rando < 34) {
        return "PROBABLY SHORT (25)";
    } else if (rando < 67) {
        return "PROBABLY MEDIUM (50)";
    }
    return "PROBABLY LONG (75)";
  };

// how likely it is that the checks will be more difficult
const generateDifficulty = (missionStage) => {
    const offset = (missionStage - 1) * 10;
    const rando = generateRandomPercent(offset);
    if (rando < 34) {
        return "PROBABLY EASY (25)";
    } else if (rando < 67) {
        return "PROBABLY TRICKY (50)";
    }
    return "PROBABLY DIFFICULT (75)";
  };

// how predicatable all of the above are
const generatePredictability = (missionStage) => {
    const offset = (missionStage - 1) * 10;
    console.log("OFFSET", offset)
    const rando = generateRandomPercent(offset);
    if (rando < 26) {
        return "PREDICTABLE (0)";
    } else if (rando < 51) {
        return "UNPREDICTABLE (1)";
    } else if (rando < 76) {
        return "VERY UNPREDICTABLE (2)";
    }
    return "CHAOTIC (3)"
  };

const generateDescription = (missionStage) => {
    return `${generateLength(missionStage)}, ${generateDifficulty(missionStage)}, ${generatePredictability(missionStage)}`;
};

// missions are 3 stages long, so missionStage is which one you're in
const generateNextOptions = (missionStage = 1) => {
    // TODO: random chance of more options
    // also, what flags would unlock different options
    return {
        combat: generateDescription(missionStage),
        nonCombat: generateDescription(missionStage),
    };
};
    
const missionStage = process.argv[2];
console.log(generateNextOptions(missionStage));
