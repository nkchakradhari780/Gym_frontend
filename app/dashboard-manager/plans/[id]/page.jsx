'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/ui/dashboard/plans/singlePlan/singlePlan.module.css';

const SinglePlanPage = () => {
    const [formData, setFormData] = useState({
        planName: '',
        level: '',
        price: '',
        category: '',
        duration: '',
        facilities: [],
        createdAt: new Date().toISOString().split('T')[0],
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFacilitiesChange = (event) => {
        const { value, checked } = event.target;
        setFormData((prevData) => {
            const facilities = checked
                ? [...prevData.facilities, value]
                : prevData.facilities.filter((facility) => facility !== value);
            return { ...prevData, facilities };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission logic (e.g., API call)
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className={styles.heading}>Create New Plan</h2>
                <Link href="/dashboard/plans">
                    <button className={styles.backButton}>Back</button>
                </Link>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Plan Name <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                        type="text"
                        name="planName"
                        className={styles.inputField}
                        value={formData.planName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Level <span className={styles.requiredStar}>*</span>
                    </label>
                    <select
                        name="level"
                        className={styles.selectField}
                        value={formData.level}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select Level
                        </option>
                        <option value="beginner">Beginner</option>
                        <option value="medium">Medium</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Price (₹) <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        className={styles.inputField}
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="100"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Category <span className={styles.requiredStar}>*</span>
                    </label>
                    <select
                        name="category"
                        className={styles.selectField}
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        <option value="strength">Strength</option>
                        <option value="cardio">Cardio</option>
                        <option value="flexibility">Flexibility</option>
                        <option value="endurance">Endurance</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Duration (months) <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                        type="number"
                        name="duration"
                        className={styles.inputField}
                        value={formData.duration}
                        onChange={handleChange}
                        min="1"
                        step="1"
                        required
                    />
                </div>

                {/* Facilities checkboxes */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Facilities <span className={styles.requiredStar}>*</span>
                    </label>
                    <div className={styles.facilitiesContainer}>
                        {['gym', 'pool', 'changing room', 'personal trainer', 'group classes'].map((facility) => (
                            <div key={facility} className={styles.checkboxGroup}>
                                <input
                                    type="checkbox"
                                    id={facility}
                                    name="facilities"
                                    value={facility}
                                    checked={formData.facilities.includes(facility)}
                                    onChange={handleFacilitiesChange}
                                    className={styles.checkbox}
                                />
                                <label htmlFor={facility} className={styles.checkboxLabel}>
                                    {facility.charAt(0).toUpperCase() + facility.slice(1).replace(/_/g, ' ')}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Date Created</label>
                    <input
                        type="date"
                        name="createdAt"
                        className={styles.inputField}
                        value={formData.createdAt}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="create" className={styles.submitButton}>
                    Update
                </button>
            </form>
        </div>
    );
};

export default SinglePlanPage;
