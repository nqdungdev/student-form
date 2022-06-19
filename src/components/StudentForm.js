import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   createStudentAction,
//   updateStudentAction,
// } from "../redux/actions/studentActions";
import { createStudent, updateStudent } from "../redux/reducers/studentSlice";
const StudentForm = () => {
  const [values, setValues] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    email: "",
  });

  const selectedStudent = useSelector(
    (state) => state.studentSlice.selectedStudent
  );

  const studentList = useSelector((state) => state.studentReducer.studentList);

  const dispatch = useDispatch();

  let isSelectedStudent = useRef(false);

  useEffect(() => {
    if (!isSelectedStudent.current) {
      isSelectedStudent.current = true;
      return;
    }
    setValues({ ...selectedStudent });
    return () => {};
  }, [selectedStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleCreateStudent = (student) => {
    dispatch(createStudent(student));
  };

  const handleUpdateStudent = (studentId, student) => {
    dispatch(updateStudent({ studentId, student }));
  };

  const handleSubmit = (createStudent, updateStudent) => {
    return (e) => {
      e.preventDefault();

      if (!validate()) return;

      if (selectedStudent.id) updateStudent(selectedStudent.id, values);
      else createStudent(values);
      setValues({ id: "", name: "", phoneNumber: "", email: "" });
      setErrors({ id: "", name: "", phoneNumber: "", email: "" });
    };
  };

  const validate = () => {
    let isValid = true;

    const numberPattern = /^[0-9]+$/;
    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const textPattern =
      /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;

    if (!selectedStudent.id) {
      isValid &=
        required("id") &&
        pattern("id", numberPattern) &&
        checkLength("id", 2, 4) &&
        checkId();
    } else {
      isValid &=
        required("id") &&
        pattern("id", numberPattern) &&
        checkLength("id", 2, 4);
    }

    isValid &= required("name") && pattern("name", textPattern);
    isValid &=
      required("phoneNumber") &&
      pattern("phoneNumber", numberPattern) &&
      checkLength("phoneNumber", 10, 10, "* phoneNumber phải có mười chữ số!");
    isValid &= required("email") && pattern("email", emailPattern);
    return isValid;
  };

  const required = (key, message) => {
    if (!values || values[key].trim() === "") {
      setErrors((errors) => ({
        ...errors,
        [key]: message || `* ${key} không được để trống!`,
      }));
      return false;
    }
    setErrors((errors) => ({ ...errors, [key]: "" }));
    return true;
  };

  const checkId = (message) => {
    const found = studentList.find((student) => student.id === values.id);
    if (found) {
      setErrors((errors) => ({
        ...errors,
        id: message || `* ID đã tồn tại!`,
      }));
      return false;
    }
    setErrors((errors) => ({ ...errors, id: "" }));
    return true;
  };

  const checkLength = (key, min, max, message) => {
    if (values[key].length < min || values[key].length > max) {
      setErrors((errors) => ({
        ...errors,
        [key]: message || `* ${key} phải có độ dài từ ${min} đến ${max}!`,
      }));
      return false;
    }
    setErrors((errors) => ({ ...errors, [key]: "" }));
    return true;
  };

  const pattern = (key, regex, message) => {
    if (!regex.test(values[key])) {
      setErrors((errors) => ({
        ...errors,
        [key]: message || `* ${key} không đúng định dạng!`,
      }));
      return false;
    }
    setErrors((errors) => ({ ...errors, [key]: "" }));
    return true;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateStudent, handleUpdateStudent)}>
        <div className="row">
          <div className="col-sm-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="id">
                Mã sinh viên
              </label>
              <p className="text-danger">{errors.id}</p>
              <input
                type="text"
                id="id"
                name="id"
                value={values.id}
                className="form-control"
                onChange={handleChange}
                disabled={selectedStudent.id}
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Họ tên
              </label>
              <p className="text-danger">{errors.name}</p>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="phoneNumber">
                Số điện thoại
              </label>
              <p className="text-danger">{errors.phoneNumber}</p>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={values.phoneNumber}
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <p className="text-danger">{errors.email}</p>
              <input
                type="text"
                id="email"
                name="email"
                value={values.email}
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          {selectedStudent.id ? (
            <button className="btn btn-warning">Chỉnh sửa sinh viên</button>
          ) : (
            <button className="btn btn-success">Thêm sinh viên</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
