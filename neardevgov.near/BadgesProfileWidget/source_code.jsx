const nearDevGovBadgesContractId = "neardevgov.near";

const accountId = props.accountId ?? context.accountId;

const ownedBadges = Near.view(
  nearDevGovBadgesContractId,
  "nft_tokens_for_owner",
  {
    account_id: accountId,
  }
);
if (!ownedBadges || ownedBadges.length === 0) {
  return <></>;
}

return (
  <div>
    <h3>Awards by NEAR Developer Governance</h3>
    <Widget
      src="neardevgov.near/widget/BadgesList"
      props={{
        badges: ownedBadges,
        mode: "normal",
      }}
    />
  </div>
);
