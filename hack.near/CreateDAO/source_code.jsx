State.init({
  policy: "",
});

const dao_policy = Buffer.from(state.policy, "utf-8").toString("base64");

const handleCreate = () => {
  Near.call([
    {
      contractName: "sputnik-dao.near",
      methodName: "create",
      args: {
        config: {
          name: "hacky",
          purpose: "build",
          metadata: "",
        },
        policy: dao_policy,
      },
      amount: "7000000000000000000000000",
      gas: "200000000000000",
    },
  ]);
};

const onChangePolicy = (policy) => {
  State.update({
    policy,
  });
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
