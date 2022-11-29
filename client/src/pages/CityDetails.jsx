import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import locationData from "../assets/data/location.json";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/UI/Loading";

const CityDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { startDate, startTime, endDate, endTime, location } = useParams();

  const start = `${startDate}T${startTime}:00.000Z`;
  const end = `${endDate}T${endTime}:00.000Z`;
  const long = locationData[location].long;
  const lat = locationData[location].lat;

  const URL = `/api/str/${start}/${end}/${long}/${lat}/${location}`;

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        const rawData = res.data.carModels;
        const polishedData = [];
        for (let i = 0; i < rawData.length; i++) {
          polishedData.push({
            id: rawData[i]._id,
            imgUrl: rawData[i].whiteImage,
            model: rawData[i].fuelType,
            carName: `${rawData[i].producer} ${rawData[i].model}`,
            automatic: rawData[i].transmission,
            price: rawData[i].pricePerDay,
            speed: `${rawData[i].mileage} kmpl`,
          });
        }
        setData(polishedData);
        setLoading(false);
        localStorage.setItem("carData", JSON.stringify(rawData));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [URL]);

  if (!loading) {
    return (
      <Helmet title="Cars | City">
        <CommonSection title="Available Cars" />
        <section>
          <Container>
            <Row>
              {data.map((item) => (
                <CarItem item={item} key={item._id} />
              ))}
            </Row>
          </Container>
        </section>
      </Helmet>
    );
  } else {
    return <Loading />;
  }
};

export default CityDetails;
