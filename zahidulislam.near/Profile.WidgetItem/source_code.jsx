const gateway = "https://test.near.social/#/";

return (
  <a
    href={`${gateway + props.accountId}/widget/${props.name}`}
    target="_blank"
    className="widgetItem"
  >
    <h3 className="max1Lines">{props.name}</h3>
    <p className="max1Lines">{`${props.accountId}/widget/${props.name}`}</p>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginTop: 15,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <img
          className="invertColor"
          style={{ height: 16, opacity: 0.5 }}
          src="https://cdn-icons-png.flaticon.com/512/9357/9357448.png"
          alt="commit icon"
        />

        <p style={{ fontWeight: 600 }}>96</p>
      </div>

      <img
        className="invertColor"
        style={{ height: 3, opacity: 0.5 }}
        src="https://cdn-icons-png.flaticon.com/512/0/14.png"
        alt="dot icon"
      />

      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <img
          className="invertColor"
          style={{ height: 14, opacity: 0.5 }}
          src="https://cdn-icons-png.flaticon.com/512/37/37663.png"
          alt="date icon"
        />

        <p style={{ fontWeight: 600 }}>5 days ago</p>
      </div>
    </div>
  </a>
);
