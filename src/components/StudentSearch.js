import React, { useRef } from "react";
import { useDispatch } from "react-redux";
// import { searchStudentAction } from "../redux/actions/studentActions";
import { searchStudent } from "../redux/reducers/studentSlice";

const StudentSearch = () => {
  const searchRef = useRef("");

  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchStudent(searchRef.current.value));
  };
  return (
    <div className="d-flex my-5">
      <input ref={searchRef} type="text" className="form-control" />
      <button className="btn btn-primary ms-3" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default StudentSearch;
