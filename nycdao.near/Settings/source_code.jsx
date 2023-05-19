const daoId = props.daoId;

let string = "sputnik-dao.near";

const source = "mob.near/widget/Hashtag.Feed";

State.init({
  daoId: daoId ?? "",
  hashtag: hashtag ?? tag,
  isValid: false,
});

const checkAccount = (daoId) => {
  if (daoId.indexOf(string) !== -1) {
    return State.update({ isValid: true });
  }
};

const isDao = checkAccount(state.daoId);

const community_args = JSON.stringify({
  data: {
    [state.daoId]: {
      settings: {
        dao: {
          main: {
            tag: state.hashtag,
          },
        },
      },
    },
  },
});

const widget_args = JSON.stringify({
  data: {
    [state.daoId]: {
      widget: {
        [`${state.hashtag}.Feed`]: {
          "": `const hashtag = props.hashtag ?? "${state.hashtag}"; return (<Widget src="${source}" props={{ hashtag }} />);`,
          metadata: {
            tags: {
              community: "",
            },
          },
        },
      },
    },
  },
});

const proposal_args = Buffer.from(community_args, "utf-8").toString("base64");
const create_args = Buffer.from(widget_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: state.daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "new DAO.Main",
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

const handleCreate = () => {
  Near.call([
    {
      contractName: state.daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "new DAO.Widget",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: create_args,
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

const onChangeDao = (daoId) => {
  State.update({
    daoId,
  });
};

const onChangeTag = (hashtag) => {
  State.update({
    hashtag,
  });
};

return (
  <>
    <h3>Community Feed</h3>
    <div className="mt-3">
      <h5>Shared Account</h5>
      {isDao ? (
        <p>🗳️ ✅ ~ group voting enabled</p>
      ) : (
        <p>🗳️ 🆔 ~ permissions required</p>
      )}
      <input
        type="text"
        value={state.daoId}
        placeholder="<example>.near"
        onChange={(e) => onChangeDao(e.target.value)}
      />
    </div>
    <div className="mt-3">
      <h5>Main Keyword</h5>
      <p>🚨 DO NOT include hashtag symbol: #️⃣</p>
      <input
        type="text"
        value={state.hashtag}
        placeholder="bos"
        onChange={(e) => onChangeTag(e.target.value)}
      />
    </div>
    <div className="mt-3">
      {!isDao ? (
        <div>
          <CommitButton
            disabled={state.daoId !== context.accountId}
            data={{ settings: { dao: { main: { tag: state.hashtag } } } }}
          >
            Save
          </CommitButton>
          <button
            disabled={state.daoId !== context.accountId}
            className="btn btn-outline-primary"
            onClick={handleCreate}
          >
            Create Your Own
          </button>
        </div>
      ) : (
        <div>
          <button
            disabled={state.daoId === context.accountId}
            className="btn btn-primary"
            onClick={handleProposal}
          >
            Suggest Update
          </button>
          <button
            disabled={state.daoId === context.accountId}
            className="btn btn-outline-primary"
            onClick={handleCreate}
          >
            Propose to Create New Page
          </button>
        </div>
      )}
    </div>
    <hr />
    <h5>Preview</h5>
    <div className="mb-2">
      <Widget
        src="mob.near/widget/Hashtag.Feed"
        props={{ hashtag: state.hashtag ?? "bos" }}
      />
    </div>
  </>
);
