let chart4Props = {
  query: `
    with
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
  final as (
    select
      block_timestamp::date as day_date,
      count(distinct tx_signer) as Unique_Authorizers,
      sum(Unique_Authorizers) over (
        order by
          day_date
      ) as Cumulative_Unique_Authorizers
    from
      de_dupe_resigners
    group by
      1
    order by
      1
  )
select
  *
from
  final
`,
  title: "Monthly fact_profile_changes",
  chartWidth: 640,
  chartHeight: 200,
};

// bypass because server cannot handle newline..
chart4Props.query = chart4Props.query.replaceAll("\n", " ");

return (
  <div>
    <h2>Widgets Created by Anton using Flipside's Database.</h2>
    <Widget
      src="0e7a82d0ef92b5559ef04df11f5de68ac4c4479319da5a72b3e2799c4717a422/widget/Flipside-BarChart-V2"
      props={chart4Props}
    />
  </div>
);
