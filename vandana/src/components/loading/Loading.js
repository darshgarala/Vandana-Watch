import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const Loading = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "200px" }}>
      <FontAwesomeIcon
        icon={faSpinner}
        style={{ fontSize: "70px", color: "#E17070" }}
        spinPulse
      />
    </div>
  );
};

export default Loading;
