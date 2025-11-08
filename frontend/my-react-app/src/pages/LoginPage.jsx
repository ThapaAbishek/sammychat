import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Mail, MessageSquare } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import './SinupPage.css';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIng } = useAuthStore();
  const navigate = useNavigate();

  const validateformdata = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("password is required");
   
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  const success=await login(formData);
  if(success===true){
    navigate("/home");
  }
      // After login, redirect to home
    };


  return (
    <div className="first-div-section">
      <div className="logo-and-header-name">
        <MessageSquare />
        <h4 id="sepreate-styling">sammychat</h4>
      </div>
      <div className="heading-para-section">
        <h2>Welcome Again</h2>
        <p>Login and start chatting with your loved ones</p>
      </div>
      <div className="formsection">
        <form onSubmit={handleSubmit}>
          <div className="whole-email-section">
            <label htmlFor="Emailsection">Email</label>
            <div className="field-email-section">
              <Mail className="mail-active-feild-design" />
              <input
                type="email"
                placeholder="you@example.com"
                id="Emailsection"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="whole-password-section">
            <label htmlFor="Password-section">Password</label>
            <div className="field-password-section">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="....."
                id="Password-section"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                className="eye-active-field-design"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="button-and-createsection">
            <button
              type="submit"
              className="design-the-button-elements"
              disabled={isLoggingIng}
            >
              {isLoggingIng ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <div className="last-element-styling">
          <p>Do not have an account?</p>
          <a href="/signup">Signup</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
