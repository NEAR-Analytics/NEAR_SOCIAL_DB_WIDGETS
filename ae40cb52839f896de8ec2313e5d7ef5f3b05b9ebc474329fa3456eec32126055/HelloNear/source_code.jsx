const contract = "hello.near-examples.near";
const greeting = Near.view(contract, "get_greeting", {});

State.init({ greeting: greeting });

const onInputChange = ({ target }) => {
  State.update({ greeting: target.value });
};

const onBtnClick = () => {
  Near.call(contract, "set_greeting", {
    greeting: state.greeting,
  });
};

return (
  <>
    <div class="container border border-info p-3">
      <h3 class="text-center">
        The contract says:
        <span class="text-decoration-underline">{greeting} </span>
      </h3>

      <p class="text-center py-2">
        Look at that! A Hello World app! With its greeting stored on the NEAR
        blockchain.{" "}
      </p>

      <div class="border border-black p-3">
        <label>Update greeting</label>
        <input placeholder="Howdy" onChange={onInputChange} />
        <button class="btn btn-primary mt-2" onClick={onBtnClick}>
          Save
        </button>
      </div>
    </div>
  </>
);
