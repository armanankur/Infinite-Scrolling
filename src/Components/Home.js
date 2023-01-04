

import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";

const listBatchSize = 20;
const delayInMs = 1000;
const listLimitLen = 500;

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [dataFrame, setDataFrame] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [iterator, setIterator] = useState(0);

  const Api = "https://randomuser.me/api/?results=500";
  const ApiData = () => {
    fetch(Api)
      .then((res) => {
        res.json().then((actualres) => {
          const data = actualres.results.map((resp) => {
            return {
              name:
                resp.name.title + " " + resp.name.first + " " + resp.name.last,
              url: resp.picture.medium
            };
          });
          setUsers(data);
          setDataFrame(data.slice(0, listBatchSize));
          setIterator(listBatchSize);
          setHasMore(true);
        });
      })
      .catch((err) => {
        console.log("error occurs");
      });
  };

  useEffect(ApiData, []);

  const handleClick = () => {
    navigate("/login");
  };

  const displayPerson = (person) => {
    return <Card person={person} />;
  };

  const fetchMoreData = () => {
    console.log("data frame is: ", dataFrame);
    setTimeout(() => {
      let newDataSet = users.slice(iterator, iterator + listBatchSize);
      let newDataFrame = dataFrame.concat(newDataSet);
      setDataFrame(newDataFrame);
      if (dataFrame.length >= listLimitLen) {
        setHasMore(false);
      }
      setIterator(iterator + listBatchSize);
    }, delayInMs);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <button onClick={handleClick}>LOGOUT</button>
      </div>

      <div className="heading">
        <h3> CONTACTS</h3>
      </div>

      <InfiniteScroll
        dataLength={dataFrame.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="person_list">
          {dataFrame.map((user) => displayPerson(user))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
export default Home;