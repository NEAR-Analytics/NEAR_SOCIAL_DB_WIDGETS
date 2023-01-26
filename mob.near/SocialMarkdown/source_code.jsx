const renderMention =
  props.renderMention ??
  ((accountId) => (
    <strong>
      <Widget
        src="mob.near/widget/ProfileLine"
        props={{
          accountId: accountId.toLowerCase(),
          hideAccountId: true,
          tooltip: true,
        }}
      />
    </strong>
  ));

return <Markdown text={props.text} onMention={renderMention} />;
