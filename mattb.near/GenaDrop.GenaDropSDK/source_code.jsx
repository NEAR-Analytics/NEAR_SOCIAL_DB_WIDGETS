let { onLoad, onRefresh, loaded } = props;

const OWNER_ID = "minorityprogrammers.near"; // attribution

const AURORA_CONTRACT = "0xe53bC42B6b25a1d548B73636777a0599Fd27fE5c";
const AURORA_SOUL_CONTRACT = "0xe1D36964Eb49E38BB3f7410401BC95F0E9f1F6D3";
const POLYGON_CONTRACT = "0x436AEceaEeC57b38a17Ebe71154832fB0fAFF878";
const POLYGON_SOUL_CONTRACT = "0xd91cC6DE129D13F4384FB0bC07a1a99D4F858e72";
const CELO_CONTRACT = "0xC291846A587cf00a7CC4AF0bc4EEdbC9c3340C36";
const CELO_SOUL_CONTRACT = "0xd91cC6DE129D13F4384FB0bC07a1a99D4F858e72";
const AVAX_CONTRACT = "0x43dBdfcAADD0Ea7aD037e8d35FDD7c353B5B435b";
const AVAX_SOUL_CONTRACT = "0xd91cC6DE129D13F4384FB0bC07a1a99D4F858e72";
const ARBITRUM_CONTRACT = "0x959a2945185Ec975561Ac0d0b23F03Ed1b267925";
const ARBITRUM_SOUL_CONTRACT = "0x959a2945185Ec975561Ac0d0b23F03Ed1b267925";
const NEAR_CONTRACT = "nft.genadrop.near";
const MINT_SINGLE = [
  "function mint(address to, uint256 id, uint256 amount, string memory uri, bytes memory data) public {}",
  "function safeMint(address to, string memory uri) public {}",
];

const CONTRACT_ADDRESSES = {
  137: [
    POLYGON_CONTRACT,
    "Polygon",
    "https://polygonscan.com/tx/",
    POLYGON_SOUL_CONTRACT,
  ],
  1313161554: [
    AURORA_CONTRACT,
    "Aurora",
    "https://explorer.aurora.dev/tx/",
    AURORA_SOUL_CONTRACT,
  ],
  42220: [
    CELO_CONTRACT,
    "Celo",
    "https://explorer.celo.org/mainnet/tx/",
    CELO_SOUL_CONTRACT,
  ],
  43114: [
    AVAX_CONTRACT,
    "Avalanche",
    "https://snowtrace.io/tx/",
    AVAX_SOUL_CONTRACT,
  ],
  42161: [ARBITRUM_CONTRACT, "Arbitrum", "https://arbiscan.io/tx/"],
  0: [NEAR_CONTRACT, "Near"],
};

const CHAINS = [
  {
    id: "137",
    name: "Polygon",
    url: "https://ipfs.near.social/ipfs/bafkreie5h5oq6suoingcwuzj32m3apv56rl56wpwpaxmevlk5vndlypxze",
  },
  {
    id: "1313161554",
    name: "Aurora",
    url: "https://ipfs.near.social/ipfs/bafkreiajqik4gjbmkh7z2gylpjzrsuht7simjecpxuoqn6icqfbioswzuy",
  },
  {
    id: "42220",
    name: "Celo",
    url: "https://ipfs.near.social/ipfs/bafkreifu6ufsdf2ivrs5febt7l25wdys6odzfelgjauzod7owrfug56cxe",
  },
  {
    id: "43114",
    name: "Avax",
    url: "https://ipfs.near.social/ipfs/bafkreifhu5fytsjcmjluarfnu6kcdhaqz4rgdrbbzf6dlsmggqb7oi3w4e",
  },
  {
    id: "42161",
    name: "Arbitrum",
    url: "https://ipfs.near.social/ipfs/bafkreiffax4lnya337rz5ph75faondeqmpy6xj37yprwvxbru4qc5emsiq",
  },
  {
    id: "0",
    name: "Near",
    url: "https://ipfs.near.social/ipfs/bafkreigv55ubnx3tfhbf56toihekuxvgzfqn5c3ndbfjcg3e4uvaeuy5cm",
  },
];

const NEAR_SOCIAL_IPFS_URL = "https://ipfs.near.social";
const NEAR_SOCIAL_ADD_ENDPOINT = `${NEAR_SOCIAL_IPFS_URL}/add`;
const GENADROP_NEAR_CONTRACT = "genadrop-contract.nftgen.near";
const NEAR_NETWORK_CHAIN_ID = "0";
const MINTED_NFTS_STORAGE_KEY = "GenaDropSDK.mintedNfts";

let accountId = context.accountId;

let GenaDropSDK = {
  network: null,
  isSoulBound: false,
  lastMintLink: "",
  mintedNfts: [],
  mint: (recipient, title, description, imageCid, props) => {
    switch (GenaDropSDK.network) {
      case NEAR_NETWORK_CHAIN_ID:
        GenaDropSDK.mintOnNear(recipient, title, description, imageCid, props);
        break;
      default:
        GenaDropSDK.defaultMint(recipient, title, description, imageCid, props);
    }
  },
  defaultMint: (recipient, title, description, imageCid, props) => {
    const CA = GenaDropSDK.isSoulBound
      ? contractAddresses[GenaDropSDK.network][3]
      : contractAddresses[GenaDropSDK.network][0];

    console.log("CONTRACT ADD", CA);

    const contract = new ethers.Contract(
      CA,
      mintSingle,
      Ethers.provider().getSigner()
    );

    GenaDropSDK.uploadToIPFS(title, description, imageCid, props).then(
      (res) => {
        const cid = res.body.cid;
        const Id = Math.floor(Math.random() * (9999999 - 100000 + 1) + 100000);

        const recipient =
          recipient || Ethers.send("eth_requestAccounts", [])[0];

        GenaDropSDK.isSoulBound
          ? contract
              .safeMint(recipient, `ipfs://${cid}`)
              .then((transactionHash) => transactionHash.wait())
              .then((ricit) => {
                GenaDropSDK.lastMintLink = `${
                  contractAddresses[GenaDropSDK.network][2] +
                  ricit.transactionHash
                }`;

                GenaDropSDK.logNft({
                  account: accountId,
                  recipient: recipient,
                  title: title,
                  description: description,
                  image: `https://ipfs.io/ipfs/${imageCid}`,
                  tx: ricit.transactionHash,
                  link:
                    contractAddresses[GenaDropSDK.network][2] +
                    ricit.transactionHash,
                });

                GenaDropSDK.refresh();
              })
          : contract
              .mint(recipient, Id, 1, `ipfs://${cid}`, "0x")
              .then((transactionHash) => transactionHash.wait())
              .then((ricit) => {
                GenaDropSDK.lastMintLink = `${
                  contractAddresses[GenaDropSDK.network][2] +
                  ricit.transactionHash
                }`;

                GenaDropSDK.logNft({
                  account: accountId,
                  recipient: recipient,
                  title: title,
                  description: description,
                  image: `https://ipfs.io/ipfs/${imageCid}`,
                  tx: ricit.transactionHash,
                  link:
                    contractAddresses[GenaDropSDK.network][2] +
                    ricit.transactionHash,
                });

                GenaDropSDK.refresh();
              });
      }
    );
  },
  mintOnNear: (recipient, title, description, imageCid, props) => {
    GenaDropSDK.uploadToIPFS(title, description, imageCid, props).then(
      (res) => {
        const CID = res.body.cid;

        GenaDropSDK.callContract("nft_mint", {
          token_id: `${Date.now()}`,
          metadata: {
            title: title,
            description: description,
            media: `https://ipfs.io/ipfs/${imageCid}`,
            reference: `ipfs://${CID}`,
          },
          receiver_id: recipient || accountId,
        });
      }
    );
  },
  uploadToIPFS: (title, description, imageCid, props) => {
    const metadata = {
      name: title,
      description: description,
      properties: props || [],
      image: `ipfs://${imageCid}`,
    };

    return asyncFetch(NEAR_SOCIAL_ADD_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: metadata,
    });
  },
  callContract: (method, args, gas, deposit) => {
    Near.call([
      {
        contractName: GENADROP_NEAR_CONTRACT,
        methodName: method,
        args: args || {},
        gas: gas || 200000000000000,
        deposit: deposit || 10000000000000000000000,
      },
    ]);
  },
  refresh: () => {
    if (onRefresh) {
      onRefresh(GenaDropSDK);
    }
  },
  logNft: (log) => {
    GenaDropSDK.mintedNfts.push(log);
    Storage.set(MINTED_NFTS_STORAGE_KEY, GenaDropSDK.mintedNfts);
  },
  getMintedNfts: () => {
    return GenaDropSDK.mintedNfts.filter((nft) => nft.account == accountId);
  },
};

if (onLoad && !loaded) {
  let mintedNfts = Storage.get(MINTED_NFTS_STORAGE_KEY);

  if (!!mintedNfts) {
    GenaDropSDK.mintedNfts = mintedNfts;
  }

  onLoad(GenaDropSDK);
}
