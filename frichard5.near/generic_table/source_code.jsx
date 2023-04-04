const columns = props.columns || [
  { label: "props columns missing", id: "data" },
];
const data = props.data || [{ data: "no data props" }];
const { title, nextPage, previousPage, offset, resPerPage } = props;

const formatRow = (data, column) => {
  return column.formatter ? column.formatter(data) : <td>{data[column.id]}</td>;
};

let rows = [];

data &&
  data.forEach((d) => {
    rows.push(<tr>{columns.map((c) => formatRow(d, c))}</tr>);
  });

return (
  <div>
    {title && <h2>{title}</h2>}
    <table>
      <tr>
        {columns.map((c) => (
          <th>{c.label}</th>
        ))}
      </tr>
      {rows}
    </table>
    {nextPage && previousPage && resPerPage && (
      <div>
        {offset ? (
          <button onClick={previousPage}>previous {resPerPage}</button>
        ) : (
          ""
        )}
        {data.length === resPerPage ? (
          <button onClick={nextPage}>next {resPerPage}</button>
        ) : (
          ""
        )}
      </div>
    )}
  </div>
);
