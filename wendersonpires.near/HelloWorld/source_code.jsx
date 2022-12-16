const accountId = props.accountId ?? context.accountId;

// const foo = Social.getr(`${accountId}/profile`);
// console.log("SEE:", foo);

// Shouldn't be based on a accountId, should have something else? (socket???)
const chatData = Social.get(`${accountId}/experimental/chat`);
const chat = chatData ? JSON.parse(chatData) : [];
State.init({ chat: chat || [], currentText: "" });

console.log("TEEEST:", props);

// console.log("CHAAT:", chat);

// IPFS websocket server here [allows creating an instance that many users can use]

const buildMessage = (message) => {
  return {
    user: accountId,
    message,
  };
};

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
  State.update({ chat: [...chat, buildMessage(message)] });
};

return (
  <>
    <h4 className="mb-5">Chat Widget</h4>
    <div className="mb-2 mt-2" style={{ background: "#F8F9FA", padding: 8 }}>
      {chat.map((chatItem) => {
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
      data={{ experimental: { chat: state.chat } }}
      onComplete={() => {
        console.log("test");
      }}
      onChange={() => {
        console.log("test change");
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
