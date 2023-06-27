/* put these in a .ts file and leave it open in your editor to have typechecking for this file:

declare const State: {
  init(obj: object): void;
  update(obj: Partial<State>): void;
};

declare const Web3Connect: any;
declare const Ethers: any;
declare const ethers: any;
declare const DropdownMenu: any;
declare const RadioGroup: any;
declare const styled: any;
declare const Popover: any;

declare const state: State;

declare module "Widget" {
  import { ReactNode } from "react";

  interface WidgetProps {
    src: string;
    props: {
      userAddress: string;
      poolAddress: string;
      onError: (errorHandler: () => void) => void;
      onSuccess: (successHandler: () => void) => void;
      requestConnect: () => void;
      decimals: number;
    };
  }

  export default function Widget(props: WidgetProps): ReactNode;
}

declare const props: { chainInfoObject: ChainInfoObject };

interface ChainInfo {
  name: string;
  chainId: string;
  shortName: string;
  chain: string;
  network: string;
  networkId: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpc: string[];
  faucets: string[];
  explorers: string[];
}

interface ChainInfoObject {
  [key: string]: ChainInfo;
}

interface State {
  checkedChainInfo: boolean;
  errorWrongNetwork: boolean;
  chainId: string;
  desiredChainId: string;
  chainName: string;
  connected: boolean;
}

*/

//@ts-check

/** @type {ChainInfoObject} */
const _chainInfoObject = {
  "0x1": {
    name: "Ethereum Mainnet",
    chainId: "0x1", // 1
    shortName: "eth",
    chain: "ETH",
    network: "mainnet",
    networkId: "1",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpc: ["https://main-light.eth.linkpool.io"],
    faucets: [],
    explorers: ["https://etherscan.io"],
  },
  // goerli
  "0x5": {
    name: "Goerli",
    chainId: "0x5", // 5
    shortName: "gor",
    chain: "ETH",
    network: "goerli",
    networkId: "5",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpc: ["https://rpc.goerli.mudit.blog/"],
    faucets: [
      "https://goerli-faucet.slock.it/?address=${ADDRESS}",
      "https://faucet.goerli.mudit.blog",
    ],
    explorers: ["https://goerli.etherscan.io"],
  },
  // zkEVM
  "0x44d": {
    name: "zkEVM Mainnet",
    chainId: "0x44d", // 1101
    shortName: "zkEVM",
    chain: "ETH",
    network: "mainnet",
    networkId: "44",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpc: ["https://rpc.ankr.com/polygon_zkevm"],
    faucets: [],
    explorers: ["https://zkevm.polygonscan.com"],
  },
  // zkEVM testnet
  "0x5a2": {
    name: "zkEVM Testnet",
    chainId: "0x5a2", // 1442
    shortName: "zkEVM",
    chain: "ETH",
    network: "testnet",
    networkId: "5a2",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpc: ["https://rpc.testnet.ankr.com/polygon_zkevm"],
    faucets: [],
    explorers: ["https://zkevm-testnet.polygonscan.com"],
  },
};

const chainInfoObject = props.chainInfoObject || _chainInfoObject;

State.init({
  // {poolAddress,balance}
  checkedChainInfo: false,
  // chainInfo: {},
  chainId: "",
  desiredChainId: "",
  chainName: "",
  errorWrongNetwork: false,
  connected: false,
  // connected: false,
});

/**
 * @param {string} hexString
 */
function removeLeadingZero(hexString) {
  if (hexString.startsWith("0x")) {
    return "0x" + parseInt(hexString, 16).toString(16);
  }
}

/**
 * @param {string} hexString
 */
function parseHex(hexString) {
  if (hexString.startsWith("0x")) {
    return parseInt(hexString, 16);
  }
}

/**
 * @param {string} chainId
 */
function switchToChainId(chainId) {
  try {
    let send;
    const noLeadingZeroChainId = removeLeadingZero(chainId);
    if (!noLeadingZeroChainId) {
      throw (
        "Chain ID is invalid, make sure it is hexadecimal starting with 0x: " +
        chainId
      );
    }
    try {
      send = Ethers.send("wallet_switchEthereumChain", [
        { chainId: noLeadingZeroChainId },
      ]);
      console.log(
        "\ncurrent chainId:",
        state.chainId,
        "current chainName:",
        state.chainName,
        "\nswitching to chainId:",
        noLeadingZeroChainId,
        "chainName:",
        chainInfoObject[chainId].name,
        "\nunHexedDecimal:",
        parseHex(noLeadingZeroChainId),
        "stored send operation return value:",
        send
      );
    } catch (error) {
      console.log(
        "Half-outside, in the catcher for `send = Ethers.send`",
        error
      );
      try {
        send.catch((/** @type {{ code: number; }} */ error) => {
          console.log("(INSIDE) Error while switching to chain", error);
        });
      } catch (error) {
        console.log("Half-outside, in the catcher for `send.catch`", error);
      }
    }
  } catch (error) {
    console.log("(OUTSIDE) Error while switching to chain", error);
    try {
      const chainInfo = chainInfoObject[chainId];
      const params = {
        chainId: removeLeadingZero(chainId),
        chainName: chainInfo.name,
        nativeCurrency: chainInfo.nativeCurrency,
        rpcUrls: chainInfo.rpc,
        blockExplorerUrls: chainInfo.explorers,
      };
      return Ethers.send("wallet_addEthereumChain", [params]).catch(
        (/** @type {{ code: number; }} */ error) => {
          console.log("(INSIDE) Error while adding chain", error);
        }
      );
    } catch (error) {
      console.log("(OUTSIDE) Error while adding to chain", error);
    }
  }
}

// listen for rpc error
function listenForRpcError() {
  return Ethers.on("rpcError", (/** @type {{ code: number; }} */ error) => {
    console.log("RPC ERROR NOTED", error);
  });
}

// get ethers chain id and update state
function getNetwork() {
  const getNetworkReq = Ethers?.provider?.()?.getNetwork?.();
  // if getNetworkReq is undefined, set State.update({connected: false}), else, set it to true.
  State.update({ connected: !!getNetworkReq });
  getNetworkReq
    .then((/** @type {{ chainId: string | number; }} */ network) => {
      const hexId = removeLeadingZero(ethers.utils.hexlify(network.chainId));
      if (!hexId) {
        throw (
          "Chain ID is invalid, make sure it is hexadecimal starting with 0x: " +
          network.chainId
        );
      }

      State.update({
        chainId: hexId,
        chainName: chainInfoObject[hexId].name,
        checkedChainInfo: true,
      });
      if (!chainInfoObject[hexId]) {
        // console.log("we don't have this id", hexId);
        State.update({ errorWrongNetwork: true });
      } else {
        // console.log("we have this id", hexId);
        State.update({ errorWrongNetwork: false });
      }
    })
    .catch((error) => {
      console.log("Error while getting network", error);
    });
}

try {
  getNetwork();
} catch (error) {
  console.log("2nd TryCatch (promise?): Error while getting network", error);
}

function MainComponent() {
  // id and name
  /** @type {string} */
  const chainId = state.chainId;
  /** @type {string} */
  const chainName = state.chainName;
  /** @type {boolean} */
  const errorWrongNetwork = state.errorWrongNetwork;
  /** @type {boolean} */
  const checkedChainInfo = state.checkedChainInfo;
  return (
    <div className="container">
      <h3 className="ms-2">Chain Switcher:</h3>
      <table className="table" style={{ maxWidth: "300px" }}>
        <tbody>
          {/* this is impossible to do with current methods because the call is cached */}
          <tr>
            <td>Connected:</td>
            <td className={state.connected ? "text-success" : "text-warning"}>
              {state.connected ? Ethers.provider().connection.url : "No"}
            </td>
          </tr>
          <tr>
            <td>Current chain id:</td>
            <td>{chainId}</td>
          </tr>
          <tr>
            <td>Initial chain check:</td>
            <td>{JSON.stringify(checkedChainInfo)}</td>
          </tr>
          <tr>
            <td>Current chain:</td>
            <td className={!chainName ? "text-warning" : ""}>
              {chainName || "Unknown"}
            </td>
          </tr>
          <tr>
            <td>Wrong Network:</td>
            <td>{JSON.stringify(errorWrongNetwork)}</td>
          </tr>
        </tbody>
      </table>
      {errorWrongNetwork && (
        <h5
          className="text-warning mb-2"
          style={{ paddingBottom: "8px", paddingLeft: "6px" }}
        >
          Wrong Network, please switch
        </h5>
      )}
      <div
        className="d-flex flex-column gap-2"
        style={{ maxWidth: "300px", marginLeft: "0" }}
      >
        {Object.keys(chainInfoObject).map((chainId) => {
          return (
            <button
              onClick={() => {
                switchToChainId(chainId);
              }}
              key={chainId}
              style={{
                filter: "hue-rotate(40deg) saturate(80%) brightness(115%)",
              }}
            >
              Switch to {chainInfoObject[chainId].name}
            </button>
          );
        })}
        <Web3Connect connectLabel="Connect with Web3" className="" />
      </div>
    </div>
  );
}

// @ts-ignore
return <MainComponent />;
