import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CustomerRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const apiUrl =  import.meta.env.VITE_API_URL;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/register/customer`,
        formData,
      );
      console.log(response);

      if (response.data.message) {
        alert("Registration successful! Please verify your email.");

        navigate("/verify-email", { state: { email: formData.email } });
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        alert(err.response.data.message);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Enter your first name"
            id="firstName"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Enter your last name"
            id="lastName"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            id="email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            id="password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit" className="submit-btn">
          Register as Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerRegistration;
