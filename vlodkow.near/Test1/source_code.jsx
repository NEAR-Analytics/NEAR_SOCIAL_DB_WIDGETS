let user_account = context.accountId;

const contract = "chatme.near";
const testChatAccount = "chat-bot.near";

State.init({
  messages: [],
  newMessage: "",
});

const getPrivateChatId = (user1, user2) => {
  if (user1 > user2) {
    return user1.concat("|").concat(user2);
  }
  return user2.concat("|").concat(user1);
};

const sourceURL =
  "https://api.thegraph.com/subgraphs/name/vlodkomr/chatme-main";

const id = getPrivateChatId(user_account, testChatAccount);
const reqData = JSON.stringify({
  query: `{ privateMessages(orderBy: created_at, orderDirection: desc, where: { chat_id: "${id}"}) {id inner_id text image from_address to_address created_at deposit encrypt_key reply_message {id, from_address, text, image, encrypt_key}}}`,
  variables: {},
});
console.log(reqData);

const chatData = fetch(sourceURL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: reqData,
});
if (!chatData) return;

console.log(chatData?.body?.data?.privateMessages);
State.update({ messages: chatData?.body?.data?.privateMessages });

const onTextareatChange = ({ target }) => {
  State.update({ newMessage: target.value });
};

const sendMessage = () => {
  Near.call(contract, "send_private_message", {
    to_address: testChatAccount,
    text: state.newMessage,
    image: "",
  });
};

return (
  <>
    <div class="container border border-info p-2 text-center">
      {user_account ? (
        <>
          <h1>Messages for: {user_account}</h1>
          <hr />

          {state.messages.length > 0 ? (
            <div>
              {state.messages.map((message) => (
                <p>
                  {message.text} | {message.created_at}
                </p>
              ))}
            </div>
          ) : (
            <p>No Messages</p>
          )}
          <hr />
          <textarea className="" onChange={onTextareatChange}></textarea>
          <button onClick={sendMessage}>Send Message</button>
        </>
      ) : (
        <>*Please, LogIn using your NEAR wallet</>
      )}
    </div>
  </>
);
