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
const testBlockHeights = Social.keys(`${accountId}/post/test`, "final", {
  return_type: "History",
});

//Returns Object with user account containing only the key post. At the same time post contains the key test.
//test value is boolean
const existentObjectsFromAccountId = Social.keys(`${accountId}/post/test`);

//Returns the text you have posted with the commitButton. Documentation says
//that it will return the lastest blockheigt of that key
const valueFromGivenKeys = Social.get(`${accountId}/post/test`);

const blockHeight = testBlockHeights[accountId].post.test;

// Brings the value from key accountId, then post and finally test that is located in the blockHeight provided
const valueFromGivenKeysInGivenBlockHeight = Social.get(
  `${accountId}/post/test`,
  blockHeight[1]
);

//You can access to all post/test blockheights of all users
const blockHeightsInGivenKeys = Social.keys(`*/post/test`, "final", {
  return_type: "History",
});

let mapped = Object.keys(blockHeightsInGivenKeys).map((key) => {
  return {
    accountId: key,
    blockHeightArray: blockHeightsInGivenKeys[key].post.test[0],
  };
});
mapped.reduce(
  (acc, curr) => {
    let answer = Social.get(
      `${curr.accountId}/post/test`,
      curr.blockHeightArray
    );
    return answer == 1 ? [acc[0] + 1, acc[1]] : [acc[0], acc[1] + 1];
  },
  [0, 0]
);

return (
  <div>
    {JSON.stringify(mapped)}
    <CommitButton data={{ post: { test: "probando2" } }}>
      Post this
    </CommitButton>
  </div>
);
