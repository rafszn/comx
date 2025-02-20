import { footerData } from "./dashboardMockData";

const DashboardFooter = () => {
  return (
    <footer className="dashboard-footer">
      <div className="live">
        <p>Live Market</p>
      </div>

      <div className="current">
        {footerData.map((item, index) => (
          <div key={index} className="info">
            <p>{item.product}</p>
            <p className="price">{item.price}</p>
          </div>
        ))}
      </div>
    </footer>
  );
};
export default DashboardFooter;
