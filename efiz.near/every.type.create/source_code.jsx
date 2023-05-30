const type = props.type || null;
const blockHeight = props.blockHeight || "final";

if (type) {
  const parts = type.split("/");
  type = JSON.parse(Social.get(type, blockHeight) || null);
  type.name = parts[2];
}

State.init({
  typeName: type.name || "",
  properties: type.properties || [],
  newPropertyName: "",
  newPropertyType: "string",
  newPropertyRequired: false,
});

const FormContainer = styled.div`
  margin: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  max-width: 200px;
  margin-bottom: 10px;
  height: 30px;
`;

const Select = styled.select`
  height: 30px;
`;

const Button = styled.button`
  height: 30px;
`;

const Text = styled.p`
  display: inline-block;
  margin-right: 10px;
`;

const handleAddProperty = () => {
  if (state.newPropertyName.trim() === "") return;

  const newProperty = {
    name: state.newPropertyName,
    type: state.newPropertyType,
    required: state.newPropertyRequired,
  };

  State.update({
    properties: [...state.properties, newProperty],
    newPropertyName: "",
    newPropertyType: "heading-one",
    newPropertyRequired: false,
  });
};

const handleRemoveProperty = (index) => {
  const updatedProperties = [...state.properties];
  updatedProperties.splice(index, 1);
  State.update({ properties: updatedProperties });
};

const handlePropertyChange = (e, index) => {
  const updatedProperties = [...state.properties];
  updatedProperties[index].name = e.target.value.toLowerCase();
  State.update({ properties: updatedProperties });
};

const handleTypeChange = (e, index) => {
  const updatedProperties = [...state.properties];
  updatedProperties[index].type = e.target.value;
  State.update({ properties: updatedProperties });
};

const handleRequiredChange = (e, index) => {
  const updatedProperties = [...state.properties];
  updatedProperties[index].required = e.target.value === "true";
  State.update({ properties: updatedProperties });
};

const handleTypeNameChange = (e) => {
  State.update({ typeName: e.target.value.toLowerCase() });
};

const composeData = () => {
  const data = {
    type: {
      [state.typeName]: JSON.stringify({
        properties: state.properties,
      }),
    },
  };
  return data;
};

function TypeSelect({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange}>
      <option value="string">string</option>
      <option value="heading-one">h1</option>
      <option value="paragraph">paragraph</option>
      <option value="code">code</option>
      <option value="feed">feed</option>
    </Select>
  );
}

function RequiredSelect({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange}>
      <option value="true">true</option>
      <option value="false">false</option>
    </Select>
  );
}

return (
  <FormContainer>
    <Row>
      <Text>Type Name:</Text>
      <Input
        type="text"
        placeholder="Type Name"
        value={state.typeName}
        onChange={handleTypeNameChange}
      />
    </Row>
    <Text>Properties:</Text>
    {state.properties.map((property, index) => (
      <Row key={index}>
        <Input
          type="text"
          value={property.name}
          onChange={(e) => handlePropertyChange(e, index)}
        />
        <TypeSelect
          value={property.type}
          onChange={(e) => handleTypeChange(e, index)}
        />
        <RequiredSelect
          value={property.required}
          onChange={(e) => handleRequiredChange(e, index)}
        />
        <Button onClick={() => handleRemoveProperty(index)}>Remove</Button>
      </Row>
    ))}
    <Row>
      <Input
        type="text"
        placeholder="Property Name"
        value={state.newPropertyName}
        onChange={(e) =>
          State.update({ newPropertyName: e.target.value.toLowerCase() })
        }
      />
      <TypeSelect
        value={state.newPropertyType}
        onChange={(e) => State.update({ newPropertyType: e.target.value })}
      />
      <RequiredSelect
        value={state.newPropertyRequired}
        onChange={(e) =>
          State.update({ newPropertyRequired: e.target.value === "true" })
        }
      />
      <Button
        onClick={handleAddProperty}
        disabled={state.newPropertyName.trim() === ""}
      >
        Add Property
      </Button>
    </Row>
    <CommitButton
      force
      data={composeData()}
      disabled={state.properties.length === 0}
      className="styless"
    >
      create
    </CommitButton>
  </FormContainer>
);
