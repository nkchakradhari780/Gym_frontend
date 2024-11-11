'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/ui/dashboard/users/users.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TrainerPage = () => {
    // State to manage users' status
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trainersList, setTrainersList] = useState([]);

    // Function to toggle user status
    const toggleStatus = (id) => {
        setTrainersList((prevTrainers) =>
            prevTrainers.map((trainer) =>
                trainer._id === id ? { ...trainer, isActive: !trainer.isActive } : trainer
            )
        );
    };

    // Function to delete a trainer
    const deleteTrainer = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this trainer?');
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:3001/owner/trainer/${id}`, {
                withCredentials: true,
            });

            if (response.status === 200) {
                // Remove the deleted trainer from the state
                setTrainersList((prevTrainers) =>
                    prevTrainers.filter((trainer) => trainer._id !== id)
                );
                alert('Trainer deleted successfully');
            } else {
                alert('Failed to delete the trainer');
            }
        } catch (error) {
            console.error('Error deleting trainer', error.message);
            setError('Failed to delete trainer');
        }
    };

    useEffect(() => {
        const fetchTrainersList = async () => {
            try {
                const response = await axios.get('http://localhost:3001/owner/trainer', {
                    withCredentials: true,
                });

                if (response.data && response.data.trainers) {
                    console.log('Response Data:', response.data.trainers);
                    setTrainersList(response.data.trainers);
                } else {
                    console.log('No data returned from API');
                    setError('No data returned from API');
                }
            } catch (error) {
                console.error('Error fetching trainer list', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainersList();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a trainer..." />
                <Link href="/dashboard-admin/trainers/add-trainer">
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
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trainersList.length > 0 ? (
                        trainersList.map((trainer) => (
                            <tr key={trainer._id}>
                                <td>
                                    <div className={styles.user}>
                                        <Image
                                            src="/images/noavtar.png"
                                            alt=""
                                            width={40}
                                            height={40}
                                            className={styles.userImage}
                                        />
                                        {trainer.fullName} {/* This will now display the name */}
                                    </div>
                                </td>
                                <td>{trainer.email}</td>
                                <td>{trainer.age}</td>
                                <td>{trainer.gender}</td>
                                <td>{trainer.contact}</td>
                                <td>{trainer.address}</td>
                                <td>
                                    <button
                                        className={`${styles.button} ${trainer.status ? styles.active : styles.inactive}`}
                                        onClick={() => toggleStatus(trainer._id)}
                                    >
                                        {trainer.status }
                                    </button>
                                </td>
                                <td>
                                    <div className={styles.buttons}>
                                        <Link href={`/dashboard-admin/trainers/update/${trainer._id}`}>
                                            <button className={`${styles.button} ${styles.View}`}>View</button>
                                        </Link>
                                        <button
                                            className={`${styles.button} ${styles.Delete}`}
                                            onClick={() => deleteTrainer(trainer._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No Trainers found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination />
        </div>
    );
};

export default TrainerPage;