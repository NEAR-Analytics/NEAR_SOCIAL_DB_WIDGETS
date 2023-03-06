State.init({
  is_stake_loading: false,
  is_born_date_loading: false,
  is_swap_loading: false,
  is_children_loading: false,
  is_ledger_loading: false,

  address: "",
  ledger_data: [],
  stake_data: [],
  swaps_data: [],
  children_data: [],
  born_data: [],

  is_init: true,
});

const {
  is_stake_loading,
  is_born_date_loading,
  is_swap_loading,
  is_children_loading,
  is_ledger_loading,
  address,
  previous_address,
  swaps_data,
  stake_data,
  ledger_data,
  children_data,
  born_data,
  is_init,
} = state;

const is_loading =
  is_stake_loading &&
  is_born_date_loading &&
  is_swap_loading &&
  // is_children_loading &&
  is_ledger_loading;

const is_any_loading =
  is_stake_loading ||
  is_born_date_loading ||
  is_swap_loading ||
  is_children_loading ||
  is_ledger_loading;

const fetchData = (sql, whichState, whichLoadingState) => {
  //clear and reset data
  State.update({ [whichLoadingState]: true, [whichState]: [] });
  sql = sql.replace("{{address}}", address).replace(/\+/g, "%2B");
  var formBody = [];
  formBody.push(`statement=${sql}`);
  formBody = formBody.join("&");

  // doesn't work
  try {
    asyncFetch("https://flipside.leslug.com/execute", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    }).then((res) => {
      State.update({
        [whichState]: res.body,
        [whichLoadingState]: false,
      });

      //.catch doesn't work either
    });
  } catch {
    State.update({
      [whichLoadingState]: false,
      [whichState]: [],
    });
  }
};

const ellipsizeThis = (x, leftCharLength, rightCharLength) => {
  let totalLength = leftCharLength + rightCharLength;

  if (totalLength >= x.length) {
    return x;
  }

  return x.substring(0, leftCharLength) + "..." + x.substr(-rightCharLength);
};

function toTwoDecimals(x) {
  if (!x) {
    return "";
  }
  if (typeof x === "string") {
    x = parseFloat(x);
  }
  return x.toLocaleString("en", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

const getStakeData = () => {
  let sql = `SELECT 
    t.block_timestamp,
    t.tx_hash,
    IFF(CONTAINS(tx:receipt[0]:outcome:logs[0], 'deposited'), 'Stake', 'Unstake') as action,
    case action
    when 'Stake' then REPLACE(REGEXP_SUBSTR(tx:receipt[0]:outcome:logs[0], 'deposited \\\\d+'), 'deposited')::decimal
    else -REPLACE(REGEXP_SUBSTR(tx:receipt[0]:outcome:logs[0], 'unstaking \\\\d+'), 'unstaking')::decimal
    end / 1e24 as deposit_amount
    FROM near.core.fact_actions_events_function_call c
    JOIN near.core.fact_transactions t
    ON c.tx_hash = t.tx_hash
    WHERE (method_name = 'deposit_and_stake' or method_name = 'unstake_all')
    AND tx_signer = '{{address}}'
        and tx_status = 'Success'
order by block_timestamp desc`;

  fetchData(sql, "stake_data", "is_stake_loading");
};

const getIsLedgerData = () => {
  let sql = `SELECT 
  COUNT(DISTINCT receiver_id) as is_ledger
FROM near.core.fact_actions_events_addkey
  WHERE permission:FunctionCall:method_names[0] = '__wallet__metadata'
		AND allowance = 0
        AND receiver_id = '{{address}}'`;
  fetchData(sql, "ledger_data", "is_ledger_loading");
};

const getBornDateData = () => {
  let sql = `  SELECT 
    tx_signer as given_by,
    tx_hash,
    block_timestamp as date
  FROM near.core.fact_transfers
  WHERE status and tx_receiver = '{{address}}'
  QUALIFY ROW_NUMBER() OVER (PARTITION BY tx_receiver ORDER BY block_timestamp) = 1
order by block_timestamp desc`;
  fetchData(sql, "born_data", "is_born_date_loading");
};

const getSwapData = () => {
  let sql = `with prices as (
  select
    timestamp::date as date,
    token_contract,
    symbol,
    avg(price_usd) as price_usd
  from near.core.fact_prices
  group by 1,2,3
)

select 
  block_timestamp,
  tx_hash,
  pool_id,
  amount_in,
  amount_in * p1.price_usd as amount_in_usd,
  nvl(p1.symbol, token_in_contract) as symbol_in,
  amount_out,
  amount_out * p2.price_usd as amount_out_usd,
  nvl(p2.symbol, token_out_contract) as symbol_out
from near.core.ez_dex_swaps s
left join prices p1
on p1.token_contract = s.token_in_contract and p1.date = block_timestamp::date
left join prices p2
on p2.token_contract = s.token_out_contract and p2.date = block_timestamp::date
where trader = '{{address}}'
order by block_timestamp desc`;
  fetchData(sql, "swaps_data", "is_swap_loading");
};

const getChildrenData = () => {
  let sql = `WITH first_deposits AS (
  SELECT 
    block_timestamp,
    tx_hash,
    tx_receiver,
    tx_signer
  FROM near.core.fact_transfers
  WHERE status
  QUALIFY ROW_NUMBER() OVER (PARTITION BY tx_receiver ORDER BY block_timestamp) = 1
)

  SELECT
    block_timestamp,
    tx_hash,
    tx_receiver as underling
  FROM first_deposits
  where tx_signer = '{{address}}'
order by block_timestamp desc`;
  fetchData(sql, "children_data", "is_children_loading");
};

const onAddressChange = ({ target }) => {
  State.update({ address: target.value });
};

const onSearch = () => {
  State.update({ is_init: false });
  getStakeData();
  getBornDateData();
  getIsLedgerData();
  // getChildrenData();
  getSwapData();
};

return (
  <div>
    <div class="d-flex flex-row align-items-center">
      <div class="w-100">
        <input
          onChange={onAddressChange}
          class="form-control"
          placeholder="Address"
        />
      </div>
      <div class="d-flex">
        <button
          class="btn btn-success btn-sm d-flex flex-row ms-3"
          onClick={() => {
            onSearch();
          }}
          disabled={is_any_loading}
        >
          {!is_any_loading && <i class="bi bi-search me-2"></i>}
          {is_any_loading && (
            <div class="spinner-grow spinner-grow-sm me-2" role="status"></div>
          )}
          Search
        </button>
      </div>
    </div>
    <div class="d-flex w-100" style={{ minHeight: 500 }}>
      {is_loading && (
        <div
          class="spinner-border spinner-border-lg m-auto"
          role="status"
        ></div>
      )}
      {!is_loading && !is_init && (
        <div class="d-flex flex-column w-100 h-100 p-3">
          <h2 class="text-lg mt-5">General</h2>
          <div class="row">
            <div class="col-6 row">
              <strong class="col-6">Is Ledger:</strong>
              <span class="col-6">
                {is_ledger_loading ? (
                  <i class="spinner-grow spinner-grow-sm"></i>
                ) : ledger_data[0]?.is_ledger ? (
                  <span class="text-success">YES</span>
                ) : (
                  <span class="text-danger">NO</span>
                )}
              </span>
            </div>
            <div class="col-6"></div>
            <div class="col-6 row">
              <strong class="col-6">First Tx Date:</strong>
              <span class="col-6">
                {is_born_date_loading ? (
                  <i class="spinner-grow spinner-grow-sm"></i>
                ) : (
                  born_data[0]?.date ?? "N/A"
                )}
              </span>
            </div>
            <div class="col-6 row">
              <strong class="col-6">First Tx Hash:</strong>
              <span class="col-6">
                {is_born_date_loading ? (
                  <i class="spinner-grow spinner-grow-sm"></i>
                ) : (
                  <a
                    href={`https://explorer.near.org/transactions/${born_data[0]?.tx_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ellipsizeThis(born_data[0]?.tx_hash ?? "N/A", 6, 6)}
                  </a>
                )}
              </span>
            </div>
          </div>
          <Widget
            src={`reallyveryy.near/widget/Stake-DataTable`}
            props={{
              is_stake_loading,
              stake_data,
            }}
          />
          <h2 class="text-lg mt-5">Swaps</h2>
          <div class="row">
            <div class="col-6 row">
              <strong class="col-6">Number of Swap Txs:</strong>
              <span class="col-6">
                {is_swap_loading ? (
                  <i class="spinner-grow spinner-grow-sm"></i>
                ) : (
                  swaps_data.length
                )}
              </span>
            </div>
          </div>
          <div class="table-responsive mt-3">
            <table class="table-striped table" style={{ minHeight: 100 }}>
              <thead>
                <tr>
                  <th>Block Timestamp</th>
                  <th>Tx Hash</th>
                  <th>Pool ID</th>
                  <th class="text-center">Swap Route</th>
                </tr>
              </thead>
              <tbody>
                {swaps_data.map((x) => (
                  <tr>
                    <td>{x.block_timestamp}</td>
                    <td>
                      <a
                        href={`https://explorer.near.org/transactions/${x.tx_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {ellipsizeThis(x.tx_hash ?? "N/A", 6, 6)}
                      </a>
                    </td>
                    <td>{x.pool_id}</td>
                    <td class="text-center">
                      <div class="row">
                        <div class="col-5">
                          <strong>
                            {toTwoDecimals(x.amount_out)}{" "}
                            {ellipsizeThis(x.symbol_out, 6, 6)}
                          </strong>
                          <span>
                            ($
                            {x.amount_out_usd
                              ? toTwoDecimals(x.amount_out_usd)
                              : "0.00"}
                            )
                          </span>
                        </div>
                        <div class="col-2">{"🡆"}</div>
                        <div class="col-5">
                          <strong>
                            {toTwoDecimals(x.amount_in)}{" "}
                            {ellipsizeThis(x.symbol_in, 6, 6)}
                          </strong>
                          <span>
                            ($
                            {x.amount_out_usd
                              ? toTwoDecimals(x.amount_in_usd)
                              : "0.00"}
                            )
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  </div>
);
