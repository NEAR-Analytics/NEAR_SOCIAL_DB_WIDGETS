const nft = props.nft ?? {
  contractId: props.contractId,
  tokenId: props.tokenId,
};
const contractId = nft.contractId;
const tokenId = nft.tokenId;
const className = props.className ?? "img-fluid";
const style = props.style;
const alt = props.alt;
const thumbnail = props.thumbnail;
const fallbackUrl = props.fallbackUrl;

const nftMetadata = Near.view(contractId, "nft_metadata");
const nftToken = Near.view(contractId, "nft_token", {
  token_id: tokenId,
});

let imageUrl = fallbackUrl;

if (nftMetadata && nftToken) {
  let tokenMetadata = nftToken.metadata;
  let tokenMedia = tokenMetadata.media || "";

  const ownerId = nftToken.owner_id["Account"]
    ? nftToken.owner_id["Account"]
    : nftToken.owner_id;

  imageUrl =
    tokenMedia.startsWith("https://") ||
    tokenMedia.startsWith("http://") ||
    tokenMedia.startsWith("data:image")
      ? tokenMedia
      : nftMetadata.base_uri
      ? `${nftMetadata.base_uri}/${tokenMedia}`
      : tokenMedia.startsWith("Qm")
      ? `https://ipfs.near.social/ipfs/${tokenMedia}`
      : tokenMedia;

  if (
    !tokenMedia &&
    tokenMetadata.reference &&
    nftMetadata.base_uri === "https://arweave.net"
  ) {
    const res = fetch(`${nftMetadata.base_uri}/${tokenMetadata.reference}`);
    imageUrl = res.body.media;
  }

  if (!imageUrl) {
    imageUrl = fallbackUrl;
  }
}

const replaceIpfs = () => {
  if (!state.imageUrl && imageUrl) {
    const match =
      /^(?:https?:\/\/[^\/]+\/ipfs\/)?(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/.*)?$/g.exec(
        imageUrl
      );
    if (match) {
      State.update({
        imageUrl: `https://ipfs.near.social/ipfs/${match[1]}${match[2] || ""}`,
      });
    }
  }
};

const thumb = (imageUrl) =>
  thumbnail ? `https://i.near.social/${thumbnail}/${imageUrl}` : imageUrl;

return (
  <img
    className={className}
    style={style}
    src={state.imageUrl ? thumb(state.imageUrl) : thumb(imageUrl)}
    alt={alt}
    onError={replaceIpfs}
  />
);
