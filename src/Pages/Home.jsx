import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoData from "../Component/NoData";

const BlogCard = ({ title, description, category, tags }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <>
      <div className="col-lg-4 col-md-12 col-sm-12 pb-4">
        <div
          className="card p-3"
          style={{
            position: "relative",
            background: "#161D29",
            borderRadius: "20px",
          }}
        >
          <div>
            <h2 style={{ textAlign: "center", color: "white" }}>{title}</h2>
            <div
              style={{
                display: "flex",
                gap: ".5rem",
                alignItems: "center",
                color: "white",
              }}
              className="pt-3"
            >
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  paddingLeft: "10px",
                }}
              >
                Category
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "#ffb300",
                  paddingLeft: "10px",
                  textTransform: "capitalize",
                }}
              >
                {category}
              </p>
            </div>

            <p
              style={{ padding: "10px", color: "white", textAlign: "justify" }}
            >
              {showFullDescription ? description : description.slice(0, 200)}
              {description.length > 200 && (
                <Link
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? " Read Less" : " Read More"}
                </Link>
              )}
            </p>
            <p style={{ padding: "10px" }}>
              {tags.map((tag, index) => (
                <span key={index} className="tags">{`#${tag} `}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const Home = () => {
  const [blogData, setBlogData] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [filteredBlogData, setFilteredBlogData] = useState([]);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/api/blogs/getblogs"
      );
      setBlogData(response.data.data);
      setFilteredBlogData(response.data.data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };
  useEffect(() => {
    fetchBlogData();
  }, []);

  const handleSearch = () => {
    const filteredData = blogData.filter((item) =>
      item.category.toLowerCase().includes(searchCategory.toLowerCase())
    );
    setFilteredBlogData(filteredData);
  };

  const handleRefresh = () => {
    setSearchCategory("");
    setFilteredBlogData(blogData);
  };

  return (
    <>
      <div className="container pt-5 pb-5">
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <input
            type="text"
            placeholder="Search by category"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="InputSearch"
          />
          <button onClick={handleSearch} className="theme-btn">
            Search
          </button>
          <button onClick={handleRefresh} className="theme-btn">
            Refresh
          </button>
        </div>
        {filteredBlogData.length === 0 ? (
          <>
            <NoData />
          </>
        ) : (
          <div className="pt-5 row">
            {filteredBlogData.map((item) => (
              <BlogCard
                category={item.category}
                description={item.description}
                tags={item.tags}
                title={item.title}
                key={item._id}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
