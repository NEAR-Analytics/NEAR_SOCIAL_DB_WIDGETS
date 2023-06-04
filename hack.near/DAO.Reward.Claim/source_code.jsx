const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const WIDGET_AUTHOR = "sking.near";
const daoId = props.daoId ?? "multi.sputnik-dao.near";
const bountiesPerPage = props.bountiesPerPage ?? 5; // Number of bounties to fetch at a time

State.init({
  daoId,
  bounties: [],
  lastBountyId: null, // To keep track of the last loaded bounty
  hasMore: true, // Boolean to know if there are more bounties to load
});

const loadBounties = () => {
  const lastBountyId =
    state.lastBountyId !== null
      ? state.lastBountyId
      : Near.view(daoId, "get_last_bounty_id");
  if (lastBountyId === null) return;

  const fromIndex = Math.max(0, lastBountyId - bountiesPerPage + 1); // Ensures fromIndex is never less than 0
  const limit = fromIndex === 0 ? lastBountyId + 1 : bountiesPerPage; // Ensure we don't fetch the same bounties twice if fromIndex is 0

  const newBounties = Near.view(daoId, "get_bounties", {
    from_index: fromIndex,
    limit: limit,
  });
  if (newBounties === null) return;

  State.update({
    ...state,
    hasMore: fromIndex > 0,
    bounties: [...state.bounties, ...newBounties.reverse()],
    lastBountyId: fromIndex - 1,
  });
};

const onChangeDAO = (newDaoId) => {
  State.update({
    daoId: newDaoId,
    bounties: [],
    lastBountyId: null,
    hasMore: true,
  });
};

return (
  <>
    <div>
      <h3>DAO Bounties</h3>
      <div className="mb-2">
        <p className="m-1">Sputnik Contract ID:</p>
        <input
          type="text"
          placeholder="example.sputnik-dao.near"
          onChange={(e) => onChangeDAO(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <h4>{latest_bounty_id}</h4>

        <button className="btn btn-success" onClick={handleClaim}>
          Claim Bounty
        </button>
      </div>
      <hr />

      <div>
        <InfiniteScroll loadMore={loadBounties} hasMore={state.hasMore}>
          {state.bounties.map((proposal, i) => (
            <Widget
              key={i}
              src={WIDGET_AUTHOR + "/widget/DAO.Reward"}
              props={{ daoId: state.daoId, proposal: proposal }}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  </>
);
