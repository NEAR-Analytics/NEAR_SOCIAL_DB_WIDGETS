const accountId = props.accountId || context.accountId;
const mode = props.mode || "normal";

let style;
if (mode === "normal") {
  style = { width: "3em", height: "3em" };
} else if (mode === "compact") {
  style = { width: "1.5em", height: "1.5em" };
}
if (props.style) {
  style = props.style;
}

const nearDevGovBadgesContractId = "devgov-badges.frol.near";

const ownedBadges = Near.view(
  nearDevGovBadgesContractId,
  "nft_tokens_for_owner",
  {
    account_id: accountId,
  }
);

if (!ownedBadges) {
  return <>Loading...</>;
}

return (
  <>
    {ownedBadges.map(({ token_id: tokenId, metadata }) => {
      const badgeImage = (
        <a
          href={`#/frol.near/widget/DevGovBadgeDetails?tokenId=${tokenId}`}
          title={`NEAR DevGov Badge - ${metadata.title}`}
        >
          <Widget
            src="mob.near/widget/NftImage"
            props={{
              style,
              nft: {
                tokenMetadata: metadata,
                contractId: nearDevGovBadgesContractId,
              },
              alt: `NEAR DevGov Badge - ${metadata.title}`,
            }}
          />
        </a>
      );
      if (mode === "compact") {
        return badgeImage;
      }
      return (
        <ul>
          <li style={{ listStyleType: "none" }}>
            {badgeImage}
            <Markdown text={metadata.description} />
          </li>
        </ul>
      );
    })}
  </>
);
