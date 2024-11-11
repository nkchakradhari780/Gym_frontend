import Image from 'next/image';
import styles from '@/app/ui/dashboard/trainer-profile/trainer-profile.module.css';

const TrainerProfile = () => {
  const trainerDetails = {
    username: 'nisha_saw',
    email: 'nisha@example.com',
    password: '********',
    contact: '1234567890',
    address: '123 Main St, Bhilai, India',
    dob: '20/08/2000',
    gender: 'Female',
    speciality:'',
    salary: '₹ 50000',
    joinDate: '01-01-2023',
    resignDate: 'N/A',
    imageUrl: '/images/noavtar.png',
  };

  return (
    <div className={styles.container}>
      <h1>Your Profile:</h1>
      <div className={styles.profile_card}>
        <Image 
          src={trainerDetails.imageUrl} 
          alt=''
          className={styles.profile_image} 
          width={150} // Set the width you need
          height={150} // Set the height you need
          objectFit="cover" // To maintain aspect ratio
        />
        <div className={styles.field}>
          <h2>Username:</h2>
          <p>{trainerDetails.username}</p>
        </div>
        <div className={styles.field}>
          <h2>Email:</h2>
          <p>{trainerDetails.email}</p>
        </div>
        <div className={styles.field}>
          <h2>Contact:</h2>
          <p>{trainerDetails.contact}</p>
        </div>
        <div className={styles.field}>
          <h2>Address:</h2>
          <p>{trainerDetails.address}</p>
        </div>
        <div className={styles.field}>
          <h2>Date of Birth:</h2>
          <p>{trainerDetails.dob}</p>
        </div>
        <div className={styles.field}>
          <h2>Gender:</h2>
          <p>{trainerDetails.gender}</p>
        </div>
        <div className={styles.field}>
          <h2>Speciality:</h2>
          <p>{trainerDetails.speciality}</p>
        </div>
        <div className={styles.field}>
          <h2>Salary:</h2>
          <p>{trainerDetails.salary}</p>
        </div>
        <div className={styles.field}>
          <h2>Join Date:</h2>
          <p>{trainerDetails.joinDate}</p>
        </div>
        <div className={styles.field}>
          <h2>Resign Date:</h2>
          <p>{trainerDetails.resignDate}</p>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
