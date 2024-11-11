'use client';
import { useState, useEffect } from 'react';
import styles from '@/app/ui/dashboard/my-plan/my-plan.module.css';

const PlanListPage = () => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [purchasedPlans, setPurchasedPlans] = useState([]);
  const [expiredPlans, setExpiredPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans'); // Replace with your API endpoint
        const data = await response.json();

        const current = data.filter(plan => plan.status === 'current');
        const purchased = data.filter(plan => plan.status === 'purchased');
        const expired = data.filter(plan => plan.status === 'expired');

        setCurrentPlan(current[0]);
        setPurchasedPlans(purchased);
        setExpiredPlans(expired);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className={styles.plansContainer}>
      {/* Current Plan */}
      <h3 className={styles.planTitle}>Current Plan</h3>
      <div className={styles.card}>
        {currentPlan ? (
          <div className={styles.planDetails}>
            <p><strong>Name:</strong> {currentPlan.name}</p>
            <p><strong>Start Date:</strong> {currentPlan.startDate}</p>
            <p><strong>End Date:</strong> {currentPlan.endDate}</p>
            <p><strong>Facilities:</strong> {currentPlan.facilities.join(', ')}</p>
          </div>
        ) : (
          <p>No current plan available.</p>
        )}
      </div>

      {/* All Purchased Plans */}
      <h3 className={styles.planTitle}>All Purchased Plans</h3>
      <div className={styles.card}>
        {purchasedPlans.length > 0 ? (
          purchasedPlans.map((plan, index) => (
            <div key={index} className={styles.planDetails}>
              <p><strong>Name:</strong> {plan.name}</p>
              <p><strong>Purchase Date:</strong> {plan.purchaseDate}</p>
              <p><strong>Facilities:</strong> {plan.facilities.join(', ')}</p>
            </div>
          ))
        ) : (
          <p>No purchased plans available.</p>
        )}
      </div>

      {/* Expired Plans */}
      <h3 className={styles.planTitle}>Expired Plans</h3>
      <div className={styles.card}>
        {expiredPlans.length > 0 ? (
          expiredPlans.map((plan, index) => (
            <div key={index} className={styles.planDetails}>
              <p><strong>Name:</strong> {plan.name}</p>
              <p><strong>Expiry Date:</strong> {plan.expiryDate}</p>
              <p><strong>Facilities:</strong> {plan.facilities.join(', ')}</p>
            </div>
          ))
        ) : (
          <p>No expired plans.</p>
        )}
      </div>
    </div>
  );
};

export default PlanListPage;
