const accountId = context.accountId;
const authorForWidget =
  "7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c";

console.log(props);
let item = Social.get(`${accountId}/testPersons/0/**`);

return (
  <div>
    <h4>{item.name}</h4>
    <h6>{item.profession}</h6>
    <h6>{item.description}</h6>
  </div>
);
