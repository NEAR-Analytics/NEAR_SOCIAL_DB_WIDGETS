const accountId = props.accountId || "evrything.near";
const type = props.type || "evrything.near/type/Everything";

return (
  <>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Widget
          src="evrything.near/widget/H1"
          props={{ text: type.split("/")[2].toLowerCase() }}
        />
      </div>
    </div>
  </>
);
