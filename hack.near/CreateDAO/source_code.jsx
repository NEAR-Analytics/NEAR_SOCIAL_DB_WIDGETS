State.init({
  council: "",
  args: "",
});

const dao_args = Buffer.from(state.args, "utf-8").toString("base64");

const handleCreate = () => {
  Near.call([
    {
      contractName: "sputnik-dao.near",
      methodName: "create",
      name: "hacky",
      args: {
        config: {
          purpose: "build",
          metadata: "",
        },
        policy: state.council,
      },
      amount: "7000000000000000000000000",
      gas: "200000000000000",
    },
  ]);
};

const onChangeCouncil = (council) => {
  State.update({
    council,
  });
};

return (
  <div className="mb-3">
    <div className="mb-3">
      Council:
      <input type="text" onChange={(e) => onChangeCouncil(e.target.value)} />
    </div>
    <button className="btn btn-outline-danger mt-3" onClick={handleCreate}>
      Create
    </button>
  </div>
);
