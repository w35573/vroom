import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";
import Loading from "../components/UI/Loading";

import "../styles/blog-details.css";

const BlogDetails = () => {
  const { slug } = useParams();

  const [blogData, setItems] = useState([]);
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("blogs"));

    if (items) {
      setItems(items);
    }
  }, []);

  const blog = blogData.find((blog) => blog.id == slug);

  useEffect(() => {
    const getArticle = async () => {
      try {
        if (blog) {
          let URL = encodeURIComponent(blog.url);
          const res = await axios.get(`/api/blog/${URL}`);
          setArticle(res.data.content);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getArticle();
  }, [blog]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog]);

  if (!loading) {
    return (
      <Helmet title={blog.title}>
        <section>
          <Container>
            <Row>
              <Col lg="8" md="8">
                <div className="blog__details">
                  <img src={blog.imgUrl} alt="" className="w-100" />
                  <h2 className="section__title mt-4">{blog.title}</h2>

                  <div className="blog__publisher d-flex align-items-center gap-4 mb-4">
                    <span className="blog__author">
                      <i className="ri-user-line"></i> {blog.author}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i className="ri-calendar-line"></i> {blog.date}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i className="ri-time-line"></i> {blog.time}
                    </span>
                  </div>

                  <p className="section__description">{article}</p>
                </div>
              </Col>

              <Col lg="4" md="4">
                <div className="recent__post mb-4">
                  <h5 className=" fw-bold">Recent Posts</h5>
                </div>
                {blogData.slice(0, 15).map((item) => (
                  <div className="recent__blog-post mb-4" key={item.id}>
                    <div className="recent__blog-item d-flex gap-3">
                      <img
                        src={item.imgUrl}
                        alt=""
                        className="w-25 rounded-2"
                      />
                      <h6>
                        <Link to={`/blogs/${item.id}`}>{item.title}</Link>
                      </h6>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    );
  } else {
    return <Loading />;
  }
};

export default BlogDetails;
