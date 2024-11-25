"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "@/app/ui/dashboard/attendance/attendance.module.css";

const AttendanceAdPage = () => {
  const [trainerAttendance, setTrainerAttendance] = useState([]);
  const [customerAttendance, setCustomerAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UseEffect to set the current date initially
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  // UseEffect to fetch data when selectedDate is set
  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/owner/customer/attendance/list",
          { withCredentials: true }
        );

        console.log('Customer Attendence:',response.data);
        if (response.data && response.data.attendanceData) {
          setCustomerAttendance(
            response.data.attendanceData.map((attendanceData) => ({
              id: attendanceData.customerId,
              name: attendanceData.name,
              status: null, // Default status
              date: selectedDate,
            }))
          );
        } else {
          setError("No customer data returned from API");
        }
      } catch (error) {
        console.error("Error fetching customer list:", error.message);
        setError(error.message);
      }
    };

    const fetchTrainersList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/owner/trainer",
          { withCredentials: true }
        );
        console.log("Trainer List:", response.data.trainers);
        if (response.data && response.data.trainers) {
          setTrainerAttendance(
            response.data.trainers.map((trainer) => ({
              id: trainer._id,
              name: trainer.fullName,
              status: null, // Default status
              date: selectedDate, // Using the updated selectedDate
            }))
          );
        } else {
          setError("No trainer data returned from API");
        }
      } catch (error) {
        console.error("Error fetching trainer list:", error.message);
        setError(error.message);
      }
    };

    if (selectedDate) {
      setLoading(true);
      Promise.all([fetchCustomerList(), fetchTrainersList()])
        .finally(() => setLoading(false));
    }
  }, [selectedDate]); // Depend on selectedDate to re-fetch data when it changes

  const handleDateChange = (e) => {
    console.log("Selected Date:", e.target.value); // Log selected date change
    setSelectedDate(e.target.value);
  };

  const markAttendance = (id, status, type) => {
    const updateAttendance = (data) =>
      data.map((entry) =>
        entry.id === id ? { ...entry, status: status } : entry
      );

    if (type === "trainer") {
      setTrainerAttendance((prevData) => updateAttendance(prevData));
    } else {
      setCustomerAttendance((prevData) => updateAttendance(prevData));
    }
  };

  const handleTrainerSubmit = () => {
    console.log("Trainer attendance submitted for date:", selectedDate);
    console.log("Trainer attendance data:", trainerAttendance);
    // Submit trainers' attendance to the backend here
  };

  const handleCustomerSubmit = () => {
    console.log("Customer attendance submitted for date:", selectedDate);
    console.log("Customer attendance data:", customerAttendance);
    // Submit customers' attendance to the backend here
  };

  const renderTable = (data, type) => (
    <table className={styles.attendanceTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Present</th>
          <th>Absent</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {data.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>
              <button
                className={styles.presentButton}
                onClick={() => markAttendance(person.id, "Present", type)}
                disabled={person.status === "Present"}
              >
                Present
              </button>
            </td>
            <td>
              <button
                className={styles.absentButton}
                onClick={() => markAttendance(person.id, "Absent", type)}
                disabled={person.status === "Absent"}
              >
                Absent
              </button>
            </td>
            <td>
              <Link href={`/dashboard-admin/attendance/singleAttendance`}>
                <button className={styles.viewButton}>View</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Attendance</h1>

      <div className={styles.dateContainer}>
        <label htmlFor="attendanceDate">Date: </label>
        <input
          type="date"
          id="attendanceDate"
          value={selectedDate}
          onChange={handleDateChange}
          className={styles.dateInput}
        />
      </div>

      {/* Trainers Attendance Table */}
      <h2 className={styles.sectionTitle}>Trainers</h2>
      {trainerAttendance.length > 0 ? (
        <>
          {renderTable(trainerAttendance, "trainer")}
          <button
            className={styles.submitButton}
            onClick={handleTrainerSubmit}
          >
            Submit Trainer Attendance
          </button>
        </>
      ) : (
        <p>No trainers available.</p>
      )}

      {/* Customers Attendance Table */}
      <h2 className={styles.sectionTitle}>Customers</h2>
      {customerAttendance.length > 0 ? (
        <>
          {renderTable(customerAttendance, "customer")}
          <button
            className={styles.submitButton}
            onClick={handleCustomerSubmit}
          >
            Submit Customer Attendance
          </button>
        </>
      ) : (
        <p>No customers available.</p>
      )}
    </div>
  );
};

export default AttendanceAdPage;
