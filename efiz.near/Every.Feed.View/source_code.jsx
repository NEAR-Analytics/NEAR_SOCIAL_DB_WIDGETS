const data = props.data;
let index = [];
const typeWhitelist = JSON.parse(props.typeWhitelist || "null") || [
  "efiz.near/type/paragraph",
  "efiz.near/type/Image",
  "efiz.near/type/document",
];
const accountFilter =
  (props.accountFilter && [props.accountFilter]) || undefined;
const hashtagFilter = JSON.parse(props.hashtagFilter || "null") || [];
const domainFilter = JSON.parse(props.domainFilter || "null") || ["post"];

// domain filter will come from the thing itself
return (
  <>
    <Widget src="efiz.near/widget/Every.Post.Create" />
    <Widget
      src="efiz.near/widget/Every.Post"
      props={{
        domainFilter: JSON.stringify([data]),
      }}
    />
  </>
);
