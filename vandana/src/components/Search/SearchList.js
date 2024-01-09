import React from "react";
import SearchAns from "./SearchAns";
const SearchList = ({ resu }) => {
  return (
    <>
      <div>
        {resu.map((item) => {
          return (
            <>
              <SearchAns item={item}></SearchAns>
            </>
          );
        })}
      </div>
    </>
  );
};

export default SearchList;
