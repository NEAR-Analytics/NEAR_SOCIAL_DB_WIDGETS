const styleStat = {
  display: "flex",
  "flex-direction": "column",
  "font-weight": 500,
  "font-size": "16px",
  "line-height": "24px",
  "padding-right": "20px",
  "padding-bottom": "10px",
};

const renderStat = (title, value) => (
  <div style={styleStat}>
    <span>{title}</span>
    <span style={{ "font-weight": 600 }}>{value}</span>
  </div>
);

const { followers, following, repositories, contributions, pullRequests } =
  props;

return (
  <div
    class="container"
    style={{
      color: " #fff",
      background: "#272727",
      padding: "20px",
      border: "2px solid #282828",
      "border-radius": "13px",
      heigth: "100vh",
    }}
  >
    <div
      style={{
        "text-align": "center",
        "padding-bottom": "10px",
      }}
    >
      <img
        src={props.avatarUrl}
        style={{ width: "60px", "border-radius": "50px" }}
        alt="avatar"
      />
      <h2>{props.login}</h2>
      <div style={{ color: "#6761E9" }}>Performace</div>
    </div>
    <div style={{ display: "flex" }}>
      {renderStat("Followers", followers)}
      {renderStat("Following", following)}
    </div>
    <div style={styleStat}>{renderStat("Repositories", repositories)}</div>
    <div style={styleStat}>{renderStat("Contributions", contributions)}</div>
    <div style={styleStat}>{renderStat("Pull Requests", pullRequests)}</div>
    <h3 style={{ "font-weight": "500" }}>NEAR.social</h3>
    <div style={{ display: "flex" }}>
      <div style={styleStat}>{renderStat("Likes", "n/a")}</div>
      <div style={styleStat}>{renderStat("Posts", "n/a")}</div>
    </div>
  </div>
);
