const ownerId = "contribut3.near";
const entityId = props.entityId;
const contributionType = props.contributionType;
const startDate = new Date(Number(props.startDate)).toLocaleDateString();
const endDate = new Date(Number(props.endDate)).toLocaleDateString();
const description = props.description;
const need = props.need;

return (
  <div className="border-bottom border-secondary-subtle">
    <div className="px-3 py-0">
      <h4>
        {contributionType} from {startDate} to {endDate}
      </h4>
      {need ? (
        <a
          href={`https://near.social/#/${ownerId}/widget/Index?accountId=${entityId}&cid=${cid}`}
          onClick={() =>
            props.update({
              accountId: entityId,
              cid: need,
              tab: "need",
              search: "",
              content: "",
            })
          }
        >
          For this request
        </a>
      ) : (
        <></>
      )}
      <Widget
        src={`${ownerId}/widget/DescriptionArea`}
        props={{ description }}
      />
    </div>
  </div>
);
