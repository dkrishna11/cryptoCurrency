import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import { coinObject } from "../functions/convertObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coins/CoinInfo";

const CoinPage = () => {
  const { id } = useParams();
  const [isLoader, setIsLoader] = useState(true);
  const [coinData, setCoinData] = useState();
  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => {
        coinObject(setCoinData, res.data);
        setIsLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoader(false);
      });
  }, [id]);
  return (
    <div>
      <Header />
      {isLoader ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper">
            <List coin={coinData} />
          </div>
          <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
      )}
    </div>
  );
};

export default CoinPage;
