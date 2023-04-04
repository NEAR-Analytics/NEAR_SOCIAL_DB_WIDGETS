const columns = props.columns || [
  { label: "props columns missing", id: "data" },
];
const data = props.data || [{ data: "no data props" }];
const nextPage = props.nextPage;
const previousPage = props.previousPage;
const resPerPage = props.resPerPage;
const title = props.title;
const offset = props.offset;

const formatRow = (r) => (r.formatter ? r.formatter(r) : <td>{d[c.id]}</td>);

let rows = [];

data &&
  data.forEach((d) => {
    rows.push(<tr>{columns.map((c) => formatRow(d[c.id]))}</tr>);
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
