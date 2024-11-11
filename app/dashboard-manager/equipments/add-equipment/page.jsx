"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/ui/dashboard/equipments/addEqui/addEqui.module.css';
import Link from 'next/link';

const AddEquiPage = () => {
  const [selectedImage, setSelectedImage] = useState('/images/noavtar.png');
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    cat: '',
    purchased: '',
    price: '',
    quantity: '',
    total: '',
    address: '',
    purchaseDate: '',
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
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={selectedImage}
            alt="Equipment Image"
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
            <label>Equipment Name <span className={styles.requiredStar}>*</span></label>
            <input
              type='text'
              name='name'
              placeholder="ex: Dumbbells"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label>Model<span className={styles.requiredStar}>*</span></label>
            <input
              type='text'
              name='model'
              value={formData.model}
              onChange={handleChange}
              required
            />
            <label>Category:<span className={styles.requiredStar}>*</span></label>
            <select name="cat" id="cat" required>
              <option value="" disabled selected>Choose a Category</option>
              <option value="fixed">Fixed </option>
              <option value="adjustable">Adjustable</option>
              <option value="functional">Functional</option>
              <option value="cardiovascular">Cardiovascular</option>
              <option value="freeweights">Free Weights</option>
            </select>
            <label>Purchased On<span className={styles.requiredStar}>*</span></label>
            <input
              type='date'
              name='purchased'
              value={formData.purchased}
              onChange={handleChange}
              required
            />
            <label>Price(₹) <span className={styles.requiredStar}>*</span></label>
            <input
              type='number'
              name='price'
              min="0"
              step="500"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <label>Quantity <span className={styles.requiredStar}>*</span></label>
            <input
              type='number'
              name='quantity'
              min="0"
              step="1"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            <label>Total(₹) <span className={styles.requiredStar}>*</span></label>
            <input
              type='number'
              name='total'
              min="0"
              step="500"
              value={formData.total}
              onChange={handleChange}
              required
            />
            <label>Address <span className={styles.requiredStar}>*</span></label>
            <input
              type='text'
              name='address'
              placeholder="address of purchase"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <div>
              <label htmlFor="purchaseDate" className={styles.label}>Purchase Date:</label>
              <input type="date" id="purchaseDate" name="purchaseDate" required />
            </div>
            <label>Is Available?</label>
            <select
              name='isAvailable'
              value={formData.isAvailable}
              onChange={handleChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            <Link href="/dashboard/equipments">
              <button type="button" className={styles.updateButton}>Update</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};


export default AddEquiPage;
