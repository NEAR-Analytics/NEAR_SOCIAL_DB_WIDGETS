const follows = Social.get(`${accountId}/graph/follow/**`);

if (!props.secretKey) return <div>send secretKey in props</div>;

return <div>{props.secretKey}</div>;
