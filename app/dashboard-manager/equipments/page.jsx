'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/ui/dashboard/equipments/equipments.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
// import {searchParams} from 'next/navigation'
// import { fetchUsers } from '@/app/lib/data';

const EquipmentPage = () => {
    // const q = searchParams?.q || "";
    // const page = searchParams?.page || 1;
    // const {count,equipments} = await fetchEquipment(q,page);
    
    const [isAvailable, setIsAvailable] = useState(true); // Default to available

    const toggleStatus = () => {
        setIsAvailable(!isAvailable);
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for equipment..." />
                <Link href="/dashboard/equipments/add-equipment">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Purchased On</th>
                        <th>Price(₹)</th>
                        <th>Quantity</th>
                        <th>Total(₹)</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {equipments.map((equipmnets) =>( */}
                    <tr >
                        <td>
                            <div className={styles.equipment}>
                    
                                <Image
                                    src="/images/noequipment.jpg"
                                    alt="Equipment Image"
                                    width={40}
                                    height={40}
                                    className={styles.equipmentImage}
                                    />
                               Dumbbells
                            </div>
                        </td>
                        <td>20/08/2018</td>
                        <td>2000</td>
                        <td>5</td>
                        <td>10000</td>
                        <td>
                            <button 
                                className={`${styles.button} ${isAvailable ? styles.active : styles.inactive}`}
                                onClick={toggleStatus}
                                >
                                {isAvailable ? 'Available' : 'Unavailable'}
                            </button>
                        </td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href="/dashboard-manager/equipments/Update">
                                    <button className={`${styles.button} ${styles.Update}`}>Update</button>
                                </Link>
                                <button className={`${styles.button} ${styles.Delete}`}>Delete</button>
                            </div>
                        </td>
                    </tr>
                    {/* ))} */}
                </tbody>
            </table>
            <Pagination />
        </div>
    );
}

export default EquipmentPage;
