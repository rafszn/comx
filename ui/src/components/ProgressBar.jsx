const ProgressBar = ({ step = 1 }) => {
  const x = 33;
  const percent = x * step;
  const width = percent > 100 ? "98%" :`${percent}%` ;
  return (
    <div className="progress-container">
      <p>Step {step} of 4</p>

      <div className="progress-bar" style={{ width, backgroundColor: "red" }} />
      <div className="progress-bar-shadow" style={{}} />

      <div className="circles">
        <div
          className="circle"
          style={percent > 0 ? { backgroundColor: "red" } : {}}
        />
        <div
          className="circle"
          style={percent > 33 ? { backgroundColor: "red" } : {}}
        />
        <div
          className="circle"
          style={percent > 66 ? { backgroundColor: "red" } : {}}
        />
        <div
          className="circle"
          style={percent > 99 ? { backgroundColor: "red" } : {}}
        />
      </div>

    </div>
  );
};
export default ProgressBar;
