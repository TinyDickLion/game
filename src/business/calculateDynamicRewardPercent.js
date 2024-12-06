export const calculateDynamicBwomRewardPercent = (
  bwomStartDate,
  tokenDetails
) => {
  const daysSinceStart = Math.floor(
    (Date.now() - bwomStartDate) / (1000 * 60 * 60 * 24)
  );
  const reductions = Math.floor(daysSinceStart / 2);
  return Math.max(
    0,
    tokenDetails.bwom.rewardPercent - reductions * 0.46
  ).toFixed(2);
};

export const calculateDynamicRearRewardPercent = (
  rearStartDate,
  tokenDetails
) => {
  const daysSinceStart = Math.floor(
    (Date.now() - rearStartDate) / (1000 * 60 * 60 * 24)
  );
  const reductions = Math.floor(daysSinceStart / 2);
  return Math.max(
    0,
    tokenDetails.rear.rewardPercent - reductions * 0.02
  ).toFixed(2);
};

export const calculateDynamicCatRewardPercent = (
  catStartDate,
  tokenDetails
) => {
  const daysSinceStart = Math.floor(
    (Date.now() - catStartDate) / (1000 * 60 * 60 * 24)
  );
  const reductions = Math.floor(daysSinceStart / 2);
  return Math.max(
    0,
    tokenDetails.cat.rewardPercent - reductions * 0.02
  ).toFixed(2);
};
export const calculateDynamicMarcusRewardPercent = (
  marcusStartDate,
  tokenDetails
) => {
  const daysSinceStart = Math.floor(
    (Date.now() - marcusStartDate) / (1000 * 60 * 60 * 24)
  );
  const reductions = Math.floor(daysSinceStart / 2);
  return Math.max(
    0,
    tokenDetails.marcus.rewardPercent - reductions * 0.02
  ).toFixed(2);
};
