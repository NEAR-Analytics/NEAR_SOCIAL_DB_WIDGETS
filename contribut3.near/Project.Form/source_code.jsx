const ownerId = "contribut3.near";

State.init({
  name: "",
});

return <Widget src={`${ownerId}/widget/Inputs.Text`} props={{ label: "Project name *", placeholder: "Layers", value: state.name, onChange: (name) => State.update({ name }) }} />;
