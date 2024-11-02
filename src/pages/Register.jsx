 import React, { useState } from 'react';
 import { Link, useNavigate } from "react-router-dom";
import accountApi from '../api/modules/account.api';
const CreateAccountForm = () => {
  const [formData, setFormData] = useState({
    displayname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State to handle hover effect
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Handle form submission logic
    const data = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      displayname: formData.name,
    };
      accountApi.signUp(data).then((res) => {
      console.log(res);
      if (res === 'User created') {
        console.log('Account created successfully');
        navigate('/login');
      } else {
        console.log('An error occurred. Please try again.');
      }
    });
    if (data.username === "nguyetbinh") {
      setMessage("Username is required");
      setShowMessage(true);
    }
  };

  return (
    <div style={styles.container}>
  <form onSubmit={handleSubmit} style={styles.form}>
    <h2 style={styles.heading}>Create Account</h2>

    <div style={styles.formGroup}>
      <label htmlFor="username" style={styles.label}>Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        style={styles.input}
        required
      />
      {showMessage && <p style={styles.message}>{message}</p>}
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="displayname" style={styles.label}>Display Name</label>
      <input
        type="text"
        id="displayname"
        name="displayname"
        value={formData.displayname}
        onChange={handleChange}
        style={styles.input}
        required
      />
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="email" style={styles.label}>Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        style={styles.input}
        required
      />
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="password" style={styles.label}>Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        style={styles.input}
        required
      />
    </div>

    <div style={styles.formGroup}>
      <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        style={styles.input}
        required
      />
    </div>

    <button
      type="submit"
      style={isHovered ? styles.buttonHover : styles.button}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Create Account
    </button>

    <p style={styles.signInText}>
      Already have an account? <a href="/login" style={styles.link}>Sign in here</a>
    </p>
  </form>
</div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  },
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '450px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '2rem',
    fontSize: '2rem',
    fontWeight: '600',
    color: '#333',
  },
  formGroup: {
    marginBottom: '2rem', 
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: '-10px',
    left: '40px',
    background: '#fff',
    padding: '0 5px',
    fontSize: '14px',
    color: '#666',
  },
  input: {
    width: '95%',
    padding: '0.75rem',
    borderRadius: '8px', 
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',

  },
  inputFocus: {
    borderColor: '#007BFF',
  },
  button: {
    backgroundColor: '#e33d3d',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1rem',
    width: '95%',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'background-color 0.3s ease', 
  },
  buttonHover: {
    backgroundColor: '#ff0000',  
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1rem',
    width: '95%',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  signInText: {
    marginTop: '1.5rem',
    fontSize: '0.875rem',
    color: '#555',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
    transition: 'color 0.3s ease', 
  },
  linkHover: {
    textDecoration: 'underline',
    color: '#0056b3',
  },
  message: {
    fontSize: '13px',
    color: 'red',
    position: 'absolute',
    left: '40px',
    top: '75%',
  }
};

export default CreateAccountForm;
