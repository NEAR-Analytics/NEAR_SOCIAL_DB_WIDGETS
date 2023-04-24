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

if (!("Rejected" in contribution.status) && !("Created" in contribution.status)) {
  activity.push({
    id: "accepted",
    text: <><b>{vendorName}</b> accepted contract</>
  });
  activity.push({
    id: "started",
    text: <>Contract has started</>
  });
}

if ("Rejected" in contribution.status) {
  activity.push({
    id: "rejected",
    text: <><b>{vendorName}</b> rejected contract</>
  });
}

if (contribution.status === "Ongoing" || "Delivered" in contribution.status || "Completed" in contribution.status) {
  activity.push({
    id: "ongoing",
    text: <>Work in progress</>
  });
}

if ("Delivered" in contribution.status || "Completed" in contribution.status) {
  activity.push({
    id: "delivered",
    text: <>Contract marked as delivered by <b>{vendorName}</b></>
  });
}

if ("Completed" in contribution.status) {
  activity.push({
    id: "completed",
    text: <>Contract completed</>
  });
}

return <>Here</>;
