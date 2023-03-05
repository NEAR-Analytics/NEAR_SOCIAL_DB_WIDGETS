const styleStat = {
  display: "flex",
  "flex-direction": "column",
  "font-weight": 500,
  "font-size": "16px",
  "line-height": "24px",
  "padding-right": "20px",
  "padding-bottom": "10px",
};

return (
  <div
    class="container-fluid"
    style={{
      color: " #fff",
      background: "#272727",
      padding: "20px",
      border: "2px solid #282828",
      "border-radius": "13px",
      width: "100vw",
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
      <div style={styleStat}>
        <span>Followers</span>
        <span>{props.followers}</span>
      </div>
      <div style={styleStat}>
        <span>Following</span>
        <span>{props.following}</span>
      </div>
    </div>
    <div style={styleStat}>
      <span>Repositories</span>
      <span>{props.repositories}</span>
    </div>
    <div style={styleStat}>
      <span>Contributions</span>
      <span>{props.contributions}</span>
    </div>
    <div style={styleStat}>
      <span>Pull Requests</span>
      <span>{props.pullRequests}</span>
    </div>
    <h3>Near</h3>
    <div style={{ display: "flex" }}>
      <div style={styleStat}>
        <span>Likes</span>
        <span>{props.pullRequests}</span>
      </div>
      <div style={styleStat}>
        <span>Posts</span>
        <span>{props.pullRequests}</span>
      </div>
    </div>
  </div>
);
