import DashboardFooter from "../components/dashboard/DashboardFooter";
import DashBoardHeader from "../components/dashboard/DashBoardHeader";
import MenuIconLabel from "../components/dashboard/MenuIconLabel";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import Rows from "../components/dashboard/Rows";
import {
  buyOrderBook,
  orderHistory,
  sellOrderBook,
} from "../components/dashboard/dashboardMockData";
import LogoutButton from "../components/LogoutButton";

const DashboardLayout = () => {
  return (
    <div className="relative bg-[#f4f4f6]">
      <DashBoardHeader />

      <div className="view">
        {/* SideMenu */}
        <div className="sidemenu">
          <MenuIconLabel text={"Overview"} imageSrc={"/window.svg"} />
          <MenuIconLabel text={"Market"} imageSrc={"/trend.svg"} />
          <MenuIconLabel text={"Portfolio"} imageSrc={"/briefcase.svg"} />
          <MenuIconLabel text={"Community"} imageSrc={"/profile.svg"} />
          <MenuIconLabel text={"Report"} imageSrc={"/file.svg"} />
          <MenuIconLabel text={"Settings"} imageSrc={"/settings.svg"} />
          <LogoutButton />
        </div>

        {/* Search */}
        <div className="sidesearch">
          <div className="searchbar">
            <HiOutlineMagnifyingGlass />
            <input type="text" placeholder="Search" />
          </div>

          <div className="links">
            <MenuIconLabel
              text={"Product View"}
              imageSrc={"/trending.svg"}
              direction="horizontal"
            />
            <MenuIconLabel
              text={"Order Book"}
              imageSrc={"/book.svg"}
              direction="horizontal"
            />
            <MenuIconLabel
              text={"Price History"}
              imageSrc={"/time.svg"}
              direction="horizontal"
            />
            <MenuIconLabel
              text={"Open Orders"}
              imageSrc={"/eye.svg"}
              direction="horizontal"
            />
            <MenuIconLabel
              text={"Closed Trades"}
              imageSrc={"/mark.svg"}
              direction="horizontal"
            />
            <MenuIconLabel
              text={"Cancelled Trades"}
              imageSrc={"/x.svg"}
              direction="horizontal"
            />
          </div>
        </div>

        {/* Outlet */}
        <div className="maincontent">
          <div className="top">
            <div className="row1">
              <p>Board</p>
              <p>X-Traded</p>
              <p>OTC</p>
              <p>FI</p>
              <p>Derivatives</p>
            </div>
            <div className="row2">
              <p>Product</p>
              <p>All</p>
              <p>SMAZ</p>
              <p>SBBS</p>
              <p>SPRL</p>
              <p>SGNG</p>
              <p>SSGM</p>
              <p>FETC</p>
              <p>SCOC</p>
            </div>
          </div>

          <div className="mid">
            <div className="left">
              <div className="section">
                <div
                  className="rows title"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="row light" style={{ flex: "0.4" }}>
                    Products
                  </div>
                  <div className="row light">Quantity</div>
                  <div className="row light">Bid Price</div>
                  <div className="row" />
                </div>

                {buyOrderBook.map((item, index) => (
                  <Rows
                    key={index}
                    product={item.product}
                    quantity={item.quantity}
                    price={item.price}
                    type={item.type}
                  />
                ))}
              </div>
            </div>
            <div className="right">
              <div className="section">
                <div
                  className="rows title"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="row light" style={{ flex: "0.4" }}>
                    Products
                  </div>
                  <div className="row light">Quantity</div>
                  <div className="row light">Offer Price</div>
                  <div className="row" />
                </div>

                {sellOrderBook.map((item, index) => (
                  <Rows
                    key={index}
                    product={item.product}
                    quantity={item.quantity}
                    price={item.price}
                    type={item.type}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="trade">TRADE LOG</div>

            {/* section */}
            <div className="section">
              <div className="rows title" style={{ backgroundColor: "white" }}>
                <div className="row light" style={{ flex: "0.4" }}>
                  Security
                </div>
                <div className="row light">Board</div>
                <div className="row light">Order Type</div>
                <div className="row light">Matched Price</div>
                <div className="row light">Quantity</div>
                <div className="row light">Date</div>
                <div className="row light">Time</div>
              </div>
              {orderHistory.map((item, index) => (
                <div
                  className="rows"
                  style={{ backgroundColor: "white" }}
                  key={index}
                >
                  <div className="row" style={{ flex: "0.4" }}>
                    {item.security}
                  </div>
                  <div className="row ">{item.security}</div>
                  <div className="row ">{item.orderType}</div>
                  <div className="row ">{item.matchedPrice}</div>
                  <div className="row ">{item.quantity}</div>
                  <div className="row ">{item.date}</div>
                  <div className="row ">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DashboardFooter />
    </div>
  );
};
export default DashboardLayout;
