"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";

const SingleUserPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState("/images/noavtar.png");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    weight: "",
    age: "",
    startDate: "",
    gender: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  useEffect(() => {
    if (!id) return;
    console.log(id)
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/owner/customer/${id}`,
          { withCredentials: true }
        );

        console.log("name of customer", response.data);

        if (response.data) {
          setFormData({
            fullName: response.data.fullName || "",
            email: response.data.email || "",
            password: "",
            contact: response.data.contact || "",
            address: response.data.address || "",
            weight: response.data.weight || "",
            age: response.data.age || "",
            startDate: response.data.startDate || "",
            gender: response.data.gender || "",
          });
        }
      } catch (error) {
        setError("error loading User data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("updating");
      const response = await axios.put(
        `http://localhost:3001/owner/customer/update`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // Redirect to another page or give feedback
        console.log("updated successfully");
        router.push('/dashboard-admin/users')
      }
    } catch (error) {
      console.error("Error updating customer: ", error);
      setError("Failed to update customer");
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
            <label>
              Username <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <label>
              Email <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>
              Password 
            </label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
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
            <label>
              Contact <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="text"
              name="contact"
              pattern="\d{10}"
              placeholder="10-digit contact number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            <label>
              Address <span className={styles.requiredStar}>*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <label>
              Gender <span className={styles.requiredStar}>*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Choose Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label>
              Weight (kg) 
            </label>
            <input
              type="number"
              name="weight"
              min="0"
              step="0.1"
              value={formData.weight}
              onChange={handleChange}
            />
            <label>
              Plan
            </label>
            <select name="catg" id="catg" >
              <option value="" disabled selected>
                Choose Plan
              </option>
              <option value="plan1">Plan 1</option>
              <option value="paln2">Plan 2</option>
              <option value="plan3">Plan 3</option>
            </select>

            <label>Is Active?</label>
            <select
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>

              <button type="submit" className={styles.updateButton}>
                Update
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
