const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  description: "",
  args: "",
});

const proposal_args = Buffer.from(state.args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: "multi.sputnik-dao.near",
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
                    "multi.sputnik-dao.near": {
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
                            path: `${accountId}/post/main`,
                          },
                        },
                      },
                    },
                  },
                  /*
                  "hack.near": {
                    "post": {
                      "main": "{\"type\":\"md\",\"text\":\"gm\"}"
                    },
                    "index": {
                      "post": "{\"key\":\"main\",\"value\":{\"type\":\"md\"}}",
                      "hashtag": "[{\"key\":\"news\",\"value\":{\"type\":\"social\",\"path\":\"hack.near/post/main\"}}]"
                    }
                  }
                  */
                  deposit: "88888888888888",
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
