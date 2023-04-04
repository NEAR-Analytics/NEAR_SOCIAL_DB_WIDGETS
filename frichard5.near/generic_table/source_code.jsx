const columns = props.columns || ["columns missing"];

return (
  <table>
    <tr>
      {columns.map((c) => (
        <th>{c}</th>
      ))}
    </tr>
  </table>
);
