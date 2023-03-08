State.init({
  council: "",
});

const handleCreate = () => {
  Near.call([
    {
      contractName: contractId,
      methodName: "create",
      args: {
        config: {
          name: "hacky",
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
