let dexSwapChartProps = {
  queryTemplate: `with
  social_inits as (
    select
      *
    from
      near.core.fact_actions_events_addkey
    where
      receiver_id = 'social.near'
  ),
  add_signer as (
    select
      k.tx_hash,
      k.block_id,
      k.block_timestamp,
      t.tx_signer,
      k.allowance,
      t.tx_signer = t.tx_receiver
    from
      social_inits k
      left join near.core.fact_transactions t using (tx_hash)
  ),
  de_dupe_resigners as (
    select
      block_timestamp,
      tx_signer
    from
      add_signer
    qualify
      ROW_NUMBER() over (
        PARTITION BY
          tx_signer
        ORDER BY
          block_timestamp ASC
      ) = 1
  ),
  interested_addresses as (
    select
      tx_signer
    from
      de_dupe_resigners
    WHERE
      block_timestamp BETWEEN '$$(dateStart)' and '$$(dateEnd)'
  ),
  data_table as (
    select
      substr(date_trunc('month', t.block_timestamp), 0, 10) as day_date,
      ia.tx_signer,
      count(1) as num_actions
    from
      interested_addresses ia
      left join near.core.ez_dex_swaps t on ia.tx_signer = t.trader
    group by
      1,
      2
  ),
  final as (
    select
      day_date,
      sum(num_actions) as net_actions
    from
      data_table
    WHERE
      len(day_date) > 0
    group by
      1
  )
select
  *
from
  final
order by
  1`,
  title: "DEX Swap Activity",
  chartWidth: 640,
  chartHeight: 200,
};

dexSwapChartProps.query = dexSwapChartProps.queryTemplate
  .replace("$$(dateStart)", props.dateStart)
  .replace("$$(dateEnd)", props.dateEnd)
  .replaceAll("\n", " ");

return (
  <div>
    <Widget
      src="0e7a82d0ef92b5559ef04df11f5de68ac4c4479319da5a72b3e2799c4717a422/widget/Flipside-BarChart-V2"
      props={dexSwapChartProps}
    />
  </div>
);
