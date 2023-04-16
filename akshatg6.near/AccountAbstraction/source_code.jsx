async function getCaptcha() {
  const captchaAPI =
    "https://sx2mbwnkk9.execute-api.us-east-2.amazonaws.com/default/zkaptcha-py";
  try {
    const response = await fetch(captchaAPI);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const resptext = await response.text();
    const b64data = JSON.parse(resptext).png;
    const pngData = b64data.replace(/-/g, "+").replace(/_/g, "/");
    State.update({
      captcha: "data:image/png;base64," + pngData,
    });
  } catch (error) {
    console.error("Error fetching captcha:", error);
    return null;
  }
}

initState({
  inputs: [{ id: 1, values: ["", ""] }],
  captcha: [0],
});

const addInput = () => {
  const newId = state.inputs[state.inputs.length - 1].id + 1;
  State.update({
    inputs: [...state.inputs, { id: newId, values: ["", ""] }],
  });
};

const removeInput = (id) => {
  State.update({
    inputs: state.inputs.filter((input) => input.id !== id),
  });
};

const onSubmit = () => {
  const inputValues = state.inputs.map((input) => input.values);
  const message = `Input values: ${inputValues.join(", ")}`;
  State.update({
    alert: message,
  });
};

const onChange = (id, index, value) => {
  const updatedInputs = state.inputs.map((input) =>
    input.id === id
      ? {
          ...input,
          values: input.values.map((v, i) => (i === index ? value : v)),
        }
      : input
  );
  State.update({
    inputs: updatedInputs,
  });
};

const onChangeCaptcha = (id, value) => {
  // remove the 'index' parameter since captcha only has one value
  State.update({ captcha: value, captchaId: id });
};

const inputElements = state.inputs.map((input) => (
  <div
    class="LidoStakeFormInputContainer"
    style={{ border: "1px solid black", borderRadius: "10px" }}
  >
    <span class="LidoStakeFormInputContainerSpan1"></span>
    <div className="LidoStakeFormInputContainerSpan2" key={input.id}>
      <input
        class="LidoStakeFormInputContainerSpan2Input LidoStakeFormInputContainerSpan2Input--left"
        placeholder={state.reciever || "Address"}
        value={input.values[0]}
        onChange={(e) => onChange(input.id, 0, e.target.value)}
        style={{
          marginRight: "10px",
          width: "70%",
          padding: "10px",
          border: "0.5px solid black",
          borderRadius: "10px",
        }}
      />
      <input
        class="LidoStakeFormInputContainerSpan2Input LidoStakeFormInputContainerSpan2Input--right"
        placeholder="Amount"
        value={input.values[1]}
        onChange={(e) => onChange(input.id, 1, e.target.value)}
        style={{
          width: "25%",
          padding: "10px",
          border: "0.5px solid black",
          borderRadius: "10px",
        }}
      />
    </div>
  </div>
));

const inputElements2 = state.captcha.map(() => (
  <div
    class="LidoStakeFormInputContainer"
    style={{
      display: "flex",
      justifyContent: "center",
      width: "50%",
      margin: "0 auto",
      paddingTop: "15px",
      border: "1px solid black",
      borderRadius: "10px",
    }}
    key={input1.id}
  >
    <span class="LidoStakeFormInputContainerSpan"></span>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10px",
      }}
    >
      <img
        src={state.captcha}
        alt="Captcha"
        style={{
          width: "100px",
          height: "50px",
          alignItems: "center",
          justifyContent: "center",
          border: "0.5px solid black",
          marginBottom: "10px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      />
      <input
        class="LidoStakeFormInputContainerSpan2Input LidoStakeFormInputContainerSpan2Input--left"
        placeholder="Enter Captcha"
        value={input1.captcha || ""}
        style={{
          marginRight: "10px",
          width: "70%",
          padding: "10px",
          display: "block",
          margin: "0 auto",
          border: "0.5px solid black",
          borderRadius: "10px",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      />
    </div>
  </div>
));

// FETCH LIDO ABI

const lidoContract = "0xae7ab96520de3a18e5e111b5eaab095312d7fe84";
const tokenDecimals = 18;

const lidoAbi = fetch(
  "https://raw.githubusercontent.com/lidofinance/lido-subgraph/master/abis/Lido.json"
);
if (!lidoAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(lidoAbi.body);

// FETCH LIDO STAKING APR

if (state.lidoArp === undefined) {
  const apr = fetch(
    "https://api.allorigins.win/get?url=https://stake.lido.fi/api/sma-steth-apr"
  );
  if (!apr) return;
  State.update({ lidoArp: JSON.parse(apr?.body?.contents) ?? "..." });
}

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

const submitEthers = (address1, address2, address3, _referral) => {
  if (!address1 || !address2 || !address3) {
    return console.log("Amount is missing");
  }
  const erc20 = new ethers.Contract(
    lidoContract,
    lidoAbi.body,
    Ethers.provider().getSigner()
  );

  // let amount = ethers.utils.parseUnits(strEther, tokenDecimals).toHexString();

  erc20.submit(lidoContract, { value: amount }).then((transactionHash) => {
    console.log("transactionHash is " + transactionHash);
  });
};

// DETECT SENDER

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    console.log("set sender", accounts[0]);
  }
}

//if (!state.sender)  return "Please login first";

// FETCH SENDER BALANCE

if (state.balance === undefined && state.sender) {
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

// FETCH SENDER STETH BALANCE

if (state.stakedBalance === undefined && state.sender) {
  getStakedBalance(state.sender).then((stakedBalance) => {
    State.update({ stakedBalance });
  });
}

// FETCH TX COST

// FETCH CSS

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;

//Keep track of the state for dynamic inputs

// OUTPUT UI

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

return (
  <Theme>
    <div class="LidoContainer">
      <div class="Header">Stake Ether</div>
      <div class="SubHeader">Stake ETH and receive stETH while staking.</div>

      <div class="LidoForm">
        {state.sender && (
          <>
            <div class="LidoFormTopContainer">
              <div class="LidoFormTopContainerLeft">
                <div class="LidoFormTopContainerLeftContent1">
                  <div class="LidoFormTopContainerLeftContent1Container">
                    <span>Available to stake</span>
                    <div class="LidoFormTopContainerLeftContent1Circle" />
                  </div>
                </div>
                <div class="LidoFormTopContainerLeftContent2">
                  <span>
                    {state.balance ?? (!state.sender ? "0" : "...")}&nbsp;ETH
                  </span>
                </div>
              </div>
              <div class="LidoFormTopContainerRight">
                <div class="LidoFormTopContainerRightContent1">
                  <div class="LidoFormTopContainerRightContent1Text">
                    <span>{getSender()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="LidoSplitter" />
          </>
        )}
        <div
          class={
            state.sender ? "LidoFormBottomContainer" : "LidoFormTopContainer"
          }
        >
          <div class="LidoFormTopContainerLeft">
            <div class="LidoFormTopContainerLeftContent1"></div>
          </div>
          <div class="LidoFormTopContainerRight"></div>
        </div>
      </div>
      <div class="LidoStakeForm">
        <div>
          {inputElements}
          {inputElements2}
          <span class="LidoStakeFormInputContainerSpan1"></span>
          <div
            className="LidoStakeFormInputContainerSpan2"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button
              style={{ border: "1px solid black", borderRadius: "10px" }}
              onClick={addInput}
            >
              +
            </button>
          </div>

          {state.alert && <span>{state.alert}</span>}
        </div>
        <div className="LidoStakeFormInputContainerSpan2">
          <button
            style={{
              backgroundColor: "#01a2ff",
              color: "white",
              borderRadius: "5px",
              margin: "0 auto",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
              width: "100%",
            }}
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>

        <div class="LidoFooterContainer">
          {state.sender && (
            <div class="LidoFooterRaw">
              <div class="LidoFooterRawLeft">You will receive</div>
              <div class="LidoFooterRawRight">${state.strEther ?? 0} stETH</div>
            </div>
          )}
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Exchange rate</div>
            <div class="LidoFooterRawRight">1 ETH = 1 stETH</div>
          </div>
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Transaction cost</div>
            <div class="LidoFooterRawRight">{state.txCost}</div>
          </div>
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Reward fee</div>
            <div class="LidoFooterRawRight">10%</div>
          </div>
        </div>
      </div>
    </div>
  </Theme>
);
