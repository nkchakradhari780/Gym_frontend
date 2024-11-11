"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import icons
import styles from "@/app/ui/login/login.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      console.log('Attempting login with:', { email, password, role });
      
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
        role,
      }, {
        withCredentials: true,
      });
  
      console.log('Login successful:', response.data);
      router.push(`/dashboard-${role}`);
  
    } catch (err) {
      setError('Invalid login credentials');
      console.error('Login failed:', err.response ? err.response.data : err.message);
    } 
  };
  

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h1>Login</h1>

        {/* Role Selection Dropdown */}
        <select
          name="role"
          id="role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={styles.select} 
        >
          <option value="" disabled>
            Choose Role
          </option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="trainer">Trainer</option>
          <option value="member">Member</option>
        </select>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />

        {/* Password Input */}
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        {/* Login Button */}
        <div className={styles.buttonWrapper}>
          <button type="submit">Login</button>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

      </form>
    </div>
  );
};

export default LoginPage;
