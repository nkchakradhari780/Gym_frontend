"use client";  // This line marks the component as a client-side component

import { useState } from 'react';
import styles from "./sidebar.module.css";
import Image from 'next/image';
import { MdMenu, MdClose, MdDashboard, MdSupervisedUserCircle, MdPersonOutline, MdFitnessCenter, MdEventNote, MdWork, MdLogout, MdAnalytics } from "react-icons/md";  // Import MdAnalytics

import MenuLink from './menuLink/menuLink'; // Import the MenuLink component

const menuItems = [
    {
        list: [
            { title: "Dashboard", path: "/dashboard-trainer", icon: <MdDashboard /> },
            { title: "Profile", path: "/dashboard-trainer/profile", icon: <MdPersonOutline /> },
            { title: "Your Member", path: "/dashboard-trainer/my-member", icon: <MdSupervisedUserCircle /> },
            { title: "Equipments", path: "/dashboard-trainer/equipments", icon: <MdFitnessCenter /> },
        ],
    },
    {
        list: [
            { title: "Attendance", path: "/dashboard-trainer/attendance", icon: <MdEventNote /> },
            { title: "My Attendance", path: "/dashboard-trainer/my-attendance", icon: <MdWork /> },
            { title: "Plans", path: "/dashboard-trainer/plans", icon: <MdAnalytics /> },  // Use MdAnalytics here
        ],
    },
];

const SidebarTrainer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className={styles.menuBtn} onClick={toggleSidebar}>
                {isOpen ? <MdClose /> : <MdMenu />}
            </button>

            <div className={`${styles.container} ${isOpen ? styles.open : styles.closed}`}>
                <div className={styles.user}>
                    <Image className={styles.userImage} src="/images/noavtar.png" alt="" width="50" height="50" />
                    <div className={styles.userDetail}>
                        <span className={styles.username}>Nisha Saw</span>
                        <span className={styles.userTitle}>Trainer</span>
                    </div>
                </div>

                <ul className={styles.list}>
                    {menuItems.map((cat, index) => (
                        <li key={index}>
                            {cat.list.map((item) => (
                                <MenuLink item={item} key={item.title} />
                            ))}
                        </li>
                    ))}
                </ul>
                <button className={styles.logoutbtn}>
                    <MdLogout />
                    Logout
                </button>
            </div>
        </>
    );
};

export default SidebarTrainer;
