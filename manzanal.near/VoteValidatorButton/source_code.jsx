if (!props.accountId || !context.accountId) {
  return "";
}

return (
  <>
    <a
      className="btn btn-primary btn-info"
      href={`/#/manzanal.near/widget/ValidatorStakingVoteAction?validator_account_id=${props.accountId}`}
      role="button"
    >
      {props.short ? "Vote" : "Vote for " + props.accountId}
    </a>
  </>
);
