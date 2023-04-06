const MainWrapper = styled.div`
  margin: 40px 0px;
`;

const TableWrapper = styled.div`
  height: 200px;
`;
const Table = styled.table`
    display: table;
    width: 100%;
    borderCollapse: separate;
    borderSpacing: 0px;
    fontSize: 14px;
    height: 200px;
    overflow-y: scroll;
    td {
      text-overflow: ellipsis;
      overflow: hidden;
      whiteSpace: nowrap;
      padding: 16px;
      max-width: 130px;
      border-bottom: 1px solid rgb(81, 81, 81);
    }
    img {
      height: 15px;
      width: 15px;
    }
`;

const columns = props.columns || [
  { label: "props columns missing", id: "data" },
];
const data = props.data || [{ data: "no data props" }];
const { title, nextPage, previousPage, offset, resPerPage } = props;

const formatRow = (data, column) => {
  return column.formatter ? (
    <td>{column.formatter(data)}</td>
  ) : (
    <td>{data[column.id]}</td>
  );
};

let rows = [];

data &&
  data.forEach((d) => {
    rows.push(<tr>{columns.map((c) => formatRow(d, c))}</tr>);
  });

return (
  <MainWrapper>
    {title && <h2>{title}</h2>}
    <TableWrapper>
      <Table>
        <tr>
          {columns.map((c) => (
            <th>{c.label}</th>
          ))}
        </tr>
        {rows}
      </Table>
    </TableWrapper>
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
  </MainWrapper>
);
