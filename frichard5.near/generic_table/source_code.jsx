const columns = props.columns || [{ label: "columns missing" }];

return (
  <table>
    <tr>
      {columns.map((c) => (
        <th>{c.label}</th>
      ))}
    </tr>
  </table>
);
