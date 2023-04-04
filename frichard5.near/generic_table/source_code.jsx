const columns = props.columns || [
  { label: "props columns missing", id: "data" },
];
const data = props.data || [{ data: "no data props" }];
const test = props.test;

let rows = [];

data &&
  data.forEach.map((d) => {
    rows.push(
      <tr>
        {columns.map((c) => (
          <td>{d[c.id]}</td>
        ))}
      </tr>
    );
  });

return (
  <div>
    <table>
      <tr>
        {columns.map((c) => (
          <th>{c.label}</th>
        ))}
      </tr>
      {rows}
    </table>
    <button onClick={test}>next 50</button>
  </div>
);
