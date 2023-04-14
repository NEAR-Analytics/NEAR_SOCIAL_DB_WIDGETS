const accountId = props.accountId ?? context.accountId ?? "*";

// const data = Social.keys(`${accountId}/experimental`, "final", {
//   return_type: "History",
// });

const data = Social.index("roomId_0", "data");

if (!data) {
  return "Loading...";
}

console.log("DATA:", data);

// Last messages on the bottom
const sortedData = data.sort((d1, d2) => d1.blockHeight - d2.blockHeight);

// const processData = (data) => {
//   const accounts = Object.entries(data);
//   console.log("ACCOUNTS:", accounts);
// };

// processData(data);

// console.log("DATA:", data);

// const foo = Social.getr(`${accountId}/profile`);
// console.log("SEE:", foo);

const buildMessage = (accountId, message) => {
  return {
    user: accountId,
    message,
  };
};

const getChatHistory = (indexData) => {
  const chatHistory = [];
  indexData.forEach((item) => {
    chatHistory.push(buildMessage(item.accountId, item.value.text));
  });
  return chatHistory;
};

// Shouldn't be based on a accountId, should have something else? (socket???)
// const chatData = Social.get(`${accountId}/experimental/chat`);
// const chatData = Social.get(`${accountId}/experimental/room0`);
const chatHistory = getChatHistory(sortedData);
// State.init({ chatHistory: chatHistory || [], currentText: "", input: "" });
State.init({ input: "" });

console.log("PROPS:", props);

// console.log("CHAAT:", chat);

// IPFS websocket server here [allows creating an instance that many users can use]

// {
//   roomId: 'QmVWQMLUM3o4ZFbLtLMS1PMLfodeEeBkBPR2a2R3hqQ337',
//   message: [
//     {
//       user: 'wenderson.near'
//       message: 'hy guys'
//     },
//     {
//       user: 'wenderson.near'
//       message: 'hy guys'
//     },
//     {
//       user: 'wenderson.near'
//       message: 'hy guys'
//     },
//     {
//       user: 'wenderson.near'
//       message: 'hy guys'
//     }
//   ]
// }

const onChangeMessage = (message) => {
  // State.update({ chatHistory: [...chatHistory, buildMessage(message)] });
  State.update({ input: message });
};

return (
  <>
    <h4 className="mb-5">Chat Widget</h4>
    <div className="mb-2 mt-2" style={{ background: "#F8F9FA", padding: 8 }}>
      {chatHistory.map((chatItem) => {
        return (
          <p>
            <strong style={{ color: "#212121" }}>{chatItem.user}:</strong>{" "}
            {chatItem.message}
          </p>
        );
      })}
    </div>
    <textarea
      type="text"
      rows={1}
      className="form-control"
      // value={state.currentText}
      placeholder="Message"
      onChange={(e) => onChangeMessage(e.target.value)}
    />
    <br />
    <CommitButton
      data={{
        index: {
          roomId_0: JSON.stringify(
            {
              key: "data",
              value: {
                text: state.input,
              },
            },
            undefined,
            0
          ),
        },
      }}
      onCommit={() => {
        // CHECK THIS
        // State.update({reloadData: true})
      }}
    >
      Send Message
    </CommitButton>
  </>
);

// <button type="button" style={{ background: "#ff0000" }}>
//   Send
// </button>

// const homepage = accountId
//   ? Social.get(`${accountId}/settings/near.social/homepage`)
//   : undefined;

// if (homepage === null) {
//   return "Loading";
// }

// return <Widget src={homepage ?? "mob.near/widget/Welcome"} />;
