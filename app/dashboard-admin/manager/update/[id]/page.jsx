"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/ui/dashboard/managers/addManager/addManager.module.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';

const SingleManagerPage = () => {
  const [selectedImage, setSelectedImage] = useState('/images/noavtar.png');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    dob: '',
    gender: '',
    salary: '',
    joinDate: '',
    resignDate: '',
    managerID: '',
    isActive: true,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic (e.g., API call)
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={selectedImage}
            alt="User Avatar"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.uploadInput}
          id="file-upload"
        />
        <label htmlFor="file-upload" className={styles.customFileUpload}>
          Choose File
        </label>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>Username <span className={styles.requiredStar}>*</span></label>
            <input
              type='text'
              name='username'
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label>Email <span className={styles.requiredStar}>*</span></label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Password <span className={styles.requiredStar}>*</span></label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
                pattern="(?=.*[a-zA-Z])(?=.*[0-9]).{8,}"
                title="Password must be at least 8 characters long and contain at least one letter and one number."
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
            <label>Contact <span className={styles.requiredStar}>*</span></label>
            <input
              type='text'
              name='contact'
              pattern="\d{10}"
              placeholder="10-digit contact number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            <label>Address <span className={styles.requiredStar}>*</span></label>
            <input
              type='text'
              name='address'
              value={formData.address}
              onChange={handleChange}
              required
            />
            <label>Date of Birth <span className={styles.requiredStar}>*</span></label>
            <input
              type='date'
              name='dob'
              value={formData.dob}
              onChange={handleChange}
              required
            />
             <label>Salary(₹) <span className={styles.requiredStar}>*</span></label>
            <input
              type="number"
              name="salary"
              min="0"
              step="500"
              value={formData.salary}
              onChange={handleChange}
              required
            />
            <div className={styles.dateTotalContainer}>
              <div>
                <label htmlFor="joinDate">Joining Date:</label>
                <input
                  type="date"
                  id="joinDate"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="resignDate">Resigning Date:</label>
                <input
                  type="date"
                  id="resignDate"
                  name="resignDate"
                  value={formData.resignDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <label>ManagerID <span className={styles.requiredStar}>*</span></label>
            <input
              type="number"
              name="managerID"
              value={formData.managerID}
              onChange={handleChange}
              required
            />
            <label>Is Active?</label>
            <select
              name='isActive'
              value={formData.isActive}
              onChange={handleChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>

            <Link href="/dashboard-admin/manager">
              <button type="button" className={styles.updateButton}>Submit</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleManagerPage;
