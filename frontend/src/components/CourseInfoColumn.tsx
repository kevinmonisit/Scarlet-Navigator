/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface CourseInfoColumnProps {
  currentCourse: any;
}

// TODO: replace type any with the course model shchema

function CourseInfoColumn(props: CourseInfoColumnProps) {
  const { currentCourse } = props;
  return (
    <div className="w-1/4 h-max bg-amber-200">
      {
        !currentCourse
          ? <>Loading</>
          : currentCourse.title
      }
    </div>
  );
}

export default CourseInfoColumn;
