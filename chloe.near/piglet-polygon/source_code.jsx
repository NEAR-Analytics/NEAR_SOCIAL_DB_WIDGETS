// Styling components
const Button = styled.button`
  background: palevioletred;
  color: white;
  font-size: 1em;
  margin: 10px;
  padding: 0.5em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
  &:hover {
    background: white;
    color: palevioletred;
  }
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  th, td {
    border: 1px solid black;
    padding: 10px;
  }
`;

const Header = styled.p`
  text-align: left;
  font-size: 0.8em;
  margin-top: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #ffc0cb; /* Update background color to a lighter pink */
  color: white;
  font-size: calc(10px + 2vmin);
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-weight: bold;
  margin-top: 20px;
`;

const Info = styled.p`
  margin-top: 10px;
`;

const PiggyImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 20px;
`;

// check network and make sure poly

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}
if (state.chainId !== undefined && state.chainId !== 137) {
  return <p>Switch to Polygon Mainnet</p>;
}

// FETCH Gnosis ABI and set decimals for DAI (do shETH + sDAI have different decimals, prolly not)

const GnosisContract = "0xDcece7aAEF7B2F825Ee749605B59B5E5dcf173CC";
const tokenDecimals = 18;

const GnosisAbi = fetch(
  "https://raw.githubusercontent.com/gnosis/gnosis-abi-decoder/master/src/abi/safe-contracts/build/contracts/GnosisSafe.json"
);
if (!GnosisAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(lidoAbi.body);

// HELPER FUNCTIONS

const getStakedBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: lidoContract,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};
