State.init({
  // Update true after update.
  loaded: false,
  // Define current screen.
  currentScreen: 0,
  // Tokens which were whitelised in hamster server.
  whiteLists: {},
  // Define list pocket of wallet.
  pocketList: [],
  // Define pocket data which was fetched after user retrive pocket.
  pocket: null,
  // Get target token data.
  targetToken: null,
  // Get base token data.
  baseToken: null,
  abiJson: null,
  selectedTokenAddress: "",
  batchAmount: 0,
  depositAmount: 0,
  balance: 0,
});

// HOST NAME API.
const ACTIVE_STATUS = "POOL_STATUS::ACTIVE";
var contract;
const API = "https://dev-pocket-api.hamsterbox.xyz/api";
const CONTRACT_DATA = {
  wagmiKey: "bsc",
  chainName: "BNB",
  chainLogo:
    "https://s3.coinmarketcap.com/static/img/portraits/62876e92bedeb632050eb4ae.png",
  rpcUrl: "https://bsc-rpc.hamsterbox.xyz",
  chainId: 56,
  programAddress: "0xd74Ad94208935a47b1Bd289d28d45Bce6369E064",
  vaultAddress: "0x4bcD48D0Af9b48716EDb30BFF560d08036439871",
  registryAddress: "0xb9599963729Acf22a18629355dA23e0bA4fBa611",
  explorerUrl: "https://bscscan.com/",
  whitelistedRouters: [
    {
      address: "0x5Dc88340E1c5c6366864Ee415d6034cadd1A9897",
      isV3: true,
      ammTag: "uniswap",
      ammName: "Uniswap",
      dexUrl: "https://app.uniswap.org/#/swap/",
    },
    {
      address: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
      isV3: false,
      ammTag: "pancakeswap",
      ammName: "Pancake Swap",
      dexUrl: "https://pancakeswap.finance/swap/",
    },
  ],
};

asyncFetch(
  "https://raw.githubusercontent.com/CaviesLabs/hamsterpocket-assets/main/pocketchef.json"
).then((result) => {
  State.update({
    abiJson: JSON.parse(result.body),
  });
});

const reloadConfig = () => {
  asyncFetch(`${API}/whitelist`).then((result) => {
    const tokens = result.body;
    const mapping = {};
    tokens.forEach((token) => {
      if (token.chainId === "bnb") {
        mapping[token.address] = token;
      }
    });

    State.update({
      whiteLists: mapping,
      selectedTokenAddress:
        Object.keys(mapping).length > 1 ? Object.keys(mapping)[1] : "",
    });
  });
};

const handleGetPocket = async (id) => {
  try {
    asyncFetch(`${API}/pool/${id}/decimals-formatted`).then((result) => {
      State.update({
        pocket: result.body,
        targetToken: state.whiteLists[result.body.targetTokenAddress],
        baseToken: state.whiteLists[result.body.baseTokenAddress],
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const handleGetPockets = (walletAddress) => {
  try {
    asyncFetch(
      `${API}/pool/decimals-formatted?limit=20&offset=0&chainId=bnb&ownerAddress=${walletAddress}&statuses=POOL_STATUS%3A%3AACTIVE&statuses=POOL_STATUS%3A%3ACLOSED&sortBy=DATE_START_DESC`
    ).then((result) => {
      State.update({
        pocketList: result.body,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const handleSyncWallet = () => {
  if (!state.sender) return;
  asyncFetch(`${API}/pool/user/evm/${state.sender}/sync?chainId=bnb`, {
    method: "POST",
    headers: {
      "content-type": "text/plain;charset=UTF-8",
    },
  }).then(() => {
    handleGetPockets();
  });
};

const handleDepositPocket = () => {
  if (contract === undefined) return;
  contract.depositEther(state.pocket._id, {
    value: 0.001 * Math.pow(10, state.baseToken.decimals),
  });
};

const handleCreatePocket = () => {
  asyncFetch(`${API}/pool/bnb/${state.sender}`, {
    method: "POST",
    headers: {
      "content-type": "text/plain;charset=UTF-8",
    },
  }).then((result) => {
    console.log(result.body);
    const createdParams = {
      id: result.body._id,
      owner: state.sender,
      baseTokenAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // Default BNB
      targetTokenAddress: state.selectedTokenAddress,
      ammRouterVersion: "0",
      ammRouterAddress: CONTRACT_DATA.whitelistedRouters[0].address,
      startAt: parseInt(
        ((new Date().getTime() + 30000) / 1000).toString()
      ).toString(),
      batchVolume: ethers.BigNumber.from(
        `0x${(state.depositAmount * Math.pow(10, 18)).toString(16)}`
      ),
      stopConditions: [],
      frequency: "3600",
      openingPositionCondition: {
        value0: "0",
        value1: "0",
        operator: "0",
      },
      takeProfitCondition: {
        stopType: "0",
        value: "0",
      },
      stopLossCondition: {
        stopType: "0",
        value: "0",
      },
    };

    try {
      contract.createPocketAndDepositEther(createdParams, {
        value: ethers.BigNumber.from(
          `0x${(state.depositAmount * Math.pow(10, 18)).toString(16)}`
        ),
      });
      State.update({ currentScreen: 0 });
    } catch (err) {
      console.error(err);
    }
  });
};

const handleSyncPocket = () => {
  if (!state.pocket) return;
  asyncFetch(`${API}/pool/evm/${state.pocket._id}/sync`, {
    method: "POST",
    headers: {
      "content-type": "text/plain;charset=UTF-8",
    },
  }).then(() => {
    handleGetPocket(state.pocket._id);
  });
};

const handleClosePocket = () => {
  if (!state.pocket) return;
  try {
    contract.closePocket(state.pocket._id);
  } catch {}
};
const handleWithdraw = () => {
  if (!state.pocket) return;
  try {
    console.log("Withdraw", state.pocket._id);
    contract.withdraw(state.pocket._id);
  } catch {}
};

// DETECT SENDER
if (state.sender === undefined) {
  State.update({
    sender: ethers.utils.getAddress(Ethers.send("eth_requestAccounts", [])[0]),
  });
}

// Forbith
if (!(Ethers.provider() && Ethers.provider().network.chainId === 56)) {
  return <h1>👉 Please connect to BNB chain to continue</h1>;
}

// Get sender balance.
if (state.sender) {
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(10) });
    });
}

console.log("state reload", state);
if (!state.loaded) {
  console.log("Fetch config");
  State.update({ loaded: true });
  reloadConfig();
  loaded += 1;
}

if (state.whiteLists !== {} && state.sender) {
  // Get pocket data when config has been loaded.
  handleGetPockets(state.sender);
}

// Setup contract
if (state.sender && state.abiJson) {
  contract = new ethers.Contract(
    CONTRACT_DATA.programAddress,
    state.abiJson,
    Ethers.provider().getSigner()
  );
}

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://raw.githubusercontent.com/hleemors/unrepo/main/style.css"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
        font-family: "Poppins", sans-serif;
        ${cssFont}
        ${css}
        .button-primary-36-px,
  .button-primary-36-px * {
          box-sizing: border-box;
        }
        .button-primary-36-px {
          background: var(--primary-purple, #735cf7);
          border-radius: 100px;
          display: flex;
          flex-direction: row;
          gap: 0px;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 170px;
          height: 36px;
          position: relative;
        }
        .sync-button {
          display: flex;
          justify-items: center !important;
          align-items: center !important;
          padding: 0 10px !important;
          border: 2px solid #606060 !important;
          border-radius: 12px !important;
          font-family: "Poppins", sans-serif !important;
          font-size: 12px;
        }
        .ic-16-refresh,
        .ic-16-refresh * {
          box-sizing: border-box;
        }
        .ic-16-refresh {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          position: relative;
        }
        .refresh-2 {
          position: absolute;
          left: 0px;
          top: 0px;
          overflow: visible;
        }
      `,
  });
}

console.log(ethers);
const Theme = state.theme;

const pocketListScreen = () => {
  if (state.pocketList.length === 0) {
    return <div>You don't have any pockets, create one 🚀</div>;
  }

  return (
    <>
      {state.pocketList?.map((pocket, index) => {
        const pocketBaseToken = state.whiteLists[pocket.baseTokenAddress];
        const pocketTargetToken = state.whiteLists[pocket.targetTokenAddress];
        return (
          <div
            class="my-pockets-mini"
            key={`pocket-${index}`}
            onClick={() => {
              handleGetPocket(pocket._id);
              State.update({ currentScreen: 2 });
            }}
          >
            <div class="frame-48098175">
              <div class="frame-48097709">
                <img
                  class="nft-uk-r-4-u-7-w-kxy-9-q-la-x-2-t-gvd-9-o-zs-wo-mo-4-jq-s-jqd-mb-7-nk-1"
                  src={pocketTargetToken.image}
                />
              </div>
              <div class="frame-48098168">
                <div class="sol-btc">
                  {pocketTargetToken.symbol}/{pocketBaseToken.symbol}
                </div>
                <div class="_146-423">#{pocket._id}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const createPocketScreen = () => {
  return (
    <div class="dca-pair">
      <div class="dca-pair2">🔄 Select trading pair</div>
      <div class="frame-48098210">
        <div class="frame-48097868">
          <div class="frame-48098208">
            <div
              class="frame-48097854"
              style={{ position: "relative", top: "12px" }}
            >
              <div
                class="bnb-bnb-logo-1"
                style={{ position: "relative", top: "6px" }}
              >
                {Object.keys(state.whiteLists).length && (
                  <img
                    class="token-select-icon"
                    src={
                      state.whiteLists[Object.keys(state.whiteLists)[0]].image
                    }
                  />
                )}
              </div>

              <div class="frame-48098207">
                <div class="frame-48097853">
                  <div class="bnb">BNB</div>
                </div>
              </div>
            </div>

            <div class="balance-319-23-bnb">Balance: {state.balance} BNB</div>
          </div>

          <svg
            class="frame-48097866"
            width="49"
            height="48"
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_4112_41594)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24.5 47.9995C37.7548 47.9995 48.5 37.2543 48.5 23.9995C48.5 10.7447 37.7548 -0.000488281 24.5 -0.000488281C11.2452 -0.000488281 0.5 10.7447 0.5 23.9995C0.5 37.2543 11.2452 47.9995 24.5 47.9995ZM29.9196 14.3535C29.4765 13.8815 28.7582 13.8815 28.3152 14.3535C27.8721 14.8255 27.8721 15.5907 28.3152 16.0626L32.626 20.6548H13.6345C13.0079 20.6548 12.5 21.1959 12.5 21.8633C12.5 22.5308 13.0079 23.0719 13.6345 23.0719L35.3649 23.0719C35.8237 23.0719 36.2374 22.7774 36.413 22.3258C36.5886 21.8742 36.4915 21.3544 36.1671 21.0087L29.9196 14.3535ZM13.6351 24.9272C13.1763 24.9272 12.7626 25.2216 12.587 25.6732C12.4114 26.1248 12.5085 26.6446 12.8329 26.9903L19.0804 33.6455C19.5235 34.1175 20.2418 34.1175 20.6848 33.6455C21.1279 33.1736 21.1279 32.4084 20.6848 31.9364L16.374 27.3443L35.3655 27.3443C35.9921 27.3443 36.5 26.8032 36.5 26.1357C36.5 25.4682 35.9921 24.9272 35.3655 24.9272L13.6351 24.9272Z"
                fill="#7886A0"
              />
            </g>
            <defs>
              <clipPath id="clip0_4112_41594">
                <rect
                  width="48"
                  height="48"
                  fill="white"
                  transform="translate(0.5 -0.000488281)"
                />
              </clipPath>
            </defs>
          </svg>

          <div class="frame-48098209">
            <div class="frame-480978682">
              <div class="solana-sol">
                <div class="solana-sol2">
                  {state.selectedTokenAddress && state.whiteLists && (
                    <img
                      class="token-select-icon"
                      src={state.whiteLists[state.selectedTokenAddress].image}
                    />
                  )}
                </div>
              </div>

              <div class="frame">
                <select
                  class="token-select"
                  onChange={(e) => {
                    State.update({
                      selectedTokenAddress: e.target.value,
                    });
                  }}
                >
                  {state.whiteLists !== {} &&
                    Object.keys(state.whiteLists).map((address, index) => {
                      if (state.whiteLists[address].symbol === "WBNB")
                        return null;
                      return (
                        <option value={address} key={`token-inde${index}`}>
                          {state.whiteLists[address].symbol}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            {/* <div class="balance-25-5">Balance: 25.5</div> */}
          </div>
        </div>
        <div class="frame-38649">
          <div class="provider">Provider</div>
          <div class="frame-48097959">
            <div class="raydium">Uniswap V3</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div class="frame" style={{ float: "left", width: "50%" }}>
          <div class="amount">
            <div class="frame-48097891">
              <div class="amount-each-batch">
                <span>
                  <span class="amount-each-batch-span">💰 Batch amount</span>
                  <span class="amount-each-batch-span2"> </span>
                  <span class="amount-each-batch-span3">*</span>
                </span>
              </div>

              <div class="input-field-52-with-icon">
                <div class="frame-48097890">
                  <div class="binance-coin-bnb">
                    <svg
                      class="binance-coin-bnb2"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.641 14.9029C22.0381 21.3315 15.5262 25.2438 9.09606 23.6407C2.66863 22.0381 -1.24415 15.5265 0.359423 9.09837C1.96159 2.66903 8.47349 -1.24361 14.9016 0.359081C21.3313 1.96177 25.2438 8.47405 23.6408 14.903L23.6409 14.9029H23.641Z"
                        fill="#F3BA2F"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.0079 7.616L8.90024 10.7233L8.9003 10.7232L7.09216 8.9152L12.0079 4L16.9253 8.91667L15.1171 10.7247L12.0079 7.616ZM5.81449 10.1917L4.00623 12L5.81437 13.8077L7.62263 11.9996L5.81449 10.1917ZM8.89889 13.2769L12.0066 16.384L15.1157 13.2754L16.9248 15.0824L16.9239 15.0834L12.0066 20L7.09082 15.0848L7.08826 15.0822L8.89889 13.2769ZM18.2012 10.1927L16.3929 12.0008L18.2011 13.8087L20.0094 12.0007L18.2012 10.1927Z"
                        fill="white"
                      />
                      <path
                        d="M13.8338 11.9992H13.8346L11.9999 10.1646L10.6437 11.5201V11.5201L10.4879 11.676L10.1666 11.9973L10.1641 11.9998L10.1666 12.0024L11.9999 13.8357L13.8347 12.0011L13.8356 12.0001L13.8339 11.9992"
                        fill="white"
                      />
                    </svg>
                  </div>

                  {/* <div class="from-0-1-sol">From 0.1 BNB</div> */}
                  <input
                    type="number"
                    class="from-0-1-sol"
                    placeholder="Amout BNB of each batch"
                    onChange={(e) =>
                      State.update({
                        batchAmount: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div class="frame-38748">
                  <div class="sol">BNB</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="frame"
          style={{ float: "left", width: "50%", paddingLeft: "20px" }}
        >
          <div class="amount">
            <div class="frame-48097891">
              <div class="amount-each-batch">
                <span>
                  <span class="amount-each-batch-span">💳 Deposit amount</span>
                  <span class="amount-each-batch-span2"> </span>
                  <span class="amount-each-batch-span3">*</span>
                </span>
              </div>

              <div class="input-field-52-with-icon">
                <div class="frame-48097890">
                  <div class="binance-coin-bnb">
                    <svg
                      class="binance-coin-bnb2"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.641 14.9029C22.0381 21.3315 15.5262 25.2438 9.09606 23.6407C2.66863 22.0381 -1.24415 15.5265 0.359423 9.09837C1.96159 2.66903 8.47349 -1.24361 14.9016 0.359081C21.3313 1.96177 25.2438 8.47405 23.6408 14.903L23.6409 14.9029H23.641Z"
                        fill="#F3BA2F"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.0079 7.616L8.90024 10.7233L8.9003 10.7232L7.09216 8.9152L12.0079 4L16.9253 8.91667L15.1171 10.7247L12.0079 7.616ZM5.81449 10.1917L4.00623 12L5.81437 13.8077L7.62263 11.9996L5.81449 10.1917ZM8.89889 13.2769L12.0066 16.384L15.1157 13.2754L16.9248 15.0824L16.9239 15.0834L12.0066 20L7.09082 15.0848L7.08826 15.0822L8.89889 13.2769ZM18.2012 10.1927L16.3929 12.0008L18.2011 13.8087L20.0094 12.0007L18.2012 10.1927Z"
                        fill="white"
                      />
                      <path
                        d="M13.8338 11.9992H13.8346L11.9999 10.1646L10.6437 11.5201V11.5201L10.4879 11.676L10.1666 11.9973L10.1641 11.9998L10.1666 12.0024L11.9999 13.8357L13.8347 12.0011L13.8356 12.0001L13.8339 11.9992"
                        fill="white"
                      />
                    </svg>
                  </div>

                  {/* <div class="from-0-1-sol">From 0.1 BNB</div> */}
                  <input
                    type="number"
                    class="from-0-1-sol"
                    placeholder="Amout BNB to deposit"
                    onChange={(e) =>
                      State.update({
                        depositAmount: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>

                <div class="frame-38748">
                  <div class="sol">BNB</div>
                </div>
              </div>
            </div>
          </div>

          <div class="frame-625057">
            <div class="available">Available:</div>

            <div class="frame-625056">
              <div class="binance-coin-bnb10">
                <svg
                  class="binance-coin-bnb11"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.7606 9.93524C14.6921 14.221 10.3508 16.8292 6.06404 15.7605C1.77909 14.692 -0.829432 10.351 0.239615 6.06558C1.30772 1.77935 5.64899 -0.82907 9.93441 0.239387C14.2208 1.30785 16.8292 5.64936 15.7605 9.93532L15.7606 9.93524H15.7606Z"
                    fill="#F3BA2F"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.00524 5.07717L5.93345 7.14872L5.9335 7.14864L4.72807 5.9433L8.00524 2.6665L11.2835 5.94429L10.078 7.14962L8.00524 5.07717ZM3.87629 6.79427L2.67078 7.99982L3.8762 9.20494L5.08171 7.99956L3.87629 6.79427ZM5.93255 8.85108L8.00434 10.9225L10.0771 8.8501L11.2832 10.0548L11.2826 10.0554L8.00434 13.3332L4.72717 10.0564L4.72546 10.0547L5.93255 8.85108ZM12.1341 6.795L10.9286 8.00038L12.1341 9.20567L13.3395 8.00029L12.1341 6.795Z"
                    fill="white"
                  />
                  <path
                    d="M9.22249 7.99945H9.223L7.99986 6.77637L7.09578 7.68009V7.68009L6.99192 7.78398L6.77771 7.99821L6.776 7.99988L6.77771 8.00163L7.99986 9.22381L9.22308 8.00073L9.22368 8.00005L9.22257 7.99945"
                    fill="white"
                  />
                </svg>
              </div>

              <div class="_2-043-54-bnb">{state.balance} BNB</div>
            </div>
          </div>
        </div>
      </div>
      <div class="button-group" style={{ display: "flex" }}>
        <div
          class="frame-48098259"
          onClick={() => State.update({ currentScreen: 0 })}
          style={{ float: "left ", cursor: "pointer" }}
        >
          <div class="deposit">Back</div>
        </div>
        <div
          class="frame-48098260"
          style={{
            float: "left ",
            marginLeft: "20px",
            cursor: "pointer",
          }}
        >
          <div
            class="deposit"
            style={{ cursor: "pointer" }}
            onClick={() => handleCreatePocket()}
          >
            ✅ Create Pocket
          </div>
        </div>
      </div>
    </div>
  );
};

const pocketDetailScreen = () => {
  return (
    <>
      <div class="pocket-pecent">
        <div class="frame-48098246">
          <div class="frame-48098141">
            <div class="frame-480977092">
              <img
                class="nft-uk-r-4-u-7-w-kxy-9-q-la-x-2-t-gvd-9-o-zs-wo-mo-4-jq-s-jqd-mb-7-nk-12"
                src={state.targetToken.image && state.targetToken.image}
              />
            </div>

            {state.targetToken && state.baseToken && (
              <div class="sol-usdc">
                {state.targetToken.symbol}/{state.baseToken.symbol}
              </div>
            )}
          </div>
        </div>

        <a
          target="_blank"
          href={`https://app.uniswap.org/#/swap/?inputCurrency=${state.baseToken?.address}&outputCurrency=${state.targetToken?.address}`}
        >
          <svg
            class="popup-2"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.5975 2.53324H21.4502C21.8924 2.53324 22.2502 2.88152 22.2502 3.31191L22.2503 9.00856C22.2503 9.43893 21.8925 9.78727 21.4503 9.78727C21.0081 9.78727 20.6502 9.43895 20.6502 9.00856V5.19714L12.3765 13.2503C12.2291 13.3938 12.0186 13.4757 11.808 13.4757C11.5975 13.4757 11.387 13.3938 11.2396 13.2503C10.9238 12.943 10.9238 12.4511 11.2396 12.1439L19.5133 4.09066H15.5975C15.1553 4.09066 14.7975 3.74233 14.7975 3.31195C14.7975 2.88158 15.1553 2.53324 15.5975 2.53324ZM17.4922 12.0823C17.4922 11.6519 17.8501 11.3036 18.2923 11.3036C18.7345 11.3036 19.0921 11.6724 19.1131 12.1026L19.1133 17.6354C19.1133 20.0533 17.0922 22 14.629 22H6.73424C4.24998 22 2.25 20.0533 2.25 17.6558V9.97148C2.25 7.57408 4.24994 5.60684 6.73424 5.62728H12.4396C12.8817 5.62728 13.2396 5.97559 13.2396 6.40599C13.2396 6.83637 12.8817 7.18471 12.4396 7.18471H6.73424C5.15529 7.18471 3.87106 8.43469 3.87106 9.97155V17.6354C3.87106 19.1723 5.15529 20.4222 6.73424 20.4222L14.629 20.4224C16.208 20.4224 17.4922 19.1724 17.4922 17.6355V12.0823Z"
              fill="white"
            />
          </svg>
        </a>
      </div>
      <div class="frame-48098193">
        <div class="frame-48098188">
          <div class="pool-info-desk">
            <div class="pool-info">💼 Pool Info</div>

            <div class="frame-48097847">
              <div class="frame-480978472">
                <div class="strategy2">ID</div>

                <div class="frame-48097840">
                  <div class="frame-48098084">
                    #{state.pocket && state.pocket._id}
                  </div>
                </div>
              </div>

              <div class="frame-480978472">
                <div class="strategy2">Total deposited</div>

                <div class="frame-48097840">
                  <div class="frame-48098084">
                    {state.pocket && state.baseToken && (
                      <div class="_10-usdc-monthly">
                        {state.pocket.depositedAmount} {state.baseToken.symbol}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div class="frame-48097849">
                <div class="strategy2">Start date</div>
                <div class="frame-48097840">
                  <div class="frame-48098084">
                    <div class="_10-usdc-monthly2">
                      {state.pocket &&
                        `${new Date(
                          state.pocket.startTime
                        ).toLocaleTimeString()} ${new Date(
                          state.pocket.startTime
                        ).toDateString()}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="progress-desk">
            <div class="end-conditions">💰 Progress</div>
            <div class="frame-480978473">
              <div class="frame-48097849">
                <div class="strategy2">Total invested</div>

                <div class="frame-48097840">
                  <div class="frame-48098084">
                    {state.pocket && state.baseToken && (
                      <div class="_10-usdc-monthly">
                        {state.pocket.currentSpentBaseToken}{" "}
                        {state.baseToken.symbol}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div class="frame-48097843">
                <div class="strategy2">Batch bought</div>

                <div class="frame-48097840">
                  <div class="frame-48098084">
                    <div class="_10-usdc-monthly">
                      {state.pocket &&
                        `${state.pocket.currentBatchAmount} BATCH(ES)`}
                    </div>
                  </div>
                </div>
              </div>

              <div class="frame-48097845">
                <div class="strategy2">Token hold</div>
                <div class="frame-48097840">
                  <div class="frame-48098084">
                    {state.pocket && state.targetToken && (
                      <div class="_10-usdc-monthly2">
                        {state.pocket.currentReceivedTargetToken}{" "}
                        {state.targetToken.symbol}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div class="frame-48097850">
                <div class="strategy2">Average price</div>

                <div class="frame-48097840">
                  <div class="frame-48098084">
                    <div class="_10-usdc-monthly2">
                      1 {state.targetToken?.symbol} = {state.pocket?.avgPrice}{" "}
                      {state.baseToken?.symbol}
                    </div>
                  </div>
                </div>
              </div>

              <div class="frame-48097848">
                <div class="strategy2">APL (ROI)</div>
                <div class="frame-48097840">
                  <div class="frame-48098084">
                    <div class="_10-usdc-monthly3">
                      {state.pocket?.currentROIValue} {state.baseToken?.symbol}{" "}
                      ({state.pocket?.currentROI}%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="frame-48098192">
          <div class="next-batch-desk">
            <div class="next-batch">🔥 Next Batch</div>

            <div class="frame-480978482">
              <div class="frame-480978472">
                <div class="strategy2">Next batch time</div>

                <div class="frame-48097840">
                  <div class="frame-48098084">
                    <div class="_10-usdc-monthly2">
                      {state.pocket &&
                        state.pocket.nextExecutionAt &&
                        `${new Date(
                          state.pocket.nextExecutionAt
                        ).toLocaleTimeString()} ${new Date(
                          state.pocket.nextExecutionAt
                        ).toDateString()}`}
                    </div>
                  </div>
                </div>
              </div>

              <div class="frame-48097849">
                <div class="strategy2">Outstanding deposit</div>

                <div class="frame-48097840">
                  <div class="frame-48098084">
                    {state.pocket && state.baseToken && (
                      <div class="_10-usdc-monthly2">
                        {state.pocket.batchVolume -
                          state.pocket.remainingBaseTokenBalance >
                        0
                          ? state.pocket.batchVolume -
                            state.pocket.remainingBaseTokenBalance
                          : 0}
                        {state.baseToken.symbol}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {state.pocket && state.pocket.status === ACTIVE_STATUS && (
                <>
                  <div
                    class="input-field-52-with-icon"
                    style={{ background: "#22232f !important" }}
                  >
                    <div class="frame-48097890">
                      <div class="binance-coin-bnb">
                        <svg
                          class="binance-coin-bnb2"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.641 14.9029C22.0381 21.3315 15.5262 25.2438 9.09606 23.6407C2.66863 22.0381 -1.24415 15.5265 0.359423 9.09837C1.96159 2.66903 8.47349 -1.24361 14.9016 0.359081C21.3313 1.96177 25.2438 8.47405 23.6408 14.903L23.6409 14.9029H23.641Z"
                            fill="#F3BA2F"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.0079 7.616L8.90024 10.7233L8.9003 10.7232L7.09216 8.9152L12.0079 4L16.9253 8.91667L15.1171 10.7247L12.0079 7.616ZM5.81449 10.1917L4.00623 12L5.81437 13.8077L7.62263 11.9996L5.81449 10.1917ZM8.89889 13.2769L12.0066 16.384L15.1157 13.2754L16.9248 15.0824L16.9239 15.0834L12.0066 20L7.09082 15.0848L7.08826 15.0822L8.89889 13.2769ZM18.2012 10.1927L16.3929 12.0008L18.2011 13.8087L20.0094 12.0007L18.2012 10.1927Z"
                            fill="white"
                          />
                          <path
                            d="M13.8338 11.9992H13.8346L11.9999 10.1646L10.6437 11.5201V11.5201L10.4879 11.676L10.1666 11.9973L10.1641 11.9998L10.1666 12.0024L11.9999 13.8357L13.8347 12.0011L13.8356 12.0001L13.8339 11.9992"
                            fill="white"
                          />
                        </svg>
                      </div>

                      {/* <div class="from-0-1-sol">From 0.1 BNB</div> */}
                      <input
                        type="number"
                        class="from-0-1-sol"
                        placeholder="Amout BNB to deposit"
                        style={{ background: "#22232f !important" }}
                        onChange={(e) =>
                          State.update({
                            pocketDepositedAmount: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div class="frame-38748">
                      <div class="sol">BNB</div>
                    </div>
                  </div>
                  <div
                    class="button3"
                    onClick={() => handleDepositPocket()}
                    style={{ marginTop: "10px" }}
                  >
                    <div class="button2">💸 Deposit Now</div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div class="tp-sl">
            <div class="tp-sl2">💵 TP/SL</div>

            <div class="frame-48097847">
              <div class="frame-480978472">
                <div class="strategy2">Take profit</div>

                <div class="frame-48097840">
                  <div class="frame-48098084">
                    <div class="_10-usdc-monthly">
                      {state.pocket && state.pocket.takeProfitCondition
                        ? `at price ${state.pocket.takeProfitCondition.value}  ${state.baseToken.symbol}`
                        : `Coming soon`}
                    </div>
                  </div>
                </div>
              </div>

              <div class="frame-48097849">
                <div class="strategy2">Stop loss</div>

                <div class="frame-48097840">
                  <div class="frame-48098084">
                    <div class="_10-usdc-monthly">
                      {state.pocket && state.pocket.stopLossCondition
                        ? `at price ${state.pocket.stopLossCondition.value}  ${state.baseToken.symbol}`
                        : `Coming soon`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="status-desk">
            <div class="status">Status</div>
            <div class="frame-48098267">
              <div class="frame-48097882">
                {state.pocket && (
                  <div
                    class="tag"
                    style={{
                      background:
                        state.pocket.status === ACTIVE_STATUS
                          ? "rgba(38, 198, 115, 0.12) !important"
                          : "rgba(247, 85, 85, 0.12) !important",
                    }}
                  >
                    <div
                      class="tag-marker"
                      style={{
                        color:
                          state.pocket.satus === ACTIVE_STATUS
                            ? "#26c673"
                            : "#f44949",
                      }}
                    >
                      {state.pocket.status === ACTIVE_STATUS
                        ? "Ongoing"
                        : "Closed"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            class="button-desk"
            style={{ cursor: "pointer" }}
            onClick={() =>
              state.pocket.status === "POOL_STATUS::CLOSED"
                ? handleWithdraw()
                : handleClosePocket()
            }
          >
            <div class="button-primary">
              <div class="frame-48098095">
                <div class="iconly-light-arrow-right"></div>
                <div class="button4">
                  {state.pocket.status === "POOL_STATUS::CLOSED"
                    ? "💳 Withdraw Pocket"
                    : "💀 Close Pocket"}
                </div>
                <div class="iconly-light-arrow-right"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const renderScreenTitle = () => {
  if (state.currentScreen === 0) return "🏆 Your active pockets";
  if (state.currentScreen === 1) return "🚀 Create a pocket";

  return "🥽 Pocket details";
};
const renderAppScreen = () => {
  if (state.currentScreen === 0) return pocketListScreen();
  if (state.currentScreen === 1) return createPocketScreen();

  return pocketDetailScreen();
};

return (
  <Theme>
    <div class="on-going">
      <div class="frame-48098139">
        {state.currentScreen > 0 && (
          <button onClick={() => State.update({ currentScreen: 0 })}>
            <svg
              class="arrow-chevron-big-left"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.285 3.51465L7.80005 11.9996L16.285 20.4846L17.7 19.0706L10.628 11.9996L17.7 4.92865L16.285 3.51465Z"
                fill="white"
              />
            </svg>
          </button>
        )}
        <div class="pocket-detail">
          {renderScreenTitle()}
          {state.currentScreen === 2 && state.pocket._id && (
            <div
              class="sync-button"
              style={{ cursor: "pointer", marginLeft: "10px" }}
              onClick={() => handleSyncPocket()}
            >
              <div class="sync">Sync Pocket</div>
              <div class="ic-16-refresh" style={{ marginLeft: "10px" }}>
                <div class="ic-16-refresh">
                  <svg
                    class="refresh-2"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6668 7.99967C14.6668 11.6797 11.6802 14.6663 8.00016 14.6663C4.32016 14.6663 2.0735 10.9597 2.0735 10.9597M2.0735 10.9597H5.08683M2.0735 10.9597V14.293M1.3335 7.99967C1.3335 4.31967 4.2935 1.33301 8.00016 1.33301C12.4468 1.33301 14.6668 5.03967 14.6668 5.03967M14.6668 5.03967V1.70634M14.6668 5.03967H11.7068"
                      stroke="#735CF7"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
        {state.currentScreen === 0 && (
          <>
            <div
              class="button-primary-36-px"
              style={{ cursor: "pointer" }}
              onClick={() => State.update({ currentScreen: 1 })}
            >
              <div class="button-connectwallet">🚀 Create</div>
            </div>
            <div
              class="sync-button"
              style={{ cursor: "pointer" }}
              onClick={() => handleSyncWallet()}
            >
              <div class="sync">Sync</div>
              <div class="ic-16-refresh" style={{ marginLeft: "10px" }}>
                <div class="ic-16-refresh">
                  <svg
                    class="refresh-2"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6668 7.99967C14.6668 11.6797 11.6802 14.6663 8.00016 14.6663C4.32016 14.6663 2.0735 10.9597 2.0735 10.9597M2.0735 10.9597H5.08683M2.0735 10.9597V14.293M1.3335 7.99967C1.3335 4.31967 4.2935 1.33301 8.00016 1.33301C12.4468 1.33301 14.6668 5.03967 14.6668 5.03967M14.6668 5.03967V1.70634M14.6668 5.03967H11.7068"
                      stroke="#735CF7"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div class="frame-48098194">{renderAppScreen()}</div>
    </div>
  </Theme>
);
