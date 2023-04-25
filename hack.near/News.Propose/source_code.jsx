const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  description: "",
});

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: state.description,
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: {
                    daoId: {
                      post: {
                        main: {
                          type: "md",
                          text: state.description,
                        },
                      },
                      index: {
                        post: {
                          key: "main",
                          value: {
                            type: "social",
                            path: `${daoId}/post/main`,
                          },
                        },
                      },
                    },
                  },
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

const onChangeDescription = (description) => {
  State.update({
    description,
  });
};

return (
  <div className="m-2">
    <div className="mb-2">
      <h3>News Content:</h3>
      <textarea
        type="text"
        onChange={(e) => onChangeDescription(e.target.value)}
      />
    </div>
    <button className="btn btn-outline-primary mt-1" onClick={handleProposal}>
      Submit
    </button>
  </div>
);
