const ownerId = "contribut3.near";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 3em;
`;

const Header = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 2em;
  line-height: 1.4em;
  text-align: center;
  color: #000000;
`;

const SubHeader = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: .95em;
  line-height: 1.25em;
  text-align: center;
  color: #101828;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 60%;
  gap: 1em;
`;

const FormHeader = styled.h3`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px .5em;
  border-bottom: 1px solid #eceef0;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.25em;
  color: #000000;
  width: 100%;
`;

State.init({
  name: "",
  accountId: "",
  category: null,
  integration: null,
  dev: null,
});

return (
  <Container>
    <div>
      <Header>Create new project</Header>
      <SubHeader>
        Crypto ipsum bitcoin ethereum dogecoin litecoin. Ethereum kadena polkadot ICON BitTorrent. Crypto ipsum bitcoin ethereum dogecoin litecoin. Ethereum kadena
      </SubHeader>
    </div>
    <Form>
      <FormHeader>General</FormHeader>
      <Widget
        src={`${ownerId}/widget/Inputs.Text`}
        props={{
          label: "Project name *",
          placeholder: "Layers",
          value: state.name,
          onChange: (name) => State.update({ name }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.AccountId`}
        props={{
          label: "NEAR Account *",
          placeholder: "layers.near",
          value: state.accountId,
          onChange: (accountId) => State.update({ accountId }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Project category *",
          placeholder: "Wallets",
          options: [{ text: "Wallets", value: "wallets" }, { text: "Games", value: "games" }],
          value: state.category,
          onChange: (category) => State.update({ category }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Integration with NEAR *",
          placeholder: "Native",
          options: [{ text: "Native", value: "native" }, { text: "Multichain", value: "multichain" }],
          value: state.integration,
          onChange: (integration) => State.update({ integration }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "Development phase *",
          placeholder: "Testnet launched",
          options: [{ text: "Testnet launched", value: "testnet" }, { text: "Mainnet launched", value: "mainnet" }, { text: "In development", value: "development" }],
          value: state.dev,
          onChange: (dev) => State.update({ dev }),
        }}
      />
    </Form>
  </Container>
);
