// import
import man from "./man.jpg";
import women from "./women.jpg";
import "./Image.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Image = ({ account, setAccount }) => {
  return (
    <>
      <div className="two_img_div">
        <div className="collaction">Our Collection</div>
        <div className="in_two_img">
          <Link to={`/products/${account}`}>
            <div>
              <img className="man" src={man} alt="man" />
              <div className="icon_div">
                <p className="w_man">Watch For Him</p>
                <FontAwesomeIcon
                  className="icon_share"
                  icon={faArrowUpRightFromSquare}
                  size="xl"
                  style={{ color: "red" }}
                />
              </div>
            </div>
          </Link>
          <Link to={`/products_w/${account}`}>
            <div>
              <img className="women" src={women} alt="women" />
              <div className="icon_div1">
                <p className="w_women">Watch For Her</p>
                <FontAwesomeIcon
                  className="icon_share1"
                  icon={faArrowUpRightFromSquare}
                  size="xl"
                  style={{ color: "red" }}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Image;
