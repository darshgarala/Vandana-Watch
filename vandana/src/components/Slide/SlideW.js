import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Slide.css";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { DataContext } from "../context/DataProvider";
import { useContext } from "react";

// import Slide1 from './Slide1.jsx';
// //
// import { useDispatch, useSelector } from "react-redux";
// import { useState, useContext, useEffect } from "react";
// import { getBrands } from "../../redux/action/brandsAction";
// import DataProvider from "../context/DataProvider";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const SlideW = ({ products, title }) => {
  const timerURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span className="span_of_div">
        {hours} : {minutes} : {seconds} Left
      </span>
    );
  };

  const { account, setAccount } = useContext(DataContext);

  return (
    <>
      <div className="s_1_div">
        {/* <hr color="grey" /> */}
        <div className="both_of_div">
          <div className="title_of_div">
            <p className="p_of_div">{title} :</p>
          </div>
          <div>
            {/* <button className="viewall_of_div">View ALL</button> */}
          </div>
        </div>
        {/* <hr color="grey" /> */}

        <div className="slide_of_div">
          <InfiniteScroll
            dataLength={products.length}
            style={{ display: "flex", flexDirection: "row" }}
            inverse={true} //
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
            initialScrollY={2}
            className="infi"
          >
            {products.map((product, key) =>
              product.tagline == "women" ? (
                <Link
                  key={key}
                  to={`products/${account}/${product.id}`}
                  className="linkofProduct"
                >
                  <div className="img_div">
                    <img
                      className="img_of_data"
                      src={product.url}
                      alt="product"
                    />
                    <p className="p1_div">{product.shortTitle}</p>
                    <p className="p2_div">{product.discount}</p>
                  </div>
                </Link>
              ) : (
                <></>
              )
            )}
          </InfiniteScroll>
        </div>
      </div>
      {/* <DataProvider> */}
      {/* <Slide1 brands={brands title="Brands" /> */}
      {/* </DataProvider> */}
    </>
  );
};

export default SlideW;
