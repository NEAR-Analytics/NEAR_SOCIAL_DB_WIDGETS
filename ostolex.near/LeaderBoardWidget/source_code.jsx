State.init({
  number: 1,
});

const uuidv4 = () => {
  var u = "",
    i = 0;
  while (i++ < 36) {
    var c = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"[i - 1],
      r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    u += c == "-" || c == "4" ? c : v.toString(16);
  }
  return u;
};

return (
  <InfiniteScroll loadMore={props.loadMore} hasMore={props.hasMore()}>
    <table class={props.tableClass ? props.tableClass : "table table-dark"}>
      <thead>
        <tr>
          <th>#</th>
          {Object.keys(props.thead).map((colName) => (
            <th key={uuidv4()} scope="col">
              {colName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => (
          <tr key={uuidv4()}>
            <th key={uuidv4()} scope="row">
              {state.number++}
            </th>
            {Object.keys(props.thead).map((colName) => (
              <td key={uuidv4()}>{item[props.thead[colName]]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </InfiniteScroll>
);
