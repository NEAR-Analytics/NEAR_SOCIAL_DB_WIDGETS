const accountId = props.accountId || "evrything.near";
const text = props.text || accountId;
const styles = props.styles || {
  font: "Times New Roman",
};
const types = props.types || [];

const H1 = styled.h1`
  font-family: ${styles.font}, Times, serif;
  font-size: 4em;
  line-height: 1.25;
  font-weight: 400;
  cursor: pointer;
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

State.init({
  title: text,
  selectedTab: view,
});

const handleSelectType = (typeName) => {
  if (typeName) {
    State.update({
      title: typeName.toLowerCase().split("/")[2] + "s",
      type: typeName,
      selectedTab: "THINGS",
    });
  } else {
    State.update({
      title: text,
      type: null,
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

const handleViewThings = () => {
  State.update({
    selectedTab: "THINGS",
  });
};

const renderView = () => {
  switch (state.selectedTab) {
    case "DETAILS":
      return <div>Type details : ${state.type}</div>;
    case "CREATE":
      if (state.type === "everything") {
        return (
          <div className="w-100">
            <Widget
              src={`evrything.near/widget/Everything.Create.Type`}
              props={{
                type,
              }}
            />
          </div>
        );
      } else {
        return (
          <div className="w-100">
            // TODO: This should reference the Type itself
            <Widget
              src={`${accountId}/widget/Everything.Create.${state.type}`}
              props={{
                type,
              }}
            />
          </div>
        );
      }
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
    default:
      return null;
  }
};

return (
  <>
    <Container>
      <Controller>
        <H1 onClick={() => handleViewThings()}>{state.title}</H1>
        <ButtonRow>
          {state.type ? (
            <>
              <Button onClick={() => handleSelectType(null)}>back</Button>
              <Button onClick={() => handleTypeDetails()}>
                view type details
              </Button>
              <Button onClick={() => handleTypeCreate()}>create new</Button>
            </>
          ) : (
            <>
              {types.map((it) => (
                <Button onClick={() => handleSelectType(it)}>
                  {it.split("/")[2] + "s"}
                </Button>
              ))}
              {context.accountId === accountId ? ( // currently thinking the button should only show if you are able to create types in domain
                <Button onClick={() => handleTypeCreate()}>+</Button>
              ) : null}
            </>
          )}
        </ButtonRow>
      </Controller>
      {renderView()}
    </Container>
  </>
);
