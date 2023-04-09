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
              href={`/#/evrything.near/widget/Everything.Type.Overview?type=${accountId}/type/${it[0]}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <button className="text-lowercase">{it[0] + "s"}</button>
            </a>
          ))}
          {context.accountId === accountId ? ( // currently thinking the button should only show if you are able to create types in domain
            <a
              href={`/#/evrything.near/widget/Everything.Create.Type`} // this could get way more intense
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <button className="text-lowercase">+</button>
            </a>
          ) : null}
        </div>
      </div>
      <Widget
        src={"evrything.near/widget/Everything.Things"}
        props={{
          type: `${accountId}/type/Everything`,
        }}
      />
    </div>
  </>
);
