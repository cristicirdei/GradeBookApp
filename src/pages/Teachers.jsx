/*
page with all students
*/

import React from "react";
import TeacherCard from "../components/molecules/TeacherCard";
import AddButton from "../components/atoms/AddButton";
import { user } from "../data/userData";
import { BACKEND_URL } from "../utils/constants";
import useFetch from "react-fetch-hook";

const Teachers = () => {
  const { isLoading, data } = useFetch(`${BACKEND_URL}/teachers/all/${user.institution}`, {
    formatter: (response) => response.json(),
  });

  console.log("teachers data here ");
  console.log(data);
  let teachersList = data;

  return (
    <div className="page">
      <h1>Teachers</h1>
      <p>Here are all the teachers</p>

      {isLoading ? (
        "..loading"
      ) : (
        <div className="classes-container">
          {teachersList.payload && teachersList.payload.length > 0
            ? teachersList.payload.map((teacher, index) => (
                <TeacherCard
                  key={index}
                  link={`/view/teacher/${teacher.id}`}
                  name={teacher.name}
                ></TeacherCard>
              ))
            : "no teachers found"}
          {user.type === "admin" && (
            <AddButton link="/add/teachers" page="Add Teacher"></AddButton>
          )}
        </div>
      )}
    </div>
  );
};
export default Teachers;
