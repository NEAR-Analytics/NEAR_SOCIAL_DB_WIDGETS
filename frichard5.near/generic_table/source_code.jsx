const columns = props.columns || [
  { label: "props columns missing", id: "data" },
];
const data = props.data || [{ data: "no data props" }];
const test = props.test;

test();
let rows = [];

props.data &&
  props.forEach.map((d) => {
    rows.push(
      <tr>
        {columns.map((c) => (
          <td>{d[c.id]}</td>
        ))}
      </tr>
    );
  });

return (
  <table>
    <tr>
      {columns.map((c) => (
        <th>{c.label}</th>
      ))}
    </tr>
  </table>
);
