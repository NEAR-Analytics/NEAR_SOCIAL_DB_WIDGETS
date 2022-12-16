const accountId = props.accountId ?? context.accountId;
const onChange = props.onChange;
const options = props.options;
let optInInfo = {};
let changeLog = [];

const initialState = {
  accountId,
  birthday: "",
  astrological_sign: "",
  age: "",
  gender: "",
  profession: "",
  income: "",
  preferred_wallet: "",
  preffered_nft_marketplace: "",
  preffered_crypto: "",
  saveState: "Started",
};

State.init(initialState);

function fetchDataFromAPI() {
  const data = fetch(``, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

function reportEventToAPI() {
  const data = fetch(`https://dev.kitwallet.app/producer/${accountId}/event`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accountId,
      events: [{ type: "updateProfile", data: "coolwhip" }],
    }),
  });
}

function registerProfileToAPI() {
  const data = fetch(`https://dev.kitwallet.app/producer`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accountId,
      profile: state,
    }),
  });
}

function setFormStatusOnAccount() {
  State.update({ optInInfoFormStatus: "completed" });
}

function addChangeLogEntry() {
  const dateTime = Date.now();
  // const timestampUTC = dateTime.toUTCString();
  const changeEvent = { thisEvent: "form submitted", timestamp: dateTime };
  changeLog.push(changeEvent);
  return changeLog;
}

function handleOnClick() {
  reportEventToAPI();
  registerProfileToAPI();
}

function handleOnCommit() {
  setFormStatusOnAccount();
}

function handleChangeOnInput(event) {
  State.update({
    [event.target.id]: event.target.value,
    saveState: "in progress...",
  });
}

return (
  <div id="optInDataForm">
    {options.birthday.label ?? "Birthday"}
    <input
      id="birthday"
      type="date"
      value={state.birthday}
      onChange={(event) => handleChangeOnInput(event)}
    />
    {options.astrological_sign.label ?? "Astrological Sign"}
    <input
      id="astrological_sign"
      type="text"
      value={state.astrological_sign}
      onChange={(event) => handleChangeOnInput(event)}
    />
    {options.age.label ?? "Age"}
    <input
      id="age"
      type="text"
      value={state.age}
      onChange={(event) => handleChangeOnInput(event)}
    />
    {options.gender.label ?? "Gender"}
    <input
      id="gender"
      type="text"
      value={state.gender}
      onChange={(event) => handleChangeOnInput(event)}
    />
    {options.profession.label ?? "Profession"}
    <input
      id="profession"
      type="text"
      value={state.profession}
      onChange={(event) => handleChangeOnInput(event)}
    />
    {options.income.label ?? "Income"}
    <input
      id="income"
      type="text"
      value={state.income}
      onChange={(event) => handleChangeOnInput(event)}
    />
    {options.preferred_wallet.label ?? "Preferred Wallet"}
    <input
      id="preferred_wallet"
      type="text"
      value={state.preferred_wallet}
      onChange={(event) => handleChangeOnInput(event)}
    />
    {options.prefered_nft_marketplace.label ?? "Preferred NFT Marketplace"}
    <input
      id="prefered_nft_marketplace"
      type="text"
      value={state.prefered_nft_marketplace}
      onChange={(event) => handleChangeOnInput(event)}
    />
    {options.preffered_crypto.label ?? "Preferred Crypto"}
    <input
      id="prefered_crypto"
      type="text"
      value={state.prefered_crypto}
      onChange={(event) => handleChangeOnInput(event)}
    />
    <p></p>
    <CommitButton
      data={{ optInInfoFormStatus: state.saveState }}
      onClick={handleOnClick}
      onCommit={handleOnCommit}
    >
      Save Opt-In Info
    </CommitButton>
    <button onClick={() => State.update(initialState)}>Reset Form</button>
  </div>
);
