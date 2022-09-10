import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import HelpOutline from '@mui/icons-material/HelpOutline';
import { useAppSelector } from '../../redux/store';
import { Course } from '../../interfaces/Course';
import { selectCurrentCourseDisplay } from '../../redux/slices/courseDisplaySlice';
import CourseCard from '../../components/CourseCard';
import { selectCurrentSettings } from '../../redux/slices/settingsSlice';
import { selectCurrentTransferCourses } from '../../redux/slices/planSlice';
import CustomToolTip from '../../components/CustomToolTip';
import { selectTransferCredits } from '../../redux/slices/creditTrackingSlice';

const COLUMN_ID_OF_TRANSFER_COLUMN = 'transferColumn';
const BACKGROUND_COLOR_DEFAULT = 'bg-gray-200';
const BACKGROUND_COLOR_HOVER = 'bg-gray-300';
const BACKGROUND_COLOR_HEADER = 'bg-gray-500';
const BACKGROUND_COLOR_CONTRAST = 'bg-gray-700';

function TransferCoursesDisplay() {
  const currentTransferCourses: Course[] = useAppSelector(selectCurrentTransferCourses);
  const courseCurrentlyDisplayedInInfoColumn = useAppSelector(selectCurrentCourseDisplay);
  const transferCredits = useAppSelector(selectTransferCredits);
  const currentSettings = useAppSelector(selectCurrentSettings);

  return (
    <div className="w-full mt-3 ml-10 relative">
      <div className="w-full h-full absolute overflow-y-scroll">
        <div className="text-3xl font-bold">
          Transfer Courses
          <CustomToolTip
            title="Courses that were completed before enrolling into Rutgers University
            can be managed here.
            Usually, courses completed outside of Rutgers
            have an equivalent course that they satisfy. On the left hand side,
            you can search for equivalent courses and drag them into the box."
            placement="right"
          >
            <HelpOutline sx={{ fontSize: 17, marginLeft: 0.5 }} />
          </CustomToolTip>
        </div>
        <div className="text-gray-600 mb-4">
          <p>These courses will precede all three of your saved plans.</p>
          <p>
            <br />
            <strong>To quickly get setup:</strong>
            <br />
          </p>

          <ol
            className="space-y-2 pr-7 list-decimal list-outside ml-6"
            style={{
              maxWidth: '60ch',
            }}
          >
            <li className="mt-2">
              Go to
              {' '}
              <a href="https://nbdn.rutgers.edu/home" target="_blank" rel="noreferrer">
                <span className="hover:underline">nbdn.rutgers.edu/home</span>
                .
              </a>
            </li>
            <li>
              Click on &#34;
              <strong>Student Login</strong>
              &#34; and sign in.
            </li>
            <li>
              On the left, click on&nbsp;
              <strong>&#34;My Course List&#34;</strong>
              .
            </li>
            <li>
              On the right and below your first semester, you will find
              equivalent Rutgers courses that have been satisfied by your transfer credits.
            </li>
            <li>
              In Scarlet Navigator, type the course numbers into the search bar on the
              top-left. In a later update, this process will be more automated.
            </li>
          </ol>
        </div>
        <div className="w-full h-fit flex mb-10">
          <div
            className="w-fit h-fit mt-5"
          >
            <div className={`
                w-80 h-fit ${BACKGROUND_COLOR_HEADER} text-center
                pt-3 pb-3 rounded-t-md text-white flex justify-center
               `}
            >
              <div className="flex flex-col">
                <div>
                  Drop transfer courses here
                  <span className="ml-1 transition-all ">
                    <ArrowDownwardIcon fontSize="small" />
                  </span>
                </div>
                <div>
                  {transferCredits}
                  {' '}
                  credits
                </div>
              </div>
            </div>
            <Droppable
              droppableId={COLUMN_ID_OF_TRANSFER_COLUMN}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={`w-full h-fit rounded-b-md
                  ${snapshot.isDraggingOver ? BACKGROUND_COLOR_HOVER : BACKGROUND_COLOR_DEFAULT}
                  px-2 pt-1 pb-2 mb-9
                  `}
                  {...provided.droppableProps}
                  style={{
                    minHeight: '80px'
                  }}
                >
                  {currentTransferCourses.map((courseObject, cardIndex) => {
                    let isSelected = false;
                    if (courseCurrentlyDisplayedInInfoColumn) {
                      const { _id } = courseCurrentlyDisplayedInInfoColumn;
                      isSelected = courseObject._id === _id;
                    }

                    return (
                      <CourseCard
                        item={courseObject}
                        index={cardIndex}
                        key={courseObject._id}
                        columnId={COLUMN_ID_OF_TRANSFER_COLUMN}
                        isCurrentlySelected={isSelected}
                        indicatorColor={BACKGROUND_COLOR_CONTRAST}
                        showNumberInsteadOfTitle={currentSettings.showNumberInsteadOfTitle}
                        showCourseCredits={currentSettings.showCourseCredits}
                        isInTransferColumn
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferCoursesDisplay;
export { COLUMN_ID_OF_TRANSFER_COLUMN };
