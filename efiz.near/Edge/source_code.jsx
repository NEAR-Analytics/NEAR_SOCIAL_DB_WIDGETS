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
  console.log(val);
  if (val.value.type === "reference") {
    if (val.value.ref.type === "meme") {
      return (
        <Widget
          src="mob.near/widget/Meme"
          props={{
            accountId: val.value.ref.accountId,
            blockHeight: val.value.ref.blockHeight,
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
