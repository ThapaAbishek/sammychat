import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, Settings, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
const { logout, authUser } = useAuthStore();
const navigate = useNavigate();

const handleLogout = () => {
logout(); // clear auth state
navigate("/login"); // redirect to login page
};

return ( <header className="navbar-costume"> <div className="navbar-container">
{/* Left side: logo & title */}
<div className="navbar-left" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
<Link to="/home" className="navbar-logo-link" style={{ display: "flex", alignItems: "center", gap: "4px", textDecoration: "none", color: "inherit" }}> <MessageSquare className="icon" />
<h1 className="navbar-title" style={{ fontWeight: 700 }}>sammychat</h1> </Link> </div>

    {/* Right side: buttons */}  
    <div className="navbar-right" style={{ display: "flex", alignItems: "center", gap: "12px" }}>  
      <Link to="/setting" className="navbar-btn" style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>  
        <Settings className="icon-small" />  
        <span>Settings</span>  
      </Link>  

      {authUser && (  
        <>  
          <Link to="/profile" className="navbar-btn" style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>  
            <User className="icon-small" />  
            <span>Profile</span>  
          </Link>  
          <button className="navbar-btn" onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", background: "none", border: "none", color: "inherit" }}>  
            <LogOut className="icon-small" />  
            <span>Logout</span>  
          </button>  
        </>  
      )}  
    </div>  
  </div>  
</header>  
);
};

export default Navbar;
