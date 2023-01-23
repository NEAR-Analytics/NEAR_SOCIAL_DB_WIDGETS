const nearDevGovBadgesContractId = "neardevgov.near";

initState({
  badgeId: props.badgeId ?? "",
  receiverAccountId: props.receiverAccountId ?? "",
  memo: props.memo ?? "",
});

const rewardBadgeToAccount = () => {
  Near.call(
    nearDevGovBadgesContractId,
    "reward",
    {
      badge_id: state.badgeId,
      receiver_account_id: state.receiverAccountId,
      memo: state.memo || null,
    },
    30000000000000,
    1
  );
};

return (
  <>
    <div className="col-lg-6  mb-2">
      Badge ID*:
      <input
        type="text"
        value={state.badgeId}
        onChange={(event) => State.update({ badgeId: event.target.value })}
      />
    </div>
    <div className="col-lg-6  mb-2">
      Reward the badge to Account ID*:
      <input
        type="text"
        value={state.receiverAccountId}
        onChange={(event) =>
          State.update({ receiverAccountId: event.target.value })
        }
      />
    </div>
    <div className="col-lg-6  mb-2">
      Memo (optional):
      <input
        type="text"
        value={state.memo}
        onChange={(event) => State.update({ memo: event.target.value })}
      />
    </div>
    <button
      className="btn btn-outline-primary mb-2"
      onClick={rewardBadgeToAccount}
    >
      Submit
    </button>
  </>
);
