const contribution = props.contribution;
const request = props.request;
const projectName = props.projectName;
const vendorName = props.vendorName;

const activity = [
  {
    id: "created",
    text: <><b>{projectName}</b> created a contract <b>"{request.title}"</b> with <b>{vendorName}</b></>
  }, {
    id: "awaiting",
    text: <>Awaiting approval by <b>{vendorName}</b></>
  },
];

if ((!("Rejected" in contribution.status) && !("Created" in contribution.status))) {
  activity.push({
    id: "accepted",
    text: <>{vendorName} accepted contract</>
  });
}

if ("Rejected" in contribution.status) {
  activity.push({
    id: "rejected",
    text: <>{vendorName} rejected contract</>
  });
}

return <>Here</>;
