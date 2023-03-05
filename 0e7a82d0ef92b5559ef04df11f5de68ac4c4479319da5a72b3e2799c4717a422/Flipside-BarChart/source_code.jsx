State.init({
  imgSrc: "",
});

// Query API
const options = {
  method: "POST",
  body: `{ "query": "select substr(date_trunc('month', block_timestamp),0,10) as day_date, count(1) as num_blocks from near.core.fact_blocks where block_timestamp > '2022-01-01' group by 1 order by 1" }`,
  headers: {
    "Content-Type": "application/json",
  },
};

asyncFetch("https://flipside-api.antonyip.com/getCachedQuery", options).then(
  (res) => {
    if (!res.ok) {
      return;
    }

    if (res.body.error) {
      return;
    }

    let queryResults = res.body;

    console.log("queryResults", queryResults);
    const chartType = `"bar"`;
    let chartBottomAxisLabels = "[";
    let chartValues = "[";
    // parsing of data from flipside
    if (queryResults !== "") {
      // parsing of labels
      queryResults.rows.map((d, i) => {
        if (i !== 0) {
          chartBottomAxisLabels += ",";
          chartValues += ",";
        } else {
          chartValues += "{label: 'Number of Blocks', data:[";
        }
        chartBottomAxisLabels += "'";
        chartBottomAxisLabels += d[0];
        chartBottomAxisLabels += "'";

        chartValues += "'";
        chartValues += d[1];
        chartValues += "'";
      });

      chartValues += "]}]";
      chartBottomAxisLabels += "]";
      const imgTemplate = `https://quickchart.io/chart?width=300&height=200&chart={type:${chartType},data:{labels:${chartBottomAxisLabels}, datasets:${chartValues}}}`;
      State.update({
        imgSrc: imgTemplate,
      });
    }
  }
);

return (
  <>
    <h2>Near Monthly Number of Blocks</h2>
    {state.imgSrc === "" ? <div>Loading ...</div> : <img src={state.imgSrc} />}
  </>
);
