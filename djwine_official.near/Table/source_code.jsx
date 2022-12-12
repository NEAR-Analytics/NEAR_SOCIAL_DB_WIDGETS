const title = props.title;
const data = props.data;
const key = props.key;
const value = props.value;
const link = props.link;

if (!title) return "Must have title";
if (!data) return "Must have data";
if (!key) return "Must have key";
if (!value) return "Must have value";

const style = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  maxWidth: "300px",
};

return (
  <>
    <h2 class="mb-4">{title}</h2>
    <div className="table-responsive">
      <table className="table">
        <thead>
          <th style={style}>{key.label}</th>
          <th>{value.label}</th>
        </thead>
        <tbody>
          {data.map((i) => (
            <tr className="align-middle">
              <th style={style} scope="row">
                {i[key.id]}} // {key.url ? key.url + i[key.id] : i[key.id]}
              </th>
              <td>{i[value.id]}</td>
              // <td>{value.url ? value.url + i[value.id] : i[value.id]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);
