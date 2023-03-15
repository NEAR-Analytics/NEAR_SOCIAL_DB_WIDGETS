State.init({
  imgSrc: "",
});

let { query, rowValue, columnValue } = props;
console.log({ rowValue, columnValue });
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

asyncFetch("https://flipside.leslug.com/execute", options).then((res) => {
  let queryResults = res.body;

  console.log("queryResults", queryResults);
  const chartType = `"bar"`;
  let chartBottomAxisLabels = "[";
  let chartValues = "[";

  // parsing of data from flipside
  if (queryResults !== 0) {
    // parsing of labels
    queryResults.map((d, i) => {
      if (i !== 0) {
        chartBottomAxisLabels += ",";
        chartValues += ",";
      } else {
        chartValues += `{label: '${props.title}', data:[`;
      }

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
    });
  }
});

return (
  <>
    {state.imgSrc === "" ? <div>Loading ...</div> : <img src={state.imgSrc} />}
  </>
);
