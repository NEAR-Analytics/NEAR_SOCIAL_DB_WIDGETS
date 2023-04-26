const ownerId = "nearhorizon.near";

const options = [
  { text: "Native", value: "native" },
  { text: "Multichain", value: "multichain" },
  { text: "Not yet but interested", value: "interested" },
  { text: "No", value: "no" },
];

return (
  <Widget
    src={`${ownerId}/widget/Inputs.Select`}
    props={{
      label: "Integration with NEAR *",
      noLabel: props.noLabel,
      placeholder: "Native",
      options,
      value: props.integration,
      onChange: (integration) => props.update(integration),
      validate: (integration) => {
        if (!integration) {
          props.setError("Please select a integration");
        }

        if (!options.find(({ value }) => integration.value === value)) {
          props.setError("Please select a valid integration");
        }
      },
      error: props.error,
    }}
  />
);
