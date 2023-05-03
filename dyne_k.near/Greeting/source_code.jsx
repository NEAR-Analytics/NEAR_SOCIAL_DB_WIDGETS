const contract = "hello.near-examples.near";
const greeting = Near.view(contract, "get_greeting", {});

State.init({ new_greeting: "" });

const onInputChange = ({ target }) => {
  State.update({ new_greeting: target.value });
};

const greetingForm = (
  <>
    <div class="border border-black p-3">
      <label>Update greeting</label>
      <input placeholder="Howdy" onChange={onInputChange} />
      <button class="btn btm-primary mt-2" onClick={onBtnClick}>
        Save
      </button>
    </div>
  </>
);

const onBtnClick = () => {
  if (!state.new_greeting) {
    return;
  }

  Near.call(contract, "set_greeting", {
    greeting: state.new_greeting,
  });
};

const notLoggedInWarning = <p> Login to change the greeting </p>;

return (
  <>
    <div class="container border border-info p-3">
      <h3 class="text-center">
        The contract says:
        <span class="text-decoration-underline"> {greeting} </span>
      </h3>

      <p class="text-center py-2">
        Look at that! A greeting stored on the NEAR blockchain.
      </p>

      {context.accountId ? greetingForm : notLoggedInWarning}
    </div>
  </>
);
