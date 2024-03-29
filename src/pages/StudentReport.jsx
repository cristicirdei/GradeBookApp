/*
page for a student report
*/

import React from "react";
import IndividualGradesTableView from "../components/organisms/IndividualGradesTableView";
import IndividualAttendanceTableView from "../components/organisms/IndividualAttendanceTableView";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../utils/constants";
import useFetch from "react-fetch-hook";

import studentIcon from "../resources/user-graduate-solid.svg";

const StudentReport = () => {
  let { id } = useParams();

  const { isLoading, data } = useFetch(`${BACKEND_URL}/students/${id}`, {
    formatter: (response) => response.json(),

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token"),
    },
    withCredentials: true,
  });

  console.log("student data here ");
  console.log(data);
  let student = data;

  return (
    <div className="page">
      <h1>Student Report</h1>
      {isLoading ? (
        "..loading"
      ) : (
        <div className="class-details">
          <div className="container">
            <div className="details-zone-student">
              <div>
                <img src={studentIcon} alt="graduate" />
              </div>
              <div>
                <h2>{student.name}</h2>
                <p>ID: {student.nr}</p>
                <p>Age: {student.age}</p>
                <p>Classes: {student.classes.map((c) => c + " | ")}</p>
              </div>
            </div>
            <h2>Grades</h2>
            {student.grades.map((g) => (
              <IndividualGradesTableView
                name={g.name}
                values={g.values}
              ></IndividualGradesTableView>
            ))}
            <h2>Attendance</h2>
            {student.attendance.map((a) => (
              <IndividualAttendanceTableView
                name={a.name}
                values={a.values}
              ></IndividualAttendanceTableView>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default StudentReport;
