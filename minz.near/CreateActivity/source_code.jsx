const accountId = context.accountId;
const CONTRACT = "event_org.near";
if (!accountId) {
  return "Please connect your NEAR wallet to create an activity";
}

const Error = styled.div`
color: red;
`;

function callContract(data) {
  let valid = true;
  const participants_lo = parseInt(data.participants_lo);
  if (isNaN(participants_lo) || "" + participants_lo != data.participants_lo) {
    State.update({ error_participants_lo: "Please enter a valid number" });
    valid = false;
  } else if (participants_lo <= 0) {
    State.update({
      error_participants_lo: "Min participants must be at least 1",
    });
    valid = false;
  } else {
    State.update({ error_participants_lo: null });
  }

  const participants_hi = parseInt(data.participants_hi);
  if (isNaN(participants_hi) || "" + participants_hi != data.participants_hi) {
    State.update({ error_participants_hi: "Please enter a valid number" });
    valid = false;
  } else if (state.error_particpants_lo !== null && participants_hi <= 0) {
    State.update({
      error_participants_hi: "Max participants must be at least 1",
    });
    valid = false;
  } else if (
    state.error_participants_lo === null &&
    participants_hi < participants_lo
  ) {
    State.update({
      error_participants_hi:
        "Max participants must be greater than or equal to min participants",
    });
    valid = false;
  } else {
    State.update({ error_participants_hi: null });
  }

  const cost = parseFloat(data.cost);
  if (isNaN(cost)) {
    State.update({
      error_cost: "Please enter a valid cost, e.g. 12.34",
    });
    valid = false;
  } else if (cost < 0) {
    State.update({
      error_cost: "Cost cannot be negative",
    });
    valid = false;
  } else {
    State.update({
      error_cost: null,
    });
  }

  const name = data.name;
  if (name.length < 4) {
    State.update({
      error_name: "Event name must be at least 4 characters",
    });
    valid = false;
  } else {
    State.update({
      error_name: null,
    });
  }

  const description = data.description;
  if (description.length < 10) {
    State.update({
      error_description: "Description must be at least 10 characters",
    });
    valid = false;
  } else {
    State.update({
      error_description: null,
    });
  }

  const deadline = Date.parse(data.deadline);
  const today = Date.now() + 0;
  if (isNaN(deadline)) {
    State.update({
      error_deadline: "Please choose a valid date",
    });
    valid = false;
  } else if (deadline <= today) {
    State.update({
      error_deadline: "Please choose a deadline in the future",
    });
    valid = false;
  } else {
    State.update({
      error_deadline: null,
    });
  }

  const image = state.image;
  let image_link = "";
  if (!image) {
    // State.update({
    //   error_image: "Please upload an image",
    // });
    // valid = false;
  } else {
    image_link = image.cid;
    State.update({
      error_image: null,
    });
  }

  if (!valid) {
    return;
  }

  Near.call(CONTRACT, "start_event", {
    account_id: accountId,
    event_spec: {
      title: name,
      description: description,
      max_num: participants_hi,
      min_num: participants_lo,
      price: Math.round(cost * 1000),
      deadline: deadline * 1000000,
      beneficiary: accountId,
      image_link: image_link,
    },
  });
}

const today = Math.floor((Date.now() + 0) / 86400000) * 86400000;
const tomorrow = today + 86400000;

State.init({
  name: "",
  description: "",
  cost: "",
  participants_lo: "",
  participants_hi: "",
  deadline: new Date(tomorrow).toISOString().substring(0, 10),
  image: null,

  error_name: null,
  error_description: null,
  error_cost: null,
  error_participants_hi: null,
  error_participants_lo: null,
  error_deadline: null,
  error_image: null,
});

return (
  <div className="row mb-3">
    <div>
      <h4>Plan a group activity on Near Social!</h4>
    </div>
    <div className="mb-2">
      Event Name <span className="text-secondary"></span>
      <input
        type="text"
        value={state.name}
        onChange={(e) => {
          State.update({ name: e.target.value });
        }}
      />
      {state.error_name && <Error>{state.error_name}</Error>}
    </div>
    <div className="mb-2">
      Description <span className="text-secondary"></span>
      <input
        type="text"
        value={state.description}
        onChange={(e) => {
          State.update({ description: e.target.value });
        }}
      />
      {state.error_description && <Error>{state.error_description}</Error>}
    </div>
    <div className="mb-2">
      Cost per participant <span className="text-secondary"></span>
      <input
        type="number"
        placeholder="Enter amount in NEAR, e.g. 12.34"
        value={state.cost}
        onChange={(e) => {
          State.update({ cost: e.target.value });
        }}
      />
      {state.error_cost && <Error>{state.error_cost}</Error>}
    </div>
    <div className="mb-2">
      Min participants <span className="text-secondary"></span>
      <input
        type="number"
        placeholder={"example: 3"}
        value={state.participants_lo}
        onChange={(e) => {
          State.update({ participants_lo: e.target.value });
        }}
      />
      {state.error_participants_lo && (
        <Error>{state.error_participants_lo}</Error>
      )}
    </div>
    <div className="mb-2">
      Max participants <span className="text-secondary"></span>
      <input
        type="number"
        placeholder={"example: 6"}
        value={state.participants_hi}
        onChange={(e) => {
          State.update({ participants_hi: e.target.value });
        }}
      />
      {state.error_participants_hi && (
        <Error>{state.error_participants_hi}</Error>
      )}
    </div>
    <div className="mb-2">
      Joinable until <span className="text-secondary"></span>
      <input
        type="date"
        value={state.deadline}
        onChange={(e) => {
          State.update({ deadline: e.target.value });
        }}
      />
      {state.error_deadline && <Error>{state.error_deadline}</Error>}
    </div>
    <div className="mb-2">
      Event image:
      <IpfsImageUpload image={state.image} />
      {state.error_image && <Error>{state.error_image}</Error>}
    </div>
    <div className="mb-2">
      <button
        onClick={() => {
          callContract(state);
        }}
      >
        Create
      </button>
    </div>
    <hr />
    If the event does not meet the required number of people or required
    funding, it will be cancelled and the fund will be returned to the
    registrants at the deadline to complete the fundraising for the event.
  </div>
);
