const admin = "gagdiez.near";
const question = { accountId: props.accountId, blockHeight: props.blockHeight };

const data = {
  index: {
    graph: JSON.stringify({
      key: "poke",
      value: {
        poke: admin,
      },
    }),
    notify: JSON.stringify({
      key: admin,
      value: {
        type: "poke",
        question: question,
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
