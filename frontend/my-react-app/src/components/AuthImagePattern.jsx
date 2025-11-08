import React from "react";
import './AuthImagePattern.css';

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="auth-pattern-inner">
      <div className="pattern-grid">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`pattern-square ${i % 2 === 0 ? 'pulse' : ''}`}
          />
        ))}
      </div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default AuthImagePattern;


