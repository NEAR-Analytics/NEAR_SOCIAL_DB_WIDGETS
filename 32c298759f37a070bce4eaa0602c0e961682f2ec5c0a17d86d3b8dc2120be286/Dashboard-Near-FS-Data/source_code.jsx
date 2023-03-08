//I used Anton's widget and thanks to him
//Anton Wallet : 0e7a82d0ef92b5559ef04df11f5de68ac4c4479319da5a72b3e2799c4717a422

const chart1Props = {
  query:
    "select date_trunc(week,block_timestamp)::date as date,count(DISTINCT SIGNER_ID) as Active_user from near.social.fact_profile_changes group by 1 order by 1",
  title: "The number of weekly active users of Near on near.social",
  chartWidth: 500,
  chartHeight: 200,
};

const chart2Props = {
  query:
    "select date_trunc(week, first_d) as date,count(DISTINCT SIGNER_ID) as users from (select SIGNER_ID ,min(BLOCK_TIMESTAMP)::date as first_d from  near.social.fact_addkey_events  group by 1) group by 1",
  title: "The number of weekly new users of Near on near.social",
  chartWidth: 500,
  chartHeight: 200,
};

const chart3Props = {
  query:
    "select top 5 case when node_data:follow is not null then 'follow' when node_data:post is not null then 'post' when node_data:main is not null then 'main'  when node_data:like is not null then 'like' when node_data:graph is not null then 'graph' else NODE  end as task ,count(DISTINCT tx_hash) as task_count from near.social.fact_decoded_actions group by 1 order by task_count desc",
  title: "5 popular actions of users in near.social",
  chartWidth: 400,
  chartHeight: 400,
};

const chart4Props = {
  query:
    "select profile_section as Section, count(distinct tx_hash) as Total_Number_Edit " +
    " from (select * from (select *,rank() over (partition by signer_id order by block_timestamp) as rank " +
    " from (select tx_hash,signer_id,	block_timestamp, profile_section  		from near.social.fact_profile_changes " +
    " join near.core.fact_transactions using(tx_hash)    where tx_status = 'Success')) where rank > 1)	group by Section",
  title: "Monthly fact_profile_changes",
  chartWidth: 300,
  chartHeight: 300,
};

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

return (
  <div>
    <h2>Widgets Created by Sal☰h using Flipside's Database.</h2>
    <Widget
      src="32c298759f37a070bce4eaa0602c0e961682f2ec5c0a17d86d3b8dc2120be286/widget/FS-bar-chart"
      props={chart1Props}
    />
    <Widget
      src="32c298759f37a070bce4eaa0602c0e961682f2ec5c0a17d86d3b8dc2120be286/widget/FS-bar-chart"
      props={chart2Props}
    />
    <h1></h1>
    <h4>5 popular actions of users in near.social</h4>
    <Widget
      src="32c298759f37a070bce4eaa0602c0e961682f2ec5c0a17d86d3b8dc2120be286/widget/FS-pie-chart"
      props={chart3Props}
    />
  </div>
);
