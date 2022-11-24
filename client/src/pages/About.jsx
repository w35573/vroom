import React from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";

import driveImg from "../assets/all-images/drive.jpg";
import OurMembers from "../components/UI/OurMembers";
import "../styles/about.css";

const About = () => {
  return (
    <Helmet title="About">
      <CommonSection title="About Us" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
                <h2 className="section__title">
                  Enjoy your holidays with our wheels
                </h2>

                <p className="section__description"></p>

                <p className="section__description">
                  Vroom is India’s fastest growing shared mobility platform,
                  providing both self-drive car rental and subscription services
                  to its customers. Vroom currently operates a fleet of 3500+
                  cars in 22 cities within India.
                </p>

                <p className="section__description">
                  Vroom’s self-drive car rental operations expanded to Hyderabad
                  and Bengaluru. From there, the company has continued to expand
                  its geographical coverage and now operates across 22 cities
                  within India i.e. Delhi/NCR, Bengaluru, Hyderabad, Chennai,
                  Mumbai, Pune, Kolkata, Ahmedabad, Mangalore, Chandigarh,
                  Jaipur, Vizag, Kochi, Coimbatore, Mysore, Tirupati,
                  Vijayawada, Trivandrum, Surat, Nagpur, Bhubaneswar and
                  Vadodara, with its self-drive car rental and subscription
                  services.
                </p>

                <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i className="ri-phone-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Need Any Help?</h6>
                    <h4>+91 9145374641</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <BecomeDriverSection />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h2 className="section__title">Our Members</h2>
            </Col>
            <OurMembers />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default About;
