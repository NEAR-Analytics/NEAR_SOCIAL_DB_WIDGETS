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
const data = Social.keys(`${accountId}/post/test`);

//Returns the text you have posted with the commitButton. Documentation says
//that it will return the lastest blockheigt of that key
const data2 = Social.get(`${accountId}/post/test`);

//So we can wrap testBlockHeights to get a bockheight
const testBlockHeightsObjectToString = JSON.stringify(testBlockHeights);

const indexOfTestInString = testBlockHeightsObjectToString.indexOf('"test": ');
const testKeyString = testBlockHeightsObjectToString.slice(
  indexOfTestInString,
  -1
);

const testKeyContentString = testKeyString
  .replace('"test": [', "")
  .replace(
    `
      ]
    }
  }`,
    ""
  )
  .split(" ")
  .join("")
  .replace(/(\r\n|\n|\r)/gm, "");

const blockHeightsArrayNotClean = testKeyContentString.split(",");

//And when we have the different blockHeights use them to call the value we want with the .get method
const data3 = Social.get(
  `${accountId}/post/test`,
  blockHeightsArrayNotClean[0]
);

console.log(data3);

return (
  <div>
    {JSON.stringify(testBlockHeights)}
    <CommitButton data={{ post: { test: "probando2" } }}>
      Post this
    </CommitButton>
  </div>
);
