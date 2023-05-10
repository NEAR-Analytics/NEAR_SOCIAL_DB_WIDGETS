// Config
const WIDGET_AUTHOR = "sking.near";
const WHITELISTED_ACCOUNTS = ["sking.near", "samora.near"];
const UIKingWidgetAuthor = "sking.near";
const currentUserId = "sking.near";
const MAIN_DB_KEY = `${WIDGET_AUTHOR}-bounties-vALPHA`;

// Props
const { id, blockHeight } = props;

if (!id) {
  throw {
    message:
      "Invalid bounty id, please provide a valid id in this format: '?id=[authorId]@[bountyId]'",
  };
}

// if (!WHITELISTED_ACCOUNTS.includes(accountId)) {
//   return "The bounty author is not whitelisted to show bounties in this widget";
// }

// get data
const authorId = id.split("@")[0];
const bountyId = id.split("@")[1];
const result = Social.getr(
  `${authorId}/${MAIN_DB_KEY}.Bounties/${bountyId}`,
  blockHeight || undefined
);
const bounty = {
  ...result,
  skills: JSON.parse(result.skills),
  blockHeight,
  author: authorId,
  createdAt: bountyId,
};

// Render
return (
  <>
    <Widget src={`${WIDGET_AUTHOR}/widget/Bounties.Components.Background`} />
    <Widget
      src={`${WIDGET_AUTHOR}/widget/Bounties.Components.Header`}
      props={{
        widgetAuthor: WIDGET_AUTHOR,
        UIKingWidgetAuthor: UIKingWidgetAuthor,
      }}
    />
    <Widget
      src={`${WIDGET_AUTHOR}/widget/Bounties.Components.FormApply`}
      props={{
        widgetAuthor: WIDGET_AUTHOR,
        UIKingWidgetAuthor: UIKingWidgetAuthor,
      }}
    />
  </>
);
