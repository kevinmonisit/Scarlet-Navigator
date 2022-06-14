import { Divider } from '@mui/material';
import React from 'react';

interface Course {
  queryTitle: string;
  courseString: string;
  subject: string;
  school: string;
  credits: number;
  campusLocations: string[];
}

interface CourseInfoProps {
  course: Course;
}

function CourseInfo(props: CourseInfoProps) {
  const { course } = props;
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!course
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
              {course.credits}
            </div>
            <div>
              <span className="font-semibold">Locations: </span>
            </div>
            <div className="flex flex-row space-x-1">
              {course.campusLocations.map((location, index) => {
                const modifiedLocation = location.toLowerCase() === 'o' ? 'Online' : location;
                return (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <>
                    {index === course.campusLocations.length - 1 ? <span key={modifiedLocation} className="inline">{modifiedLocation}</span> : (
                      <span className="inline" key={modifiedLocation}>
                        {modifiedLocation.concat(',')}
                      </span>
                    )}
                  </>
                );
              })}

            </div>
          </div>
        )}
    </>
  );
}

export default CourseInfo;
