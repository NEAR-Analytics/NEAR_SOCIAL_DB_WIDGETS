/* NEAR BLOCKCHAIN */
const contract = "hello.near-examples.near";
const greeting = Near.view(contract, "get_greeting", {});

console.log("print info");
console.log(context);
console.log(context.accountId);
console.log("print info2");
console.log(user);
console.log(user.near);
// Use and manipulate state
State.init({ new_greeting2: greeting });
State.init({ new_greeting_text: "" });

State.init({ new_greeting: "" });
State.init({ new_certificado: "" });
State.init({ strUrl: "url..." });
State.init({ strEmail: "" });
State.init({ strNombreAlumno: "" });
State.init({ strNombreCurso: "" });
State.init({ strFecha: "" });

const onBtnClick = () => {
  State.update({
    new_greeting_text: "Buscando...",
  });
  return asyncFetch("https://certificates.blckchn.xyz/verify/credential", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jwt: state.strUrl,
    }),
  }).then((responseGql) => {
    if (responseGql.body.verification) {
      State.update({
        new_greeting:
          "https://certificates.blckchn.xyz/certificado?jwt=" + state.strUrl,
      });
      State.update({
        new_greeting_text: "Descargar",
      });
    }
  });
};

const onBtnClickGenerate = () => {
  console.log(
    state.strEmail,
    state.strNombreAlumno,
    state.strNombreCurso,
    state.sender
  );

  return asyncFetch("https://certificates.blckchn.xyz/create/credential", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: state.strEmail,
      nombre: state.strNombreAlumno,
      curso: state.strNombreCurso,
      wallet: state.sender,
    }),
  }).then((jwt) => {
    State.update({
      new_certificado:
        "https://certificates.blckchn.xyz/certificado?jwt=" + jwt.body.jwt,
    });
    Near.call(contract, "set_greeting", {
      greeting:
        "https://certificates.blckchn.xyz/certificado?jwt=" + jwt.body.jwt,
    });
  });

  /*let responseCreate = fetch(
    "https://certificates.blckchn.xyz/create/credential",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: state.strEmail,
        nombre: state.strNombreAlumno,
        curso: state.strNombreCurso,
        wallet: state.sender,
      }),
    }
  );

  let jwt = responseCreate;
  if (jwt != null) {
    State.update({
      new_certificado:
        "https://certificates.blckchn.xyz/certificado?jwt=" + jwt.body.jwt,
    });
    Near.call(contract, "set_greeting", {
      greeting:
        "https://certificates.blckchn.xyz/certificado?jwt=" + jwt.body.jwt,
    });
  }*/

  /*Near.call(contract, "set_greeting", {
    greeting: state.new_greeting,
  });*/
};

/* END NEAR BLOCKCHAIN */

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

const submitEthers = (strEther, _referral) => {
  if (!strEther) {
    return console.log("Amount is missing");
  }
  const erc20 = new ethers.Contract(
    lidoContract,
    lidoAbi.body,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseUnits(strEther, tokenDecimals).toHexString();

  erc20.submit(lidoContract, { value: amount }).then((transactionHash) => {
    console.log("transactionHash is " + transactionHash);
  });
};

// DETECT SENDER

if (state.sender === undefined) {
  State.update({ sender: Ethers.send("eth_requestAccounts", [])[0] });
}

if (!state.sender) return "Please login first";

// FETCH SENDER BALANCE

if (state.balance === undefined) {
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

// FETCH SENDER STETH BALANCE

if (state.stakedBalance === undefined) {
  getStakedBalance(state.sender).then((stakedBalance) => {
    State.update({ stakedBalance });
  });
}

// FETCH TX COST

if (state.txCost === undefined) {
  const gasEstimate = ethers.BigNumber.from(1875000);
  const gasPrice = ethers.BigNumber.from(1500000000);

  const gasCostInWei = gasEstimate.mul(gasPrice);
  const gasCostInEth = ethers.utils.formatEther(gasCostInWei);

  let responseGql = fetch(
    "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          bundle(id: "1" ) {
            ethPrice
          }
        }`,
      }),
    }
  );

  if (!responseGql) return "";

  const ethPriceInUsd = responseGql.body.data.bundle.ethPrice;

  const txCost = Number(gasCostInEth) * Number(ethPriceInUsd);

  State.update({ txCost: `$${txCost.toFixed(2)}` });
}

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

    .customSubHeader {
      text-align: center;
      padding: 4px;
    }

    .img-fluid  {
      width: 30%    
    }

    .CentrarContenido {
      text-align: center;
      padding: 20px;
  }

  button.LidoStakeFormSubmitContainer {
    background-color: black!important;
  }

  a.LidoStakeFormSubmitContainer {
    background-color: black!important;
    width: 100% !important;
    margin-top;10px !important;
  }

  .LidoForm {
    background: #3c3c3b; 
    }

  .inputsClass {
    border-right: 1px solid rgba(0, 10, 61, 0.12);
    text-align: center;
    text-align-last: center;
     }

      .inputsCenter {
    text-align: center;
    text-align-last: center;
     }

     .wrap-text{
       overflow-wrap: break-word;
     }

     .colledge-link{
       color:blue
     }
`,
  });
}
const Theme = state.theme;

// OUTPUT UI

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
if (state.chainId !== undefined && state.chainId !== 1) {
  return (
    <Theme>
      <div class="LidoContainer">
        <div class="CentrarContenido">
          <img
            class="img-fluid"
            src={
              "https://www.colledge.social/pluginfile.php/1/theme_edumy/footerlogo1/1681760484/LogoFondoOscuro.svg"
            }
          />
        </div>
        <div class="Header">Cambiar a red Ethereum Mainnet</div>
        <div class="SubHeader"></div>
      </div>
    </Theme>
  );
}

return (
  <Theme>
    <div class="LidoContainer">
      <div class="CentrarContenido">
        <img
          class="img-fluid"
          src={
            "https://www.colledge.social/pluginfile.php/1/theme_edumy/footerlogo1/1681760484/LogoFondoOscuro.svg"
          }
        />
      </div>
      <div class="Header">Generar certificados</div>
      <div class="SubHeader"></div>

      <div
        class="LidoForm"
        style={{
          backgroundImage: `url("https://raw.githubusercontent.com/somos-colledge/website-colledge/32782c96838fe7ed0f2bc7ecf27ae2630de9f013/Ilustracion_Instruct.svg")`,
          backgroundSize: "300px 100px",
          backgroundPosition: "140% 42%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div class="LidoFormTopContainer">
          <div class="LidoFormTopContainerLeft">
            <div class="LidoFormTopContainerLeftContent1">
              <div class="LidoFormTopContainerLeftContent1Container">
                <span>Usuario</span>
                <div class="LidoFormTopContainerLeftContent1Circle" />
              </div>
            </div>
            <div class="LidoFormTopContainerLeftContent2">
              <div class="LidoFormTopContainerLeftContent1">
                <div class="LidoFormTopContainerLeftContent1Text">
                  <span>
                    {state.sender.substring(0, 6)}...
                    {state.sender.substring(
                      state.sender.length - 4,
                      state.sender.length
                    )}{" "}
                  </span>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
        <div class="LidoSplitter" />
      </div>
      <div class="LidoStakeForm">
        <div class="LidoStakeFormInputContainer">
          <span class="LidoStakeFormInputContainerSpan2 inputsClass">
            <input
              class="LidoStakeFormInputContainerSpan2Input"
              value={state.strEmail}
              onChange={(e) => State.update({ strEmail: e.target.value })}
              placeholder="Email"
            />
          </span>
          <span class="LidoStakeFormInputContainerSpan2 inputsCenter">
            <input
              class="LidoStakeFormInputContainerSpan2Input"
              type="date"
              value={state.strFecha}
              onChange={(e) => State.update({ strFecha: e.target.value })}
              placeholder="Fecha"
            />
          </span>
        </div>

        <div
          class="LidoStakeForm"
          style={{
            padding: "32px 0px 0px 0px",
          }}
        >
          <div class="LidoStakeFormInputContainer">
            <span class="LidoStakeFormInputContainerSpan2 inputsClass">
              <input
                class="LidoStakeFormInputContainerSpan2Input"
                value={state.strNombreCurso}
                onChange={(e) =>
                  State.update({ strNombreCurso: e.target.value })
                }
                placeholder="Nombre de curso"
              />
            </span>
            <span class="LidoStakeFormInputContainerSpan2 inputsCenter">
              <input
                class="LidoStakeFormInputContainerSpan2Input"
                value={state.strNombreAlumno}
                onChange={(e) =>
                  State.update({ strNombreAlumno: e.target.value })
                }
                placeholder="Nombre de alumno"
              />
            </span>
          </div>
        </div>

        <div class="LidoFooterContainer">
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Correo: </div>
            <div class="LidoFooterRawRight">
              {state.strEmail ?? "correo"}{" "}
            </div>{" "}
          </div>
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Fecha del certificado:</div>
            <div class="LidoFooterRawRight">{state.strFecha ?? "fecha"} </div>
          </div>
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Nombre del curso:</div>
            <div class="LidoFooterRawRight">
              {state.strNombreCurso ?? "nombreCurso"}{" "}
            </div>
          </div>
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Nombre del alumno:</div>
            <div class="LidoFooterRawRight">
              {state.strNombreAlumno ?? "nombreAlumno"}{" "}
            </div>
          </div>
        </div>
        {/*<a
          href="https://www.colledge.social/mod/page/view.php?id=2429&uuid=1889-2-e3879b-c1992l"
          target="_blank"
        >
          {" "}
          <button
            class="LidoStakeFormSubmitContainer"
            onClick={() => submitEthers(state.strEther, state.sender)}
          >
            <span>Solicitar certificado</span>{" "}
          </button>
        </a>*/}
        <button
          class="LidoStakeFormSubmitContainer"
          onClick={onBtnClickGenerate}
        >
          <span>Solicitar certificado</span>{" "}
        </button>
        <br />
        <p class="text-center">certificado:</p>
        <p class="text-center wrap-text">{state.new_certificado} </p>
      </div>
    </div>

    <div class="LidoContainer" style={{ marginTop: 70 }}>
      <div
        class="LidoForm"
        style={{
          backgroundImage: `url("https://raw.githubusercontent.com/somos-colledge/website-colledge/c357a6b67a8bef546399d72ef6a3b430d2075ff2/Academia.svg")`,
          backgroundSize: "300px 100px",
          backgroundPosition: "127% 50%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div class="LidoFormTopContainer">
          <div class="LidoFormTopContainerLeft">
            <div class="LidoFormTopContainerLeftContent1">
              <div class="LidoFormTopContainerLeftContent1Container">
                <span>Usuario</span>
                <div class="LidoFormTopContainerLeftContent1Circle" />
              </div>
            </div>
            <div class="LidoFormTopContainerLeftContent2">
              <div class="LidoFormTopContainerLeftContent1">
                <div class="LidoFormTopContainerLeftContent1Text">
                  <span>
                    {state.sender.substring(0, 6)}...
                    {state.sender.substring(
                      state.sender.length - 4,
                      state.sender.length
                    )}{" "}
                  </span>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
        <div class="LidoSplitter" />
      </div>
      <div class="LidoStakeForm">
        <div class="LidoStakeFormInputContainer">
          <span class="LidoStakeFormInputContainerSpan2">
            <input
              class="LidoStakeFormInputContainerSpan2Input"
              value={state.strUrl}
              onChange={(e) => State.update({ strUrl: e.target.value })}
              placeholder="Url del certificado"
            />
          </span>
        </div>
        <button class="LidoStakeFormSubmitContainer mt-4" onClick={onBtnClick}>
          <span>Validar certificado</span>{" "}
        </button>

        <p class="text-center mt-2">Descargar certificado:</p>
        <p class="text-center text-decoration-underline wrap-text ">
          <a href={state.new_greeting} target="_blank" class="colledge-link">
            {state.new_greeting_text}
          </a>
        </p>

        {/*<p class="text-center mt-2">Descargar ultimo certificado:</p>
        <p class="text-center text-decoration-underline wrap-text ">
          <a href={state.new_greeting2} target="_blank" class="colledge-link">
            Descargar
          </a>
        </p>*/}
        <p class="text-center mt-2">Ver mis transacciones:</p>
        <p class="text-center text-decoration-underline wrap-text ">
          <a
            href="https://wallet.near.org/"
            target="_blank"
            class="colledge-link"
          >
            NEAR blockchain
          </a>
        </p>
        {/*<div class="LidoFooterContainer">
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">URL: </div>
            <div class="LidoFooterRawRight">{state.strUrl ?? "url"} </div>{" "}
          </div>
        </div>*/}
        {/*<a
          href="https://www.colledge.social/mod/page/view.php?id=2429&uuid=1889-2-e3879b-c1992l"
          target="_blank"
        >
          {" "}
          <button
            class="LidoStakeFormSubmitContainer"
            onClick={() => submitEthers(state.strUrl, state.sender)}
          >
            <span>Validar certificado</span>{" "}
          </button>
          </a>*/}
      </div>
    </div>
  </Theme>
);
