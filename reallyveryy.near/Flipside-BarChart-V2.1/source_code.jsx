State.init({
  imgSrc: "",
  currentQuery: "",
});

let { query, rowValue, columnValue } = props;
var formBody = [];
formBody.push(`statement=${query}`);
formBody = formBody.join("&");

// Query API
const options = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  body: formBody,
};

if (state.currentQuery != props.query) {
  State.update({
    currentQuery: props.query,
  });

  asyncFetch("https://flipside.leslug.com/execute", options).then((res) => {
    let queryResults = res.body;

    console.log("queryResults", queryResults);
    const chartType = `"bar"`;
    let chartBottomAxisLabels = "[";
    let chartValues = "[";

    // parsing of data from flipside
    if (queryResults !== 0) {
      // parsing of labels
      let currentRows = [];
      queryResults.map((d, i) => {
        if (currentRows.includes(d[rowValue])) {
          return; // no duplicates
        }

        if (i !== 0) {
          chartBottomAxisLabels += ",";
          chartValues += ",";
        } else {
          chartValues += `{label: '${props.title}', data:[`;
        }

        currentRows.push(d[rowValue]);
        chartBottomAxisLabels += "'";
        chartBottomAxisLabels += d[rowValue];
        chartBottomAxisLabels += "'";

        chartValues += "'";
        chartValues += d[columnValue];
        chartValues += "'";
      });

      chartValues += "]}]";
      chartBottomAxisLabels += "]";
      const imgTemplate = `https://quickchart.io/chart?width=${props.chartWidth}&height=${props.chartHeight}&chart={type:${chartType},data:{labels:${chartBottomAxisLabels}, datasets:${chartValues}}}`;
      State.update({
        imgSrc: imgTemplate,
        currentQuery: props.query,
      });
    }
  });
}
console.log(state.currentQuery != props.query);
return (
  <>
    {state.currentQuery != props.query ? (
      <div>Loading ...</div>
    ) : (
      <img src={state.imgSrc} />
    )}
  </>
);
