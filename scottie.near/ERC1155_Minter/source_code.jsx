const provider = Ethers.provider();
const sender = Ethers.listAccounts()[0];

if (!sender) {
  return <Web3Connect />;
}
return sender;

const contractAddress = "0xA024b318069c932263940def479A915f96E4e882";

// Fetch contract abi
const contractAbi = fetch(
  "https://raw.githubusercontent.com/Scott-Canning/abis/main/abi.json"
);
if (!contractAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(contractAbi.body);

const getUri = (tokenId) => {
  const encodedData = iface.encodeFunctionData("uri", [tokenId]);

  return Ethers.provider()
    .call({
      to: contractAddress,
      data: encodedData,
    })
    .then((cid) => {
      const res = iface.decodeFunctionResult("uri", cid);
      return res.toString();
    });
};

return (
  <div>
    <button onClick={() => getUri(1)}>Get CID</button>
    <div>stuff</div>
  </div>
);
