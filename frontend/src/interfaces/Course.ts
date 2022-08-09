export interface Course {
  _id: string;
  queryTitle: string;
  title: string;
  courseString: string;
  subject: string;
  school: string;
  credits: number;
  campusLocations: string[];
  cores: string[];
}
export interface SemesterColumnInfo {
  [x: string]: any;
  title: string,
  items: Array<Course>;
}

export interface PlanContainer {
  [key: string]: SemesterColumnInfo;
}
