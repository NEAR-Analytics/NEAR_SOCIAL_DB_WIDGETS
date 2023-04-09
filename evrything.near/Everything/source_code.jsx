const accountId = props.accountId || "evrything.near";
const font = props.font || "Times New Roman";
const text = props.text || "everything";

const H1 = styled.h1`
    font-family: ${font}, Times, serif;
    font-size: 4em;
    line-height: 1.25;
    font-weight: 400;
`;

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
          marginTop: 160,
        }}
      >
        <H1>{text}</H1>
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
