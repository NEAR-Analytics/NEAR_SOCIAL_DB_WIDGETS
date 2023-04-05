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
          props={{ text: type.split("/")[2].toLowerCase() + "s" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
          }}
        >
          <a
            href={"/#/evrything.near/widget/Everything"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button className="text-lowercase">back</button>
          </a>
          <a
            href={`/#/evrything.near/widget/Everything.Type.Details?type=${type}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button className="text-lowercase">view type details</button>
          </a>
          <button className="text-lowercase">create new</button>
        </div>
      </div>
      <Widget
        src={"evrything.near/widget/Everything.Things"}
        props={{
          type,
        }}
      />
    </div>
  </>
);
