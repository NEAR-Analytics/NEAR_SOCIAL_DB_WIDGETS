const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender)
  return <Web3Connect connectLabel="Connect with Web3 to Aurora Mainnet" />;

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20Abi.ok) {
  return "scam";
}

const iface = new ethers.utils.Interface(erc20Abi.body);

initState({
  token: "",
  tokenDecimals: "",
  sendTo: "",
  sender,
  senderBalance: "0",
  receiverBalance: "0",
  receiver: "",
  amount: "1",
});
// polygon tokens
const tokens = {
  "Select Token": "",
  ANGLE: "0xb7e3617adb58dc34068522bd20cfe1660780b750",
  ANS: "0x645322989d07131a23dfc57b57f745b15e936a59",
  AURORA2211: "0x7ba718083591c70ce0c1720f7be314968950acf7",
  AAVE: "0x4e834cdcc911605227eedddb89fad336ab9dc00a",
  ABR: "0x2BAe00C8BC1868a5F7a216E881Bae9e662630111",
  ATO: "0x2ab98d9ea81af20037af1a4f43cc3e6977545840",
  PLY: "0x09c9d464b58d96837f8d8b6f4d9fe4ad408d3a4f",
  AURORA: "0x8bec47865ade3b172a928df8f990bc7f2a3b9f79",
  AVRIT: "0xb4530aa877d25e51c18677753acd80ffa54009b2",
  ABBUSD: "0x5C92A4A7f59A9484AFD79DbE251AD2380E589783",
  BAKED: "0x8973c9ec7b79fe880697cdbca744892682764c37",
  BAL: "0xb59d0fdaf498182ff19c4e80c00ecfc4470926e2",
  BAT: "0x2b9025aecc5ce7a8e6880d3e9c6e458927ecba04",
  BSTN: "0x9f1f933c660a1dc856f0e0fe058435879c5ccef0",
  BEPRO: "0x672ea93e5486c04464209a655ad0c503c62024d9",
  BIVE: "0x130e6203f05805cd8c44093a53c7b50775eb4ca3",
  BST: "0x4ee3e4e8286c9b22901041e3cb9105542d88810c",
  BBT: "0x4148d2Ce7816F0AE378d98b40eB3A7211E1fcF0D",
  BRGT: "0xa06fa703b95ed5224165edd94a8956a0cc4dec55",
  BRRR: "0x0240ae04c9f47b91cf47ca2e7ef44c9de0d385ac",
  COR: "0xe62233aeaed9b9ea007704262e15445e0d756c0b",
  LINK: "0x94190d8ef039c670c6d6b9990142e0ce2a1e3178",
  XNL: "0x7ca1c28663b76cfde424a9494555b94846205585",
  COMP: "0xdeacf0faa2b80af41470003b5f6cd113d47b4dcd",
  CRF: "0x026dda7f0f0a2e42163c9c80d2a5b6958e35fc49",
  CREAM: "0xabe9818c5fb5e751c4310be6f0f18c8d85f9bd7f",
  CGT: "0xcc84668daae56f9f2ef907ce79c8ca0d4fdb12a7",
  DODO: "0xe301ed8c7630c9678c39e4e45193d1e7dfb914f7",
  DAI: "0xe3520349f477a5f6eb06107066048508498a291b",
  DBIO: "0x72f9fedef0fb0fc8db22453b692f7d5a17b98a66",
  USDD: "0x941b45cb782cced9814821e9b684261fa353bcd5",
  DPI: "0xc51c983ea4c4c5a7e071999f600645efc26b03f1",
  ETHERNAL: "0x17cbd9C274e90C537790C51b4015a65cD015497e",
  END: "0x7916afb40e8d776e9002477d4bad56767711b8e7",
  FAME: "0xd5c997724e4b5756d08e6464c01afbc5f6397236",
  TAO: "0x7538162F05BEc5084A92a5F47C2A094fCF73e372",
  NFD: "0x90eb16621274fb47a071001fbbf7550948874cb5",
  FLX: "0xea62791aa682d455614eaa2a12ba3d9a2fd197af",
  FRAX: "0xda2585430fef327ad8ee44af8f1f989a2a91a3d2",
  FXS: "0xc8fdd32e0bf33f0396a18209188bb8c6fb8747d2",
  GATA: "0x6961775A3Cafa23fcd24Df8F9b72fc98692B9288",
  HAPI: "0x943f4bf75d5854e92140403255a471950ab8a26f",
  HAK: "0x5ac53f985ea80c6af769b9272f35f122201d0f56",
  HBTC: "0x95f09a800e80a17eac1ba746489c48a1e012d855",
  JUMBO: "0x6454e4a4891c6b78a5a85304d34558dda5f3d6d8",
  KSW: "0xE4eB03598f4DCAB740331fa432f4b85FF58AA97E",
  LUNAR: "0x25e801Eb75859Ba4052C4ac4233ceC0264eaDF8c",
  LINEAR: "0x918dbe087040a41b786f0da83190c293dae24749",
  LTS: "0x7c9f09d9c56e5aae95f20a9077911b982341ca67",
  ATLUNA: "0xC4bdd27c33ec7daa6fcfd8532ddB524Bf4038096",
  MNFT: "0xd126b48c072f4668e944a8895bc74044d5f2e85b",
  MKR: "0x1d1f82d8b8fc72f29a8c268285347563cb6cd8b3",
  MECHA: "0xa33C3B53694419824722C10D99ad7cB16Ea62754",
  META: "0xc21ff01229e982d7c8b8691163b0a3cb8f357453",
  MOCKCORN: "0x096f9fdda1e6f59ad2a8216bbd64daa9140222cc",
  MOCKLINEAR: "0x45de93fdfb16508823da91819ee891eb78fe028a",
  MOCKUSDTE: "0x8f49abd8af60ca1b27ae796c1015fe696c316f74",
  MOCKUSDC: "0x8910fbcf56fd981b485648869b9ccee7305aa08d",
  MOCKWNEAR: "0x94b8bffc250c5aa3e13e8d864dd5fdedab54cb29",
  MCOIN: "0x30975aCac70B5d774D6f756ACd03a9B90CD4D4F5",
  MYRIA: "0xeaf7246db327a10f2560ce8c7aab2a176b7a1272",
  NEARIA: "0x11fffdcb623b4882daed70eb22c2bf51215178dc",
  NSTART: "0x06aebb0f3d9ebe9829e1b67bd3dd608f711d3412",
  PAD: "0x885f8CF6E45bdd3fdcDc644efdcd0AC93880c781",
  NEARX: "0xb39eeb9e168ef6c639f5e282fef1f6bc4dcae375",
  NECC: "0x6EBA841F1201fFDDe7DDC2ba995D3308f6C4aEa0",
  NDOL: "0xC86Ca2BB9C9c9c9F140d832dE00BfA9e153FA1e3",
  ORBITAL: "0x3AC55eA8D2082fAbda674270cD2367dA96092889",
  OCEAN: "0x3564a4e03fe38fde627ed639b6d7d5dbe9ba2461",
  OCT: "0x951cfdc9544b726872a8faf56792ef6704731aae",
  POLAR: "0xf0f3b9Eee32b1F490A4b8720cf6F005d4aE9eA86",
  PACHA: "0xc2aa4b56e325266e32582f5f5cece7e88f0c11d2",
  PEM: "0xb145d9ba4cbe0498a725b00f703e9af5266e0aae",
  PICKLE: "0x291c8fceaca3342b29cc36171deb98106f712c66",
  PRESENCE: "0xf6db8e249099b909a764e46a9cc0c9309dcfd0ce",
  PULSE: "0x8828a5047d093f6354e3fe29ffcb2761300dc994",
  REF: "0x221292443758f63563a1ed04b547278b05845fcb",
  REN: "0x18921f1e257038e538ba24d49fa6495c8b1617bc",
  SOL: "0x0f00576d07B594Bdc1caf44b6014A6A02E5AFd48",
  SPOLAR: "0x9D6fc90b25976E40adaD5A3EdD08af9ed7a21729",
  SFT: "0xfc56694ab428e7b4a03b8299b502d4598d945217",
  PAD: "0x34F291934b88c7870B7A17835B926B264fc13a81",
  SD: "0x078e103d5f9629ac48b8563fa2bfcd2f6d5fde84",
  STNEAR: "0x07f9f7f963c5cd2bbffd30ccfb964be114332e30",
  SUSHI: "0x7821c773a12485b12a2b5b7bc451c3eb200986b1",
  SNX: "0xdc9be1ff012d3c6da818d136a3b2e5fdd4442f74",
  TRIPOLAR: "0x60527a2751A827ec0Adf861EfcAcbf111587d748",
  USDTE: "0x4988a896b1227218e4a686fde5eabdcabd91571f",
  XTRI: "0x802119e4e253D5C19aA06A5d567C5a41596D6803",
  TRI: "0xFa94348467f64D5A457F75F8bc40495D33c65aBB",
  TUSD: "0x5454ba0a9e3552f7828616d80a9d2d869726e6f5",
  USDCE: "0xb12bfca5a55806aaf64e99521918a4bf0fc40802",
  USN: "0x5183e1b1091804bc2602586919e6880ac1cf2896",
  USP: "0xa69d9Ba086D41425f35988613c156Db9a88a1A96",
  ATUST: "0x5ce9F0B6AFb36135b5ddBF11705cEB65E634A9dC",
  UNI: "0x1bc741235ec0ee86ad488fa49b69bb6c823ee7b7",
  VRA: "0x17bC24b9bDD8A3E7486E3C3458a5954412F2ff60",
  WANNA: "0x7faA64Faf54750a2E3eE621166635fEAF406Ab22",
  WOO: "0x99ec8f13b2afef5ec49073b9d20df109d25f78c0",
  WBTC: "0xf4eb217ba2454613b15dbdea6e5f22276410e89e",
  LUNA: "0xfca152a9916895bf564e3f26a611f9e1e6aa6e73",
  WNEAR: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
  NNECC: "0x449f661c53aE0611a24c2883a910A563A7e42489",
  UST: "0x098d5b6a26bca1d71f2335805d71b244f94e8a5f",
  WSTR: "0xf34d508bac379825255cc80f66cbc89dfeff92e4",
  UMINT: "0x984c2505a14da732d7271416356f535953610340",
  AUSDO: "0x293074789b247cab05357b08052468B5d7A23c5a",
  AGEUR: "0xdc7acde9ff18b4d189010a21a44ce51ec874ea7c",
  BHOME: "0xe4baf0af161bf03434d1c5a53957981493c12c99",
  DLTA: "0xfbd1d8dce2f97bc14239fd507183b98ff1354b39",
  MODA: "0x74974575d2f1668c63036d51ff48dbaa68e52408",
  OIN: "0x07b2055fbd17b601c780aeb3abf4c2b3a30c7aae",
  RMC: "0xd9a4c034e69e5162ac02bec627475470a53c9a14",
  SOLACE: "0x1BDA7007C9e3Bc33267E883864137aF8eb53CC2D",
  YFI: "0xa64514a8af3ff7366ad3d5daa5a548eefcef85e0",
};

const tokensMenuItems = Object.keys(tokens).map((token) => (
  <option value={tokens[token]}>{token}</option>
));

const setSendTo = (sendTo) => {
  const receiver = Ethers.resolveName(sendTo);
  State.update({ sendTo, receiver: receiver ?? "" });
  refreshBalances();
};

const setToken = (token) => {
  State.update({ token });
  getTokenDecimals();
};

const getTokenBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: state.token,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(state.tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const getTokenDecimals = () => {
  const encodedData = iface.encodeFunctionData("decimals", []);

  return Ethers.provider()
    .call({
      to: state.token,
      data: encodedData,
    })
    .then((tokenDecimals) => {
      State.update({ tokenDecimals: parseInt(Number(tokenDecimals)) });
      refreshBalances();
    });
};

const refreshBalances = () => {
  getTokenBalance(state.sender).then((value) => {
    State.update({ senderBalance: value });
  });

  getTokenBalance(state.receiver).then((value) => {
    State.update({ receiverBalance: value });
  });
};

const sendTokens = () => {
  const erc20 = new ethers.Contract(
    state.token,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseUnits(state.amount, state.tokenDecimals);

  erc20.transfer(state.receiver, amount);

  console.log("transactionHash is " + transactionHash);
};

return (
  <>
    <h3> 🌈 Send Aurora tokens</h3>
    <div class="row">
      <div class="mb-3 col-lg-6">
        <label for="selectToken">Select token</label>
        <select
          class="form-select"
          id="selectToken"
          onChange={(e) => {
            setToken(e.target.value);
          }}
        >
          {tokensMenuItems}
        </select>
      </div>
      <div class="mb-3 col-lg-6">
        <label for="amount" class="form-label">
          Enter the amount
        </label>
        <input
          value={state.amount}
          class="form-control"
          id="amount"
          placeholder=""
          onChange={(e) => State.update({ amount: e.target.value })}
        />
      </div>
    </div>

    <div class="mb-3">
      <label for="send-to" class="form-label">
        Recepient address
      </label>
      <input
        value={state.sendTo}
        class="form-control"
        id="send-to"
        placeholder="vitalik.eth"
        onChange={(e) => setSendTo(e.target.value)}
      />
      {state.receiver && (
        <div class="text-secondary mt-3">Resolved to {state.receiver}</div>
      )}
      {state.receiverBalance != "0" && (
        <div class="text-secondary mt-3">
          Receiver's balance: {state.receiverBalance}
        </div>
      )}

      {state.senderBalance != "0" && (
        <div class="text-secondary mt-3">
          Sender's balance: {state.senderBalance}
        </div>
      )}
    </div>

    <div class="mb-3">
      <button onClick={sendTokens}>Send</button>
    </div>
  </>
);
