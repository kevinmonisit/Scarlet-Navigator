/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

enum SAS_CORES {
  CCD = 'CCD',
  CCO = 'CCO',

  NS = 'NS',
  HST = 'HST',
  SCL = 'SCL',

  AH = 'AH',
  AHo = 'AHo',
  AHp = 'AHp',
  AHq = 'AHq',
  AHr = 'AHr',

  WC = 'WC',
  WCr = 'WCr',
  WCd = 'WCd',

  QQ = 'QQ',
  QR = 'QR',
}

interface CoreStateInterface {
  [core: string]: {
    readonly creditsNeededForFulfillment: number;
    creditsFulfilled: number;
    coursesThatFulfill: string[];
    coreTitle: string;
  };
}

const defaultSASCoreState = {
  [SAS_CORES.CCD]: {
    creditsNeededForFulfillment: 3,
    creditsFulfilled: 0,
    coreTitle: 'Diversities and Social Inequalities',
    coursesThatFulfill: [],
  },
  [SAS_CORES.CCO]: {
    creditsNeededForFulfillment: 3,
    creditsFulfilled: 0,
    coreTitle: 'Diversities and Social Inequalities',
    coursesThatFulfill: [],
  },
  [SAS_CORES.NS]: {
    creditsNeededForFulfillment: 3,
    creditsFulfilled: 0,
    coreTitle: 'Natural Sciences',
    coursesThatFulfill: [],
  },
  [SAS_CORES.HST]: {
    creditsNeededForFulfillment: 3,
    creditsFulfilled: 0,
    coreTitle: 'Historical Analysis',
    coursesThatFulfill: [],
  },
  [SAS_CORES.SCL]: {
    creditsNeededForFulfillment: 3,
    creditsFulfilled: 0,
    coreTitle: 'Social Analysis',
    coursesThatFulfill: [],
  },
  [SAS_CORES.AH]: {
    creditsNeededForFulfillment: 6,
    creditsFulfilled: 0,
    coreTitle: 'Arts and Humanities',
    coursesThatFulfill: [],
  },
  [SAS_CORES.AHo]: {
    creditsNeededForFulfillment: 6,
    creditsFulfilled: 0,
    coreTitle: 'Arts and Humanities',
    coursesThatFulfill: [],
  },
  [SAS_CORES.AHp]: {
    creditsNeededForFulfillment: 6,
    creditsFulfilled: 0,
    coreTitle: 'Arts and Humanities',
    coursesThatFulfill: [],
  },
  [SAS_CORES.WC]: {
    creditsNeededForFulfillment: 3,
    creditsFulfilled: 0,
    coreTitle: 'Arts and Humanities',
    coursesThatFulfill: [],
  },
};

export type { CoreStateInterface };
export { SAS_CORES, defaultSASCoreState };
