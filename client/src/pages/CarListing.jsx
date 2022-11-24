import React, { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarListingCard from "../components/UI/CarListingCard";
import axios from "axios";
import "../styles/carListing.css";
import Pagination from "../components/Pagination";
import Sort from "../components/Sort";
import CityFilter from "../components/CityFilter";
import MinPrice from "../components/MinPrice";
import MaxPrice from "../components/MaxPrice";
import Availability from "../components/Availability";
import Segment from "../components/Segment";
import Fuel from "../components/Fuel";
import Transmission from "../components/Transmission";
import Brand from "../components/Brand";
import Loading from "../components/UI/Loading";

const CarListing = () => {
  const [obj, setObj] = useState(null);
  const [city, setCity] = useState("bangalore");
  const [min, setMin] = useState(10000);
  const [max, setMax] = useState(45000);
  const [availability, setAvailability] = useState(30);
  const [fuel, setFuel] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [brand, setBrand] = useState([]);
  const [segment, setSegment] = useState([]);
  const [sort, setSort] = useState("asc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const cachedData = localStorage.getItem(
          `${page}-${city}-${min}-${max}-${availability}-${
            fuel.length !== 0 ? fuel : "all"
          }-${transmission.length !== 0 ? transmission : "all"}-${
            brand.length !== 0 ? brand : "all"
          }-${segment.length !== 0 ? segment : "all"}-${sort}`
        );

        if (cachedData) {
          // console.log(cachedData);
          setObj(JSON.parse(cachedData));
        } else {
          const { data } = await axios.get(
            `/api/cars/filter?page=${page}&city=${city}&min=${min}&max=${max}&availability=${availability}&fuel=${fuel}&transmission=${transmission}&brand=${brand}&segment=${segment}&sort=${sort}`
          );

          setObj(data);
          localStorage.setItem(
            `${page}-${city}-${min}-${max}-${availability}-${
              fuel.length !== 0 ? fuel : "all"
            }-${transmission.length !== 0 ? transmission : "all"}-${
              brand.length !== 0 ? brand : "all"
            }-${segment.length !== 0 ? segment : "all"}-${sort}`,
            JSON.stringify(data)
          );
          // console.log(fuel, city, min, transmission, brand, segment);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [
    city,
    min,
    max,
    availability,
    fuel,
    transmission,
    brand,
    segment,
    sort,
    page,
  ]);

  if (loading === false) {
    return (
      <Helmet title="Cars">
        <CommonSection title="Monthly Car Subscription" />

        <section>
          <Container>
            <div className="body">
              <Row>
                <Sort sort={sort} setSort={(sort) => setSort(sort)} />
              </Row>

              <Row>
                <div className="filter">
                  <i className="ri-filter-3-line"></i>
                  <span className="filter_text">Filter By</span>
                </div>
              </Row>

              <Row>
                <div className="filter_min_max_city">
                  <CityFilter city={city} setCity={(city) => setCity(city)} />
                  <MinPrice min={min} setMin={(min) => setMin(min)} />
                  <MaxPrice max={max} setMax={(max) => setMax(max)} />
                </div>
              </Row>

              <Row>
                <Availability
                  availability={availability}
                  setAvailability={(availability) =>
                    setAvailability(availability)
                  }
                />
              </Row>

              <Row>
                <Segment
                  segmentOptions={obj.segments ? obj.segments : []}
                  segment={segment}
                  setSegment={(segment) => setSegment(segment)}
                />
              </Row>

              <Row>
                <div className="filter_min_max_city">
                  <Fuel
                    fuelOptions={obj.fuels ? obj.fuels : []}
                    fuel={fuel}
                    setFuel={(fuel) => setFuel(fuel)}
                  />

                  <Transmission
                    transmissionOptions={
                      obj.transmissions ? obj.transmissions : []
                    }
                    transmission={transmission}
                    setTransmission={(transmission) =>
                      setTransmission(transmission)
                    }
                  />
                </div>
              </Row>

              <Row>
                <Brand
                  brandOptions={obj.brands ? obj.brands : []}
                  brand={brand}
                  setBrand={(brand) => setBrand(brand)}
                />
              </Row>
            </div>

            <Row>
              {obj.data.map((item) => (
                <CarListingCard
                  item={item}
                  page={page}
                  city={city}
                  min={min}
                  max={max}
                  availability={availability}
                  fuel={fuel.length !== 0 ? fuel : "all"}
                  transmission={
                    transmission.length !== 0 ? transmission : "all"
                  }
                  brand={brand.length !== 0 ? brand : "all"}
                  segment={segment.length !== 0 ? segment : "all"}
                  sort={sort}
                  key={item._id}
                />
              ))}
            </Row>

            <Pagination
              page={page}
              limit={obj.limit ? obj.limit : 0}
              total={obj.total ? obj.total : 0}
              setPage={(page) => setPage(page)}
            />
          </Container>
        </section>
      </Helmet>
    );
  } else {
    return <Loading />;
  }
};

export default CarListing;
