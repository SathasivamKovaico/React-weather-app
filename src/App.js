import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Form is valid
      setIsSubmitted(true);
      setErrors({});
    } else {
      // Form has errors
      setErrors(newErrors);
      setIsSubmitted(false);
    }
  };

  const handleReset = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="App">
      <div style={styles.container}>
        <h1>Sign Up Form</h1>
        
        {/* Conditional rendering for success message */}
        {isSubmitted ? (
          <div style={styles.successContainer}>
            <h2 style={styles.successTitle}>✓ Registration Successful!</h2>
            <p style={styles.successMessage}>
              Welcome, <strong>{formData.username}</strong>!
            </p>
            <p style={styles.successMessage}>
              A confirmation email has been sent to <strong>{formData.email}</strong>
            </p>
            <button onClick={handleReset} style={styles.button}>
              Sign Up Another User
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                style={errors.username ? styles.inputError : styles.input}
              />
              {errors.username && (
                <span style={styles.error}>{errors.username}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={errors.email ? styles.inputError : styles.input}
              />
              {errors.email && (
                <span style={styles.error}>{errors.email}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={errors.password ? styles.inputError : styles.input}
              />
              {errors.password && (
                <span style={styles.error}>{errors.password}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={errors.confirmPassword ? styles.inputError : styles.input}
              />
              {errors.confirmPassword && (
                <span style={styles.error}>{errors.confirmPassword}</span>
              )}
            </div>

            <button type="submit" style={styles.button}>
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  label: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#333'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
    transition: 'border-color 0.3s'
  },
  inputError: {
    padding: '10px',
    fontSize: '16px',
    border: '2px solid #ff4444',
    borderRadius: '5px',
    outline: 'none'
  },
  error: {
    color: '#ff4444',
    fontSize: '12px',
    marginTop: '2px'
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s'
  },
  successContainer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#e8f5e9',
    borderRadius: '10px'
  },
  successTitle: {
    color: '#4CAF50',
    marginBottom: '15px'
  },
  successMessage: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px'
  }
};

export default App;
