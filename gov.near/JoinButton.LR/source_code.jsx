const { ownerId, blockHeight } = props;

return (
  <div className="d-flex justify-content-between">
    <div className="me-2 text-truncate">
      <div className="text-truncate">
        <Widget
          src="gov.near/widget/Profile"
          props={{ ownerId, tooltip: true }}
        />
        {props.L}
      </div>
    </div>
    <div className="text-nowrap">{props.R}</div>
  </div>
);
