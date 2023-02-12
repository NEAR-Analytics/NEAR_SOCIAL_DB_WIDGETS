const profile = Social.getr(`${context.accountId}/profile`);
let tokenId = props.tokenId;
let contractId = props.contractId;
console.log(tokenId, contractId);
const nftMetadata = Near.view(contractId, "nft_metadata");
const tokenMetadata = Near.view(contractId, "nft_token", {
  token_id: tokenId,
}).metadata;
let extra = JSON.parse(tokenMetadata.extra);

console.log(nftMetadata);
console.log(tokenMetadata);
console.log(extra);

let dao = `https://daorecords.io:8443/fetch?cid=${extra.music_cid}`;
let newAudio = new Audio(dao);
let artUrl = `https://daorecords.io:8443/get/thumbnail?root_id=${props.rootId}&contract=${contractId}`;
let artRes = fetch(artUrl).body.thumbnail;
let artData = `data:image/webp;base64,${artRes}`;
let paused = true;

function updateTime() {
  if (paused) {
  } else {
    console.log(newAudio.currentTime);
    setTimeout(updateTime, 1000);
  }
}

function playAudio() {
  newAudio.play();
  paused = false;
}

function stopAudio() {
  newAudio.pause();
  paused = true;
}

function stop() {
  newAudio.load();
  paused = true;
}

const playerArea = styled.div`
  width:500px;
  height:500px;
  background-color:rgba(240,240,240,0.5);
  border-radius:30px;
  padding:30px;
  backdrop-filter: blur(50px);
`;

const artist = styled.h2`
  color:#555;
  text-align:center;
`;
const song = styled.h3`
  color:#666;
  text-align:center;
`;
const description = styled.p`
  display:block;
  font-size:11px;
  border-radius:10px;
  padding:10px;
  background-color:rgb(219, 219, 219,0.2);;
`;
const uiButtons = styled.button`
  background-color:#aaa;
  border-radius:20px;
  width:50px;
  height:50px;
  border-width:0px;
  filter: drop-shadow(0px 1px 2px #555);
  margin-left:10px;
  margin-right:10px;
`;
const uiButtonArea = styled.div`
  margin:auto;
  text-align:center;
`;
const bgThumb = styled.img`
    position: absolute;
    top: 50px;
    width: 400px;
    left: 59px;
    z-index: -1;
`;
const fgThumb = styled.img`
  width: 200px;
    margin-left: 120px;
    margin-top: 10px;
    filter: drop-shadow(2px 4px 6px black);
`;

return (
  <div>
    <bgThumb src={artData} />

    <playerArea>
      <artist>{nftMetadata.symbol}</artist>

      <song>{tokenMetadata.title}</song>
      <description> {tokenMetadata.description}</description>

      <uiButtonArea>
        <uiButtons onClick={playAudio}>
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path d="M23 12l-22 12v-24l22 12zm-21 10.315l18.912-10.315-18.912-10.315v20.63z" />
          </svg>
        </uiButtons>
        <uiButtons onClick={stopAudio}>
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path d="M10 24h-6v-24h6v24zm10 0h-6v-24h6v24zm-11-23h-4v22h4v-22zm10 0h-4v22h4v-22z" />
          </svg>
        </uiButtons>
        <uiButtons onClick={stop}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M2 2h20v20h-20z" />
          </svg>
        </uiButtons>
      </uiButtonArea>
      <fgThumb src={artData} />
    </playerArea>
  </div>
);
