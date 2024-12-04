"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Correctly import useParams for dynamic route parameters
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/app/ui/dashboard/attendance/singleAttendance/singleAttendance.module.css"; 
import Pagination from "@/app/ui/dashboard/pagination/pagination";

const SingleAttendancePage = () => {
  const { role, id } = useParams(); // Extract `role` and `id` from dynamic route

  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Extract the selected year from the date
  const selectedYear = selectedDate.getFullYear();

  useEffect(() => {
    if (!role || !id) return; // Wait until params are available

    // Fetch attendance data
    const fetchAttendanceData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/owner/customer/attendance/${role}/${id}`);

        console.log("Role:",role,"Id:",id);
        console.log("Response Data:", response.data);
        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }
        const data = await response.json();
        setAttendanceData(data.attendance || []); // Assuming `attendance` is the key
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setAttendanceData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendanceData();
  }, [role, id]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>View Attendance for {role && role.charAt(0).toUpperCase() + role.slice(1)}</h1>

      <div className={styles.filterContainer}>
        <label>Year:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showYearPicker
          dateFormat="yyyy"
          className={styles.filterSelect}
        />

        <label>Month:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className={styles.filterSelect}
        >
          {[...Array(12).keys()].map((month) => (
            <option key={month + 1} value={month + 1}>
              {new Date(0, month).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <table className={styles.attendanceTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.length > 0 ? (
              attendanceData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td className={entry.status === "Present" ? styles.present : styles.absent}>
                    {entry.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No attendance data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <Pagination />
    </div>
  );
};

export default SingleAttendancePage;
