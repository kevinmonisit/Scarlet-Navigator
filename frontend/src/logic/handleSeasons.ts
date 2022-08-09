import { Season } from '../interfaces/Settings';

const seasonArrays = {
  noSummer: {
    [Season.FALL]: [Season.FALL, Season.SPRING],
    [Season.SPRING]: [Season.SPRING, Season.FALL]
  },

  summer: {
    [Season.FALL]: [Season.SUMMER, Season.FALL, Season.SPRING],
    [Season.SPRING]: [Season.SPRING, Season.SUMMER, Season.FALL]
  }
};

function getSeasonArray(startingSeason: Season, includeSummers: boolean) {
  const arrays = includeSummers ? seasonArrays.summer : seasonArrays.noSummer;
  if (!(startingSeason in arrays)) {
    console.warn('Invalid starting season.');
    return {};
  }

  return arrays[startingSeason];
}

export default getSeasonArray;
