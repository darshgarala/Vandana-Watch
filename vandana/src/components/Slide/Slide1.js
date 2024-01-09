import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Slide1.css";
import Slider from "react-slick";
import InfiniteScroll from "react-infinite-scroll-component";
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

const Slide1 = ({ brands, title }) => {
  console.log(brands);

  const settings = {
    dots: false, // Hide the navigation dots
    infinite: false, // Loop the slides
    speed: 500, // Animation speed
    slidesToShow: 5, // Number of slides to show at once
    slidesToScroll: 3, // Number of slides to scroll at a time
    swipeToSlide: true, // Enable swiping with mouse pad
  };

  return (
    <>
      <div className="s_1_div">
        {/* <hr color="grey" style={{marginTop:"2px",fontSize:"bold"}} /> */}
        <div
          style={{ backgroundColor: "grey", height: "20px", width: "100%" }}
        ></div>
        <div className="both_of_div">
          <div className="title_of_div">
            <p className="p_of_div">{title} : </p>
          </div>
        </div>
        {/* <hr color="grey" /> */}

        <div className="slide_of_div">
          {/* <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            centerMode={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            showDots={false}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {
              // console.log(data)
              brands.map((item) => {
                return (
                  <>
                    <div className="img_div1">
                      <img
                        className="img_of_data1"
                        src={item.url}
                        alt="product"
                      />
                    </div>
                  </>
                );
              })
            }
          </Carousel> */}
          <InfiniteScroll
            dataLength={brands.length}
            style={{ display: "flex", flexDirection: "row" }}
            inverse={true} //
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
            initialScrollY={2}
            className="infi"
          >
            {
              // console.log(data)
              brands.map((item,key) => {
                return (
                    <div key={key} className="img_div_11">
                      <img
                        className="img_of_data11"
                        src={item.url}
                        alt="product"
                      />
                    </div>
                );
              })
            }
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Slide1;
