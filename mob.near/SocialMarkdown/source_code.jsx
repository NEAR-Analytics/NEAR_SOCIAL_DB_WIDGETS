const renderMention =
  props.renderMention ??
  ((accountId) => (
    <span className="d-inline-flex" style={{ fontWeight: 500 }}>
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
