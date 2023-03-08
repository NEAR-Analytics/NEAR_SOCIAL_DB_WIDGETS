State.init({
  args: "",
});

const args = {
  config: {
    name: "hacky",
    purpose: "build",
    metadata: "",
  },
  policy: "infinity.near",
};

const handleCreate = () => {
  State.update({
    policy: args.policy,
  });

  const dao_args = Buffer.from(State.args, "utf-8").toString("base64");

  Near.call([
    {
      contractName: "sputnik-dao.near",
      methodName: "create",
      args: dao_args,
      amount: "7000000000000000000000000",
      gas: "200000000000000",
    },
  ]);
};

const onChangePolicy = (policy) => {
  args.policy = policy;
};

return (
  <div className="mb-3">
    <div className="mb-3">
      Council:
      <input type="text" onChange={(e) => onChangePolicy(e.target.value)} />
    </div>
    <button className="btn btn-outline-danger mt-3" onClick={handleCreate}>
      Create
    </button>
  </div>
);
