// onLoad
const { onLoad } = props;

// Define constants value
const API = "https://prod-pocket-api.hamsterbox.xyz/api";
const POCKET_ABI_URL =
  "https://raw.githubusercontent.com/CaviesLabs/hamsterpocket-assets/main/pocketchef.json";
const WHITELIST_ENDPOINT = `${API}/whitelist`;
const LIST_POCKET_ENDPOINT = `${API}/pool/decimals-formatted?limit=&offset=0&chainId=bnb&statuses=POOL_STATUS%3A%3AACTIVE&statuses=POOL_STATUS%3A%3ACLOSED&sortBy=DATE_START_DESC`;

// Define methods to be exposed
const fetchPockets = (ownerAddress) => {
  return new Promise((resolve) => {
    asyncFetch(`${LIST_POCKET_ENDPOINT}&ownerAddress=${ownerAddress}`).then(
      (result) => {
        return resolve(result.body);
      }
    );
  });
};

// expose methods
onLoad({
  fetchPockets,
});
