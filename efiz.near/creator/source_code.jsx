const Container = styled.div`
    display: flex;
    height: 100%;
  `;

const SidePanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    background-color: #f2f2f2;
    width: 300px;
    z-index: 50;
  `;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 20px;
  `;

const Header = styled.h2`
    margin-bottom: 20px;
  `;

const Footer = styled.div`
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
  `;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #5fba7d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  `;

const LeftPanelItem = styled.div`
    padding: 8px;
    background-color: #ccc;
    color: white;
    border-radius: 4px;
  `;

const Select = styled.select`
  `;

const Label = styled.label`
`;

const Input = styled.input`
  `;

State.init({
  data: {},
});

const handleOnChange = (value) => {
  State.update({ data: { ...state.data, ...value } });
};

const handleApply = () => {
  State.update({
    config: state.data,
    template: state.templateVal,
  });
  // set the props for the main content
};

const handleSave = () => {
  // create the thing
};

let availableTypes = [];
const types = Social.get("efiz.near/type/**", "final");
if (types !== null) {
  availableTypes =
    Object.keys(types)?.map((it) => `efiz.near/type/${it}`) || [];
}

const handleTypeChange = (e) => {
  State.update({ selectedType: e.target.value });
};

return (
  <Container>
    <SidePanel>
      <Label>Type</Label>
      <Select value={state.selectedType} onChange={handleTypeChange}>
        <option value="">Select a type</option>
        {availableTypes?.map((it) => (
          <option value={it} key={it}>
            {it}
          </option>
        ))}
      </Select>
      <Label>Template</Label>
      <Input
        value={state.templateVal}
        onChange={(e) => State.update({ templateVal: e.target.value })}
      />
      <Widget
        src="efiz.near/widget/create"
        props={{
          item: {
            type: state.selectedType,
            value: state.data,
          },
          onChange: handleOnChange,
        }}
      />
      <Footer>
        <Button onClick={() => handleApply()}>apply</Button>
        <Button onClick={() => handleSave()} disabled={true}>
          save
        </Button>
      </Footer>
    </SidePanel>
    <MainContent>
      <Header></Header>
      <Widget
        src="efiz.near/widget/Every.Thing.View"
        props={{ path: state.template, data: state.config }}
      />
    </MainContent>
  </Container>
);
