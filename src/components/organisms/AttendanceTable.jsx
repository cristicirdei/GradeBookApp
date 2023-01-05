import React, { useState } from "react";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { user } from "../../data/userData";
import { BACKEND_URL } from "../../utils/constants";
import axios from "axios";

fontawesome.library.add(faSquarePlus);

const AttendanceTable = ({ att, classId }) => {
  const adm = user.type === "admin" ? "admin" : "user";

  const [changes, setChanges] = useState([]);
  const [newAttendance, setNewAttendance] = useState([]);

  const [addNew, setAddNew] = useState(false);
  const [newDate, setNewDate] = useState();

  const classAttendance = att;

  const refresh = () => window.location.reload(true);
  const request = async (e) => {
    e.preventDefault();
    if (changes && changes.length > 0) {
      try {
        const res = await axios.post(`${BACKEND_URL}/attendance/change`, {
          class: classId,
          changes: changes,
        });
        console.log(res.data);
      } catch (e) {
        alert(e);
      }
    }

    if (newDate) {
      try {
        const res = await axios.post(`${BACKEND_URL}/attendance/new`, {
          class: classId,
          date: newDate,
          values: newAttendance,
        });
        console.log(res.data);
      } catch (e) {
        alert(e);
      }
    }
    refresh();
  };

  const onClick = () => {
    console.log("changes", changes);
    console.log("new att", newAttendance);

    if (newAttendance.length) {
      let list = [];
      newAttendance.map(
        (date) =>
          (list = [
            ...list,
            {
              student: date.student,
              name: newDate,
              value: date.value,
            },
          ])
      );

      setChanges([...changes, ...list]);
      console.log("adding new att values to changes");
    }
  };

  return (
    <div className="table-container-attendance">
      <table>
        <thead>
          <tr>
            <th>Student</th>
            {classAttendance.dates.map((date, index) => (
              <th key={index}>{date}</th>
            ))}
            {addNew ? (
              <th>
                <input
                  type="date"
                  onInput={(e) => {
                    setNewDate(e.target.value);
                  }}
                ></input>
              </th>
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody>
          {classAttendance.students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              {student.att.map((date, index) => (
                <td key={index}>
                  <select
                    name=""
                    id=""
                    onChange={(e) => {
                      e.preventDefault();
                      let newChange = changes.find(
                        (c) =>
                          c.student === student.name && c.name === date.name
                      );
                      if (newChange) {
                        console.log("already in the list");
                        let ch = changes;
                        ch.splice(changes.indexOf(newChange), 1, {
                          student: student.name,
                          name: date.name,
                          value: e.target.value,
                        });

                        setChanges(ch);
                      } else
                        setChanges([
                          ...changes,
                          {
                            student: student.name,
                            name: date.name,
                            value: e.target.value,
                          },
                        ]);
                    }}
                  >
                    <option
                      value={
                        date.value === "Present"
                          ? "Present"
                          : date.value === "Absent"
                          ? "Absent"
                          : date.value === "Motivated"
                          ? "Motivated"
                          : "Undefined"
                      }
                    >
                      {date.value === "Present"
                        ? "Present"
                        : date.value === "Absent"
                        ? "Absent"
                        : date.value === "Motivated"
                        ? "Motivated"
                        : ""}
                    </option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Motivated">Motivated</option>
                  </select>
                </td>
              ))}

              {addNew ? (
                <td>
                  <select
                    name=""
                    id=""
                    onChange={(e) => {
                      e.preventDefault();

                      let newChange = newAttendance.find(
                        (c) => c.student === student.name
                      );
                      if (newChange) {
                        console.log("already in the list");
                        let ch = newAttendance;
                        ch.splice(newAttendance.indexOf(newChange), 1, {
                          student: student.name,
                          value: e.target.value,
                        });

                        setNewAttendance(ch);
                      } else
                        setNewAttendance([
                          ...newAttendance,
                          {
                            student: student.name,
                            value: e.target.value,
                          },
                        ]);
                    }}
                  >
                    <option value="Undefined"></option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Motivated">Motivated</option>
                  </select>
                </td>
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {addNew ? (
        ""
      ) : (
        <div className="add-zone">
          <button
            className="addButton-simple"
            onClick={() => {
              setAddNew(true);
            }}
          >
            <span className={`${adm}-color`}>
              <FontAwesomeIcon icon="square-plus" />
            </span>
            Add Date
          </button>
        </div>
      )}
      {changes.length || addNew ? (
        <div className="footer-zone">
          <input
            type="submit"
            value="Save Changes"
            className={`${adm}`}
            onClick={request}
          ></input>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AttendanceTable;
