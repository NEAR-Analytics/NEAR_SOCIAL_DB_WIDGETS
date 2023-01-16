const accountId = props.accountId ?? context.accountId;

let data = Social.keys(`${accountId}/widget/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const profile = Social.getr(`${accountId}/profile`);

console.log("data is ", data);
console.log("accountId is ", accountId);
console.log("profile is ", profile);
return <div>Hello World</div>;
