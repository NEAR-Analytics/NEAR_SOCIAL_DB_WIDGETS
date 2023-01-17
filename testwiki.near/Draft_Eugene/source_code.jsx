const accountId = props.accountId ?? context.accountId;

let data1 = Social.keys(`${accountId}/widget/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const data2 = Social.getr(`${accountId}/widget/*`);

const data3 = Social.get(`${accountId}/widget/*`);

console.log("data1 is ", data1);
console.log("data2 is ", data2);
console.log("data3 is ", data3);

return <div>Hello World</div>;
