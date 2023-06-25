State.init({
  value: "submit",
  inputSubmitLabel: "Type Message",
  web3connectLabel: "Connect Wallet",
  emptyMessage: "start the thread pussy...",

  messageCount: 0,
  inputValue: "",
  submitMessage: "",
  messageArray: [],
});

//API https://us-central1-ethglobal-wat23-ai-hack.cloudfunctions.net/helloWorld?q=tell+me+a+joke+about+BOS

const API_URL =
  "https://us-central1-ethglobal-wat23-ai-hack.cloudfunctions.net/helloWorld";

const value = state.value || "n/a";
const web3connectLabel = state.web3connectLabel || "n/a";
const inputSubmitLabel = state.inputSubmitLabel || "n/a";
const messageCount = state.messageCount || 0;
const messageArray = state.messageArray || [];
const emptyMessage = state.emptyMessage || "";

// message counter submit
const handleButtonClick = () => {
  if (state.submitMessage !== "") {
    State.update({
      messageCount: state.messageCount + 1,
      messageArray: [
        ...state.messageArray,
        {
          id: state.messageCount,
          sender: "Alex 0x00",
          date: new Date().toLocaleTimeString(),
          payload: state.submitMessage,
        },
      ],
    });
    fetchData();
  } else return;
};

const fetchData = () => {
  console.log(state.messageArray[messageCount]);

  let data = state.messageArray[messageCount];
  data = JSON.stringify(data);

  console.log("SENT JSON object:", data);

  asyncFetch(API_URL, {
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
};

// message hander
const handleInputChange = (e) => {
  State.update({
    submitMessage: e.target.value,
  });
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

    <Widget
      src="a_liutiev.near/widget/display_messages"
      props={{ emptyMessage, messageArray }}
    />
    <br />
    <div class="card-footer text-muted justify-content-start align-items-center p-3">
      <Widget
        src="a_liutiev.near/widget/input_submit"
        props={{
          value,
          inputSubmitLabel,
          handleButtonClick,
          handleInputChange,
        }}
      />
    </div>
    <div></div>
  </div>
);
