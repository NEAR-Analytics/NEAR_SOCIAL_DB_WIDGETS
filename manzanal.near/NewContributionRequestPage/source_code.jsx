const ownerId = "contribut3.near";
const tempAccountId = "manzanal.near"; // need to replace with ownerId before pushing changes to main

const renderContent = () => {
  return (
    <>
      <Widget
        src={`${tempAccountId}/widget/PageTitle`}
        props={{
          title: "Create new contribution request",
          subtitle:
            "Crypto ipsum bitcoin ethereum dogecoin litecoin. Ethereum kadena polkadot ICON BitTorrent. Crypto ipsum bitcoin ethereum dogecoin litecoin. Ethereum kadena",
        }}
      />
      <Widget
        src={`${tempAccountId}/widget/NewContributionRequestForm`}
        props={{}}
      />
    </>
  );
};

return (
  <Widget
    src={`${tempAccountId}/widget/Theme`}
    props={{ children: renderContent() }}
  />
);
