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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
          }}
        >
          <a
            href={`/#/evrything.near/widget/Everything.Type.Overview?type=${type}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button className="text-lowercase">back</button>
          </a>
        </div>
      </div>
      <Widget
        src={`evrything.near/widget/Everything.Create.${type.split("/")[2]}`}
        props={{
          type,
        }}
      />
    </div>
  </>
);
