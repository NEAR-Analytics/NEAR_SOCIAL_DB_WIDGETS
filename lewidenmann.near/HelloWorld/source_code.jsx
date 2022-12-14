const profileName = Social.get({ keys: [props.accountId + "/profile/name"] });
const greeting = `Hello ${profileName || "Worlds"}!`;

return <div>{greeting}</div>;
