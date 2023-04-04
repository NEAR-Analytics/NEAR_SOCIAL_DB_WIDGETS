const columns = props.columns || [{ label: "columns missing" }];
const test = props.test;

test();
return (
  <table>
    <tr>
      {columns.map((c) => (
        <th>{c.label}</th>
      ))}
    </tr>
  </table>
);
