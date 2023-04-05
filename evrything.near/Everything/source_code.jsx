const accountId = props.accountId || "evrything.near";

const types = Social.keys(`${accountId}/type/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

// All types from every account
// const data = Social.keys("*/type/*");

types = Object.entries(types[accountId].type ?? {});

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
        <Widget src="evrything.near/widget/H1" />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 4,
            margin: "0 4px",
          }}
        >
          {types.map((it) => (
            <a
              href={`/#/evrything.near/widget/Everything.Type.Overview?type=evrything.near/type/${it[0]}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <button className="text-lowercase">{it[0] + "s"}</button>
            </a>
          ))}
          <button className="text-lowercase">+</button>
        </div>
      </div>
      <Widget
        src={"evrything.near/widget/Everything.Things"}
        props={{
          type: "evrything.near/type/Everything",
        }}
      />
    </div>
  </>
);
