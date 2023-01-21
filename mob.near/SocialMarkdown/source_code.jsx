const renderMention =
  props.renderMention ??
  ((accountId) => (
    <Widget
      src="mob.near/widget/ProfileLine"
      props={{ accountId, hideAccountId: true, tooltip: true }}
    />
  ));

return <Markdown text={props.text} onMention={renderMention} />;
