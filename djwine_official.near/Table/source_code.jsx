const title = props.title;
const data = props.data;
const key = props.key;
const keyLabel = props.keyLabel;
const value = props.value;
const valueLabel = props.valueLabel;

if (!title) return "Must have title";
if (!data) return "Must have data";
if (!key) return "Must have key";
if (!keyLabel) return "Must have keyLabel";
if (!value) return "Must have value";
if (!valueLabel) return "Must have value";

return (
  <>
    <h2 class="mb-4">{title}</h2>
    <div className="table-responsive">
      <table className="table">
        <thead>
          <th>{keyLabel}</th>
          <th>{valueLabel}</th>
        </thead>
        <tbody>
          {data.map((i) => (
            <tr className="align-middle">
              <th scope="row">{i[key]}</th>
              <td>{i[value]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);
