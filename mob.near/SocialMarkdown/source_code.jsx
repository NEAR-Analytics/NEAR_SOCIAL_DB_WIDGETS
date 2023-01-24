const renderMention =
  props.renderMention ??
  ((accountId) => (
    <strong>
      <Widget
        src="mob.near/widget/ProfileLine"
        props={{ accountId, hideAccountId: true, tooltip: true }}
      />
    </strong>
  ));

return <Markdown text={props.text} onMention={renderMention} />;
