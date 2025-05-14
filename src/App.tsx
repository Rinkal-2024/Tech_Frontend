import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CustomerRegistration } from "./components/CustomerRegistration";
import { AdminRegistration } from "./components/AdminRegistration";
import { AdminLogin } from "./components/AdminLogin";
import { VerifyEmail } from "./components/VerifyEmail";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* <h1>Welcome to the Registration and Login System</h1> */}
        <Routes>
          <Route path="/register/customer" element={<CustomerRegistration />} />
          <Route path="/register/admin" element={<AdminRegistration />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route
            path="/"
            element={
              <div>
                <h2>Please choose an action</h2>
                <ul>
                  <li>
                    <a href="/register/customer">Customer Registration</a>
                  </li>
                  <li>
                    <a href="/register/admin">Admin Registration</a>
                  </li>
                  <li>
                    <a href="/login/admin">Admin Login</a>
                  </li>
                </ul>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
