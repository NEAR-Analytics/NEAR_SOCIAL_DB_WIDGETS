const renderMention =
  props.renderMention ??
  ((accountId) => (
    <span style={{ fontWeight: 550 }}>
      <Widget
        src="mob.near/widget/ProfileLine"
        props={{
          accountId: accountId.toLowerCase(),
          hideAccountId: true,
          tooltip: true,
        }}
      />
    </span>
  ));

return <Markdown text={props.text} onMention={renderMention} />;
