const accountId = props.accountId ?? context.accountId;
const onChange = props.onChange;
const options = props.options;
let optInInfo = {};

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
});

function setOptInInfoProps() {
  return props[optInInfo];
}

return (
  <>
    {options.birthday.label ?? "Birthday"}
    <input
      type="date"
      value={state.birthday}
      onChange={(e) => State.update({ birthday: e.target.value })}
    />
    {options.astrological_sign.label ?? "Atrological Sign"}
    <input
      type="text"
      value={state.astrological_sign}
      onChange={(e) => State.update({ astrological_sign: e.target.value })}
    />
    {options.age.label ?? "Age"}
    <input
      type="text"
      value={state.age}
      onChange={(e) => State.update({ age: e.target.value })}
    />
    {options.gender.label ?? "Gender"}
    <input
      type="text"
      value={state.gender}
      onChange={(e) => State.update({ gender: e.target.value })}
    />
    {options.profession.label ?? "Profession"}
    <input
      type="text"
      value={state.profession}
      onChange={(e) => State.update({ profession: e.target.value })}
    />
    {options.income.label ?? "Income"}
    <input
      type="text"
      value={state.income}
      onChange={(e) => State.update({ income: e.target.value })}
    />
    {options.preferred_wallet.label ?? "Preferred Wallet"}
    <input
      type="text"
      value={state.preferred_wallet}
      onChange={(e) => State.update({ preferred_wallet: e.target.value })}
    />
    {options.preffered_nft_marketplace.label ?? "Preferred NFT Marketplace"}
    <input
      type="text"
      value={state.preffered_nft_marketplace}
      onChange={(e) =>
        State.update({ preffered_nft_marketplace: e.target.value })
      }
    />
    {options.preffered_crypto.label ?? "Preferred Crypto"}
    <input
      type="text"
      value={state.preffered_crypto}
      onChange={(e) => State.update({ preffered_crypto: e.target.value })}
    />
    <p></p>
    <CommitButton data={{ optInInfo: { ...state } }}>
      Save Opt-In Info
    </CommitButton>
  </>
);
