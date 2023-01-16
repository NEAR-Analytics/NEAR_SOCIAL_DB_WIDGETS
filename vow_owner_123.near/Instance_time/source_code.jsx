const title = {
  display: "flex",
  justifyContent: "center",
  width: "70%",
  padding: "1.5rem",
  marginBottom: "1rem",
  background: "#9747FF",
  color: "white",
  borderRadius: "2rem",
  fontWeight: 600,
  fontSize: "xx-large",
  boxShadow: "5px 5px lightyellow",
};
const flex_column = {
  display: "flex",
  flexDirection: "column",
  width: "95%",
};
return (
  <div style={flex_column} className="align-items-center">
    <div style={title}>Weekly Schedule</div>
    <Widget
      src="vow_owner_123.near/widget/Instance_time_review"
      props={{
        accountId: d.accountId,
        className: "d-inline-block",
        style: { width: "1.5em", height: "1.5em" },
      }}
    />
  </div>
);
