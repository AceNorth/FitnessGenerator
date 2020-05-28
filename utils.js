const doesThisThingHappen = (percentChance) => {
  return generateRandomPercent() <= percentChance;
};

const doesThisThingHappenWithRerolls = (percentChance, rerolls) => {
  return generateRandomPercentWithRerolls(rerolls) <= percentChance;
};

const generateRandomColor = () => {
  const rando = generateRandomPercent();
  if (rando < 34) {
      return "blue";
  } else if (rando < 67) {
      return "red";
  }
  return "yellow";
};

const generateRandomPercent = (bonus = 1) => Math.floor(Math.random() * 100) + bonus;

// roll a certain number of times and keep the highest
const generateRandomPercentWithRerolls = (rerolls) => {
  // you roll at least once
  let remainingRerolls = 1 + rerolls;
  let highestResult = 1;
  while (remainingRerolls) {
    remainingRerolls--;
    const number = generateRandomPercent();
    if (number > highestResult) highestResult = number;
  };
  return highestResult;
};

// return a random result from a generator after X rerolls
const getResultFromGeneratorWithRerolls = (generator, rerolls) => {
  return generator(generateRandomPercentWithRerolls(rerolls));
};

module.exports = {
  doesThisThingHappen,
  doesThisThingHappenWithRerolls,
  generateRandomColor,
  generateRandomPercent,
  getResultFromGeneratorWithRerolls,
};
