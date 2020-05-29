const constants = require('./constants');
const utils = require('./utils');

const {
    BASELINE_CHECK_DIFFICULTY,
} = constants;

const {
    generateRandomColor,
    getResultFromGeneratorWithRerolls,
} = utils;

const generateToHit = (number) => {
    if (number < 66) {
        return BASELINE_CHECK_DIFFICULTY;
    } else if (number < 86) {
        return BASELINE_CHECK_DIFFICULTY + 1;
    } else if (number < 95) {
        return BASELINE_CHECK_DIFFICULTY + 2;
    } else if (number < 100) {
        return BASELINE_CHECK_DIFFICULTY + 3;
    }
    return BASELINE_CHECK_DIFFICULTY + 4;
};

const generateChanceToRun = (number) => {
    if (number < 66) {
        return 90;
    } else if (number < 86) {
        return 75;
    } else if (number < 95) {
        return 50;
    } else if (number < 99) {
        return 30;
    }
    return 10;
};

/*

Opponent is:

- Difficulty of hitting them
- Chance they will run away when hit
- TODO: Anything that changes after X hits maybe?

So when you hit an opponent, you check if they run away. If not, you get +1 reroll
next time you hit them. Later on we can add triggers to guarantee something happens after X hits.

*/

const generateCombatEncounter = (
    rerollsForDifficulty,
    rerollsForChanceTheyWillRunAwayWhenHit,
  ) => {
  return `${getResultFromGeneratorWithRerolls(generateToHit, rerollsForDifficulty)} to hit, ${getResultFromGeneratorWithRerolls(generateChanceToRun, rerollsForChanceTheyWillRunAwayWhenHit)}% chance of running when hit, weak to ${generateRandomColor()}`;
};

module.exports = {
  generateCombatEncounter,
};
