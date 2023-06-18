const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

const deposit = policy.proposal_bond;

let string = "sputnik-dao.near";
let domain = ".near";

State.init({
  accountId: accountId ?? "",
  daoId: daoId ?? "",
  libraryId: state.libraryId ?? "",
  data: state.data ?? "",
  isDao: false,
});

const checkDao = (daoId) => {
  if (daoId.indexOf(string) !== -1) {
    return State.update({ isDao: true });
  }
};

const validDao = checkDao(state.daoId);

const curation_args = state.data;

const proposal_args = Buffer.from(curation_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: state.daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "update library",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "50000000000000000000000",
                  gas: "30000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: "300000000000000",
    },
  ]);
};

const handleCreate = () =>
  Social.set({
    widget: {
      [`${state.libraryId}.library`]: {
        "": `const accountId = props.accountId ?? context.accountId; const library = ${state.data}; return (<Widget src="hack.near/widget/dev.library" props={{ data: library }} />);`,
        metadata: {
          tags: {
            build: "",
          },
        },
      },
    },
  });

const onChangeDao = (daoId) => {
  State.update({
    daoId,
  });
};

const onChangeLibrary = (libraryId) => {
  State.update({
    libraryId,
  });
};

const onChangeData = (data) => {
  State.update({
    data,
  });
};

return (
  <div className="d-flex flex-column">
    <div className="p-1 m-1">
      <div>
        <h2>
          <b>Organization Account:</b>
        </h2>
        {!validDao ? (
          <p>
            ↳ must be a valid DAO account ~ <i>example.sputnik-dao.near</i>
          </p>
        ) : (
          <div>
            <p>↳ must have permission to propose function calls</p>
          </div>
        )}
        <input
          placeholder="<example>.sputnik-dao.near"
          type="text"
          value={state.daoId}
          onChange={(e) => onChangeDao(e.target.value)}
        ></input>
      </div>
    </div>
    {validDao && (
      <>
        <div className="d-flex p-1 m-1 flex-row">
          <Widget
            src="near/widget/AccountProfileCard"
            props={{ accountId: state.daoId }}
          />
        </div>
        <div className="p-1 m-1">
          <h5>Library ID</h5>
          <input
            placeholder="dev"
            type="text"
            value={state.libraryId}
            onChange={(e) => onChangeLibrary(e.target.value)}
          ></input>
        </div>
        <div className="p-1 m-1">
          <h5>Propose Update</h5>
          <div className="w-100 d-flex gap-2">
            <div>
              {validDao && (
                <div>
                  <p>↳ propose to update our components library</p>
                </div>
              )}
            </div>
          </div>
          <div className="w-100 d-flex gap-2">
            <input
              placeholder="JSON goes here"
              type="text"
              value={state.data}
              onChange={(e) => onChangeData(e.target.value)}
            ></input>
            <div>
              <button
                disabled={!validDao || !state.libraryId}
                onClick={handleProposal}
              >
                Submit
              </button>
            </div>
            <div>
              <button
                disabled={!validDao || !state.libraryId}
                onClick={handleCreate}
                className="btn btn-outline-success"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
);
