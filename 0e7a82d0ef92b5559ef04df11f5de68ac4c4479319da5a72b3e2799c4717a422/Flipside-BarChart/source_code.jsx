// Query API
State.init({
  queryResults: "",
});

function queryComplete(success, results) {
  State.update({
    queryResults: results,
  });
  //console.log("results: " + JSON.stringify(state.queryResults));
}

const myProps = {
  query: `select substr(date_trunc('month', block_timestamp),0,10) as day_date, count(1) as num_blocks from near.core.fact_blocks where block_timestamp > '2022-01-01' group by 1 order by 1`,
  debug: "true",
  onComplete: queryComplete,
};

// Sample Charts
// <img src="https://quickchart.io/chart?width=300&height=200&chart={type:'bar',data:{labels:['January','February', 'March','April', 'May'], datasets:[{label:'Dogs',data:[50,60,70,180,190]},{label:'Cats',data:[100,200,300,400,500]}]}}" />

const chartType = `"bar"`;
let chartBottomAxisLabels = "[";
let chartValues = "[";
let chartValuesOrig = "[ {label:'DAY_DATE', data:[50,60,70,180,190]} ]";
// parsing of data from flipside
if (state.queryResults !== "") {
  // parsing of labels
  state.queryResults.rows.map((d, i) => {
    if (i !== 0) {
      chartBottomAxisLabels += ",";
      chartValues += ",";
    } else {
      chartValues += "{label: 'DAY_DATE', data:[";
    }
    chartBottomAxisLabels += "'";
    chartBottomAxisLabels += d[0];
    chartBottomAxisLabels += "'";

    chartValues += "'";
    chartValues += d[1];
    chartValues += "'";

    // parsing of columns
    // chartValues += `{label:'${d}', data:[50,60]}`;
  });

  chartValues += "]}]";
  //console.log("chartValues", chartValues);
  //chartValues = chartValuesOrig;
  chartBottomAxisLabels += "]";
  //console.log("chartBottomAxisLabels", chartBottomAxisLabels);
  //console.log("chartValuesOrig", chartValues);
}

/*
const imgSrc =
  "https://quickchart.io/chart?width=300&height=200&chart={type:'bar',data:{labels:['January','February', 'March','April', 'May'], datasets:[{label:'Dogs',data:[50,60,70,180,190]}]}}";
*/

const imgTemplate = `https://quickchart.io/chart?width=300&height=200&chart={type:${chartType},data:{labels:${chartBottomAxisLabels}, datasets:${chartValues}}}`;

//console.log(imgTemplate);
return (
  <>
    <Widget
      src="0e7a82d0ef92b5559ef04df11f5de68ac4c4479319da5a72b3e2799c4717a422/widget/Flipside-API-Getter"
      props={myProps}
    ></Widget>
    <div className="text-bg-light rounded-4 p-3 mb-4">
      {state.queryResults !== "" ? (
        <p>
          <div class="d-flex clearfix flex-wrap flex-column flex-sm-row">
            <div class="p-2">
              <div>
                <h2>Metric: Near Blocks Per Month</h2>
              </div>
            </div>
          </div>
          <div>
            <img src={imgTemplate} />
          </div>
        </p>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  </>
);
