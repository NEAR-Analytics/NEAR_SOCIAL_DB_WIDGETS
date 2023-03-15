State.init({
  imgSrc: "",
});

let { query } = props;
var formBody = [];
formBody.push(`statement=${query}`);
formBody = formBody.join("&");

// Query API
const options = {
  method: "POST",
  body: formBody,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-furlencoded;charset=UTF-8",
  },
};

asyncFetch("https://flipside.leslug.com/execute", options).then((res) => {
  let queryResults = res.body;

  console.log("queryResults", queryResults);
  const chartType = `"bar"`;
  let chartBottomAxisLabels = "[";
  let chartValues = "[";
  2;
  // parsing of data from flipside
  if (queryResults !== "") {
    // parsing of labels
    queryResults.rows.map((d, i) => {
      if (i !== 0) {
        chartBottomAxisLabels += ",";
        chartValues += ",";
      } else {
        chartValues += `{label: '${props.title}', data:[`;
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
