State.init({
  start_date: "2023-03-10",
  end_date: "2023-03-15",
  current_start_date: "2023-03-10",
  current_end_date: "2023-03-15",
});

const { start_date, end_date, current_start_date, current_end_date } = state;

let ageSql = `,

ages as (

select
  datediff(day, block_timestamp, current_timestamp) as age_day_num,
  count(distinct tx_signer) as address_count
from near.core.fact_transactions t
  where t.tx_receiver in (select tx_signer from de_dupe_resigners {{date_filter}})
group by 1
order by 1
)

select
  case 
  when age_day_num >= 300 then '6. >= 300 days'
  when age_day_num >= 200 then '5. >= 200 days'
  when age_day_num >= 100 then '4. >= 100 days'
  when age_day_num >= 50 then '3. >= 50 days'
  when age_day_num >= 10 then '2. >= 10 days'
  else '1.< 10 days'
  end as age_day,
  sum(address_count) as total_address_count
from ages
group by 1
order by 1`;

let stakeSql = `,

agg as (
SELECT 
  t.tx_signer,
  sum(case
  when CONTAINS(tx:receipt[0]:outcome:logs[0], 'deposited') then REPLACE(REGEXP_SUBSTR(tx:receipt[0]:outcome:logs[0], 'deposited \\d+'), 'deposited')::decimal
  else -REPLACE(REGEXP_SUBSTR(tx:receipt[0]:outcome:logs[0], 'unstaking \\d+'), 'unstaking')::decimal
  end / 1e24) as total_deposit_amount,
  avg(case
  when CONTAINS(tx:receipt[0]:outcome:logs[0], 'deposited') then REPLACE(REGEXP_SUBSTR(tx:receipt[0]:outcome:logs[0], 'deposited \\d+'), 'deposited')::decimal
  else -REPLACE(REGEXP_SUBSTR(tx:receipt[0]:outcome:logs[0], 'unstaking \\d+'), 'unstaking')::decimal
  end / 1e24) as avg_deposit_amount,
  count(distinct t.tx_hash) as stake_txs
FROM near.core.fact_actions_events_function_call c
JOIN near.core.fact_transactions t
ON c.tx_hash = t.tx_hash
WHERE (method_name = 'deposit_and_stake' or method_name = 'unstake_all')
  AND tx_signer in (select tx_signer from de_dupe_resigners {{date_filter}})
    and tx_status = 'Success'
group by 1
)

select
  case 
  when total_deposit_amount >= 300 then '7. >= 300 NEAR'
  when total_deposit_amount >= 200 then '6. >= 200 NEAR'
  when total_deposit_amount >= 100 then '5. >= 100 NEAR'
  when total_deposit_amount >= 50 then '4. >= 50 NEAR'
  when total_deposit_amount >= 10 then '3. >= 10 NEAR'
  when total_deposit_amount > 0 then '2. >= 0 NEAR'
  else '1. 0 NEAR'
  end as total_deposit_amount,
  count(distinct tx_signer) as total_address_count
from agg
group by 1
order by 1`;

let socialSql = `,

agg as (
select 
REPLACE(REGEXP_SUBSTR(node_data, '{"[^"]*'), '{"') as action,
count(*) as tx_count,
count(distinct signer_id) as address_count,
rank() over (order by tx_count desc) as action_rank
  from near.social.fact_decoded_actions
WHERE signer_id in (select tx_signer from de_dupe_resigners {{date_filter}})
group by 1
)

select 
  iff(action_rank <= 10, action, 'Others') as action,
  sum(tx_count) as tx_count,
  sum(address_count) as total_address_count
from agg
group by 1
order by 2 desc`;

let socialSql2 = `,

agg as (
select 
REPLACE(REGEXP_SUBSTR(node_data, '{"[^"]*'), '{"') as action,
count(*) as tx_count,
count(distinct signer_id) as address_count,
rank() over (order by address_count desc) as action_rank
  from near.social.fact_decoded_actions
WHERE signer_id in (select tx_signer from de_dupe_resigners {{date_filter}})
group by 1
)

select 
  iff(action_rank <= 10, action, 'Others') as action,
  sum(tx_count) as tx_count,
  sum(address_count) as total_address_count
from agg
group by 1
order by 3 desc`;

let chart1Sql = `
select
  block_timestamp::date as "Date",
  count(distinct tx_signer) as "Unique Authorizers",
  sum("Unique Authorizers") over (order by "Date") as "Cumulative Unique Authorizers"
from de_dupe_resigners
group by 1
order by 1`;

const WidgetDiv = styled.div`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
  width: 50%;
`;

const onStartDateChange = ({ target }) => {
  State.update({
    start_date: target.value,
  });
};

const onEndDateChange = ({ target }) => {
  State.update({
    end_date: target.value,
  });
};

const onSearch = () => {
  State.update({
    current_start_date: start_date,
    current_end_date: end_date,
  });
};

return (
  <div class="min-vh-100 w-100">
    <div class="d-flex flex-row align-items-end justify-content-center mb-5">
      <div class="w-100">
        <label>Start Date</label>
        <input
          onChange={onStartDateChange}
          class="form-control"
          type="date"
          value={start_date}
        />
      </div>
      <div class="w-100 ms-2">
        <label>End Date</label>
        <input
          onChange={onEndDateChange}
          class="form-control"
          type="date"
          value={end_date}
        />
      </div>
      <button
        class="btn btn-success btn-sm d-flex flex-row ms-3 mb-1"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          Home
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pills-profile-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-profile"
          type="button"
          role="tab"
          aria-controls="pills-profile"
          aria-selected="false"
        >
          Age
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pills-contact-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-contact"
          type="button"
          role="tab"
          aria-controls="pills-contact"
          aria-selected="false"
        >
          Stake Data
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pills-contact-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-social"
          type="button"
          role="tab"
          aria-controls="pills-social"
          aria-selected="false"
        >
          Near Social
        </button>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-home"
        role="tabpanel"
        aria-labelledby="pills-home-tab"
      >
        <Widget
          src="reallyveryy.near/widget/SocialUsersBarChart"
          props={{
            appendSql: chart1Sql,
            start_date: current_start_date,
            end_date: current_end_date,
            title: "Near New Users Over Time",
            rowValue: "date",
            columnValue: "unique authorizers",
          }}
        />
      </div>
      <div
        class="tab-pane fade"
        id="pills-profile"
        role="tabpanel"
        aria-labelledby="pills-profile-tab"
      >
        <Widget
          src="reallyveryy.near/widget/SocialUsersBarChart"
          props={{
            appendSql: ageSql,
            start_date: current_start_date,
            end_date: current_end_date,
            title: `Day Ages (${current_start_date} -  ${current_end_date})`,
            rowValue: "age_day",
            columnValue: "total_address_count",
          }}
        />
      </div>
      <div
        class="tab-pane fade"
        id="pills-contact"
        role="tabpanel"
        aria-labelledby="pills-contact-tab"
      >
        <Widget
          src="reallyveryy.near/widget/SocialUsersBarChart"
          props={{
            appendSql: stakeSql,
            start_date: current_start_date,
            end_date: current_end_date,
            title: `Stake Stats in NEAR (${current_start_date} -  ${current_end_date})`,
            rowValue: "total_deposit_amount",
            columnValue: "total_address_count",
          }}
        />
      </div>
      <div
        class="tab-pane fade"
        id="pills-social"
        role="tabpanel"
        aria-labelledby="pills-social-tab"
      >
        <Widget
          src="reallyveryy.near/widget/SocialUsersBarChart"
          props={{
            appendSql: socialSql,
            start_date: current_start_date,
            end_date: current_end_date,
            title: `Actions by Tx Count (${current_start_date} -  ${current_end_date})`,
            rowValue: "action",
            columnValue: "tx_count",
          }}
        />
        <Widget
          src="reallyveryy.near/widget/SocialUsersBarChart"
          props={{
            appendSql: socialSql2,
            start_date: current_start_date,
            end_date: current_end_date,
            title: `Actions by Address Count (${current_start_date} -  ${current_end_date})`,
            rowValue: "action",
            columnValue: "total_address_count",
          }}
        />
      </div>
    </div>
  </div>
);
