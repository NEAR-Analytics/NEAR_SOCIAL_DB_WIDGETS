// const props = {
//   userAddress: Ethers.send("eth_requestAccounts", [])[0],
//   poolAddress: "0x195def5dabc4a73c4a6a410554f4e53f3e55f1a9",
//   onError: (e) => console.log("error:", e),
//   onSuccess: (balance) => console.log("balance:", balance),
//   requestConnect: () => console.log("requestConnect:", "requestConnect"),
//   decimals: 18,
// };
////@ts-check
let missingProps = [];

if (!props.userAddress) {
  missingProps = missingProps.concat("userAddress");
  // return <Web3Connect connectLabel="Connect with Web3" />;
}

if (!props.poolAddress) missingProps = missingProps.concat("poolAddress");

if (!props.onError) missingProps = missingProps.concat("onError");

if (!props.onSuccess) missingProps = missingProps.concat("onSuccess");

if (!props.requestConnect) missingProps = missingProps.concat("requestConnect");

if (!props.decimals) missingProps = missingProps.concat("decimals");
State.init({ missingProps });
// State.update({ missingProps });

if (state.missingProps.length > 0) {
  return (
    <div>
      <h1>GetBalanceComponent missing props:</h1>
      <pre>{JSON.stringify(state.missingProps, null, 2)}</pre>
    </div>
  );
}

const erc20ABI =
  // @ts-ignore
  fetch("https://raw.githubusercontent.com/dredshep/dev/main/abi.json").body;

/**
 * @param {string} poolAddress
 * @param {string} userAddress
 */
function getUserBalance(poolAddress, userAddress) {
  if (!Ethers.provider()?.getSigner?.()) {
    props.requestConnect();
    return;
  }
  try {
    const erc20 = new ethers.Contract(
      poolAddress, // address
      erc20ABI, // erc20 abi
      Ethers.provider().getSigner()
    );
    const balance = erc20
      .balanceOf(userAddress)
      .then((balance) => {
        const processedBalance = ethers.utils.formatUnits(
          balance,
          props.decimals
        );
        props.onSuccess(processedBalance);
        return processedBalance;
      })
      .catch((e) => {
        props.onError(e);
      });
    return balance;
  } catch (e) {
    props.onError(`Error in getUserBalance(). params:
- poolAddress: ${poolAddress}
- userAddress: ${userAddress}
- error: ${e}`);
  }
}

getUserBalance(props.poolAddress, props.userAddress);

return <>a</>;
