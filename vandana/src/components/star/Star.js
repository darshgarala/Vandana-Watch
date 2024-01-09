import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfStroke, faStar } from "@fortawesome/free-solid-svg-icons";

const Star = ({ stars }) => {
  const rating = Array.from({ length: 5 }, (ele, index) => {
    let number = index + 0.5;

    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FontAwesomeIcon icon={faStarHalfStroke} />
        ) : stars >= number ? (
          <FontAwesomeIcon icon={faStar} />
        ) : (
          <FontAwesomeIcon icon={faStar} />
        )}
      </span>
    );
  });

  return (
    <>
      <Wrapper>
        <div>
          {rating}
          <p>{reviews}Customer Reviews</p>
        </div>
      </Wrapper>
    </>
  );
};

export default Star;
