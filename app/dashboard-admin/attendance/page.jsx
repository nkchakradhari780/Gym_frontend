"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/app/ui/dashboard/attendance/attendance.module.css";

const AttendanceAdPage = () => {
  const [trainerAttendance, setTrainerAttendance] = useState([]);
  const [customerAttendance, setCustomerAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);

    // Fetch trainers
    fetch("http://localhost:3001/trainers") // Replace with your trainers API endpoint
      .then((response) => response.json())
      .then((data) => {
        const trainersData = data.map((trainer) => ({
          id: trainer.id,
          name: trainer.name,
          status: null,
        }));
        setTrainerAttendance(trainersData);
      })
      .catch((error) => console.error("Error fetching trainers:", error));

    // Fetch customers
    fetch("http://localhost:3001/customers") // Replace with your customers API endpoint
      .then((response) => response.json())
      .then((data) => {
        const customersData = data.map((customer) => ({
          id: customer.id,
          name: customer.name,
          status: null,
        }));
        setCustomerAttendance(customersData);
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const handleDateChange = (e) => {
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

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Attendance submitted for date:", selectedDate);
    console.log("Trainer attendance data:", trainerAttendance);
    console.log("Customer attendance data:", customerAttendance);
    // Here you can add the code to submit the data to your backend
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
                disabled={submitted || person.status === "Present"}
              >
                Present
              </button>
            </td>
            <td>
              <button
                className={styles.absentButton}
                onClick={() => markAttendance(person.id, "Absent", type)}
                disabled={submitted || person.status === "Absent"}
              >
                Absent
              </button>
            </td>
            <td>
              <Link href={`/dashboard-admin/attendance/singleAttendance`}>
                <button className={styles.viewButton} disabled={submitted}>
                  View
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

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
          disabled={submitted}
        />
      </div>

      <h2 className={styles.sectionTitle}>Trainers</h2>
      {renderTable(trainerAttendance, "trainer")}

      <h2 className={styles.sectionTitle}>Customers</h2>
      {renderTable(customerAttendance, "customer")}

      <div>
        <button
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={submitted}
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default AttendanceAdPage;
