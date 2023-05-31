const data = props.data;
const typeWhitelist = JSON.stringify(data.typeWhitelist);

return (
  <>
    <Widget
      src="efiz.near/widget/Every.Post.Create"
      props={{ typeWhitelist: typeWhitelist, key: "test" }}
    />
    <Widget
      src="efiz.near/widget/Every.Post"
      props={{ typeWhitelist: typeWhitelist, key: "test" }}
    />
  </>
);
