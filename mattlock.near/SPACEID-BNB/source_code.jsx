const toast = (toast) => {
  State.update({
    toast,
  });
};

// Get token prices

const priceQuery = fetch(
  `https://galxe-proxy.near.workers.dev?url=https://graphigo.prd.space.id/query`,
  {
    method: "POST",
    body: JSON.stringify({
      operationName: "tokenUsdPrice",
      variables: {
        tokens: ["BNB", "ETH", "WBNB", "WETH"],
      },
      query:
        "query tokenUsdPrice($tokens: [TokenType]!, $date: Int) {\n  tokenUsdPrice(tokens: $tokens, date: $date) {\n    token\n    usdPrice\n    date\n    __typename\n  }\n}",
    }),
  }
);

const prices = JSON.parse(priceQuery.body);
const priceForName =
  Math.ceil((10000 * 5) / parseFloat(prices.data.tokenUsdPrice[0].usdPrice)) /
    10000 +
  0.001;

console.log("prices ", prices);
console.log("priceForName", priceForName);

// BNB commit and register

const NAME = "__BNB_COMMIT_NAME";
const SECRET = "__BNB_COMMIT_SECRET";
const COMMITMENT = "__BNB_COMMITMENT";
if (!Storage.privateGet(SECRET)) {
  Storage.privateSet(
    SECRET,
    ethers.utils.formatBytes32String(Date.now().toString())
  );
}

// Abi and .bnb registrar setup

const abi = fetch(
  "https://bafkreidywdcopwkqdp26osfqhk44m4cogqeuzkkq2of4w3nnop6ouvggoe.ipfs.nftstorage.link/"
);
const bnb = {
  address: `0xD9A99AE1f5D173cCf36E19777ACa5B8268B5F291`,
  resolver: `0x7A18768EdB2619e73c4d5067B90Fd84a71993C1D`,
  abi: abi.body,
  iface: new ethers.utils.Interface(abi.body),
  secret: Storage.privateGet(SECRET),
};

// .bnb registrar methods

const getNamesForOwner = (owner, subscribe) => {
  const res = fetch(
    `https://galxe-proxy.near.workers.dev?url=https://graphigo.prd.space.id/query`,
    {
      subscribe,
      method: "POST",
      body: JSON.stringify({
        operationName: "domains",
        variables: {
          input: {
            owner,
            orderBy: "LIST_PRICE_ASC",
            buyNow: 0,
            domainStatuses: [
              "REGISTERED",
              "UNREGISTERED",
              "GRACE_PERIOD",
              "PREMIUM",
            ],
            first: 30,
          },
        },
        query:
          "query domains($input: ListDomainsInput!) {\n  domains(input: $input) {\n    exactMatch {\n      name\n      listPrice\n      lastSalePrice\n      tokenId\n      owner\n      network\n      orderSource\n      expirationDate\n      image\n      __typename\n    }\n    list {\n      name\n      listPrice\n      lastSalePrice\n      tokenId\n      owner\n      network\n      orderSource\n      expirationDate\n      image\n      __typename\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n      __typename\n    }\n    __typename\n  }\n}",
      }),
    }
  );

  if (!res.body || res.body.error) return;

  const names = JSON.parse(res.body).data.domains.list;
  console.log("getNamesForOwner", names);
  return names;
};

const checkName = (name) => {
  const queryRes1 = fetch(
    `https://galxe-proxy.near.workers.dev?url=https://graphigo.prd.space.id/query`,
    {
      method: "POST",
      body: JSON.stringify({
        operationName: "domains",
        variables: {
          input: {
            query: name,
            orderBy: "LIST_PRICE_ASC",
            buyNow: 1,
            network: 1,
            domainStatuses: ["REGISTERED", "UNREGISTERED"],
            first: 30,
          },
        },
        query:
          "query domains($input: ListDomainsInput!) {\n  domains(input: $input) {\n    exactMatch {\n      name\n      listPrice\n      lastSalePrice\n      tokenId\n      owner\n      network\n      orderSource\n      expirationDate\n      image\n      __typename\n    }\n    list {\n      name\n      listPrice\n      lastSalePrice\n      tokenId\n      owner\n      network\n      orderSource\n      expirationDate\n      image\n      __typename\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n      __typename\n    }\n    __typename\n  }\n}",
      }),
    }
  );

  console.log("checkName raw data", queryRes1.body);

  const taken =
    JSON.parse(queryRes1.body).data.domains.exactMatch[0]?.listPrice !== 5;
  console.log("checkName taken", taken);
  return taken;
};

const commit = () => {
  const name = state.name;

  if (checkName(name)) {
    toast(`${state.name} is taken. Please try another name.`);
    return State.update({
      name: "",
    });
  }

  if (!name || name.length < 5) {
    toast("Enter a valid name. Greater than 7 characters.");
    return;
  }
  Storage.privateSet(NAME, name);

  const encodedData = bnb.iface.encodeFunctionData("makeCommitment", [
    name,
    state.address,
    bnb.secret,
  ]);

  return Ethers.provider()
    .call({
      to: bnb.address,
      data: encodedData,
    })
    .then((commitment) => {
      if (typeof commitment !== "string") {
        alert("There was an error committing your name. Please try again!");
      }

      console.log("commitment", commitment);

      const bnbContract = new ethers.Contract(
        bnb.address,
        bnb.abi,
        Ethers.provider().getSigner()
      );

      bnbContract
        .bulkCommit([commitment], {
          gasLimit: 50000,
        })
        .then((res) => {
          console.log("commitment res", res);
          toast(
            "Please wait 10 seconds for transaction to finalize. Register button will be enabled after 10 seconds."
          );
          setTimeout(() => Storage.privateSet(COMMITMENT, commitment), 10000);
        })
        .catch((e) => {
          console.log(e);
          if (e.code === "ACTION_REJECTED") {
            return toast(
              "You rejected the name request transaction. Please try again!"
            );
          }
          throw e;
        });
    });
};

const register = () => {
  const name = Storage.privateGet(NAME);
  const secret = Storage.privateGet(SECRET);

  if (!name) {
    return;
  }

  const bnbContract = new ethers.Contract(
    bnb.address,
    bnb.abi,
    Ethers.provider().getSigner()
  );

  bnbContract
    .register(name, state.address, 31556952, secret, {
      value: ethers.utils.parseEther(priceForName.toString()),
      gasLimit: 1000000,
    })
    .then((transactionHash) => {
      console.log("transactionHash is ", transactionHash);
      Storage.privateSet(COMMITMENT, null);
      Storage.privateSet(NAME, null);
      toast(
        "Please wait 10 seconds for transaction to finalize. Your names list will update automatically after 10s."
      );
      setTimeout(() => {
        const names = getNamesForOwner(state.address, true);
        Storage.update({ names });
      }, 10000);
    })
    .catch((e) => {
      console.log(e);
      if (e.code === "ACTION_REJECTED") {
        Storage.privateSet(COMMITMENT, null);
        return toast(
          "You rejected the name registration transaction. Please request again and register if you would like to own the .bnb domain name!"
        );
      }
      throw e;
    });
};

// CSS

const css = `
  input, button {
    margin-bottom: 16px;
  }
`;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    box-sizing: border-box;
    font-family: Sans-Serif;
    ${css}`,
  });
}
const Theme = state.theme;

const init = () => {
  console.log("init");
  const name = Storage.privateGet(NAME);
  let address;
  if (state.address === undefined) {
    const accounts = Ethers.send("eth_requestAccounts", []);
    if (accounts.length) {
      address = accounts[0];
      const names = getNamesForOwner(address);
      State.update({ address, name, names });
    }
  }
};

init();

if (!state.address)
  return (
    <Theme>
      <button onClick={init}>Get Started</button>
    </Theme>
  );

return (
  <Theme>
    <Widget
      src="mattlock.near/widget/toast"
      props={{
        toast: state.toast,
        onClose: () => State.update({ toast: null }),
      }}
    />

    <h2>Register a .bnb domain</h2>

    <p>Enter a name and request to register.</p>
    <input
      disabled={!state.address}
      value={state.name}
      onChange={(e) => State.update({ name: e.target.value })}
      placeholder="name"
    />
    <button onClick={() => commit()}>Step 1. Request</button>
    <p>After you sign the commitment you can register the name.</p>
    <button
      onClick={() => register()}
      disabled={!Storage.privateGet(COMMITMENT)}
    >
      Step 2. Register
    </button>

    <h3>Names you own:</h3>
    {state.names && (
      <ol>
        {state.names.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ol>
    )}
  </Theme>
);
