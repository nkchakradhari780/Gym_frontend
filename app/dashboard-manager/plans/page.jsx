'use client'

import styles from '@/app/ui/dashboard/plans/plans.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Link from 'next/link';
import { useState } from 'react';

const PlanPage = () => {
    const [planData, setPlanData] = useState([
        {
            title: 'Free',
            level: 'Basic',
            price: '₹ 0/month',
            category: 'Personal',
            duration: '6 months',
            dateCreated: '15-01-2023',
            facilities: [
                'Use your own browser',
                'Use your own OpenAI key',
                'Data export',
                'Basic support',
                'Scheduled jobs',
                'Smart downloader and cost-optimized AI',
                'Dedicated server'
            ],
            isDisabled: [4, 5, 6] // Indexes for disabled features
        },
        {
            title: 'Cloud',
            level: 'Intermediate',
            price: '₹ 2000/month',
            category: 'Hobbyist',
            duration: '1 year',
            dateCreated: '26-02-2023',
            facilities: [
                'Use our servers',
                'Use our specialized AI',
                'Data export',
                'Full support',
                'Scheduled jobs',
                'Smart downloader and cost-optimized AI',
                'Dedicated server'
            ],
            isDisabled: [5, 6]
        },
        {
            title: 'Enterprise',
            level: 'Advanced',
            price: '₹ 5000/month',
            category: 'Professional',
            duration: '1 year',
            dateCreated: '03-05-2024',
            facilities: [
                'Your own server',
                'Use our specialized AI',
                'Data export',
                'Premium support',
                'Scheduled jobs',
                'Smart downloader and cost-optimized AI',
                'Dedicated server'
            ],
            isDisabled: []
        }
    ]);

    const handleUpdate = (index) => {
        // Handle update logic here
        console.log(`Update plan at index: ${index}`);
    };

    const handleDelete = (index) => {
        // Create a new array without the deleted plan
        const updatedPlans = planData.filter((_, i) => i !== index);
        setPlanData(updatedPlans); // Update the state with the new array
        console.log(`Deleted plan at index: ${index}`);
    };

    return (
        <div className={styles.plansContainer}>
            <div className={styles.top}>
                <Search placeholder="Search for plans..." />
                <Link href="/dashboard/plans/add-plan">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <h2 className={styles.title}>Pricing Plans</h2>
            <div className={styles.cards}>
                {planData.map((plan, index) => (
                    <div key={index} className={styles.card}>
                        <h3 className={styles.planTitle}>{plan.title}</h3>
                        <p className={styles.level}>{plan.level}</p>
                        <p className={styles.price}>{plan.price}</p>
                        <p className={styles.category}>Category: {plan.category}</p>
                        <p className={styles.duration}>Duration: {plan.duration}</p> 
                        <p className={styles.dateCreated}>Date Created: {plan.dateCreated}</p>
                        <ul className={styles.facilities}>
                            {plan.facilities.map((facility, i) => (
                                <li key={i} className={plan.isDisabled.includes(i) ? styles.disabled : styles.enabled}>
                                    {facility}
                                </li>
                            ))}
                        </ul>
                        <div className={styles.buttonContainer}>
                            <Link href={`/dashboard-manager/plans/${plan.id}`}>
                                <button className={styles.updateButton}>
                                    Update
                                </button>
                            </Link>
                            <button 
                                className={styles.deleteButton} 
                                onClick={() => handleDelete(index)}>
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
