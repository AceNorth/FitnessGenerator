const constants = require('./constants');
const utils = require('./utils');

const {
    BASELINE_CHECK_DIFFICULTY,
    BASELINE_NUMBER_OF_SUCCESSFUL_CHECKS,
} = constants;

const {
    doesThisThingHappen,
    generateRandomColor,
    maybeIncreaseNumber,
} = utils;


// build non-combat encounters (environmental hazards, traps, prolly like
// 1 HP checks with higher difficulties and a different way of figuring out bonuses)

const generateHazardList = (checksToPassEncounter, highestCheckDifficulty, isBoss) => {
  let remainingChecks = checksToPassEncounter;
  const hazardList = [];
  // break the HP out into units, each with at least 1 HP
  while (remainingChecks) {
      remainingChecks--;
      hazardList.push({
          difficulty: Math.floor(Math.random() * (highestCheckDifficulty - BASELINE_CHECK_DIFFICULTY + 1) + BASELINE_CHECK_DIFFICULTY),
          bonusColor: doesThisThingHappen(50) ? generateRandomColor() : null,
      })
  }

  return hazardList.map(hazard => {
      let descriptionString = `${hazard.difficulty} difficulty`;
      if (hazard.bonusColor) descriptionString += `, bonus for ${hazard.bonusColor} sets`;
      return descriptionString;
  })
};

// TODO: Any way to randomize consequence for failure? Like usually it'd prolly be "trigger a
// combat encounter"

const generateNonCombatEncounter = (
  chanceMoreChecks, // lower in earlier encounters
  chanceHigherDifficultyChecks, // lower in earlier encounters
  nastinessPoints, // for particularly bad situations (bosses, or tight scrapes for the player)
  // sort of an indication of the character being caught off guard or unprepared,
  // a measure of uncertainty/variation
  ) => {
  let checksToPassEncounter = maybeIncreaseNumber(BASELINE_NUMBER_OF_SUCCESSFUL_CHECKS, chanceMoreChecks);
  let highestCheckDifficulty = maybeIncreaseNumber(BASELINE_CHECK_DIFFICULTY, chanceHigherDifficultyChecks);
  let remainingNastinessPoints = nastinessPoints;

  while (remainingNastinessPoints && doesThisThingHappen(50)) {
      remainingNastinessPoints--;
      // check to increase one of the values again
      doesThisThingHappen(50)
          ? checksToPassEncounter  = maybeIncreaseNumber(checksToPassEncounter, chanceMoreChecks)
          : highestCheckDifficulty = maybeIncreaseNumber(highestCheckDifficulty, chanceHigherDifficultyChecks)
  }

  // break the HP out into units, and give each unit a difficulty between BASELINE_CHECK_DIFFICULTY and highestCheckDifficulty
  return generateHazardList(checksToPassEncounter, highestCheckDifficulty);
};

module.exports = {
  generateNonCombatEncounter,
};