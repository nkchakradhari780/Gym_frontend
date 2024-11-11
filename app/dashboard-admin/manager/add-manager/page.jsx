"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/ui/dashboard/managers/addManager/addManager.module.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';

const AddManagerPage = () => {
  const [selectedImage, setSelectedImage] = useState('/images/noavtar.png');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    age: '',
    gender: '',
    salary: '',
    joinDate: '',
    status: 'Active',
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
              value={formData.fullName}
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
            <label>Age<span className={styles.requiredStar}>*</span></label>
            <input
              type='text'
              name='age'
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
              
            </div>
           
           <label>Status <span className={styles.requiredStar}>*</span></label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on_leave">On Leave</option>
            </select>

              <button type="button" className={styles.updateButton}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddManagerPage;
