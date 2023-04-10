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

types = Object.entries(types[accountId].type ?? {});

State.init({
  title: text,
  type: "Everything",
});

const handleSelectType = (typeName) => {
  if (typeName === "Everything") {
    State.update({
      title: typeName.toLowerCase(),
      type: typeName,
    });
  } else {
    State.update({
      title: typeName.toLowerCase() + "s",
      type: typeName,
    });
  }
};

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
        <H1>{state.title}</H1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 4,
            margin: "0 4px",
          }}
        >
          {state.type === "Everything" ? (
            <>
              {types.map((it) => (
                <button
                  className="text-lowercase"
                  onClick={() => handleSelectType(it[0])}
                >
                  {it[0] + "s"}
                </button>
              ))}
              {context.accountId === accountId ? ( // currently thinking the button should only show if you are able to create types in domain
                <a
                  href={`/#/evrything.near/widget/Everything.Create.Type`} // this could get way more intense
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <button className="text-lowercase">+</button>
                </a>
              ) : null}
            </>
          ) : (
            <>
              <button
                className="text-lowercase"
                onClick={() => handleSelectType("Everything")}
              >
                back
              </button>
              <a
                href={`/#/evrything.near/widget/Everything.Type.Details?type=${type}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <button className="text-lowercase">view type details</button>
              </a>
              <a
                href={`/#/evrything.near/widget/Everything.Type.Create?type=${type}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <button className="text-lowercase">create new</button>
              </a>
            </>
          )}
        </div>
      </div>
      <Widget
        src={"evrything.near/widget/Everything.Things"}
        props={{
          type: `${accountId}/type/${state.type}`,
        }}
      />
    </div>
  </>
);
