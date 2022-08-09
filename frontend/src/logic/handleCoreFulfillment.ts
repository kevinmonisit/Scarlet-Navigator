import { CoreStateInterface, defaultSASCoreState, SAS_CORES } from '../interfaces/CoreFulfillment';
import { Course, PlanContainer } from '../interfaces/Course';

const handleCollection = (
  courseArray: Course[],
  QRorQQ: Set<string>,
  coresAH: Set<string>,
  coreState: CoreStateInterface,
  coreFulfillmentState: CoreStateInterface
) => {
  const newCoreState = JSON.parse(JSON.stringify(coreState));
  courseArray.forEach((course) => {
    course.cores.forEach((coreCode) => {
      // AH is a weird code. AHp/AHr/AHo can satisfy AH, but there needs to be two courses that
      // satisfy at least two. If core is one of the AHs, just add to AH as one core code.
      const isCoreAH = /AH/.test(coreCode);
      const isCoreQRorQQ = coreCode === 'QQ' || coreCode === 'QR';
      const courseCredits = course.credits;
      let coreCodeTmp = coreCode;

      if (!Object.prototype.hasOwnProperty.call(coreFulfillmentState, coreCode)
          && !isCoreAH && !isCoreQRorQQ) {
        console.warn(`Core ${coreCode} not a part of specified core interface`);
        return;
      }

      if ((isCoreQRorQQ && QRorQQ.has(coreCode)) || QRorQQ.has(course.courseString)) {
        return;
      }

      if ((isCoreAH && coresAH.has(coreCode)) || coresAH.has(course.courseString)) {
        return;
      }

      if (isCoreQRorQQ) {
        QRorQQ.add(coreCode);
        QRorQQ.add(course.courseString);
        coreCodeTmp = SAS_CORES.QQ_QR;
      }

      if (isCoreAH) {
        coresAH.add(coreCode);
        coresAH.add(course.courseString);
        coreCodeTmp = 'AH';
      }

      newCoreState[coreCodeTmp].creditsFulfilled += courseCredits;
      newCoreState[coreCodeTmp].coursesThatFulfill.push(course.title);
    });
  });

  return newCoreState;
};

const collectCoreFulfillmentInfo = (
  currentPlan: PlanContainer,
  coreFulfillmentState: CoreStateInterface,
  transferCourses: Course[]
) => {
  // we perform a deep copy of a nested object
  let newCoreState: CoreStateInterface = JSON.parse(JSON.stringify(defaultSASCoreState));

  const coresAH = new Set<string>();
  const QRorQQ = new Set<string>();

  if (!currentPlan) return newCoreState;

  Object.keys(currentPlan).forEach((key) => {
    newCoreState = handleCollection(
      currentPlan[key].items,
      QRorQQ,
      coresAH,
      newCoreState,
      coreFulfillmentState
    );
  });

  newCoreState = handleCollection(
    transferCourses,
    QRorQQ,
    coresAH,
    newCoreState,
    coreFulfillmentState
  );

  return newCoreState;
};

export default collectCoreFulfillmentInfo;
