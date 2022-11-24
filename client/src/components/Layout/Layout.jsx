import React, { Fragment, useRef } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import useAlan from "../Alan";

const Layout = () => {
  useAlan();
  const alanBtnContainer = useRef();

  return (
    <Fragment>
      <Header />
      <div>
        <Routers />
      </div>
      <div ref={alanBtnContainer} />
      <Footer />
    </Fragment>
  );
};

export default Layout;
