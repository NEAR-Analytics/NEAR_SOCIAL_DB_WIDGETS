const { account } = props;
const data = Social.getr(`${account}/profile`);

return <>{JSON.stringify(data)}</>;
