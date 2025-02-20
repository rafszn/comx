import { MdOutlineLightMode } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const DashBoardHeader = () => {
  return (
    <header className="dashboard-header">
      <div className="left">
        <div className="img-wrapper">
          <img src="/comxlogo.png" alt="" />
        </div>

        <div className="toggle">
          <p>light</p>

          <div className="icon">
            <MdOutlineLightMode />
          </div>
        </div>
      </div>

      <div className="right">
        <div className="first">
          <IoIosArrowForward size={12} />

          <div className="bal">
            <h6>CASH BALANCE</h6>
            <p>₦8,374,763</p>
          </div>
          <div className="bal">
            <h6>SECURITIES VALUE</h6>
            <p>₦8,374,763</p>
          </div>
          <div className="bal">
            <h6>LOAN BALANCE</h6>
            <p>₦8,374,763</p>
          </div>
        </div>
        <div className="second">
          <p>DEMO</p>
          <IoIosArrowDown size={12} />
        </div>
      </div>
    </header>
  );
};
export default DashBoardHeader;
