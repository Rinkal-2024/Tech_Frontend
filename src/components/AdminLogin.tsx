import React, { useState } from "react";
import axios from "axios";

export const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const apiUrl =  import.meta.env.VITE_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`${apiUrl}/login`, formData);
      alert("Admin login successful");
    } catch (err: any) {
      const message = err.response?.data?.message;
      setError(
        message === "ROLE_NOT_ALLOWED"
          ? "You are not allowed to login from here"
          : message || "Login failed",
      );
    }
  };

  return (
    <div className="form-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
