import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteStudentAction,
//   getStudentDetailAction,
// } from "../redux/actions/studentActions";
import {
  deleteStudent,
  getStudentDetail,
} from "../redux/reducers/studentSlice";

const StudentList = () => {
  const studentList = useSelector((state) => state.studentSlice.studentList);
  const searchList = useSelector((state) => state.studentSlice.searchList);

  const list = searchList || studentList;

  const dispatch = useDispatch();

  const handleGetStudentDetail = (studentId) => {
    dispatch(getStudentDetail(studentId));
  };

  const handleDeleteStudent = (studentId) => {
    dispatch(deleteStudent(studentId));
  };

  return (
    <div>
      <table className="table text-light text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {list.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.email}</td>
              <td>
                <button
                  className="btn btn-info me-3"
                  onClick={() => {
                    handleGetStudentDetail(student.id);
                  }}
                >
                  Chỉnh sửa
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleDeleteStudent(student.id);
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
