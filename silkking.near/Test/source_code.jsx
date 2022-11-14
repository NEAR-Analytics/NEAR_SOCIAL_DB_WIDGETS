// Returns the account Id from the logged person
const accountId = context.accountId;

// Returns JSON with profile data from the accountId
const profile = Social.getr(`${accountId}/profile`);

// Returns the widgets contents (not committed data) from the user in accountId
const widgets = Social.get(`${accountId}/widget/*`);

// Returns the Test widget contents (not committed data) from the user in accountId
const testWidget = Social.getr(`${accountId}/post/Test`);

// Returns a JSON object with only one key that is accountId
// After that, contains many keys, containing each other path that has been posted like "widgets", "post", "profile", "test"
// Inside each key, there is an array contaning numbers, most likely the block heights that have any post with that key
const data = Social.keys(`${accountId}/*`, "final", {
  return_type: "History",
});

const data2 = Social.getr(`${accountId}/post/tes`, blockHeight);

console.log(data2);
return (
  <div>
    {JSON.stringify(data2)}
    <CommitButton data={{ post: { tes: "test" } }}>No</CommitButton>
  </div>
);
