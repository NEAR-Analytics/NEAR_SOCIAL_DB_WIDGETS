const contract = "0x903E3288BEC17bEC4b64028F93730c93a27BC1D1";

const CONTRACT_ABI =
  "https://raw.githubusercontent.com/slashweb/me-emergency-scan/main/emergency-app/src/abi/gnosis.json";

const DEFAULT_CHAIN_ID = 5;

const abi = fetch(CONTRACT_ABI);
const abiData = new ethers.utils.Interface(abi.body);

const getData = () => {
  const accounts = Ethers.send("eth_requestAccounts", []);

  const contractObject = new ethers.Contract(
    contract,
    abi.body,
    Ethers.provider().getSigner()
  );
  contractObject.getUserHistory(props.patien).then((res) => {
    State.update({ tryData: JSON.stringify(res) });
  });
};

const storeData = () => {
  const accounts = Ethers.send("eth_requestAccounts", []);

  const contractObject = new ethers.Contract(
    contract,
    abi.body,
    Ethers.provider().getSigner()
  );

  contractObject
    .createNewParamedicData(
      props.patien,
      state.name,
      state.date,
      state.vitalSigns,
      state.status,
      state.drugs,
      state.procedures,
      state.lastMeal
    )
    .then((res) => {
      console.log("res hgere", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

State.init({
  name: "",
  date: "",
  vitalSigns: "",
  status: "",
  drugs: [],
  procedures: [],
  lastMeal: "",
  tryData: null,
});

return (
  <div class="p-4">
    <Web3Connect class="mx-auto text-center" />
    <div class="mt-4">
      <div class="form-group">
        <label for="exampleInputEmail1">Paramedic Name</label>
        <input
          type="text"
          class="form-control"
          onChange={(e) => State.update({ name: e.target.value })}
        />
      </div>

      <div class="form-group mt-4">
        <label for="exampleInputEmail1">Date of the intervention</label>
        <input
          type="text"
          class="form-control"
          onChange={(e) => State.update({ date: e.target.value })}
        />
      </div>

      <div class="form-group mt-4">
        <label for="exampleInputEmail1">Vital Signs</label>
        <input
          type="text"
          class="form-control"
          onChange={(e) => State.update({ vitalSigns: e.target.value })}
        />
      </div>

      <div class="form-group mt-4">
        <label for="exampleInputEmail1">Status</label>
        <input
          type="text"
          class="form-control"
          onChange={(e) => State.update({ status: e.target.value })}
        />
      </div>

      <div class="form-group mt-4">
        <label for="exampleInputEmail1">Drugs</label>
        <input
          type="text"
          class="form-control"
          onChange={(e) => State.update({ drugs: e.target.value.split(",") })}
        />
      </div>

      <div class="form-group mt-4">
        <label for="exampleInputEmail1">Procedures</label>
        <input
          type="text"
          class="form-control"
          onChange={(e) =>
            State.update({ procedures: e.target.value.split(",") })
          }
        />
      </div>

      <div class="form-group mt-4">
        <label for="exampleInputEmail1">Last Meal</label>
        <input
          type="text"
          class="form-control"
          onChange={(e) => State.update({ lastMeal: e.target.value })}
        />
      </div>

      <button
        type="submit"
        onClick={() => storeData()}
        class="btn btn-primary mt-4"
      >
        Save
      </button>

      <button onClick={() => getData()} class="btn btn-danger mt-4">
        Try get data
      </button>

      <pre class="w-full p-2 mt-4">{JSON.parse(state.tryData)}</pre>
    </div>
  </div>
);
