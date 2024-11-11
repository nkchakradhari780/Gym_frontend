"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/ui/dashboard/users/users.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import axios from 'axios'

const UsersPage = () => {
    const [usersList, setUsersList] = useState([]);
    const [isActive, setIsActive] = useState(true); // Default to active
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

     // Function to toggle user status (for each individual user)
     const toggleStatus = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        const fetchUsersList = async () => {
            try {
                const response = await axios.get('http://localhost:3001/manager/customer',{
                    withCredentials: true,
                });
                if(response.data && response.data.customers){
                    console.log('Response Data:', response.data.customers)
                    setUsersList(response.data.customers)
                } else {
                    console.log('No data returned from API')
                    setError('No Data returned from API')
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsersList();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if(error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a user..." />
                <Link href="/dashboard/users/add-user">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Plan</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.length > 0 ? (
                         usersList.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <div className={styles.user}>
                                    <Image
                                        src="/images/noavtar.png"
                                        alt=""
                                        width={40}
                                        height={40}
                                        className={styles.userImage}
                                    />
                                    {user.fullName}
                                </div>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{user.gender}</td>
                            <td>{user.plan}</td>
                            <td>
                                <button 
                                    className={`${styles.button} ${user.isActive ? styles.active : styles.inactive}`}
                                    onClick={() => toggleUserStatus(user.id)}
                                >
                                    {user.isActive ? 'Active' : 'Inactive'}
                                </button>
                            </td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/dashboard/users/update/${user.id}`}>
                                        <button className={`${styles.button} ${styles.View}`}>View</button>
                                    </Link>
                                    <button className={`${styles.button} ${styles.Delete}`} onClick={() => deleteUser(user.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))
                ): (
                    <tr>
                        <td colSpan="6">No Users found</td>
                    </tr>
                )}
                </tbody>
            </table>
            <Pagination />
        </div>
    );

    function toggleUserStatus(userId) {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, isActive: !user.isActive } : user
            )
        );
    }

    function deleteUser(userId) {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        // You can add a backend API call to delete the user here.
    }
}

export default UsersPage;
