'use client';

import { useEffect, useState } from "react";
import axios from 'axios'
import styles from "./sidebar.module.css";
import Image from 'next/image';


import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdOutlineSettings,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdHelpCenter,
    MdPersonOutline,
    MdLogout
} from "react-icons/md";
import MenuLink from './menuLink/menuLink'; // Import the MenuLink component


const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard-manager",
                icon: <MdDashboard />,
            },
            {
                title: "Profile",
                path: "/dashboard-manager/profile",
                icon: <MdPersonOutline />,
            },
            {
                title: "User",
                path: "/dashboard-manager/users",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Trainers",
                path: "/dashboard-manager/trainers",
                icon: <MdPeople />,
            },
            {
                title: "Equipments",
                path: "/dashboard-manager/equipments",
                icon: <MdShoppingBag />,
            },
        ],
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Attendance",
                path: "/dashboard-manager/attendance",
                icon: <MdWork />,  
            },
            {
                title: "Transactions",
                path: "/dashboard-manager/transactions",
                icon: <MdAttachMoney />,  
            },
            {
                title: "Plans",
                path: "/dashboard-manager/plans",
                icon: <MdAnalytics />, 
            },
        ],
    },
];

const SidebarManager = () => {

    const [managerDetails, setManagerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManagerDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/manager', {
          withCredentials: true,  // Send cookies with the request if needed
        });

        if (response.data) {
          console.log('Response Data Sidebar:', response.data); // Logs data from the backend
          setManagerDetails(response.data.manager);
        //   console.log('name:', response.data.manager.fullName)
        //   console.log('role:', response.data.manager.role)
        } else {
          console.error('No data returned from API');
          setError('No data returned from API');
        }
      } catch (error) {
        console.error('Error fetching manager details:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchManagerDetails();
  }, []);

  // Monitor managerDetails state change
  useEffect(() => {
    if (managerDetails) {
      // console.log('Manager Details:', managerDetails); // This will run when managerDetails updates
    }
  }, [managerDetails]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!managerDetails) {
    return <p>No manager details found.</p>;
  }

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/noavtar.png" alt="" width="50" height="50" />
                <div className={styles.userDetail}>
                    <span className={styles.username}>{managerDetails.fullName}</span>
                    <span className={styles.userTitle}>{managerDetails.role}</span>
                </div>
            </div>

            <ul className={styles.list}> 
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <span className={styles.cat}>{cat.title}</span>
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
    );
};

export default SidebarManager;