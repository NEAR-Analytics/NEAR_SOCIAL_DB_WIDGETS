//I used Anton's widget and thanks to him
//Anton Wallet : 0e7a82d0ef92b5559ef04df11f5de68ac4c4479319da5a72b3e2799c4717a422

const chart1Props = {
  query:
    "select substr(date_trunc('month', block_timestamp),0,10) as day_date, count(1) as num_blocks from near.core.fact_blocks where block_timestamp > '2022-01-01' group by 1 order by 1",
  title: "Near Monthly Number of Blocks",
  chartWidth: 300,
  chartHeight: 200,
};

const chart2Props = {
  query:
    "select substr(date_trunc('month', block_timestamp),0,10) as day_date, count(1) from near.social.fact_addkey_events group by 1 order by 1",
  title: "Monthly fact_addkey_events",
  chartWidth: 300,
  chartHeight: 200,
};

const chart3Props = {
  query:
    "select substr(date_trunc('month', block_timestamp),0,10) as day_date, count(1) from near.social.fact_decoded_actions group by 1 order by 1",
  title: "Monthly fact_decoded_actions",
  chartWidth: 300,
  chartHeight: 200,
};

const chart4Props = {
  query:
    "select substr(date_trunc('month', block_timestamp),0,10) as day_date, count(1) from near.social.fact_profile_changes group by 1 order by 1",
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
    <Widget
      src="32c298759f37a070bce4eaa0602c0e961682f2ec5c0a17d86d3b8dc2120be286/widget/FS-bar-chart"
      props={chart3Props}
    />
    <Widget
      src="32c298759f37a070bce4eaa0602c0e961682f2ec5c0a17d86d3b8dc2120be286/widget/FS-pie-chart"
      props={chart4Props}
    />
  </div>
);
