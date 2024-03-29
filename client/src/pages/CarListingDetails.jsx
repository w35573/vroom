import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Carousel from "react-bootstrap/Carousel";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import PayButton from "../components/UI/PayButton";
import "../styles/car-listing-details.css";

const CarListingDetails = () => {
  const {
    id,
    page,
    city,
    min,
    max,
    availability,
    fuel,
    trans,
    brand,
    segment,
    sort,
  } = useParams();

  const [items, setItems] = useState([]);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const items = JSON.parse(
      localStorage.getItem(
        `${page}-${city}-${min}-${max}-${availability}-${fuel}-${trans}-${brand}-${segment}-${sort}`
      )
    );

    if (items) {
      setItems(items.data);
    }
  }, [
    availability,
    brand,
    city,
    fuel,
    id,
    max,
    min,
    page,
    segment,
    sort,
    trans,
  ]);

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
              <Col lg="6" className="car-img">
                {/* <img
                  src={singleCarItem.fullSizeImage}
                  alt=""
                  className="w-100"
                /> */}

                <Carousel activeIndex={index} onSelect={handleSelect}>
                  {singleCarItem.images.map((image, index) => (
                    <Carousel.Item>
                      <img className="d-block w-100" src={image} alt={index} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>

              <Col lg="6">
                <div className="car__info">
                  <h2 className="section__title">
                    {singleCarItem.producer + " " + singleCarItem.model}
                  </h2>

                  <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                    <h6 className="rent__price fw-bold fs-4">
                      ₹{singleCarItem.discountedPrice} / month
                    </h6>

                    <span className=" d-flex align-items-center gap-2">
                      <span style={{ color: "#f9a826" }}>
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-fill"></i>
                      </span>
                      ({singleCarItem.extraKMCharge} ratings)
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
                        className="ri-roadster-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.model}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        className="ri-settings-2-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.transmission}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        className="ri-timer-flash-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.carType}
                    </span>
                  </div>

                  <div
                    className=" d-flex align-items-center mt-3"
                    style={{ columnGap: "2.8rem" }}
                  >
                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        className="ri-gas-station-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.fuelType}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        className="ri-wheelchair-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.variant}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        className="ri-building-2-line"
                        style={{ color: "#f9a826" }}
                      ></i>{" "}
                      {singleCarItem.producer}
                    </span>
                  </div>
                </div>

                <div className="checkout-btn">
                  <PayButton checkOutItem={singleCarItem} />
                </div>
              </Col>

              {/* <Col lg="7" className="mt-5">
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
              </Col> */}
            </Row>
          </Container>
        </section>
      </Helmet>
    );
  }
};

export default CarListingDetails;
