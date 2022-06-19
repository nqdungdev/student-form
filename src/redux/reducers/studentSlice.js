import { createSlice } from "@reduxjs/toolkit";

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

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    createStudent: (state, { payload }) => {
      saveData([...state.studentList, payload]);
      return {
        ...state,
        studentList: [...state.studentList, payload],
      };
    },
    getStudentDetail: (state, { payload }) => {
      const selectedStudent = state.studentList.filter(
        (student) => student.id === payload
      );
      return { ...state, selectedStudent: selectedStudent[0] };
    },
    updateStudent: (state, { payload }) => {
      const studentList = state.studentList.map((student) => {
        if (student.id === payload.studentId) {
          return { ...payload.student };
        }
        return student;
      });
      saveData(studentList);
      return {
        ...state,
        studentList,
        selectedStudent: { id: "", name: "", phoneNumber: "", email: "" },
      };
    },
    deleteStudent: (state, { payload }) => {
      const studentList = state.studentList.filter(
        (student) => student.id !== payload
      );
      saveData(studentList);
      return { ...state, studentList };
    },
    searchStudent: (state, { payload }) => {
      const searchList = state.studentList.filter((student) => {
        return (
          student.name.toLowerCase().includes(payload.trim().toLowerCase()) ||
          student.id.includes(payload.trim())
        );
      });
      return { ...state, searchList };
    },
  },
});

export const {
  createStudent,
  getStudentDetail,
  updateStudent,
  deleteStudent,
  searchStudent,
} = studentSlice.actions;

export default studentSlice.reducer;
