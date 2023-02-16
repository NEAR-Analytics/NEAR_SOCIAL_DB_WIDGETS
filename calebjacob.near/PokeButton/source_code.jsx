if (
  !props.accountId ||
  !context.accountId ||
  context.accountId === props.accountId
) {
  return "";
}

const data = {
  index: {
    graph: JSON.stringify({
      key: "poke",
      value: {
        accountId: props.accountId,
      },
    }),
    notify: JSON.stringify({
      key: props.accountId,
      value: {
        type: "poke",
      },
    }),
  },
};

return (
  <CommitButton force className={props.className} data={data}>
    <i className="bi bi-hand-index-thumb"></i>
    {props.back ? "Poke Back" : "Poke"}
  </CommitButton>
);
