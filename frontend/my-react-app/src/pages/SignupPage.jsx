import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import AuthImagePattern from "../components/AuthImagePattern";
import './SinupPage.css'
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
const SignUpPage = () => {
const [showPassword , setShowPassword]=useState(false);
const signup = useAuthStore((state) => state.signup);
const isSigningUp = useAuthStore((state) => state.isSingningUp);
const[formData ,setFormData]=useState({
  fullName:"",
  email:"",
  password:"",
})
const validateformdata=()=>{
if(!formData.fullName.trim()) return toast.error("Full name is required");
if(!formData.email.trim()) return toast.error("email is required");
if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
if(!formData.password) return toast.error("password is required");
if(formData.password.length<6) return toast.error("password must be at least 6 characters");
return true;
}
const handleSubmit=(e)=>{
e.preventDefault();
const success=validateformdata();
if (success===true)return signup(formData);}
  return (
<>
{/* //creating a loginpage */}
<div className="container">
  {/* //contains two div section */}
  {/* first div section */}
<div className="first-div-section">
  <div className="logo-and-header-name">
    <MessageSquare />
    <h4 id="sepreate-styling">sammychat</h4>
  </div>
  <div className="heading-para-section">
      <h2>Create account</h2>
       <p>Create the account and join with us</p>
  </div>
<div className="formsection">
  <form onSubmit={handleSubmit}>
    <div className="whole-username-section">
         <label htmlFor="Username">Usernamae  </label>
           <div className="field-username-section">
                <User className="User-active-feild-design"/>
                <input type="text" 
                placeholder="your name field....." id="Username"
                value={formData.fullName}
                onChange={(e)=>setFormData({...formData,fullName:e.target.value})}/>
           </div>
      </div>
 
    <div className="whole-email-section">
             <label htmlFor="Emailsection">Email</label>
                 <div className="field-email-section">
                  <Mail className="mail-active-feild-design" />
                 <input 
                  type="email" 
                  placeholder="you@example.com"
                    value={formData.email}
                onChange={(e)=>setFormData({...formData,email:e.target.value})}
                  id="Emailsection"/>
                </div>
    </div>
    
<div className="whole-password-section">
              <label htmlFor="Password-section">Password</label>
        <div className="field-password-section">
          <input 
          type={showPassword ? "text" :"password"} 
          placeholder="....."
            value={formData.password}
                onChange={(e)=>setFormData({...formData,password:e.target.value})}
          id="password-section"
           />
           <button
          className="eye-active-field-design"
           type="button"
           onClick={()=>setShowPassword(!showPassword)}>
  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
           </button>
    </div>
</div>
   
  <div className="button-and-createsection">
<button
  type="submit"
  className="design-the-button-elements"
  disabled={isSigningUp}
>
  {isSigningUp ? (
    <>
      <Loader2 className="size-5 animate-spin" /> Loading...
    </>
  ) : (
    "Create Account"
  )}
</button>


  </div>
  </form>

  <div className="last-element-styling">
<p>Already have account?</p>
<a href="/login">Login</a>
  </div>
</div>
</div>
      <div className="signup-image">
        <AuthImagePattern
          title="Join Our Community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>
</div>
</>
  );
};
export default SignUpPage;

