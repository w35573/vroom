import React, { useRef, useEffect, useState } from "react";
import "../styles/contact.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
// eslint-disable-line import/no-webpack-loader-syntax
import Map, { Marker, Popup } from "react-map-gl";
import pin from "../assets/all-images/pin.png";

const accessToken =
  "pk.eyJ1IjoidzM1NTczIiwiYSI6ImNsYW5zaHQ2aTBjZmozcGx4dGp6aThrOTcifQ._vpX9RYwoyS2cvjZeFs-gw";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form>
                <FormGroup className="contact__form">
                  <Input placeholder="Your Name" type="text" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                  ></textarea>
                </FormGroup>

                <button className="contact__btn" type="submit">
                  Send Message
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  Bhavan's Campus, Old D N Nagar,
                  <br /> Munshi Nagar, Andheri West, Mumbai <br /> Maharashtra,
                  400058
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+91 9145374641</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">vroom@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i className={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>

          <Row className="map-wrap">
            <Map
              initialViewState={{
                longitude: 72.8335405,
                latitude: 19.1231776,
                zoom: 16,
              }}
              style={{ height: 500 }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={accessToken}
            >
              <Marker
                longitude={72.8335405}
                latitude={19.1231776}
                anchor="bottom"
              >
                <img src={pin} className="pin" />
              </Marker>
            </Map>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
