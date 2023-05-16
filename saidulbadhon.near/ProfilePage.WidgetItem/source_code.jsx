const gateway = "https://near.social/#/";

const WidgetItem = styled.a`
  border: 1px solid #363b42;

  gap: 5px;
  padding: 15px 20px 20px 20px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &:hover: {
    border: 1px solid #828a94;
    cursor: pointer;
  }
`;

return (
  <WidgetItem
    href={`${gateway + props.accountId}/widget/${props.name}`}
    target="_blank"
  >
    <h3
      className="max1Lines"
      style={{
        color: "#24292f",
        fontSize: "1.17em",
        fontWeight: "bold",
      }}
    >
      {props.name}
    </h3>
    <p
      className="max1Lines"
      sstyle={{
        fontSize: "0.9rem",
        color: "#57606a",
        overflowWrap: "break-word",
      }}
    >{`${props.accountId}/widget/${props.name}`}</p>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginTop: 15,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 2.5 }}>
        <img
          className="invertColor"
          style={{ height: 16, opacity: 0.5 }}
          src="https://cdn-icons-png.flaticon.com/512/9357/9357448.png"
          alt="commit icon"
        />

        <p style={{ fontWeight: 600 }}>{props.commits.length || 0}</p>
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
        <Widget
          src={`mob.near/widget/TimeAgo`}
          props={{
            blockHeight: props.commits[props.commits.length - 1],
            className: "description",
          }}
        />
      </div>
    </div>
  </WidgetItem>
);
