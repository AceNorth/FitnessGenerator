const doesThisThingHappen = (percentChance) => {
  return generateRandomPercent() <= percentChance;
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

const generateRandomPercent = (offset = 1) => Math.floor(Math.random() * 100) + offset;

const maybeIncreaseNumber = (number, percentChanceIncrease) => {
  return doesThisThingHappen(percentChanceIncrease) ? number + 1 : number;
};

module.exports = {
  doesThisThingHappen,
  generateRandomColor,
  generateRandomPercent,
  maybeIncreaseNumber,
};
