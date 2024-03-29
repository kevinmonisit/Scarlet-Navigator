import { Divider } from '@mui/material';
import React from 'react';
import { Course } from '../../../interfaces/Course';

interface CourseInfoProps {
  course: Course | null;
}

function CourseInfo(props: CourseInfoProps) {
  const { course } = props;
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {course === null
        ? (
          <div className="w-full h-full text-center flex justify-center">
            <div className="font-semibold mt-5">Click on a course...</div>
          </div>
        )
        : (
          <div className="h-full w-full flex flex-col px-2">
            <div className="text-2xl font-semibold pr-2">
              {course.queryTitle}
              {' '}
              <br />
              <span className="font-normal">{course.courseString}</span>
              {' '}
            </div>
            {' '}
            <br />
            <Divider variant="middle" />
            {' '}
            <br />
            <div className="">{course.subject}</div>
            <div className="font-semibold italic">{course.school}</div>
            <br />
            <div>
              <span className="font-semibold">Credits: </span>
              {course.credits || course.credits === 0 ? course.credits : 'None'}
            </div>
            <div>
              <span className="font-semibold">Locations: </span>
            </div>
            <div className="flex flex-row flex-wrap">
              {course.campusLocations.map((location, index) => {
                const modifiedLocation = location.toLowerCase() === 'o' ? 'Online' : location;
                return (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <>
                    {index === course.campusLocations.length - 1 ? <span key={modifiedLocation} className="inline">{modifiedLocation}</span> : (
                      <div key={modifiedLocation} className="mr-1">
                        {modifiedLocation.concat(',')}
                      </div>
                    )}
                  </>
                );
              })}
            </div>
            <div className="mt-2">
              <span className="font-semibold">Cores satisfied: </span>
            </div>
            <div className="flex flex-row flex-wrap">
              {course.cores.map((coreCode, index) => (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                  {index === course.cores.length - 1 ? <span key={coreCode} className="inline">{coreCode}</span> : (
                    <div key={coreCode} className="mr-1">
                      {coreCode.concat(',')}
                    </div>
                  )}
                </>
              ))}
              {course.cores.length === 0 && <div>None</div>}
            </div>
          </div>
        )}
    </>
  );
}

export default CourseInfo;
