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
                path: "/dashboard-member",
                icon: <MdDashboard />,
            },
            {
                title: "Profile",
                path: "/dashboard-member/profile",
                icon: <MdPersonOutline />,
            },
            {
                title: "Your Plan",
                path: "/dashboard-member/my-plan",
                icon: <MdSupervisedUserCircle />,
            },
        ],
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Attendance",
                path: "/dashboard-member/attendance",
                icon: <MdWork />,  
            },
            {
                title: "Plans",
                path: "/dashboard-member/plans",
                icon: <MdAnalytics />, 
            },
        ],
    },
    // {
    //     title: "User",
    //     list: [
    //         {
    //             title: "Settings",
    //             path: "/dashboard-member/settings",
    //             icon: <MdOutlineSettings />,  
    //         },
    //         {
    //             title: "Help",
    //             path: "/dashboard-member/help",
    //             icon: <MdHelpCenter />,  
    //         },
    //     ],
    // },
];

const SidebarMember = () => {
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/images/noavtar.png" alt="" width="50" height="50" />
                <div className={styles.userDetail}>
                    <span className={styles.username}>Nisha Saw</span>
                    <span className={styles.userTitle}>Member</span>
                </div>
            </div>

            <ul className={styles.list}> {/* Corrected className */}
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

export default SidebarMember;