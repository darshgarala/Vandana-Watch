import React from "react";
// import { useEffect, useState } from "react";
import "react-slideshow-image/dist/styles.css";
import { Fade} from "react-slideshow-image";

// import v2 from "./PHOTO/v2.mp4";
import v6 from "./PHOTO/v6.mp4";
import v8 from "./PHOTO/v8.mp4";
import v12 from './PHOTO/v12.mp4';
import v17 from "./PHOTO/v17.mp4";
import v18 from "./PHOTO/v18.mp4";
import v19 from "./PHOTO/v19.mp4";
import "./Scroll.css";

const slideImages = [
  {
    url: `${v17}`,
  },
  {
    url: `${v18}`,
  },
  {
    url: `${v19}`,
  },
  {
    url: `${v6}`,
  },
  {
    url: `${v8}`,
  },
  {
    url: `${v12}`,
  }
];

const Scroll = () => {
  return (
    <>
      <div className="slide-container">
        <Fade>
          {slideImages.map((image, index) => (
            // this is photo
            // <div key={index} className="p_roll">
            //   <div
            //     className="scroll_img"
            //     style={{ backgroundImage: `url(${image.url})` }}
            //   ></div>
            // </div>

            // this is video
            <div key={index} className="p_roll">
                <div className="overlay"></div>
              <video
                className="scroll_img"
                src={image.url}
                autoPlay
                loop
                muted
              />
              <div className="content">
                {/* <h1>" Time Is What We Want Most,</h1>
                <h1>But What We Use Worst. "</h1> */}
              </div>
            </div>
          ))}
        </Fade>
      </div>
    </>
  );
};

export default Scroll;
