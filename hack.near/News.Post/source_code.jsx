const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/main`, blockHeight) ?? "null");
const subscribe = !!props.subscribe;
const raw = !!props.raw;

const notifyAccountId = accountId;
const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

const link = `#/mob.near/widget/MainPage.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const convertAmount = (amount, decimals) => {
  const [whole, fractional] = amount.toString().split(".");
  const wholePart = new BN(whole).mul(new BN("10").pow(new BN(decimals)));
  if (fractional === undefined) {
    return wholePart.toString();
  }
  const fractionalPart = new BN(fractional).mul(
    new BN("10").pow(new BN(decimals - fractional.length))
  );
  return wholePart.add(fractionalPart).toString();
};

State.init({
  recipient: accountId,
  contract_name: "nearweek-news-contribution.sputnik-dao.near",
  amount: 0.5,
  deposit: 0.1,
});

const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};

const onChangeRecipient = (recipient) => {
  State.update({
    recipient,
  });
};

const onChangeDescription = (description) => {
  State.update({
    description,
  });
};

const handleProposal = () => {
  Near.call([
    {
      contractName: state.contract_name,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: content,
          kind: {
            Transfer: {
              token_id: "",
              receiver_id: state.recipient.trim().toLowerCase(),
              amount: convertAmount(state.amount.toString(), 24) ?? 0,
            },
          },
        },
      },
      gas: state.gas ?? 200000000000000,
      deposit:
        convertAmount(state.deposit.toString(), 24) ?? 100000000000000000000000,
    },
  ]);
};

return (
  <div className="border-bottom pt-3 pb-1">
    <Widget
      src="mob.near/widget/MainPage.Post.Header"
      props={{ accountId, blockHeight, link, postType: "post", flagItem: item }}
    />
    <div className="mt-3 text-break">
      <Widget
        src="mob.near/widget/MainPage.Post.Content"
        props={{ content, raw }}
      />
    </div>
    {blockHeight !== "now" && (
      <div className="mt-1 d-flex justify-content-between">
        <div className="me-4">
          <Widget
            src="mob.near/widget/CommentButton"
            props={{
              onClick: () =>
                !state.showReply && State.update({ showReply: true }),
            }}
          />
        </div>
        <div className="me-3">
          <Widget
            src="mob.near/widget/RepostButton"
            props={{
              notifyAccountId,
              item,
            }}
          />
        </div>
        <div className="me-3">
          <Widget
            src="mob.near/widget/LikeButton"
            props={{
              notifyAccountId,
              item,
            }}
          />
        </div>
        <div>
          <Widget
            src="mob.near/widget/MainPage.Post.ShareButton"
            props={{ accountId, blockHeight, postType: "post" }}
          />
        </div>
      </div>
    )}
    <div className="me-3">
      <button className="btn btn-primary mt-3" onClick={handleProposal}>
        Submit
      </button>
    </div>
    <div className="mt-3 ps-5">
      {state.showReply && (
        <div className="mb-2">
          <Widget
            src="mob.near/widget/MainPage.Comment.Compose"
            props={{
              notifyAccountId,
              item,
              onComment: () => State.update({ showReply: false }),
            }}
          />
        </div>
      )}
      <Widget
        src="mob.near/widget/MainPage.Comment.Feed"
        props={{
          item,
          highlightComment: props.highlightComment,
          limit: props.commentsLimit,
          subscribe,
          raw,
        }}
      />
    </div>
  </div>
);
