const admin = "gagdiez.near";
const question = { accountId: props.accountId, blockHeight: props.blockHeight };

if (question.accountId === undefined || question.blockHeight === undefined) {
  return;
}

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
    className={`ms-3 border-0 bg-white ${props.className}`}
    data={data}
  >
    <i class="bi bi-exclamation-circle me-1" />
    <span>Report</span>
  </CommitButton>
);
