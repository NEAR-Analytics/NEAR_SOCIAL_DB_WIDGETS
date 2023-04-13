const ownerId = "contribut3.near";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 3em;
  padding-bottom: 3em;
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
  font-size: 0.95em;
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
  padding: 0px 0px 0.5em;
  border-bottom: 1px solid #eceef0;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.25em;
  color: #000000;
  width: 100%;
`;

const FormFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

State.init({
  type: "",
  accountId: "",
  domain: "",
});

return (
  <Container>
    <Form>
      <Widget
        src={`${ownerId}/widget/Inputs.Text`}
        props={{
          label: "Type",
          placeholder: "What kind of page?",
          value: state.type,
          onChange: (type) => State.update({ type }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.AccountId`}
        props={{
          label: "NEAR Account ID",
          placeholder: "example.near",
          value: state.accountId,
          onChange: (accountId) => State.update({ accountId }),
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Text`}
        props={{
          label: "Domain",
          placeholder: "ABC",
          value: state.domain,
          onChange: (domain) => State.update({ domain }),
        }}
      />
      <FormFooter>
        <Widget
          src={`${ownerId}/widget/Buttons.Green`}
          props={{
            onClick: () => {
              Social.set({
                thing: {
                  main: JSON.stringify({
                    type: state.type,
                    accountId: state.accountId,
                    domain: state.domain,
                  }),
                },
                index: {
                  abc: JSON.stringify({
                    key: "main",
                    value: {
                      type: "hack.near/type/Page",
                    },
                  }),
                },
              });
            },
          }}
        />
      </FormFooter>
    </Form>
  </Container>
);
