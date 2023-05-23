const action = props.action || "";
const type = props.type || "";

State.init({
  selectedAction: action,
  selectedType: type,
});

const composeData = () => {
  // generate a random id
  // only really needs to be unique to user
  const thingId = Math.random();
  return {
    data: {
      thing: {
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
    },
  };
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

const handleActionChange = (e) => {
  State.update({ selectedAction: e.target.value });
};

const handleQuantityToggle = () => {
  State.update({ isMultiple: !state.isMultiple });
};

// <ButtonContainer>
//   <SwitchButton
//     active={state.isMultiple}
//     onClick={handleQuantityToggle}
//   >
//     {state.isMultiple ? "Many" : "One"}
//   </SwitchButton>
// </ButtonContainer>

const handleTypeChange = (e) => {
  State.update({ selectedType: e.target.value });
};

type = JSON.parse(Social.get(state.selectedType, "final") || null);

// then this has the create button
// and builds the onChange state

const handleThingData = (value) => {
  console.log(value);
  State.update({ thing: value });
};

return (
  <>
    <Container>
      <Row>
        <Select value={state.selectedAction} onChange={handleActionChange}>
          <option value="">Select an action</option>
          <option value="view">view</option>
          <option value="create">create</option>
          <option value="edit">edit</option>
        </Select>
      </Row>
      <Row>
        <TextContainer>a thing of type:</TextContainer>
      </Row>
      <Row>
        <Select value={state.selectedType} onChange={handleTypeChange}>
          <option value="">Select a type</option>
          <option value="efiz.near/type/Image">image</option>
        </Select>
      </Row>
      {type?.widgets[state.selectedAction] && (
        <Widget
          src={type?.widgets[state.selectedAction]}
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
