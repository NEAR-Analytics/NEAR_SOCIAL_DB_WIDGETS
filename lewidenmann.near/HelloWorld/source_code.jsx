const profileName = Social.get({ keys: [props.accountId + "/profile/name"] });
const greeting = `Hello ${profileName || "World"}!`;

return <div>{greeting}</div>;
