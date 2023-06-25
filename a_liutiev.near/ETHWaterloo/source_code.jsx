State.init({
  value: "submit",
  inputSubmitLabel: "Type Message",
  web3connectLabel: "Connect Wallet",
  messageCount: 0,
  inputValue: "",
});

const value = state.value || "n/a";
const web3connectLabel = state.web3connectLabel || "n/a";
const inputSubmitLabel = state.inputSubmitLabel || "n/a";
// const callback = state.callback || (() => console.log("button clicked"));

const handleButtonClick = () => {
  State.update({
    messageCount: state.messageCount + 1,
  });

  console.log(state.messageCount);
};

const handleInputChange = (e) => {
  console.log(e.target.value);
  // State.uupdate({ inputValue: e.target.value });
};

function messageAI() {}

return (
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center p-3">
      <h5 className="mb-0">Chat messages</h5>
      <div className="d-flex flex-row align-items-center">
        <span className="badge bg-secondary me-3 p-2">
          {state.messageCount}
        </span>
        <Widget
          src="a_liutiev.near/widget/button_web3connect"
          props={{ web3connectLabel }}
        />
      </div>
    </div>

    <div class="card-body">tree</div>
    <br />

    <div class="card-footer text-muted justify-content-start align-items-center p-3">
      <Widget
        src="a_liutiev.near/widget/input_submit"
        props={{
          value,
          inputSubmitLabel,
          handleButtonClick,
          this.handleInputChange,
        }}
      />
    </div>

    <div></div>
  </div>
);
