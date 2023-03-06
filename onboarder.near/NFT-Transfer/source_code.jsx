const nft = props.nft ?? {
  contractId: props.contractId,
  tokenId: props.tokenId,
};
// const contractId = nft.contractId; // NEED TO CHECK IF owner_id // conditional show reciever and transfer if owner
const contractId = "genadrop-contract.nftgen.near"; // pass as
// error for serialization of reciever id, maybe need a buffer
// const tokenId = nft.tokenId;
const tokenId = "1674644968189";
// check owner // add state init // get message sender
const className = props.className ?? "img-fluid";
const style = props.style;
const alt = props.alt;
const thumbnail = props.thumbnail;
const fallbackUrl = props.fallbackUrl;
const reciever = "onboarddao.sputnik-dao.near";
const gas = "30000000000000";
const deposit = "10000000000000000000";
const loadingUrl =
  props.loadingUrl ??
  "https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu";

State.init({
  contractId,
  tokenId,
  imageUrl: null,
  reciever,
  gas,
  deposit,
});

if (contractId !== state.contractId || tokenId !== tokenId) {
  State.update({
    contractId,
    tokenId,
    imageUrl: null,
  });
}
const onChangeReciever = (reciever) => {
  State.update({
    reciever,
  });
};

const onChangeContract = (contractId) => {
  State.update({
    contractId,
  });
};

const onChangeToken = (tokenId) => {
  State.update({
    tokenId,
  });
};

const nftMetadata =
  nft.contractMetadata ?? Near.view(contractId, "nft_metadata");
const tokenMetadata =
  nft.tokenMetadata ??
  Near.view(contractId, "nft_token", {
    token_id: tokenId,
  }).metadata;

let imageUrl = null;

if (nftMetadata && tokenMetadata) {
  let tokenMedia = tokenMetadata.media || "";

  imageUrl =
    tokenMedia.startsWith("https://") ||
    tokenMedia.startsWith("http://") ||
    tokenMedia.startsWith("data:image")
      ? tokenMedia
      : nftMetadata.base_uri
      ? `${nftMetadata.base_uri}/${tokenMedia}`
      : tokenMedia.startsWith("Qm") || tokenMedia.startsWith("ba")
      ? `https://ipfs.near.social/ipfs/${tokenMedia}`
      : tokenMedia;

  if (!tokenMedia && tokenMetadata.reference) {
    if (
      nftMetadata.base_uri === "https://arweave.net" &&
      !tokenMetadata.reference.startsWith("https://")
    ) {
      const res = fetch(`${nftMetadata.base_uri}/${tokenMetadata.reference}`);
      imageUrl = res.body.media;
    } else if (
      tokenMetadata.reference.startsWith("https://") ||
      tokenMetadata.reference.startsWith("http://")
    ) {
      const res = fetch(tokenMetadata.reference);
      imageUrl = JSON.parse(res.body).media;
    } else if (tokenMetadata.reference.startsWith("ar://")) {
      const res = fetch(
        `${"https://arweave.net"}/${tokenMetadata.reference.split("//")[1]}`
      );
      imageUrl = JSON.parse(res.body).media;
    }
  }

  if (!imageUrl) {
    imageUrl = false;
  }
}

const rex =
  /^(?:https?:\/\/)(?:[^\/]+\/ipfs\/)?(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(?:\.[^\/]+)?(\/.*)?$/g;
rex.lastIndex = 0;

const replaceIpfs = (imageUrl) => {
  if (state.oldUrl !== imageUrl && imageUrl) {
    const match = rex.exec(imageUrl);
    if (match) {
      const newImageUrl = `https://ipfs.near.social/ipfs/${match[1]}${
        match[2] || ""
      }`;
      if (newImageUrl !== imageUrl) {
        State.update({
          oldUrl: imageUrl,
          imageUrl: newImageUrl,
        });
        return;
      }
    }
  }
  if (state.imageUrl !== false) {
    State.update({
      imageUrl: false,
    });
  }
};

const thumb = (imageUrl) =>
  thumbnail && imageUrl && !imageUrl.startsWith("data:image/")
    ? `https://i.near.social/${thumbnail}/${imageUrl}`
    : imageUrl;

const img = state.imageUrl !== null ? state.imageUrl : imageUrl;
const src = img !== false ? img : fallbackUrl;

const transferNFT = () => {
  Near.call([
    {
      contractName: state.contractId,
      methodName: "nft_transfer",
      args: {
        reciever_id: state.reciever,
        token_id: state.tokenId,
      },
      gas: state.gas ?? 200000000000000,
      deposit: state.deposit ?? 10000000000000000000000,
    },
  ]);
};
return (
  <div className="col">
    <h1>Transfer A NFT</h1>
    <img
      className={className}
      style={style}
      src={src !== null ? thumb(src) : loadingUrl}
      alt={alt}
      onError={() => replaceIpfs(img)}
    />
    <div className="row">
      <div className="col-lg-6 mb-2">
        ContractID
        <input
          type="text"
          placeholder={state.contractId}
          onChange={(e) => onChangeContract(e.target.value)}
        />
      </div>
      <div className="col-lg-6 mb-2">
        Token ID
        <input
          type="text"
          placeholder={state.tokenId}
          onChange={(e) => onChangeToken(e.target.value)}
        />
      </div>
      <div className="col-lg-6 mb-2">
        Reciever
        <input
          type="text"
          placeholder={state.reciever}
          onChange={(e) => onChangeReciever(e.target.value)}
        />
      </div>
    </div>
    <button onClick={transferNFT}>Transfer NFT to {state.reciever}</button>
  </div>
);
