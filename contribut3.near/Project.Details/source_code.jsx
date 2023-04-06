const onSave = props.onSave ?? (() => { });
const ownerId = "contribut3.near";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  padding: 0.5em 0.2em;
`;

const Heading = styled.div`
  padding-bottom: 0.5em;
  border-bottom: 1px solid #eceef0;
  font-style: normal;
  font-weight: 600;
  font-size: 1em;
  line-height: 1.4em;
  color: #000;
  width: 100%;
`;

return (
  <Container>
    <Heading>Details</Heading>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Website",
        id: "website",
        value: "layers.gg",
        link: "https://layers.gg",
        onSave: (website) => onSave({ website }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Category",
        id: "category",
        value: "Wallets",
        options: [{ name: "Wallets" }, { name: "Games" }, { name: "Social" }, { name: "Other" }],
        onSave: ([{ name: category }]) => onSave({ category }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Integration",
        id: "integration",
        value: "Native",
        options: [{ name: "Native" }, { name: "Multichain" }],
        onSave: ([{ name: integration }]) => onSave({ integration }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Development phase",
        id: "phase",
        value: "Testnet launched",
        options: [{ name: "Testnet launched" }, { name: "Mainnet launched" }, { name: "In development" }, { name: "Concept" }],
        onSave: ([{ name: phase }]) => onSave({ phase }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Stage",
        id: "stage",
        value: "Pre-Seed",
        options: [
          { name: "Pre-Seed" },
          { name: "Seed" },
          { name: "Series A" },
          { name: "Series B" },
          { name: "Series C" },
          { name: "Series D" },
          { name: "Late Stage" },
          { name: "IPO" },
        ],
        onSave: ([{ name: stage }]) => onSave({ stage }),
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Text`}
      props={{
        label: "Location",
        id: "location",
        value: "San Francisco, CA",
        onSave: (geo) => onSave({ geo }),
      }}
    />
  </Container>
);
