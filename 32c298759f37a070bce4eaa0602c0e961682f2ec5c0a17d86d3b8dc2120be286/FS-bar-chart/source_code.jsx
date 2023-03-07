State.init({
  imgSrc: "",
});

// Query API
const options = {
  method: "POST",
  body: `{ "query": "${props.query}" }`,
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
  }
);

return (
  <>
    {state.imgSrc === "" ? <div>Loading ...</div> : <img src={state.imgSrc} />}
  </>
);
