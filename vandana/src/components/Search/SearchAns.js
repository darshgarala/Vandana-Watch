import React from "react";

const SearchAns = ({ item }) => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {item.shortTitle}
      </div>
    </>
  );
};

export default SearchAns;
