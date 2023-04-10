const accountId = props.accountId || "evrything.near"; // which account's Types to use
const font = props.font || "Times New Roman"; // custom font for H1
const type = props.type || "everything"; // selected type
const text = props.text || type.toLowerCase(); // text for H1
const view = props.view || "THINGS";
const domain = props.domain || "everything"; // where to index data from

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
  selectedTab: view,
});

const handleSelectType = (typeName) => {
  if (typeName === "everything") {
    State.update({
      title: text,
      type: "everything",
      selectedTab: "THINGS",
    });
  } else {
    State.update({
      title: typeName.toLowerCase() + "s",
      type: typeName,
      selectedTab: "THINGS",
    });
  }
};

const handleTypeDetails = () => {
  State.update({
    selectedTab: "DETAILS",
  });
};

const handleTypeCreate = () => {
  State.update({
    selectedTab: "CREATE",
  });
};

const renderView = () => {
  switch (state.selectedTab) {
    case "DETAILS":
      return <div>Type details : ${state.type}</div>;
    case "CREATE":
      return (
        <Widget
          src={`${accountId}/widget/Everything.Create.${state.type}`}
          props={{
            type,
          }}
        />
      );
    case "THINGS":
      return (
        <Widget
          src={"evrything.near/widget/Everything.Things"}
          props={{
            type:
              state.type === "everything"
                ? "everything"
                : `${accountId}/type/${state.type}`,
            domain,
          }}
        />
      );
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
              <Button onClick={() => handleTypeDetails()}>
                view type details
              </Button>
              <Button onClick={() => handleTypeCreate()}>create new</Button>
            </>
          )}
        </ButtonRow>
      </Controller>
      {renderView()}
    </Container>
  </>
);
