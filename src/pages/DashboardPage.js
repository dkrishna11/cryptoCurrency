import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Tabs from "../components/Dashboard/Tabs";
import axios from "axios";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";

const DashboardPage = () => {
  const [coins, setCoins] = useState([]);
  const [paginatedcoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [isLoader, setIsLoader] = useState(true);
  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
  };

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  var filtered = coins.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res);
        setPaginatedCoins(coins.slice(0, 10));
        setIsLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoader(false);
      });
  }, []);
  return (
    <>
      <Header />
      <BackToTop/>
      {isLoader ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <Tabs coins={search ? filtered : paginatedcoins} />
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </>
  );
};

export default DashboardPage;
