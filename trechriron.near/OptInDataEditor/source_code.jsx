const accountId = props.accountId ?? context.accountId;
const onChange = props.onChange;
const options = props.options;

State.init({
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
  saveState: "started",
});

function setOptInInfoOnProps() {
  props[optInInfo] = { ...state };
}

function setFormStatusOnAccount() {
  accountId[optInInfoFormStatus] = "completed";
}

return (
  <div id="optInDataForm">
    {options.birthday.label ?? "Birthday"}
    <input
      type="date"
      value={state.birthday}
      onChange={(e) =>
        State.update({ birthday: e.target.value, saveState: "in progress" })
      }
    />
    {options.astrological_sign.label ?? "Atrological Sign"}
    <input
      type="text"
      value={state.astrological_sign}
      onChange={(e) =>
        State.update({
          astrological_sign: e.target.value,
          saveState: "in progress",
        })
      }
    />
    {options.age.label ?? "Age"}
    <input
      type="text"
      value={state.age}
      onChange={(e) =>
        State.update({ age: e.target.value, saveState: "in progress" })
      }
    />
    {options.gender.label ?? "Gender"}
    <input
      type="text"
      value={state.gender}
      onChange={(e) =>
        State.update({ gender: e.target.value, saveState: "in progress" })
      }
    />
    {options.profession.label ?? "Profession"}
    <input
      type="text"
      value={state.profession}
      onChange={(e) =>
        State.update({ profession: e.target.value, saveState: "in progress" })
      }
    />
    {options.income.label ?? "Income"}
    <input
      type="text"
      value={state.income}
      onChange={(e) =>
        State.update({ income: e.target.value, saveState: "in progress" })
      }
    />
    {options.preferred_wallet.label ?? "Preferred Wallet"}
    <input
      type="text"
      value={state.preferred_wallet}
      onChange={(e) =>
        State.update({
          preferred_wallet: e.target.value,
          saveState: "in progress",
        })
      }
    />
    {options.preffered_nft_marketplace.label ?? "Preferred NFT Marketplace"}
    <input
      type="text"
      value={state.preffered_nft_marketplace}
      onChange={(e) =>
        State.update({
          preffered_nft_marketplace: e.target.value,
          saveState: "in progress",
        })
      }
    />
    {options.preffered_crypto.label ?? "Preferred Crypto"}
    <input
      type="text"
      value={state.preffered_crypto}
      onChange={(e) =>
        State.update({
          preffered_crypto: e.target.value,
          saveState: "in progress",
        })
      }
    />
    <p></p>
    <CommitButton
      data={{ optInInfoFormStatus: state.saveState }}
      onClick="setOptInInfoOnProps"
      onCommit="setFormStatusOnProps"
    >
      Save Opt-In Info
    </CommitButton>
    <button>Reset Form</button>
  </div>
);
