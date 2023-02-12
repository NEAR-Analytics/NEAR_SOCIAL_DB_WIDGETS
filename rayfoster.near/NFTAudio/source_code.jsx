const playerArea = styled.div`
  width:500px;
  height:500px;
  background-color:rgba(240,240,240,0.5);
  border-radius:30px;
  padding:30px;
  backdrop-filter: blur(50px);
`;

const broadcaster = styled.h2`
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
  background-color:  rgba(255,255,255,0.2);
  border-radius:20px;
  width:50px;
  height:50px;
  border-width:0px;
  filter: drop-shadow(0px 1px 2px #555);
  margin-left:10px;
  margin-right:10px;
  &:hover {
    background-color: white;
    }
`;

const uiButtonArea = styled.div`
  margin:auto;
  text-align:center;
`;
const rotate = styled.keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }`;
const bgThumb = styled.img`
    position: absolute;
    top: 100px;
    width: 350px;
    max-height: 350px;
    left:85px;
    z-index: -1;
    animation: ${rotate} 10s linear infinite;
`;
const fgThumb = styled.img`
  width: 200px;
    margin-left: 120px;
    margin-top: 10px;
    filter: drop-shadow(2px 4px 6px black);
    border-radius:15px;
`;

const tokenId = props.tokenId;
const contractId = props.contractId;
const rootId = props.rootId;

const nftMetadata = Near.view(contractId, "nft_metadata");
const tokenMetadata = Near.view(contractId, "nft_token", {
  token_id: tokenId,
}).metadata;
let extra = JSON.parse(tokenMetadata.extra);

//console.log(nftMetadata);
//console.log(tokenMetadata);
//console.log(extra);

let audioUri = `https://daorecords.io:8443/fetch?cid=${extra.music_cid}`;
let newAudio = new Audio(audioUri);
let artUrl = `https://daorecords.io:8443/get/thumbnail?root_id=${rootId}&contract=${contractId}`;
let artRes = fetch(artUrl).body.thumbnail;
let artData = `data:image/webp;base64,${artRes}`;

//Get's current time
//newAudio.currentTime

function playAudio() {
  newAudio.play();
}

function pauseAudio() {
  newAudio.pause();
}

function stopAudio() {
  newAudio.load();
}

let propsCheck = !props.tokenId || !props.contractId || !props.rootId;

return (
  <div>
    {propsCheck ? (
      <div>
        <h3>Please make sure props are set up correctly</h3>
        <p>
          {`{
        "contractId": "CONTRACTID",
        "tokenId": "TOKENID",
        "rootId": "ROOTID"
      }`}
        </p>
      </div>
    ) : (
      <div>
        <bgThumb src={artData} />

        <playerArea>
          <broadcaster>{nftMetadata.symbol}</broadcaster>

          <song>{tokenMetadata.title}</song>
          <description> {tokenMetadata.description}</description>

          <uiButtonArea>
            <uiButtons
              style={ui.btnPlay ? { "background-color": "#fff" } : {}}
              onClick={playAudio}
            >
              <svg width="24" height="24">
                <path d="M23 12l-22 12v-24l22 12zm-21 10.315l18.912-10.315-18.912-10.315v20.63z" />
              </svg>
            </uiButtons>

            <uiButtons
              style={ui.btnPause ? { "background-color": "#fff" } : {}}
              onClick={pauseAudio}
            >
              <svg width="24" height="24">
                <path d="M10 24h-6v-24h6v24zm10 0h-6v-24h6v24zm-11-23h-4v22h4v-22zm10 0h-4v22h4v-22z" />
              </svg>
            </uiButtons>

            <uiButtons
              style={ui.btnStop ? { "background-color": "#fff" } : {}}
              onClick={stopAudio}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M2 2h20v20h-20z" />
              </svg>
            </uiButtons>
          </uiButtonArea>
          <fgThumb src={artData} />
        </playerArea>
      </div>
    )}
  </div>
);
