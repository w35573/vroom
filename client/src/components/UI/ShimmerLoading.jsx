import React from "react";
import "../../styles/loading.css";
import { Player } from "@lottiefiles/react-lottie-player";

const ShimmerLoading = () => {
  return (
    <div className="loading">
      <Player
        autoplay
        loop
        src="https://assets1.lottiefiles.com/packages/lf20_2OWTcY.json"
        style={{ height: "auto", width: "50%" }}
      ></Player>
    </div>
  );
};

export default ShimmerLoading;