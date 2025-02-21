import { footerData } from "./dashboardMockData";

const DashboardFooter = () => {
  return (
    <footer className="dashboard-footer">
      <div className="live">
        <p>Live Market</p>
      </div>

      <div className="current">
        <div className="wrapper">
          {footerData.map((item, index) => (
            <div key={index} className="info">
              <p className="product">{item.product}</p>
              <p className="price">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
export default DashboardFooter;
