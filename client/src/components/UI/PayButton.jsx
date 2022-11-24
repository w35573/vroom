import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/checkout.css";

const PayButton = ({ checkOutItem }) => {
  const { user } = useAuthContext();

  const handleCheckout = () => {
    if (user) {
      axios
        .post("/api/stripe/create-checkout-session", {
          checkOutItem,
          userId: user.email,
        })
        .then((response) => {
          if (response.data.url) {
            window.location.href = response.data.url;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <>
      <button
        onClick={() => handleCheckout()}
        className="btn btn-primary btn1"
        style={{ backgroundColor: "#000d6b", border: "none" }}
      >
        Check Out
      </button>
    </>
  );
};

export default PayButton;
