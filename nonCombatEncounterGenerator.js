const constants = require('./constants');
const utils = require('./utils');

const {
    BASELINE_CHECK_DIFFICULTY,
} = constants;

const {
    generateRandomColor,
    getResultFromGeneratorWithRerolls,
} = utils;

const generateCheckDifficulty = (number) => {
    if (number < 66) {
        return BASELINE_CHECK_DIFFICULTY;
    } else if (number < 86) {
        return BASELINE_CHECK_DIFFICULTY + 1;
    } else if (number < 95) {
        return BASELINE_CHECK_DIFFICULTY + 2;
    } else if (number < 99) {
        return BASELINE_CHECK_DIFFICULTY + 3;
    }
    return BASELINE_CHECK_DIFFICULTY + 4;
};

/*

Hazard is:

- Difficulty of succeeding
- Number of allowed failures for the encounter

So you need to pass all the hazards without exceeding the number of failures

*/

const generateNonCombatEncounter = (
    rerollsForDifficulty,
  ) => {
  return {
    check1: `${getResultFromGeneratorWithRerolls(generateCheckDifficulty, rerollsForDifficulty)} to pass, bonus for ${generateRandomColor()} checks`,
    check2: `${getResultFromGeneratorWithRerolls(generateCheckDifficulty, rerollsForDifficulty)} to pass, bonus for ${generateRandomColor()} checks`,
    check3: `${getResultFromGeneratorWithRerolls(generateCheckDifficulty, rerollsForDifficulty)} to pass, bonus for ${generateRandomColor()} checks`,
  };
};

module.exports = {
  generateNonCombatEncounter,
};
