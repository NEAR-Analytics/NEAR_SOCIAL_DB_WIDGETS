let { appendSql, start_date, end_date, title, rowValue, columnValue } = props;

let baseSql = `-- forked from 69856e79-1d53-4ae5-9f4f-0a9e4514d888  

with 
social_inits as (
  select * from near.core.fact_actions_events_addkey
    where receiver_id = 'social.near'
),
add_signer as (
  select
    k.tx_hash,
    k.block_id,
    k.block_timestamp,
    t.tx_signer,
    k.allowance,
    t.tx_signer = t.tx_receiver
  from social_inits k
    left join near.core.fact_transactions t using (tx_hash)
),
de_dupe_resigners as (
  select
    block_timestamp,
    tx_signer
  from add_signer
  -- ignore subsequent authorizations by the same signer
  qualify ROW_NUMBER() over (
  PARTITION BY tx_signer
  ORDER BY
    block_timestamp ASC
) = 1
  
)`;

let sql = baseSql + appendSql;

sql = sql.replace(
  "{{date_filter}}",
  `where block_timestamp >= '${start_date}' and block_timestamp <= '${end_date}'`
);

const chartProps = {
  query: sql,
  title,
  chartWidth: 500,
  chartHeight: 400,
  rowValue,
  columnValue,
};

return (
  <div style={{ height: 800, width: 1000 }}>
    <Widget
      src="reallyveryy.near/widget/Flipside-BarChart-V2.1"
      props={chartProps}
    />
  </div>
);
