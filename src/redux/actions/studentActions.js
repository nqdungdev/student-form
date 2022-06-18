import {
  CREATE_STUDENT,
  DELETE_STUDENT,
  GET_STUDENT_DETAIL,
  SEARCH_STUDENT,
  UPDATE_STUDENT,
} from "../constants/studentConstants";

export const createStudentAction = (student) => {
  return { type: CREATE_STUDENT, student };
};

export const getStudentDetailAction = (studentId) => {
  return { type: GET_STUDENT_DETAIL, studentId };
};

export const updateStudentAction = (studentId, student) => {
  return { type: UPDATE_STUDENT, studentId, student };
};

export const deleteStudentAction = (studentId) => {
  return { type: DELETE_STUDENT, studentId };
};

export const searchStudentAction = (value) => {
  return { type: SEARCH_STUDENT, value };
};
