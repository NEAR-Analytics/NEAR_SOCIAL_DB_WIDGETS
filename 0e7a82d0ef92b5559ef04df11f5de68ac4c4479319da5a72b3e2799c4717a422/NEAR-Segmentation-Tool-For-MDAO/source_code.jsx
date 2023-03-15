State.init({
  retriggerQuery: false,
  mainQuery: "",
  tmpStart: "2023-01-01",
  tmpEnd: "2023-02-01",
  dateStart: "2023-01-01",
  dateEnd: "2023-02-01",
  dexSwapChartProps: { dateStart: "2023-01-01", dateEnd: "2023-02-01" },
});

let mainChartProps = {
  query: `with
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
  final`,
  title: "New Wallets Over Time",
  chartWidth: 640,
  chartHeight: 200,
};

let ageChartProps = {
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
  first_tx_table as (
    select
      min(t.block_timestamp) as first_tx,
      ia.tx_signer
    from
      interested_addresses ia
      left join near.core.fact_transactions t using (tx_signer)
    group by
      2
  ),
  date_diff_table as (
    select
      DATEDIFF('day', first_tx, current_date()) as wallet_age_day,
      tx_signer
    from
      first_tx_table
  ),
  final as (
    select
      COUNT_IF(wallet_age_day > 7) as week_old_wallets,
      COUNT_IF(wallet_age_day > 30) as month_old_wallets,
      COUNT_IF(wallet_age_day > 365) as year_old_wallets,
      COUNT_IF(1 = 1) as total_wallets
    from
      date_diff_table
  ),
  flip as (
    select
      *
    from
      final unpivot (
        my_count for wallet_age in (
          week_old_wallets,
          month_old_wallets,
          year_old_wallets,
          total_wallets
        )
      )
  )
select
  *
from
  flip`,
  title: "Age of Wallets",
  chartWidth: 640,
  chartHeight: 200,
};

let stakeChartProps = {
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
      CASE
        WHEN t.action = 'Stake' then stake_amount / pow(10, 24)
      END as amount_staked,
      CASE
        WHEN t.action = 'Unstake' then - stake_amount / pow(10, 24)
      END as amount_unstaked
    from
      interested_addresses ia
      left join near.core.dim_staking_actions t on ia.tx_signer = t.tx_signer
  ),
  final as (
    select
      day_date,
      sum(nvl(amount_staked, 0) + nvl(amount_unstaked, 0)) as net_stake
    from
      data_table
    WHERE len(day_date) > 0
    group by
      1
  )
select
  *
from
  final
order by
  1`,
  title: "Staking Wallet Behavior",
  chartWidth: 640,
  chartHeight: 200,
};

let nearSocialChartProps = {
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
      left join near.social.fact_decoded_actions t on ia.tx_signer = t.signer_id
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
  title: "Near Social Activity",
  chartWidth: 640,
  chartHeight: 200,
};

// bypass because server cannot handle newline..
mainChartProps.query = mainChartProps.query.replaceAll("\n", " ");
ageChartProps.query = ageChartProps.queryTemplate
  .replace("$$(dateStart)", state.dateStart)
  .replace("$$(dateEnd)", state.dateEnd)
  .replaceAll("\n", " ");

stakeChartProps.query = stakeChartProps.queryTemplate
  .replace("$$(dateStart)", state.dateStart)
  .replace("$$(dateEnd)", state.dateEnd)
  .replaceAll("\n", " ");

nearSocialChartProps.query = nearSocialChartProps.queryTemplate
  .replace("$$(dateStart)", state.dateStart)
  .replace("$$(dateEnd)", state.dateEnd)
  .replaceAll("\n", " ");

//console.log("new", stakeChartProps.query);

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
`;

function updateStart(value) {
  console.log("start", value);
  State.update({
    tmpStart: value,
  });
}

function updateEnd(value) {
  console.log("end", value);
  State.update({
    tmpEnd: value,
  });
}

function goButtonPressed() {
  console.log("hit");
  State.update({
    dateStart: state.tmpStart,
    dateEnd: state.tmpEnd,
    dexSwapChartProps: {
      dateStart: state.tmpStart,
      dateEnd: state.tmpEnd,
    },
  });
  ageChartProps.query = ageChartProps.queryTemplate
    .replace("$$(dateStart)", state.tmpStart)
    .replace("$$(dateEnd)", state.tmpEnd)
    .replaceAll("\n", " ");
  stakeChartProps.query = stakeChartProps.queryTemplate
    .replace("$$(dateStart)", state.dateStart)
    .replace("$$(dateEnd)", state.dateEnd)
    .replaceAll("\n", " ");
  nearSocialChartProps.query = nearSocialChartProps.queryTemplate
    .replace("$$(dateStart)", state.dateStart)
    .replace("$$(dateEnd)", state.dateEnd)
    .replaceAll("\n", " ");
}

return (
  <div>
    <h2>NEAR - Segmentation Tool</h2>
    <div>
      <b>Bounty Question:</b> Create a segmentation tool to help us understand
      the NEAR profiles of new users on Near.social.
    </div>
    <div>
      <b>Methodology:</b> Powered by flipside GODMODE... Check the queries in
      the SourceCode
    </div>
    <div>
      <b>SourceCode:</b>
      <a href="https://near.social/#/mob.near/widget/WidgetSource?src=0e7a82d0ef92b5559ef04df11f5de68ac4c4479319da5a72b3e2799c4717a422/widget/NEAR-Segmentation-Tool-For-MDAO">
        NEAR-Segmentation-Tool-For-MDAO
      </a>
    </div>
    <Widget
      src="0e7a82d0ef92b5559ef04df11f5de68ac4c4479319da5a72b3e2799c4717a422/widget/Flipside-BarChart-V2"
      props={mainChartProps}
    />
    <div>
      <hr />
      <h4>Select the Interval in which users joined near.social...</h4>
      <b>Date Start</b>
      <input
        id="1"
        type="date"
        value={state.tmpStart}
        onChange={({ target: { value } }) => updateStart(value)}
      />
      <b>Date End</b>
      <input
        id="1"
        type="date"
        value={state.tmpEnd}
        onChange={({ target: { value } }) => updateEnd(value)}
      />
    </div>
    <Button onClick={() => goButtonPressed()}>Go</Button>
    <h6>
      {" "}
      The following charts shows the activities of the users who has signed up
      between {state.dateStart} and {state.dateEnd}
    </h6>
    <div>
      <Widget
        src="0e7a82d0ef92b5559ef04df11f5de68ac4c4479319da5a72b3e2799c4717a422/widget/Flipside-BarChart-V2"
        props={ageChartProps}
      />
    </div>
    <div>
      <Widget
        src="0e7a82d0ef92b5559ef04df11f5de68ac4c4479319da5a72b3e2799c4717a422/widget/Flipside-BarChart-V2"
        props={stakeChartProps}
      />
    </div>
    <div>
      <Widget
        src="0e7a82d0ef92b5559ef04df11f5de68ac4c4479319da5a72b3e2799c4717a422/widget/Flipside-BarChart-V2"
        props={nearSocialChartProps}
      />
    </div>
    <div>
      <Widget
        src="0e7a82d0ef92b5559ef04df11f5de68ac4c4479319da5a72b3e2799c4717a422/widget/NEAR-Segment-DEXSWAP"
        props={state.dexSwapChartProps}
      />
    </div>
  </div>
);
