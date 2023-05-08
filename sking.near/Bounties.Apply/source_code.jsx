// Config
const WIDGET_AUTHOR = "sking.near";
const COUNCIL_ACCOUNTS = ["achraf.near", "sking.near", "samora.near"];
const UIKingWidgetAuthor = "sking.near";

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
