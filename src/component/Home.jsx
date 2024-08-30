import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container">
        {data?.map((item) => {
          return (
            <>
              <div className="card">
                <p>{item.id}</p>
                <h3>{item.title}</h3>
                <p>{item.completed}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;
