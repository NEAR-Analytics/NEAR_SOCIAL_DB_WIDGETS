const data = props.data;
const typeWhitelist = JSON.stringify(data.typeWhitelist);
const key = data.key;

return (
  <>
    <Widget
      src="efiz.near/widget/Every.Post.Create"
      props={{ typeWhitelist, key }}
    />
    <Widget src="efiz.near/widget/Every.Post" props={{ typeWhitelist, key }} />
  </>
);
