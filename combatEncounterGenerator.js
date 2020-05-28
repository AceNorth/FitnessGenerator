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

const generateOpponentList = (checksToPassEncounter, highestCheckDifficulty, isBoss) => {
  let remainingChecks = checksToPassEncounter - 1;
  const unitList = [{
      HP: 1,
      difficulty: highestCheckDifficulty,
      weakness: doesThisThingHappen(50) ? generateRandomColor() : null,
  }];
  // break the HP out into units, each with at least 1 HP
  // give each unit a difficulty between BASELINE_CHECK_DIFFICULTY and highestCheckDifficulty
  // and potentially give it a weakness
  while (remainingChecks) {
      remainingChecks--;
      // either create a new unit or strengthen an existing unit
      if (doesThisThingHappen(isBoss ? 90 : 50)) {
          unitList[Math.floor(Math.random() * unitList.length)].HP += 1;
      } else {
          unitList.push({
              HP: 1,
              difficulty: Math.floor(Math.random() * (highestCheckDifficulty - BASELINE_CHECK_DIFFICULTY + 1) + BASELINE_CHECK_DIFFICULTY),
              weakness: doesThisThingHappen(50) ? generateRandomColor() : null,
          })
      };
  }
  return unitList.map(unit => {
      let unitString = `${unit.HP}HP, ${unit.difficulty} difficulty`;
      if (unit.weakness) unitString += `, weak to ${unit.weakness}`;
      return unitString;
  })
};

const generateCombatEncounter = (
  chanceMoreChecks, // lower in earlier encounters
  chanceHigherDifficultyChecks, // lower in earlier encounters
  nastinessPoints, // for particularly bad situations (bosses, or tight scrapes for the player)
  // sort of an indication of the character being caught off guard or unprepared,
  // a measure of uncertainty/variation
  isBoss, // whether all the HP/Difficulty increases should go to a single unit
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
  return generateOpponentList(checksToPassEncounter, highestCheckDifficulty, isBoss);
};

module.exports = {
  generateCombatEncounter,
};
