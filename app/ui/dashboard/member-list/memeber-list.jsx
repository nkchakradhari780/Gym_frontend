"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/app/ui/dashboard/member-list/member-list.module.css";

const MemAttenPage = () => {
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: "Nisha", email: "nisha@example.com", age: 25 },
    { id: 2, name: "Nitin", email: "nitin@example.com", age: 28 },
    { id: 3, name: "Kanha", email: "kanha@example.com", age: 30 },
  ]);

  const [selectedDate, setSelectedDate] = useState("");

  // Set the default date to today's date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setSelectedDate(today);
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Attendance</h1>

      <div className={styles.tableContainer}>
        <table className={styles.attendanceTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.age}</td>
                <td>
                  <Link href={`/dashboard-manager/attendance/singleAttendance?id=${member.id}`}>
                    <button className={styles.viewButton}>View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemAttenPage;
