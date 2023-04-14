const accountId = props.accountId || "evrything.near"; // which account's Types to use
const font = props.font || "Times New Roman"; // custom font for H1
const type = props.type || "everything"; // selected type
const text = props.text || type.toLowerCase(); // text for H1

const H1 = styled.h1`
  font-family: ${font}, Times, serif;
  font-size: 4em;
  line-height: 1.25;
  font-weight: 400;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const Controller = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: 160px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0 4px;
`;

const Button = styled.button`
    text-transform: lowercase !important;
`;

const types = Social.keys(`${accountId}/type/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

types = Object.entries(types[accountId].type ?? {});

State.init({
  title: text,
  type: type,
});

const handleSelectType = (typeName) => {
  if (typeName === "everything") {
    State.update({
      title: text,
      type: "everything",
    });
  } else {
    State.update({
      title: typeName.toLowerCase() + "s",
      type: `${accountId}/type/${typeName}`,
    });
  }
};

return (
  <>
    <Container>
      <Controller>
        <H1>{state.title}</H1>
        <ButtonRow>
          {state.type === "everything" ? (
            <>
              {types.map((it) => (
                <Button onClick={() => handleSelectType(it[0])}>
                  {it[0] + "s"}
                </Button>
              ))}
              {context.accountId === accountId ? ( // currently thinking the button should only show if you are able to create types in domain
                <a
                  href={`/#/evrything.near/widget/Everything.Create.Type`} // this could get way more intense
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button>+</Button>
                </a>
              ) : null}
            </>
          ) : (
            <>
              <Button onClick={() => handleSelectType("everything")}>
                back
              </Button>
              <a
                href={`/#/evrything.near/widget/Everything.Type.Details?type=${accountId}/type/${state.type}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button>view type details</Button>
              </a>
              <a
                href={`/#/evrything.near/widget/Everything.Type.Create?type=${accountId}/type/${state.type}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button>create new</Button>
              </a>
            </>
          )}
        </ButtonRow>
      </Controller>
      <Widget
        src={"evrything.near/widget/Everything.Things"}
        props={{
          type: `${accountId}/type/${state.type}`,
        }}
      />
    </Container>
  </>
);
