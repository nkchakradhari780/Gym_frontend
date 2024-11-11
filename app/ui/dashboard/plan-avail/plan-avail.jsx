import styles from '@/app/ui/dashboard/plan-avail/plan-avail.module.css';

const PlanAvailPage = () => {
    const planData = [
        {
            title: 'Free',
            level: 'Basic',
            price: '₹ 0/month',
            category: 'Personal',
            duration: '1 month',
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
    ];

    return (
        <div className={styles.plansContainer}>
            <h2 className={styles.title}>Pricing Plans</h2>
            <p className={styles.subtitle}>Current Plans Available at our Gym</p>
            <div className={styles.cards}>
                {planData.map((plan, index) => (
                    <div key={index} className={styles.card}>
                        <h3 className={styles.planTitle}>{plan.title}</h3>
                        <p className={styles.level}>{plan.level}</p>
                        <p className={styles.price}>{plan.price}</p>
                        <p className={styles.category}>Category: {plan.category}</p>
                        <p className={styles.duration}>{plan.duration}</p> 
                        <p className={styles.dateCreated}>Date Created: {plan.dateCreated}</p>
                        <ul className={styles.facilities}>
                            {plan.facilities.map((facility, i) => (
                                <li key={i} className={plan.isDisabled.includes(i) ? styles.disabled : styles.enabled}>
                                    {facility}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlanAvailPage;
