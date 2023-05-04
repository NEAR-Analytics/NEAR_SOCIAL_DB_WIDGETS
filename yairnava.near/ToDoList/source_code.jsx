const todolistContract = "0xbA494aEa8295B5640Efb4FF9252df8D388e655dc";

const todolistAbi = fetch(
  "https://gateway.pinata.cloud/ipfs/QmVgbfZJiXk1JRtNTkCTMUQtFhhCpaeD4aUiHFmZiKnPd7?_gl=1*jgy6f*rs_ga*ZWExOWRjODgtOWM4Ny00MzE1LTlhMGQtMDc1NDFhZjA2YWQy*rs_ga_5RMPXG14TE*MTY4MzIxOTg2NS4yLjEuMTY4MzIyMDkzMy42MC4wLjA."
);

if (!todolistAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(todolistAbi.body);

const submitTask = () => {
  if (state.strTask == "") {
    return console.log("El nombre de la tarea no debe estar vacia");
  }

  const contract = new ethers.Contract(
    todolistContract,
    todolistAbi.body,
    Ethers.provider().getSigner()
  );

  contract.add_task(state.strTask).then((transactionHash) => {
    console.log("transactionHash is " + transactionHash);
    const contract = new ethers.Contract(
      todolistContract,
      todolistAbi.body,
      Ethers.provider().getSigner()
    );
    contract.get_tasks().then((res) => {
      State.update({ user_tasks: res });
    });
  });
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

if (state.tasks === undefined && state.sender) {
  const contract = new ethers.Contract(
    todolistContract,
    todolistAbi.body,
    Ethers.provider().getSigner()
  );
  contract.get_tasks().then((res) => {
    State.update({ user_tasks: res });
  });
}

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://nativonft.mypinata.cloud/ipfs/Qmdpe64Mm46fvWNVaCroSGa2JKgauUUUE5251Cx9nTKNrs"
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
      <div class="Header">Lista de Tareas</div>

      {!!state.sender ? (
        <>
          <div class="SubHeader">Crear nueva tarea </div>
          <div class="LidoStakeFormInputContainer">
            <span class="LidoStakeFormInputContainerSpan2">
              <input
                class="LidoStakeFormInputContainerSpan2Input"
                value={state.strTask}
                onChange={(e) => State.update({ strTask: e.target.value })}
                placeholder="Nombre nueva tarea"
              />
            </span>
          </div>
          <button
            class="LidoStakeFormSubmitContainer"
            onClick={() => submitTask()}
          >
            <span>Guardar</span>
          </button>
          <div>
            <div class="SubHeader">Tareas creadas: </div>
            {state.user_tasks.length > 0 ? (
              <ul>
                {state.user_tasks.map((item) => {
                  return <li>{item[0]}</li>;
                })}
              </ul>
            ) : (
              <span>No hay tareas guardadas</span>
            )}
          </div>
        </>
      ) : (
        <Web3Connect
          className="LidoStakeFormSubmitContainer"
          connectLabel="Connect with Web3"
        />
      )}
    </div>
  </Theme>
);
