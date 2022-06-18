import {
  CREATE_STUDENT,
  DELETE_STUDENT,
  GET_STUDENT_DETAIL,
  SEARCH_STUDENT,
  UPDATE_STUDENT,
} from "../constants/studentConstants";

const saveData = (data) => {
  localStorage.setItem("studentList", JSON.stringify(data));
};
const loadData = () => {
  if (localStorage.getItem("studentList")) {
    return JSON.parse(localStorage.getItem("studentList"));
  }
  return;
};

const initialState = {
  selectedStudent: { id: "", name: "", phoneNumber: "", email: "" },
  studentList: loadData() || [],
  searchList: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STUDENT: {
      saveData([...state.studentList, action.student]);
      return {
        ...state,
        studentList: [...state.studentList, action.student],
      };
    }
    case GET_STUDENT_DETAIL: {
      const selectedStudent = state.studentList.filter(
        (student) => student.id === action.studentId
      );
      return { ...state, selectedStudent: selectedStudent[0] };
    }
    case UPDATE_STUDENT: {
      const studentList = state.studentList.map((student) => {
        if (student.id === action.studentId) {
          return { ...action.student };
        }
        return student;
      });
      saveData(studentList);
      return {
        ...state,
        studentList,
        selectedStudent: { id: "", name: "", phoneNumber: "", email: "" },
      };
    }
    case DELETE_STUDENT: {
      const studentList = state.studentList.filter(
        (student) => student.id !== action.studentId
      );
      saveData(studentList);
      return { ...state, studentList };
    }
    case SEARCH_STUDENT: {
      const searchList = state.studentList.filter((student) => {
        return (
          student.name
            .toLowerCase()
            .includes(action.value.trim().toLowerCase()) ||
          student.id.includes(action.value.trim())
        );
      });
      return { ...state, searchList };
    }

    default:
      return { ...state };
  }
};
export default studentReducer;
