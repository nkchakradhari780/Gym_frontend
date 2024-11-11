'use client';
import Image from 'next/image';
import styles from '@/app/ui/dashboard/my-members/my-members.module.css';
import Pagination from '@/app/ui/dashboard/pagination/pagination';

const MyMembersPage = () => {
  const membersData = [
    {
      id: 1,
      name: 'Nisha Saw',
      plan: 'Gold',
      purchaseDate: '15-01-2024',
      age: 30,
      weight: 75,
      email: 'nisha@example.com',
      contact: '9876543210',
    },
    {
      id: 2,
      name: 'Nitin Chakradhari',
      plan: 'Silver',
      purchaseDate: '12-12-2023',
      age: 28,
      weight: 65,
      email: 'nitin@example.com',
      contact: '9876543211',
    },
    // Add more members here
  ];

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Plan</th>
            <th>Purchase Date</th>
            <th>Age</th>
            <th>Weight (kg)</th>
            <th>Email</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {membersData.map((member) => (
            <tr key={member.id}>
              <td>
                <div className={styles.member}>
                  <Image
                    src="/images/noavtar.png"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.memberImage}
                  />
                  {member.name}
                </div>
              </td>
              <td>{member.plan}</td>
              <td>{member.purchaseDate}</td>
              <td>{member.age}</td>
              <td>{member.weight}</td>
              <td>{member.email}</td>
              <td>{member.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default MyMembersPage;
