const blockHeight = props.blockHeight;

const edges = Social.index("edge", blockHeight.toString(), {
  limit: 10,
  order: "desc",
  accountId: undefined,
});

const Button = styled.button`
  text-transform: lowercase !important;
`;

const renderItem = (val) => {
  if (val.type === "reference") {
    if (val.ref.type === "meme") {
      return (
        <Widget
          src="mob.near/widget/Meme"
          props={{
            accountId: val.ref.accountId,
            blockHeight: val.ref.blockHeight,
          }}
        />
      );
    }
  } else {
    return <p>hello</p>;
  }
};

return (
  <div>
    {edges?.map((val) => (
      <div>{renderItem(val)}</div>
    ))}
  </div>
);
