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
});

return (
  <Container>
    <Header>Create new project</Header>
    <SubHeader>
      Crypto ipsum bitcoin ethereum dogecoin litecoin. Ethereum kadena polkadot ICON BitTorrent. Crypto ipsum bitcoin ethereum dogecoin litecoin. Ethereum kadena
    </SubHeader>
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
    </Form>
  </Container>
);
