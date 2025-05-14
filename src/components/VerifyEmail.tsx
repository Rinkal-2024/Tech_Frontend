import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const VerifyEmail = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const apiUrl =  import.meta.env.VITE_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    setError(""); 
    setMessage("")
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/verify-email`, {
        email,
        code, 
      });
      setMessage("Email verified! You can now log in.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Verify Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Verification Code">Verification Code</label>
          <input
            placeholder="Verification Code"
            value={code}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Verify
        </button>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default VerifyEmail;
