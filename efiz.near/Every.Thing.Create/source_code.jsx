const type = props.type || "";
const postThing = props.postThing;

State.init({
  selectedType: type,
});

const composeData = () => {
  // generate a random id
  const thingId = Math.random();
  const data = {
    thing: {
      ...state.extra,
      [thingId]: JSON.stringify({
        data: state.thing,
        type: state.selectedType,
      }),
    },
    index: {
      thing: JSON.stringify({
        key: thingId,
        value: {
          type: state.selectedType,
        },
      }),
    },
  };
  if (postThing) {
    data = postThing(data);
  }
  return data;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const Select = styled.select`
  padding: 5px;
  width: 100%;
`;

const SwitchButton = styled.button`
  padding: 5px 10px;
  background-color: ${({ active }) => (active ? "#5fba7d" : "#ccc")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
`;

const TextContainer = styled.div`
    margin-left: 4px;
`;

const handleTypeChange = (e) => {
  State.update({ selectedType: e.target.value });
};

type = JSON.parse(Social.get(state.selectedType, "final") || null);

if (type === null) {
  return <></>;
}

const handleThingData = (value, extra) => {
  State.update({ thing: value, extra });
};

return (
  <>
    <Container>
      {props.type === undefined ? (
        <>
          <Row>
            <TextContainer>create a thing of type:</TextContainer>
          </Row>
          <Row>
            <Select value={state.selectedType} onChange={handleTypeChange}>
              <option value="">Select a type</option>
              <option value="efiz.near/type/paragraph">
                efiz.near/type/paragraph
              </option>
              <option value="efiz.near/type/Image">efiz.near/type/Image</option>
              <option value="efiz.near/type/document">
                efiz.near/type/document
              </option>
            </Select>
          </Row>
        </>
      ) : null}

      {type?.widgets?.create && (
        <Widget
          src={type?.widgets?.create}
          props={{ onChange: handleThingData }} // onChange
        />
      )}
    </Container>
    <CommitButton
      force
      data={composeData()}
      disabled={!state.thing}
      className="styless"
    >
      create
    </CommitButton>
  </>
);
