const admin = "gagdiez.near";

const data = {
  index: {
    graph: JSON.stringify({
      key: "poke",
      value: {
        accountId: admin,
      },
    }),
    notify: JSON.stringify({
      key: admin,
      value: {
        type: "poke",
      },
    }),
  },
};

return (
  <CommitButton
    force
    className={`text-danger ms-3 border-0 bg-white`}
    data={data}
  >
    <i class={`bi bi-flag`}> </i>
    Flag Question
  </CommitButton>
);
