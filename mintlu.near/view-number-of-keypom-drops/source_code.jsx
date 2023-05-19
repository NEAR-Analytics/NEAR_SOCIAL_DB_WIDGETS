const keypom_contract = "v2.keypom.near";
const userNum = Near.view(keypom_contract, "get_drop_supply_for_owner", {
  account_id: state.user,
});

// Init state
State.init({
  num_drops: 0,
  user: context.accountId,
});

// Do not update state.num_drops until BtnClick
const onInputChange = ({ target }) => {
  State.update({
    user: target.value,
    num_drops: 0,
  });
};

const onBtnClick = () => {
  State.update({
    num_drops: userNum,
  });
};

const get_user_form = (
  <>
    <div class="border border-black p-3">
      <label>User Account ID</label>
      <input placeholder="benji.near" onChange={onInputChange} />
      <button class="btn btn-primary mt-2" onClick={onBtnClick}>
        Update
      </button>
    </div>
  </>
);

// Render
return (
  <>
    <div class="container border border-info p-3">
      <h3 class="text-center">
        The number of drops for {state.user}:
        <span class="text-decoration-underline"> {state.num_drops} </span>
      </h3>

      {get_user_form}
    </div>
  </>
);
