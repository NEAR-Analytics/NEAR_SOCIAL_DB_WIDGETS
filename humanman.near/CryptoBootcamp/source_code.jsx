const accountId = context.accountId;
const initalPath = "01_history/1.1_history-of-the-internet";
const initialSelected = "1.1 The History of the Internet";
const initialUrl =
  "https://raw.githubusercontent.com/near/wiki/master/wiki/support/understanding-web3/01_history/1.1_history-of-the-internet.md";
const ghPath =
  "https://raw.githubusercontent.com/near/wiki/master/wiki/support/understanding-web3/";
const s3Path = "https://cryptobootcampassets.s3.amazonaws.com/";
if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

const lessonPaths = [
  {
    label: "1.1 The History of the Internet",
    path: "01_history/1.1_history-of-the-internet.md",
  },
  {
    label: "1.2 The History of Money",
    path: "01_history/1.2_history-of-money.md",
  },
  {
    label: "1.3 The History of Crypto",
    path: "01_history/1.3_history-of-crypto.md",
  },
  {
    label: "2.1 The Evolution of Blockchain",
    path: "02_landscape/2.1_evolution-blockchain.md",
  },
  {
    label: "2.2 Ethereum 1.0 / Ethereum 2.0",
    path: "02_landscape/2.2_eth1.0-eth2.0.md",
  },
  { label: "2.3 NEAR Protocol", path: "02_landscape/2.3_NEAR-Protocol.md" },
  { label: "2.4 The Product Stack", path: "02_landscape/2.4_product-stack.md" },
  { label: "2.5 Composability", path: "02_landscape/2.5_composability.md" },
  {
    label: "2.6 Crypto Ecosystems and Emerging Technologies",
    path: "02_landscape/2.6_emerging-technologies.md",
  },
  {
    label: "2.7 Measuring Success Against other Ecosystems",
    path: "02_landscape/2.7_measuring-success.md",
  },
  {
    label: "2.8 Legal Pathways and Project Design",
    path: "02_landscape/2.8_legal-and-product.md",
  },
  {
    label: "3.1 Understanding DeFi",
    path: "03_defi/3.1_understanding-defi.md",
  },
  {
    label: "3.2 DEX / AMM / Aggregators / Perps",
    path: "03_defi/3.2_dex-amm-agg-perps.md",
  },
  { label: "3.3 Stablecoins", path: "03_defi/3.3_stablecoins.md" },
  { label: "3.4 DeFi Lending", path: "03_defi/3.4_lending.md" },
  { label: "3.5 Synthetic Assets", path: "03_defi/3.5_synthetics.md" },
  { label: "3.6 Staking", path: "03_defi/3.6_staking.md" },
  {
    label: "3.7 Prediction Market Design",
    path: "03_defi/3.7_prediction-market-design.md",
  },
  {
    label: "4.1 What is a Non-Fungible Token (NFT)?",
    path: "04_creator-economy/4.1_nfts.md",
  },
  {
    label: "4.2 NFT Lending, fractionalization and time-scarcity",
    path: "04_creator-economy/4.2_nft-lending.md",
  },
  {
    label: "4.3 Social Tokens",
    path: "04_creator-economy/4.3_social-tokens.md",
  },
  {
    label: "4.4 The Making of the Creator Economy",
    path: "04_creator-economy/4.4_creator-economy.md",
  },
  {
    label: "4.5 Future Creator Economy Developments",
    path: "04_creator-economy/4.5_future-economy.md",
  },
  {
    label: "5.1 Decentralized Autonomous Organizations (DAOs)",
    path: "05_DAOs/5.1_dao-landscape.md",
  },
  {
    label: "5.2 Sputnik V2 and Astro DAO on NEAR",
    path: "05_DAOs/5.2_sputnik-vs-astro-dao.md",
  },
  {
    label: "5.3 Protocol Politicians and Governance Design",
    path: "05_DAOs/5.3_governance.md",
  },
  {
    label: "5.4 Network States and the Future of Governance",
    path: "05_DAOs/5.4_network-states.md",
  },
  {
    label: "6.1 Theory and Evolution of the Metaverse",
    path: "06_metaverse/6.1_theory-and-evolution.md",
  },
  {
    label: "6.2 Digital Real Estate Economies",
    path: "06_metaverse/6.2_realstate-economies.md",
  },
  {
    label: "6.3 Metaverse on NEAR",
    path: "06_metaverse/6.3_metaverse-on-near.md",
  },
];

// slice out frontmatter from fetched .md files
// for Markdown comp: replace docusaurus-specific paths to assets with CDN paths
const res = fetch(initialUrl);
const delimiter = "\n";
const start = 4;
const body = res.body.split(delimiter).slice(start).join("\n");

State.init({
  content: body,
  selected: initialSelected,
  path: initalPath,
});

// update state and fetch selected file from wiki repo
const handleModuleSelect = (val) => {
  if (!val || lessonPaths[val] == undefined) return;
  const newPath = lessonPaths[val]["path"];
  const url = `${ghPath}${newPath}`;
  const fecthed = fetch(url);
  const m = fecthed.body.split(delimiter).slice(start).join("\n");
  State.update({ path: lessonPaths[val], content: m });
};

if (context.loading) {
  return "Loading";
}

return (
  <div>
    <h5 style={{ color: "green" }}>(Beta)</h5>
    <br />
    <Typeahead
      labelKey="label"
      options={lessonPaths}
      onChange={(selected) => {
        State.update({ selected: selected });
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
        uri.startsWith("http") ? uri : `${s3Path}${uri.slice(26)}`
      }
    />
  </div>
);
