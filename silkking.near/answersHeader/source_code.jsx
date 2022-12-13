let questionParams = props.value;
console.log("Props", props);
let profile = Social.getr(`${props.accountId}/profile`);

return (
  <div className="my-2">
    <div className="d-flex no-wrap justify-content-between">
      <Widget
        src={`f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/Profile`}
        props={{ userMakingQuestion: props.accountId, profile }}
      />

      <div className="d-flex">
        <span className="mx-2" style={{ fontWeight: "500" }}>
          End date: {new Date(questionParams.endTimestamp).toLocaleDateString()}
        </span>
        <span
          style={{
            backgroundColor:
              questionParams.startDate < Date.now() &&
              questionParams.endTimestamp > Date.now()
                ? "rgb(255, 128, 128)"
                : "rgb(153, 255, 153)",

            height: "max-content",
            width: "6rem",
            border: "1px solid rgb(0, 82, 204)",
            textAlign: "center",
            borderRadius: "80px",
          }}
        >
          {questionParams.startDate < Date.now() &&
          questionParams.endTimestamp > Date.now()
            ? "Closed"
            : "Active"}
        </span>
      </div>
    </div>
    <h5 className="mt-3">{questionParams.title}</h5>
    <p>{questionParams.description}</p>
    <p>{questionParams.question}</p>
  </div>
);
