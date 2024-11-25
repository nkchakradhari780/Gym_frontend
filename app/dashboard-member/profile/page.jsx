'use client';

import Image from 'next/image';
import styles from '@/app/ui/dashboard/member-profile/member-profile.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const MemberProfile = () => {
  const {id} = useParams();

  const [memberDetails, setMemberDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/customer/profile',{
          withCredentials: true,
        }); // Update with the correct route
        if(response.data) {
          console.log('Response Data:', response.data.customer);
          setMemberDetails(response.data.customer)
        } else {
          console.error('No data returned from API')
          setError('No data returned from API')
        }
      } catch (error) {
        console.error('Error fetching member details:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchMemberDetails();
  }, []);

  if(loading) {
    return <p>Loading...</p>
  }

  if(error) {
    return <p>Error: {error}</p>
  }

  return (
    <div className={styles.container}>
      <h1>Your Profile:</h1>
      <div className={styles.profile_card}>
        <Image 
          src={memberDetails.imageUrl || '/images/noavtar.png'} 
          alt="Profile Picture"
          className={styles.profile_image} 
          width={150} 
          height={150} 
          objectFit="cover" 
        />
        <div className={styles.field}>
          <h2>Username:</h2>
          <p>{memberDetails.fullName}</p>
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
          <h2>Age:</h2>
          <p>{memberDetails.age}</p>
        </div>
        <div className={styles.field}>
          <h2>Gender:</h2>
          <p>{memberDetails.gender}</p>
        </div>
        <div className={styles.field}>
          <h2>Weight:</h2>
          <p>{memberDetails.weight}</p>
        </div>
        
      </div>
    </div>
  );
};

export default MemberProfile;
