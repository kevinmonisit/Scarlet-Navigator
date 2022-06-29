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
    coreTitle: 'Our Common Future',
    coursesThatFulfill: [],
  },
  [SAS_CORES.NS]: {
    creditsNeededForFulfillment: 6,
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
  [SAS_CORES.WC]: {
    creditsNeededForFulfillment: 3,
    creditsFulfilled: 0,
    coreTitle: 'Writing and Communication',
    coursesThatFulfill: [],
  },
  [SAS_CORES.WCr]: {
    creditsNeededForFulfillment: 3,
    creditsFulfilled: 0,
    coreTitle: 'Writing and Revisions',
    coursesThatFulfill: [],
  },
  [SAS_CORES.WCd]: {
    creditsNeededForFulfillment: 3,
    creditsFulfilled: 0,
    coreTitle: 'Writing to a Discipline',
    coursesThatFulfill: [],
  },
  [SAS_CORES.QR]: {
    creditsNeededForFulfillment: 3,
    creditsFulfilled: 0,
    coreTitle:
      'Apply effective and efficient mathematical or other formal processes to reason and to solve problems.',
    coursesThatFulfill: [],
  },
  [SAS_CORES.QQ]: {
    creditsNeededForFulfillment: 3,
    creditsFulfilled: 0,
    coreTitle:
      'Formulate, evaluate, and communicate conclusions and inferences from quantitative information. ',
    coursesThatFulfill: [],
  },
};

export type { CoreStateInterface };
export { SAS_CORES, defaultSASCoreState };
