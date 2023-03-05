// const [tokenId, setTokenId] = useState(null);
const erc721Abi = fetch(
  "https://raw.githubusercontent.com/codingshot/bluntdao-app/main/abi.json?token=GHSAT0AAAAAABZHZUKMD57MZSSRML3DBHRUZAEUA2Q"
);
initState({
  value: 0.01,
  tokenId: "",
});
const setTokenId = (tokenId) => {
  State.update({ tokenId });
  getTokenDecimals();
};
async function mintToken() {
  try {
    // await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractAddress = "0x5F976CF990819AB495C999e139d620B4655ae727"; // replace with the actual contract address
    const contract = new ethers.Contract(
      contractAddress,
      erc721Abi.abi,
      signer
    );
    const result = await contract.mint(signer.getAddress());
    setTokenId(result.hash);
  } catch (error) {
    console.error(error);
  }
}

return (
  <div>
    <button onClick={mintToken}>Mint NFT on Polygon</button>
    {tokenId && <p>New token ID: {tokenId}</p>}
  </div>
);
