'use client';

import styles from '@/app/ui/dashboard/plans/plans.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PlanPage = () => {
    const [planList, setPlanList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlansList = async () => {
            try {
                const response = await axios.get('http://localhost:3001/owner/plans', {
                    withCredentials: true,
                });
                if (response.data && response.data.plans) {
                    console.log('Response Data Plans:', response.data.plans);
                    setPlanList(response.data.plans);
                } else {
                    console.log("Error Fetching Plans List", error.message);
                    setError("Error Fetching Plans List");
                }
            } catch (error) {
                console.error("Error fetching plans:", error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlansList();
    }, []);

    const handleDelete = async (index, planId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this plan?");
        if (!isConfirmed) {
            return;
        }

        try {
            await axios.delete(`http://localhost:3001/owner/plans/${planId}`, {
                withCredentials: true,
            });
            const updatedPlans = planList.filter((_, i) => i !== index);
            setPlanList(updatedPlans);
            alert("Plan deleted successfully");
        } catch (error) {
            console.error(`Error deleting plan with ID ${planId}:`, error.message);
            setError(`Error deleting plan: ${error.message}`);
            alert("Failed to delete plan. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className={styles.plansContainer}>
            <div className={styles.top}>
                <Search placeholder="Search for plans..." />
                <Link href="/dashboard-admin/plans/add-plan">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <h2 className={styles.title}>Pricing Plans</h2>
            <div className={styles.cards}>
                {planList.map((plan, index) => (
                    <div key={index} className={styles.card}>
                        <h3 className={styles.planTitle}>{plan.planName}</h3>
                        <h4 className='' >{plan.planID}</h4>
                        <p className={styles.level}>{plan.level}</p>
                        <p className={styles.price}>{plan.price}</p>
                        <p className={styles.category}>Category: {plan.category}</p>
                        <p className={styles.duration}>Duration: {plan.duration}</p> 
                        <p className={styles.dateCreated}>Date Created: {plan.dateCreated}</p>
                        <ul className={styles.facilities}>
                            {plan.facilities.map((facility, i) => (
                                <li
                                    key={i}
                                    className={
                                        plan.isDisabled && plan.isDisabled.includes(i)
                                            ? styles.disabled
                                            : styles.enabled
                                    }
                                >
                                    {facility}
                                </li>
                            ))}
                        </ul>
                        <div className={styles.buttonContainer}>
                            <Link href={`/dashboard-admin/plans/update/${plan._id}`}>
                                <button className={styles.updateButton}>
                                    Update
                                </button>
                            </Link>
                            <button 
                                className={styles.deleteButton} 
                                onClick={() => handleDelete(index, plan._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlanPage;
