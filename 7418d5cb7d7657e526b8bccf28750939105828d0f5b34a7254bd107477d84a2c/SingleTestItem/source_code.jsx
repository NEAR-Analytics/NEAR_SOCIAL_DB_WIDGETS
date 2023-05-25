const accountId = context.accountId;
const authorForWidget =
  "7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c";

const { userId } = props;

let item = Social.get(`${accountId}/testPersons/${userId}/**`);

return (
  <div>
    <h4>{item.name}</h4>
    <h6>{item.profession}</h6>
    <h6>{item.description}</h6>
  </div>
);
