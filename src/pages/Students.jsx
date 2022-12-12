/*
page with all students
*/

import React from "react";
import StudentCard from "../components/molecules/StudentCard";
import AddButton from "../components/atoms/AddButton";
import { fakeStudentsList } from "../fakeData";

const Students = () => {
  return (
    <div className="page">
      <h1>Students</h1>
      <p>Here are all the kids</p>

      <div className="classes-container">
        {fakeStudentsList.map((student, index) => (
          <StudentCard
            key={index}
            link={"/view/student"}
            name={student}
          ></StudentCard>
        ))}
        <AddButton link="/add/students" page="Add Student"></AddButton>
      </div>
    </div>
  );
};
export default Students;
