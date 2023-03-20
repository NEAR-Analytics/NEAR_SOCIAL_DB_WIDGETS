const accountId = context.accountId;
const initalPath = "01_history/1.1_history-of-the-internet";
const initialSelected = "1.1 The History of the Internet";
const initialUrl =
  "https://raw.githubusercontent.com/near/wiki/master/wiki/support/understanding-web3/01_history/1.1_history-of-the-internet.md";

if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

const lessons = [
  "1.1 The History of the Internet",
  "1.2 The History of Money",
  "1.3 The History of Crypto",
  "2.1 The Evolution of Blockchain",
  "2.2 Ethereum 1.0 / Ethereum 2.0",
  "2.3 NEAR Protocol",
  "2.4 The Product Stack",
  "2.5 Composability",
  "2.6 Crypto Ecosystems and Emerging Technologies",
  "2.7 Measuring Success Against other Ecosystems",
  "2.8 Legal Pathways and Project Design",
  "3.1 Understanding DeFi",
  "3.2 DEX / AMM / Aggregators / Perps",
  "3.3 Stablecoins",
  "3.4 DeFi Lending",
  "3.5 Synthetic Assets",
  "3.6 Staking",
  "3.7 Prediction Market Design",
  "4.1 What is a Non-Fungible Token (NFT)?",
  "4.2 NFT Lending, fractionalization and time-scarcity",
  "4.3 Social Tokens",
  "4.4 The Making of the Creator Economy",
  "4.5 Future Creator Economy Developments",
  "5.1 Decentralized Autonomous Organizations (DAOs)",
  "5.2 Sputnik V2 and Astro DAO on NEAR",
  "5.3 Protocol Politicians and Governance Design",
  "5.4 Network States and the Future of Governance",
  "6.1 Theory and Evolution of the Metaverse",
  "6.2 Digital Real Estate Economies",
  "6.3 Metaverse on NEAR",
];

const lessonPaths = {
  "1.1 The History of the Internet": "01_history/1.1_history-of-the-internet",
  "1.2 The History of Money": "01_history/1.2_history-of-money",
  "1.3 The History of Crypto": "01_history/1.3_history-of-crypto",
  "2.1 The Evolution of Blockchain": "02_landscape/2.1_evolution-blockchain",
  "2.2 Ethereum 1.0 / Ethereum 2.0": "02_landscape/2.2_eth1.0-eth2.0",
  "2.3 NEAR Protocol": "02_landscape/2.3_NEAR-Protocol",
  "2.4 The Product Stack": "02_landscape/2.4_product-stack",
  "2.5 Composability": "02_landscape/2.5_composability",
  "2.6 Crypto Ecosystems and Emerging Technologies":
    "02_landscape/2.6_emerging-technologies",
  "2.7 Measuring Success Against other Ecosystems":
    "02_landscape/2.7_measuring-success",
  "2.8 Legal Pathways and Project Design": "02_landscape/2.8_legal-and-product",
  "3.1 Understanding DeFi": "03_defi/3.1_understanding-defi",
  "3.2 DEX / AMM / Aggregators / Perps": "03_defi/3.2_dex-amm-agg-perps",
  "3.3 Stablecoins": "03_defi/3.3_stablecoins",
  "3.4 DeFi Lending": "03_defi/3.4_lending",
  "3.5 Synthetic Assets": "03_defi/3.5_synthetics",
  "3.6 Staking": "03_defi/3.6_staking",
  "3.7 Prediction Market Design": "03_defi/3.7_prediction-market-design",
  "4.1 What is a Non-Fungible Token (NFT)?": "04_creator-economy/4.1_nfts",
  "4.2 NFT Lending, fractionalization and time-scarcity":
    "04_creator-economy/4.2_nft-lending",
  "4.3 Social Tokens": "04_creator-economy/4.3_social-tokens",
  "4.4 The Making of the Creator Economy":
    "04_creator-economy/4.4_creator-economy",
  "4.5 Future Creator Economy Developments":
    "04_creator-economy/4.5_future-economy",
  "5.1 Decentralized Autonomous Organizations (DAOs)":
    "05_DAOs/5.1_dao-landscape",
  "5.2 Sputnik V2 and Astro DAO on NEAR": "05_DAOs/5.2_sputnik-vs-astro-dao",
  "5.3 Protocol Politicians and Governance Design": "05_DAOs/5.3_governance",
  "5.4 Network States and the Future of Governance":
    "05_DAOs/5.4_network-states",
  "6.1 Theory and Evolution of the Metaverse":
    "06_metaverse/6.1_theory-and-evolution",
  "6.2 Digital Real Estate Economies": "06_metaverse/6.2_realstate-economies",
  "6.3 Metaverse on NEAR": "06_metaverse/6.3_metaverse-on-near",
};

const res = fetch(initialUrl);
const delimiter = "\n";
const start = 4;
const body = res.body.split(delimiter).slice(start).join("\n");

State.init({
  content: body,
  selected: initialSelected,
  path: initalPath,
});

const handleModuleSelect = (val) => {
  if (!val || lessonPaths[val] == undefined) return;
  const newPath = lessonPaths[val];
  const url = `https://raw.githubusercontent.com/near/wiki/master/wiki/support/understanding-web3/${newPath}.md`;
  const fecthed = fetch(url);
  console.log(val, newPath, url);
  const m = fecthed.body.split(delimiter).slice(start).join("\n");
  State.update({ selected: val, path: lessonPaths[val], content: m });
  console.log(State);
};

if (context.loading) {
  return "Loading";
}

return (
  <div>
    <Typeahead
      options={lessons}
      onChange={(selected) => {
        return handleModuleSelect(selected);
      }}
      placeholder="Select a lecture..."
      autoFocus
      clearButton
      emptyLabel
    />
    <br />
    <br />
    <Markdown
      text={state.content}
      transformImageUri={(uri) =>
        uri.startsWith("http")
          ? uri
          : `https://cryptobootcampassets.s3.amazonaws.com/${uri.slice(26)}`
      }
    />
  </div>
);
