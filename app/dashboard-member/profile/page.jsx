import Image from 'next/image';
import styles from '@/app/ui/dashboard/member-profile/member-profile.module.css';

const MemberProfile = () => {
  const memberDetails = {
    username: 'nisha_saw',
    email: 'nisha@example.com',
    password: '********',
    contact: '1234567890',
    address: '123 Main St, Bhilai, India',
    dob: '20/08/2000',
    gender: 'Female',
    weight:'50',
    plan: 'Modal Mode',
    purchaseDate: '01-01-2023',
    expireDate: '01-01-2024',
    imageUrl: '/images/noavtar.png',
  };

  return (
    <div className={styles.container}>
      <h1>Your Profile:</h1>
      <div className={styles.profile_card}>
        <Image 
          src={memberDetails.imageUrl} 
          alt=''
          className={styles.profile_image} 
          width={150} // Set the width you need
          height={150} // Set the height you need
          objectFit="cover" // To maintain aspect ratio
        />
        <div className={styles.field}>
          <h2>Username:</h2>
          <p>{memberDetails.username}</p>
        </div>
        <div className={styles.field}>
          <h2>Email:</h2>
          <p>{memberDetails.email}</p>
        </div>
        <div className={styles.field}>
          <h2>Contact:</h2>
          <p>{memberDetails.contact}</p>
        </div>
        <div className={styles.field}>
          <h2>Address:</h2>
          <p>{memberDetails.address}</p>
        </div>
        <div className={styles.field}>
          <h2>Date of Birth:</h2>
          <p>{memberDetails.dob}</p>
        </div>
        <div className={styles.field}>
          <h2>Gender:</h2>
          <p>{memberDetails.gender}</p>
        </div>
        <div className={styles.field}>
          <h2>Weight:</h2>
          <p>{memberDetails.weight}</p>
        </div>
        <div className={styles.field}>
          <h2>Plan:</h2>
          <p>{memberDetails.plan}</p>
        </div>
        <div className={styles.field}>
          <h2>Purchase Date:</h2>
          <p>{memberDetails.purchaseDate}</p>
        </div>
        <div className={styles.field}>
          <h2>Expire Date:</h2>
          <p>{memberDetails.expireDate}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
