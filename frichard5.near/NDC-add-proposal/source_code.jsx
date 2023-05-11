const { widgetProvider, policy, account } = props;
const account = props.account || "marketing.sputnik-dao.near";
const apiPolicyUrl = `https://api.pikespeak.ai/daos/policy`;

State.init({
  type: "Vote",
});

const selectType = (e) => {
  State.update({
    type: e.target.value,
  });
};

const selectToken = (e) => {
  State.update({
    token: e.target.value,
  });
};

const getPayload = (type, data) => {
  switch (type) {
    case "Vote":
      return {
        proposal: {
          description: data.description,
          kind: "Vote",
        },
      };
    case "Transfer":
      return {
        proposal: {
          description: data.description,
          kind: {
            Transfer: {
              token_id: "",
              receiver_id: data.target,
              amount: "1000000000000000000000000000",
            },
          },
        },
      };
  }
};

const sendProposal = () => {
  Near.call([
    {
      contractName: account,
      methodName: "add_proposal",
      args: getPayload(state.type, state.data),
      gas: "300000000000000",
      deposit: "100000000000000000000000",
    },
  ]);
};

const proposalTypes = [
  "Transfer",
  "Vote",
  "FunctionCall",
  "AddBounty",
  "BountyDone",
  "AddMemberToRole",
  "RemoveMemberFromRole",
].map((t) => {
  return {
    value: t,
    label: t,
  };
});

const fetchPolicy = (params) => {
  asyncFetch(forgeUrl(apiPolicyUrl, params), {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  }).then(({ err, body, ok }) => {
    if (ok) {
      State.update({
        policy: body,
      });
    }
  });
};

fetchPolicy({ daos: [account] });
console.log("STATE", state);
const ProposalCard = styled.div`
    position: relative;
    height: 400px;
    width: 80%;
    margin: 50px auto;
    box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
    overflow: auto;
    border-radius: 4px;
    padding: 20px;
    background: white;
    svg {
        height: 20px;
        &.approved-icon {
            fill:#13a36e;
        }
        &.rejected-icon {
            fill: #ff5e03;
        }
        &.not-voted-yet-icon {
            fill:  rgb(140, 140, 140)
        }
    }
`;

const ProposalForm = styled.div`

`;

const InputText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  width: fit-content;
`;

const AmountSelector = styled.div`
    display: flex;
`;

console.log(state);
return (
  <ProposalCard>
    <Widget
      src={`${widgetProvider}/widget/NDC-select`}
      props={{
        widgetProvider,
        options: proposalTypes,
        selectedOption: state.type,
        onChange: selectType,
        label: "Type",
        id: "proposal-type-selector",
      }}
    />

    <ProposalForm>
      <InputText>
        <label style={{ color: "#8c8c8c" }} for={id}>
          {"Description"}
        </label>
        <input
          type="text"
          onChange={(e) => {
            State.update({
              data: { ...state.data, description: e.target.value },
            });
          }}
          placeholder={"Describe your proposal here."}
        />
      </InputText>
      {state.type === "Transfer" && (
        <>
          <AmountSelector>
            <InputText>
              <label style={{ color: "#8c8c8c" }} for={id}>
                {"Amount"}
              </label>
              <input
                type="text"
                onChange={(e) => {
                  State.update({
                    data: { ...state.data, amount: e.target.value },
                  });
                }}
                placeholder={"0"}
              />
            </InputText>
            <Widget
              src={`${widgetProvider}/widget/NDC-select`}
              props={{
                widgetProvider,
                options: ["NEAR"],
                selectedOption: near,
                onChange: selectToken,
                label: "Token",
                id: "token-selector",
              }}
            />
          </AmountSelector>
          <InputText>
            <label style={{ color: "#8c8c8c" }} for={id}>
              {"Target"}
            </label>
            <input
              type="text"
              onChange={(e) => {
                State.update({
                  data: { ...state.data, target: e.target.value },
                });
              }}
              placeholder={"receiver.near"}
            />
          </InputText>
        </>
      )}
    </ProposalForm>

    <button onClick={sendProposal}>Propose</button>
  </ProposalCard>
);
