import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";

const CarListingCard = (props) => {
  const {
    fullSizeImage,
    producer,
    model,
    fuelType,
    transmission,
    carType,
    discountedPrice,
    _id,
  } = props.item;

  const page = props.page;
  const min = props.min;
  const max = props.max;
  const availability = props.availability;
  const fuel = props.fuel;
  const trans = props.transmission;
  const brand = props.brand;
  const segment = props.segment;
  const sort = props.sort;
  const city = props.city;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={fullSizeImage} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">
            {producer} {model}
          </h4>
          <h6 className="rent__price text-center mt-">
            ₹ {discountedPrice} <span>/ month</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-gas-station-line"></i> {fuelType}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {transmission}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {carType}
            </span>
          </div>

          <button className=" w-50 car__item-btn car__btn-rent">
            <Link
              to={`/cars/monthly/${_id}/${page}/${city}/${min}/${max}/${availability}/${fuel}/${trans}/${brand}/${segment}/${sort}`}
            >
              Rent
            </Link>
          </button>

          <button className=" w-50 car__item-btn car__btn-details">
            <Link
              to={`/cars/monthly/${_id}/${page}/${city}/${min}/${max}/${availability}/${fuel}/${trans}/${brand}/${segment}/${sort}`}
            >
              Details
            </Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarListingCard;
