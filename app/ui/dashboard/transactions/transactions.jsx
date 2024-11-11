'use client'
import Image from 'next/image';
import styles from './transactions.module.css';

const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image 
                  src="/images/noavtar.png" 
                  alt="User"
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Nisha Saw
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pending
              </span>
            </td>
            <td>14.10.2024</td>
            <td>$3,200</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image 
                  src="/images/noavtar.png"
                  alt="User"
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Nisha Saw
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>
                Done
              </span>
            </td>
            <td>14.10.2024</td>
            <td>$3,200</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image 
                  src="/images/noavtar.png"
                  alt="User"
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Nisha Saw
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>
                Cancelled
              </span>
            </td>
            <td>14.10.2024</td>
            <td>$3,200</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image 
                  src="/images/noavtar.png"
                  alt="User"
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Nisha Saw
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pending
              </span>
            </td>
            <td>14.10.2024</td>
            <td>$3,200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
