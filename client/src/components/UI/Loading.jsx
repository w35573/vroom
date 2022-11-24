import React from "react";
import "../../styles/loading.css";
import { Player } from "@lottiefiles/react-lottie-player";

const Loading = () => {
  return (
    <div className="loading">
      <Player
        autoplay
        loop
        src="https://assets7.lottiefiles.com/packages/lf20_o1ebw8km.json"
        style={{ height: "300px", width: "300px" }}
      ></Player>
    </div>
  );
};

export default Loading;