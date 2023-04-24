const status = props.status;
const vendorFeedback = props.vendorFeedback;
const projectFeedback = props.projectFeedback;

if (!("Completed" in status)) {
  return <>No feedback yet. Contract still in progress...</>;
}

return <>Feedback</>;
