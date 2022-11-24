import React from "react";
import "../styles/success.css";

const Success = () => {
  return (
    <div className="success-body">
      <div className="card">
        <div className="card-inner">
          <i className="check-mark1">✓</i>
        </div>
        <h1 className="success_head">Success</h1>
        <p className="success_text">
          We have received your purchase request,
          <br /> we'll be in touch shortly!
        </p>
      </div>
    </div>
  );
};

export default Success;
