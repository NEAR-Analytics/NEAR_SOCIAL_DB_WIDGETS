if (!props.accountId || !context.accountId) {
  return "";
}

const o = Social.keys(
  `${props.accountId}/graph/connect/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

return o && Object.keys(o).length ? (
  <span className="badge bg-secondary fw-light">
    <i className="bi bi-patch-check"></i>
  </span>
) : (
  ""
);
