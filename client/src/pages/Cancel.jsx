import React from "react";
import "../styles/cancel.css";

const Success = () => {
  return (
    <div className="cancel-body">
      <div className="card">
        <div className="card-inner">
          <i className="check-mark">🗙</i>
        </div>
        <h1 className="cancel_head">Transaction failed</h1>
        <p className="cancel_text">
          We did not received your purchase request.
          <br /> Please try again.
        </p>
      </div>
    </div>
  );
};

export default Success;
