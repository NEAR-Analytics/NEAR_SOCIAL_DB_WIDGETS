let validators = fetch("https://vote.metapool.app/api/validators_extended", {
  subscribe: true,
});
if (!validators) {
  return "Loading";
}

initState({
  data: validators.body,
  filteredData: validators.body,
});

if (!validators.body) {
  return "Illegal data";
}

const onChangeData = (_data) => {
  State.update({ filteredData: _data.result });
};
return (
  <>
    <Widget
      src="manzanal.near/widget/SearchComponent"
      props={{
        data: validators.body,
        searchTermKey: "account_id",
        minLength: 2,
        placeholder: "Search Valdator",
        onChange: onChangeData,
        debug: false,
      }}
    />
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th class="text-center">Name</th>
            <th class="text-center">APY</th>
            <th class="text-center">Votes</th>
            <th class="text-center">Assigned&nbsp;By&nbsp;Votes</th>
            <th class="text-center">Assigned&nbsp;Total&nbsp;</th>
            <th class="text-center">Meta&nbsp;Pool&nbsp;Staked</th>
            <th class="text-center">Pending</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(state.filteredData).map(([key, pool]) => (
            <tr className="align-middle">
              <td class="text-start">
                <span>{pool.account_id}</span>
                <span
                  data-toggle="tooltip"
                  title="Pool performance in the last four epochs is low, votes will not be considered until the validator has four epochs with good performance"
                  trigger="hover focus"
                  className={
                    Number(pool.extraData.apy) > 0 ? "d-none" : "text-warning"
                  }
                >
                  ⚠
                </span>
              </td>
              <td class="text-center">
                <span
                  className={
                    Number(pool.extraData.apy) > 0
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {pool.extraData.apy.toLocaleString("en-US")}%
                </span>
              </td>
              <td class="text-end">
                {pool.votes.toLocaleString("en-US")} (
                {pool.votes_weight.toFixed(2)}%)
              </td>
              <td class="text-end">
                {pool.stakedAsignedByVotes.toLocaleString("en-US")}&nbsp;Ⓝ
              </td>
              <td class="text-end">
                {pool.stakedAssignedTotal.toLocaleString("en-US")}&nbsp;Ⓝ
              </td>
              <td class="text-end">
                {pool.stakedn.toLocaleString("en-US")}&nbsp;Ⓝ
              </td>
              <td class="text-end">
                <span
                  className={
                    Number(pool.pendingAmount) > 0
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  <span>{pool.pendingAmount > 0 ? "▲" : "▼"}</span>
                  {pool.pendingAmount.toLocaleString("en-US")}
                </span>
                <span>Ⓝ</span>
              </td>
              <td>
                <Widget
                  src="manzanal.near/widget/VoteValidatorButton"
                  props={{
                    accountId: pool.account_id,
                    short: true,
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);
