const renderMention =
  props.renderMention ??
  ((accountId) => (
    <span
      style={{ fontWeight: 500, marginRight: "-0.2rem", marginLeft: "0.1rem" }}
    >
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
