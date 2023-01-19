const nearDevGovBadgesContractId = "devgov-badges.frol.near";

State.init({
  badgeId: "",
  badgeMetadata: { copies: 0 },
});

const slugify = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

const submitForm = () => {
  Near.call(
    nearDevGovBadgesContractId,
    "mint_badge",
    {
      badge_id: state.badgeId,
      badge_metadata: state.badgeMetadata,
    },
    30000000000000,
    1
  );
};

return (
  <div className="row">
    <div className="col-lg-6">
      <div>
        <h4>
          Mint new NEAR Developer Governance Badge (available only for
          moderators)
        </h4>
      </div>
      <div className="mb-2">
        <Widget
          src="mob.near/widget/MetadataEditor"
          props={{
            initialMetadata: badgeMetadata,
            onChange: (newMetadata) => {
              let media = newMetadata.image.url || newMetadata.image.ipfs_cid;
              if (!media && newMetadata.image.nft) {
                media = Near.view(
                  newMetadata.image.nft.contractId,
                  "nft_token",
                  {
                    token_id: newMetadata.image.nft.tokenId,
                  }
                );
                console.log(
                  "nft",
                  newMetadata.image.nft.contractId,
                  "nft_token",
                  {
                    token_id: newMetadata.image.nft.tokenId,
                  },
                  media
                );
                media = media.metadata.media;
              }
              console.log("newmeta2", newMetadata, media);
              State.update({
                badgeId: slugify(newMetadata.name),
                badgeMetadata: {
                  title: newMetadata.name,
                  media,
                  description: newMetadata.description,
                  copies: 0,
                },
              });
            },
            options: {
              name: { label: "Badge Name" },
              image: { label: "Badge Image" },
              description: { label: "Badge Description" },
            },
          }}
        />
      </div>
      <div className="mb-2">
        <button class="btn btn-success" onClick={submitForm}>
          Mint Badge
        </button>
      </div>
    </div>
    <div className="col-lg-6">
      <div>
        <Widget
          src="frol.near/widget/DevGovBadgeDetails"
          props={{ badgeId: state.badgeId, badgeMetadata: state.badgeMetadata }}
        />
      </div>
    </div>
  </div>
);
