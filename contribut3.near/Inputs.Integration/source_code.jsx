const ownerId = "contribut3.near";

const options = [
  { text: "Native", value: "native" },
  { text: "Multichain", value: "multichain" },
  { text: "Not yet but interested", value: "interested" },
  { text: "No", value: "no" },
]

return (
  <Widget
    src={`${ownerId}/widget/Inputs.Select`}
    props={{
      label: "Integration with NEAR *",
      placeholder: "Native",
      options,
      value: props.integration,
      onChange: (integration) => props.update(integration),
    }}
  />
);
