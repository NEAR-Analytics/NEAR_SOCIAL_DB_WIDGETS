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
});

return (
  <>
    {state.imgSrc === "" ? <div>Loading ...</div> : <img src={state.imgSrc} />}
  </>
);
