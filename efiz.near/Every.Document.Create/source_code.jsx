const accountId = context.accountId || null;
const onChange = props.onChange;

if (accountId === null) {
  return "please login to a near account";
}

const FormContainer = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-top: 20px;
`;

const SectionContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 18px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
`;

const Button = styled.button`
  margin-left: 5px;
`;

State.init({
  components: [],
});

function handleSaveDocument() {
  const thing = {};
  const blocks = [];

  state.components?.forEach((entry) => {
    const entryId = Math.random();
    thing[entryId] = {
      data: entry.value,
      type: entry.type,
    };
    blocks.push(`${accountId}/thing/${entryId}`);
  });

  onChange(JSON.stringify(blocks));
}

function handleTypeClick(type) {
  State.update({ components: [...state.components, { type }] });
}

function handleDeleteClick(index) {
  const updatedComponents = [...state.components];
  updatedComponents.splice(index, 1);
  State.update({ components: updatedComponents });
}

function handleMoveUpClick(index) {
  if (index > 0) {
    const updatedComponents = [...state.components];
    const component = updatedComponents[index];
    updatedComponents.splice(index, 1);
    updatedComponents.splice(index - 1, 0, component);
    State.update({ components: updatedComponents });
  }
}

function handleMoveDownClick(index) {
  if (index < state.components.length - 1) {
    const updatedComponents = [...state.components];
    const component = updatedComponents[index];
    updatedComponents.splice(index, 1);
    updatedComponents.splice(index + 1, 0, component);
    State.update({ components: updatedComponents });
  }
}

function RenderComponent({ component, index }) {
  const isTop = index === 0;
  const isBottom = index === state.components.length - 1;

  const type = JSON.parse(Social.get(component.type, "final") || "null");
  const widgetSrc = type.widgets?.create;

  const handleComponentChange = (value) => {
    const updatedComponents = [...state.components];
    updatedComponents[index] = {
      ...updatedComponents[index],
      value,
    };
    State.update({ components: updatedComponents });
  };

  return (
    <div>
      <Widget
        src={widgetSrc}
        props={{
          data: state.components[index].value,
          onChange: handleComponentChange,
        }}
      />
      <Button onClick={() => handleDeleteClick(index)}>Delete</Button>
      <Button onClick={() => handleMoveUpClick(index)} disabled={isTop}>
        &uarr;
      </Button>
      <Button onClick={() => handleMoveDownClick(index)} disabled={isBottom}>
        &darr;
      </Button>
    </div>
  );
}

return (
  <div>
    <Button onClick={() => handleTypeClick("efiz.near/type/Image")}>
      Add Image
    </Button>
    <Button onClick={() => handleTypeClick("efiz.near/type/paragraph")}>
      Add Paragraph
    </Button>
    {state.components.map((component, index) => (
      <RenderComponent key={index} component={component} index={index} />
    ))}
    <Button onClick={handleSaveDocument}>save</Button>
  </div>
);
