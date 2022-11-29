import { React, useState, useEffect } from "react";
import { Col } from "reactstrap";
import "../../styles/blog-item.css";
import { Link } from "react-router-dom";
import axios from "axios";
import authors from "../../assets/data/randomUser.json";
import Loading from "../../components/UI/Loading";

const BlogList = () => {
  const [blogData, setBlogs] = useState([]);
  
  const authorNames = authors.results.map((author) => {
    return author.name.first;
  });

  useEffect(() => {
    axios
      .get('/api/news')
      .then((res) => {
        const rawData = res.data.data.articles;
        const polishedData = [];

        for (let i = 0; i < rawData.length; i++) {
          if (
            !rawData[i].urlToImage ||
            !rawData[i].title ||
            !rawData[i].description ||
            !rawData[i].publishedAt ||
            !rawData[i].url
          ) {
            continue;
          }

          let time = new Date(rawData[i].publishedAt).toLocaleTimeString(
            "en-US",
            { timeStyle: "short", hour12: true, timeZone: "Asia/Kolkata" }
          );
          let date = new Date(rawData[i].publishedAt).toLocaleDateString(
            "en-US",
            { dateStyle: "short", timeZone: "Asia/Kolkata" }
          );

          polishedData.push({
            id: i,
            imgUrl: rawData[i].urlToImage,
            title: rawData[i].title,
            description: rawData[i].description,
            author: authorNames[i],
            time: time,
            date: date,
            url: rawData[i].url,
          });
          // console.log(res.data.articles);
        }

        // const articles = [];

        // for (let i = 0; i < polishedData.length; i++) {
        //   if(polishedData[i].title ) {

        //   }
        // }

        setBlogs(polishedData);

        localStorage.setItem("blogs", JSON.stringify(polishedData));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [URL]);

  return (
    <>
      {blogData.length === 0 && <Loading />}
      {blogData.length !== 0 &&
        blogData.map((item) => <BlogItem item={item} key={item.id} />)}
    </>
  );
};

const BlogItem = ({ item }) => {
  const { id, imgUrl, title, author, date, description, time } = item;

  return (
    <Col lg="4" md="6" sm="6" className="mb-5">
      <div className="blog__item">
        <img src={imgUrl} alt="" className="w-100 blog__image" />
        <div className="blog__info p-3">
          <Link to={`/blogs/${id}`} className="blog__title">
            {title.length > 60 ? title.slice(0, 61) + "..." : title}
          </Link>
          <p className="section__description mt-3">
            {description.length > 100 + "..."
              ? description.slice(0, 101)
              : description}
          </p>

          <Link to={`/blogs/${id}`} className="read__more">
            Read More
          </Link>

          <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
            <span className="blog__author">
              <i className="ri-user-line"></i> {author}
            </span>

            <div className=" d-flex align-items-center gap-3">
              <span className=" d-flex align-items-center gap-1 section__description">
                <i className="ri-calendar-line"></i> {date}
              </span>

              <span className=" d-flex align-items-center gap-1 section__description">
                <i className="ri-time-line"></i> {time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default BlogList;
