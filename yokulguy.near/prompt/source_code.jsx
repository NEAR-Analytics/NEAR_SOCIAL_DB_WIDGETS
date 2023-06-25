const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
const getPrompt = (page, cb) =>
  asyncFetch(
    `https://alpha.tryhologram.art/api/prompt/pagination?page=${page}`
  ).then(cb);

const initialPage = getRandomInt(10);
const lastPage = initialPage + 10;
const sender = Ethers.send("eth_requestAccounts", [])[0];

State.init({
  contents: [],
  currentPage: initialPage,
  lastPage: lastPage,
  isLoading: true,
});

const loadMore = () => {
  State.update({
    isLoading: true,
    ...state,
  });
  const newPage = state.currentPage + 1;
  getPrompt(newPage, (res) => {
    console.log({ res });
    State.update({
      contents: state.contents.concat(res.body.prompt.rows),
      currentPage: newPage,
      lastPage: res.body.lastPage,
      isLoading: false,
    });
  });
};

const mint = async (ipfsUrl) => {
  const abi = [{"type":"constructor","inputs":[{"type":"string","name":"name","internalType":"string"},{"type":"string","name":"symbol","internalType":"string"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"approve","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getApproved","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isApprovedForAll","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"operator","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"mint","inputs":[{"type":"string","name":"_tokenURI","internalType":"string"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"ownerOf","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"bytes","name":"data","internalType":"bytes"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setApprovalForAll","inputs":[{"type":"address","name":"operator","internalType":"address"},{"type":"bool","name":"approved","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"supportsInterface","inputs":[{"type":"bytes4","name":"interfaceId","internalType":"bytes4"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tokenCounter","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"tokenURI","inputs":[{"type":"uint256","name":"_tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","indexed":true},{"type":"address","name":"approved","indexed":true},{"type":"uint256","name":"tokenId","indexed":true}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"type":"address","name":"owner","indexed":true},{"type":"address","name":"operator","indexed":true},{"type":"bool","name":"approved","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","indexed":true},{"type":"address","name":"to","indexed":true},{"type":"uint256","name":"tokenId","indexed":true}],"anonymous":false}]
  const hologram = new ethers.Contract("0xC0769C1a52f54e5cE83F4B8919017cff6c4Dc39C", abi, Ethers.provider().getSigner());
  hologram.mint(ipfsUrl);
}

const createCard = ({ imageUrl, creatorAddress, prompt, objectName, ipfsUrl }) => {
  return (
    <div class="text-center p-2">
      <p>
        <strong>⚡️ {objectName} ⚡️</strong>
      </p>
      <img class="border border-dark rounded" src={imageUrl} />
      <p>⛓️ {creatorAddress}</p>
      <p>🖌️ {prompt}</p>
      {sender && ipfsUrl && <button class="btn btn-primary" onClick={mint(ipfsUrl)}>Mint</button>}
    </div>
  );
};

return (
  <>
    {state.isLoading && (
      <div class="position-sticky alert alert-primary" role="alert">
        Loading...
      </div>
    )}

    <div class="container border border-info p-3 text-center min-vw-90">
      <h1>Hologram AI</h1>
      <p>What you are imagining today?</p>
      {sender && <p>Account: {sender}</p>}
    </div>
    <div className="px-2 mx-auto">
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={state.currentPage ? state.currentPage < state.lastPage : true} // infinite
      >
        {state.contents && state.contents.map(createCard)}
      </InfiniteScroll>
    </div>
  </>
);
