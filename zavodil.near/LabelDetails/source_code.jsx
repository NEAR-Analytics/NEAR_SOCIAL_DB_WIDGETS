// LabelDetails
const ownerId = "zavodil.near";
const appName = "nametag";

if (!props.tag) {
  return "Undefined tag";
}

let tag = props.tag;
const data = Social.get(`*/${appName}/*/tags/${tag}`, "final");

if (!data) {
  return "Loading";
}

const records = [];

let counter = 0;

Object.keys(data).forEach((accountId) => {
  Object.keys(data[accountId][appName]).forEach((contractId) => {
    Object.values(data[accountId][appName][contractId]).forEach((tags) => {
      if (Object.keys(tags).includes(tag)) {
        let text =
          accountId == contractId ? (
            `tagged themself`
          ) : (
            <>
              tagged{" "}
              <Widget
                src={`${ownerId}/widget/ProfileLine`}
                props={{ accountId: contractId }}
              />
            </>
          );
        records.push(
          <li className="list-group-item">
            <Widget
              src={`${ownerId}/widget/ProfileLine`}
              props={{ accountId }}
            />{" "}
            {text}
            <span className="public-tags collapse show">
              <button
                className="btn btn-sm btn-outline-secondary border-0"
                data-bs-toggle="collapse"
                data-bs-target={`.public-tags-${counter}`}
                aria-expanded="false"
                aria-controls={`public-tags-${counter}`}
                type="button"
              >
                <i className="bi bi-arrows-angle-expand me-1"></i>All tags
              </button>
            </span>
            <div className={`collapse public-tags-${counter}`}>
              <Widget
                src={`${ownerId}/widget/PublicTags`}
                props={{ accountId: contractId }}
              />
            </div>
          </li>
        );

        counter++;
      }
    });
  });
});

return (
  <>
    <h4 className="ms-3">
      Public Tag <span className="badge rounded-pill bg-primary">{tag}</span>
    </h4>
    <ul className="list-group list-group-flush">{records}</ul>
  </>
);
