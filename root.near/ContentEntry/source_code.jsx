const accountId = props.accountId ?? context.accountId;
let blockHeight = props.blockHeight ? parseInt(props.blockHeight) : undefined;
const profile = Social.getr(`${accountId}/profile`);
const post = props.post ?? Social.getr(`${accountId}/post`, blockHeight);

return <div>{JSON.stringify(post)}</div>;
