import React from "react";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import StudentSearch from "./StudentSearch";

const StudentManagement = () => {
  return (
    <div className="bg-dark text-light p-5">
      <div className="container">
        <h1 className="text-center mb-5">Thông tin sinh viên</h1>
        <StudentForm />
        <StudentSearch />
        <StudentList />
      </div>
    </div>
  );
};

export default StudentManagement;
