const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const defaultWidget = "hack.near/widget/DAO.Profile";

const widget = Social.get(`${daoId}/settings/dao/widget`);

if (widget === null) {
  return "Loading...";
}

State.init({
  widget: widget ?? defaultWidget,
});

const resetWidget = () => {
  state.widget = defaultWidget;
  State.update();
};

const widget_args = JSON.stringify({
  data: {
    [state.daoId]: {
      settings: {
        dao: {
          widget: state.widget,
        },
      },
    },
  },
});

const proposal_args = Buffer.from(widget_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "update featured widget",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "50000000000000000000000",
                  gas: "200000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: "100000000000000000000000",
      gas: "200000000000000",
    },
  ]);
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #11181c;
  margin: 0;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
`;

const Item = styled.div``;

const Div = styled.div`
  position: relative;
  @media (hover: hover) {
    > .edit-link {
      display: none;
    }
  }
  &:hover {
    > .edit-link {
      display: inline;
    }
  }
`;

return (
  <div>
    <Wrapper>
      <Header>
        <H1>Featured Widget</H1>
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{
            dep: true,
            authors: [daoId],
          }}
        />
        <b className="mt-2">INPUT NEW SOURCE PATH:</b>
        <input type="text" value={state.widget} placeholder={defaultWidget} />
        <div>
          {context.accountId && (
            <button
              key="edit"
              onClick={submit}
              disabled={state.widget === defaultWidget}
              className="btn btn-success edit-link position-absolute top-0 end-0 me-2 mt-1"
            >
              <i class="bi bi-patch-plus" /> Submit Proposal
            </button>
          )}
        </div>
        <Items>
          <Item>
            <Widget
              src="adminalpha.near/widget/ComponentCard"
              props={{
                src: `${state.widget}`,
              }}
            />
          </Item>
        </Items>
      </Header>
      <div className="mt-5">
        <Widget src={state.widget} props={{ accountId, daoId }} />
      </div>
    </Wrapper>
  </div>
);
