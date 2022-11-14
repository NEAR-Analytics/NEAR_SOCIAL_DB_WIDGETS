// Returns the account Id from the logged person
const accountId = context.accountId;

// Returns JSON with profile data from the accountId
const profile = Social.getr(`${accountId}/profile`);

// Returns the widgets contents (not committed data) from the user in accountId
const widgets = Social.get(`${accountId}/widget/*`);

// Returns the Test widget contents (not committed data) from the user in accountId
const testWidget = Social.getr(`${accountId}/widget/Test`);

// Returns a JSON object with only one key that is accountId
// After that, contains many keys, containing an array of blockHeights. Examples for silkking.near are "widgets", "post", "profile", "test"
const allBlockHeights = Social.keys(`${accountId}/*`, "final", {
  return_type: "History",
});

// Returns a JSON object with only one key that is accountId
// That key will only contain one key names test and the blockHeights associated
const testBlockHeights = Social.keys(`${accountId}/test`, "final", {
  return_type: "History",
});

const blockHeight = 78364273;
const data2 = Social.getr(`${accountId}/*`, blockHeight);
a;
console.log(data2);
return (
  <div>
    {JSON.stringify(data2)}
    <CommitButton data={{ post: { test: "test2" } }}>No</CommitButton>
  </div>
);
