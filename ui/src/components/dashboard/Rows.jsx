const Rows = ({ product, quantity, price, type = "Buy" }) => {
  const color = type === "Buy" ? "#52965E" : "#E55541";
  const border = type === "Buy" ? "1px solid #52965E" : "1px solid #E55541";
  return (
      <div className="rows">
        <div className="row " style={{ flex: "0.4" }}>
          {product}
        </div>
        <div className="row ">{quantity}</div>
        <div className="row" style={{ color }}>
          {price}
        </div>
        <div className="row">
          <p style={{ color, border }}>buy</p>
        </div>
      </div>
  );
};
export default Rows;
