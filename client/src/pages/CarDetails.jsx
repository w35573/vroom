import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";

const CarDetails = () => {
  const { id } = useParams();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("carData"));

    if (items) {
      setItems(items);
    }
  }, []);

  const singleCarItem = items.find((items) => items._id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  if (singleCarItem) {
    return (
      <Helmet title={singleCarItem.producer + " " + singleCarItem.model}>
        <section>
          <Container>
            <Row>
              <Col lg="6">
                <img src={singleCarItem.whiteImage} alt="" className="w-100" />
              </Col>

              <Col lg="6">
                <div className="car__info">
                  <h2 className="section__title">
                    {singleCarItem.producer + " " + singleCarItem.model}
                  </h2>

                  <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                    <h6 className="rent__price fw-bold fs-4">
                      ₹{singleCarItem.pricePerDay} / Day
                    </h6>

                    <span className=" d-flex align-items-center gap-2">
                      <span style={{ color: "#f9a826" }}>
                        <i class="ri-star-s-fill"></i>
                        <i class="ri-star-s-fill"></i>
                        <i class="ri-star-s-fill"></i>
                        <i class="ri-star-s-fill"></i>
                        <i class="ri-star-s-fill"></i>
                      </span>
                      ({singleCarItem.pricePerHour} ratings)
                    </span>
                  </div>

                  <p className="section__description">
                    Book now to protect yourself from any price changes
                  </p>

                  <p className="section__description">
                    Prices at the time of booking will be applicable for all
                    modifications and extensions
                  </p>

                  <p className="section__description">
                    Any new peak season added will not affect your booking
                  </p>

                  <div
                    className=" d-flex align-items-center mt-3"
                    style={{ columnGap: "4rem" }}
                  >
                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        class="ri-roadster-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.model}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        class="ri-settings-2-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.transmission}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        class="ri-timer-flash-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.mileage + " kmpl"}
                    </span>
                  </div>

                  <div
                    className=" d-flex align-items-center mt-3"
                    style={{ columnGap: "2.8rem" }}
                  >
                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        class="ri-gas-station-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.fuelType}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        class="ri-wheelchair-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.carSeats + " seats"}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        class="ri-building-2-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.producer}
                    </span>
                  </div>
                </div>
              </Col>

              <Col lg="7" className="mt-5">
                <div className="booking-info mt-5">
                  <h5 className="mb-4 fw-bold ">Booking Information</h5>
                  <BookingForm />
                </div>
              </Col>

              <Col lg="5" className="mt-5">
                <div className="payment__info mt-5">
                  <h5 className="mb-4 fw-bold ">Payment Information</h5>
                  <PaymentMethod />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    );
  }
};

export default CarDetails;
