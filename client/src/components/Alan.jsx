import { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useLogout } from "../hooks/useLogout";

const useAlan = () => {
  const { logout } = useLogout();

  useEffect(() => {
    alanBtn({
      key: "14e19c790cc982de0dc55b95f494ed9d2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command }) => {
        if (command === "login") {
          window.location.href = "http://localhost:3000/login";
        } else if (command === "signup") {
          window.location.href = "http://localhost:3000/signup";
        } else if (command === "logout") {
          logout();
        }
      },
    });
  }, []);
};

export default useAlan;
