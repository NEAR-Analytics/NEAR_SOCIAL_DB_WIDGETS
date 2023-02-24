let validators = fetch("https://vote.metapool.app/api/validators_extended", {
  subscribe: true,
});
if (!validators) {
  return "Loading";
}
const TRUNCATE_LENGTH = 18;
const near_staked = validators.body.near_staked;
const near_assigned = validators.body.near_assigned;
initState({
  data: validators.body.data,
  filteredData: validators.body.data,
});

if (!validators.body) {
  return "Illegal data";
}

const onChangeData = (_data) => {
  State.update({ filteredData: _data.result });
};
return (
  <>
    <div class="d-flex justify-content-evenly m-2">
      <div class="col-md-2">
        <Widget
          src="manzanal.near/widget/ValidatorsCount"
          props={{ count: validators.body.data.length }}
        />
      </div>
      <div class="col-md-5">
        <Widget
          src="manzanal.near/widget/MetaStakingDashComponent"
          props={{
            near_staked: near_staked,
            near_assigned: near_assigned,
          }}
        />
      </div>
      <div class="col-md-4">
        <Widget src="manzanal.near/widget/UserVotingDashComponent" props={{}} />
      </div>
    </div>
    <Widget
      src="manzanal.near/widget/SearchComponent"
      props={{
        data: validators.body.data,
        searchTermKey: "account_id",
        minLength: 0,
        placeholder: "Search Valdator",
        onChange: onChangeData,
      }}
    />
    <div class="table-responsive w-100 mt-2">
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
                <span
                  class="fs-6"
                  data-toggle="tooltip"
                  title={pool.account_id}
                  trigger="hover focus"
                >
                  {" "}
                  {pool.account_id.substring(0, pool.account_id.indexOf("."))
                    .length > TRUNCATE_LENGTH
                    ? pool.account_id
                        .substring(0, pool.account_id.indexOf("."))
                        .substring(0, TRUNCATE_LENGTH) + "..."
                    : pool.account_id.substring(
                        0,
                        pool.account_id.indexOf(".")
                      )}
                </span>
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
              <td class="text-end text-nowrap">
                {`${pool.votes.toLocaleString(
                  "en-US"
                )}(${pool.votes_weight.toFixed(0)}%)`}
              </td>
              <td class="text-end">
                {pool.stakedAsignedByVotes.toLocaleString("en-US")}&nbsp;Ⓝ
              </td>
              <td class="text-end">
                {`${pool.stakedAssignedTotal.toLocaleString("en-US")} Ⓝ`}
              </td>
              <td class="text-end">
                {pool.stakedn.toLocaleString("en-US")}&nbsp;Ⓝ
              </td>
              <td class="text-end text-nowrap">
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
