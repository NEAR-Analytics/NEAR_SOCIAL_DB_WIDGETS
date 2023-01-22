const { accountId, blockHeight, value } = props;

return (
  <div className="d-flex justify-content-between">
    <div className="me-2 text-truncate">
      <div className="text-truncate">
        <Widget src="mob.near/widget/ProfileLine" props={{ accountId }} />
      </div>
      <div
        className="text-truncate text-muted"
        style={{ paddingLeft: "1.8em" }}
      >
        poked you
        <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
      </div>
    </div>
    <div className="text-nowrap">
      <Widget
        src="mob.near/widget/PokeButton"
        props={{ accountId, back: true }}
      />
    </div>
  </div>
);
