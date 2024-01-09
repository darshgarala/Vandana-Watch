import { Dialog } from "@mui/material";
// image

import w2 from "./photo1/w2.png";
import w3 from "./photo1/w3.png";
import w4 from "./photo1/w4.jpg";
import w5 from "./photo1/w5.png";
import w6 from "./photo1/w6.png";
//
import "./mydialog.css";
const MyDialog = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} className="demo_2">
        <div className="demo_dia">
          <p className="text_size">Dial Diameter (in mm) :</p>
          <div className="img_zoom">
            <img className="w2_cls" src={w3} alt="" />
          </div>
          <div className="img_zoom">
            <img className="w2_cls" src={w2} alt="" />
          </div>
          <div className="img_zoom">
            <img className="w2_cls" src={w4} alt="" />
          </div>
          <p className="text_size">Case Thickness (in mm) :</p>
          <div className="img_zoom">
            <img className="w2_cls" src={w5} alt="" />
          </div>
          <p className="text_size">Strap Width (in mm) :</p>
          <div className="img_zoom">
            <img className="w2_cls" src={w6} alt="" />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default MyDialog;
