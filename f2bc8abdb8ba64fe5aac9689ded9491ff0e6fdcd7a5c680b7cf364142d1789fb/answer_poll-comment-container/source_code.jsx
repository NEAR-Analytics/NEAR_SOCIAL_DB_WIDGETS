const answerData = props.answerData;

return (
  <div className="flex-column mt-2">
    <small className="ps-1 text-nowrap text-muted ms-auto">
      <i className="bi bi-clock me-1"></i>
      {timeAgo(Date.now() - answerTimestamp)}
    </small>
    <div className="flex-row">
      <span className="fw-bold">{userName}</span>
      <span>{comment}</span>
    </div>
  </div>
);
