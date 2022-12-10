const title = props.title;
const data = props.data;
const key = props.key;
const keyLabel = props.keyLabel;
const value = props.value;
const valueLabel = props.valueLabel;
const link = props.link;

if (!title) return "Must have title";
if (!data) return "Must have data";
if (!key) return "Must have key";
if (!keyLabel) return "Must have keyLabel";
if (!value) return "Must have value";
if (!valueLabel) return "Must have value";

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
          <th style={style}>{keyLabel}</th>
          <th>{valueLabel}</th>
        </thead>
        <tbody>
          {data.map((i) => (
            <tr className="align-middle">
              <th style={style} scope="row">
                {i[key]}
              </th>
              <td>{i[value]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);
