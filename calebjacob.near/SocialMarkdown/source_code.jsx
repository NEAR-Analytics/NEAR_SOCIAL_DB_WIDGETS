const renderMention =
  props.renderMention ??
  ((accountId) => (
    <Widget
      key={accountId}
      src="calebjacob.near/widget/AccountProfileInline"
      props={{
        accountId,
      }}
    />
  ));

return <Markdown text={props.text} onMention={renderMention} />;
