return (
  <div className="d-flex align-items-start">
    <i className="bi bi-check-circle-fill" style={{ padding: "0 0.3rem" }}></i>
    <p className="text-secondary">{countVotes[0]}</p>
    <i
      className="bi bi-x-octagon-fill"
      style={{ padding: "0 0.5rem 0 1rem" }}
    ></i>
    <p className="text-secondary">{countVotes[1]}</p>
  </div>
);
