const columns = props.columns || [
  { label: "props columns missing", id: "data" },
];
const data = props.data || [{ data: "no data props" }];
const nextPage = props.nextPage;
const previousPage = props.previousPage;

let rows = [];

data &&
  data.forEach((d) => {
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
    <button onClick={previousPage}>previous 50</button>
    <button onClick={nextPage}>next 50</button>
  </div>
);
