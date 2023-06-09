const accountId = context.accountId;
if (!accountId) {
  return "Please connect your NEAR wallet to create an activity";
}

const CONTRACT = "events_v1.near";

const MIN_LENGTH_NAME = 4;
const MIN_LENGTH_DESCRIPTION = 10;
const MILLISECONDS_IN_DAY = 86400000;
const DAYS_IN_WEEK = 7;

const TGAS_300 = "300000000000000";

const TODAY =
  Math.floor((Date.now() + 0) / MILLISECONDS_IN_DAY) * MILLISECONDS_IN_DAY;
const TOMORROW = TODAY + MILLISECONDS_IN_DAY;
const ONE_WEEK = DAYS_IN_WEEK * MILLISECONDS_IN_DAY;

const DEFAULT_STATE = {
  name: "T",
  type: "",
  category: "",
  status: "",
  start_date: new Date(TODAY + ONE_WEEK),
  end_date: new Date(TOMORROW + ONE_WEEK),
  location: "",
  images: [
    {
      url: "",
      type: "tile",
    },
    {
      url: "",
      type: "banner",
    },
  ],
  links: [
    {
      text: "Register here",
      url: "",
      type: "register",
    },
    {
      text: "Get tickets",
      url: "",
      type: "tickets",
    },
    {
      text: "Watch live",
      url: "",
      type: "join_stream",
    },
  ],
  description: "",

  errors: {},
};

State.init(DEFAULT_STATE);
if (!state) {
  return <div>Loading...</div>;
}

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #ccc;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Label = styled.label`
  width: 100%;
  color: #666;
  padding: 0.5rem 0;
  margin: 0.5rem 0 0 0;
  box-sizing: border-box;
`;

const Error = styled.div`
  color: red;
  font-size: 0.8rem;
  margin: 0;
`;

const EventStatus = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "cancelled", label: "Cancelled" },
];

const EventTypes = [
  { value: "virtual", label: "Online" },
  { value: "irl", label: "In Person" },
  { value: "mixed", label: "Both" },
];

const ImageTypes = [
  { value: "tile", label: "Tile" },
  { value: "banner", label: "Banner" },
];

const LinkTypes = [
  { value: "register", label: "Register" },
  { value: "tickets", label: "Tickets" },
  { value: "join_stream", label: "Stream URL" },
];

function addError(key, message) {
  console.log("addError", key, message);
  State.update({ errors: { ...state.errors, [key]: message } });
}

function clearError(key) {
  State.update({ errors: { ...state.errors, [key]: null } });
}

function getError(key) {
  return state.errors[key];
}

function assertCondition(valid, condition, key, message) {
  if (!condition) {
    addError(key, message);
    return false;
  }
  clearError(key);
  return valid;
}

function sanitize(data) {
  const {
    name,
    type,
    category,
    status,
    start_date,
    end_date,
    location,
    image,
    links,
    description,
  } = data;
  return {
    name,
    type,
    category,
    status,
    start_date: new Date(start_date).getTime(),
    end_date: new Date(end_date).getTime(),
    location,
    image,
    links,
    description,
  };
}

function validate(data) {
  let valid = true;

  const { name, description } = data;

  valid = assertCondition(
    valid,
    name.length >= MIN_LENGTH_NAME,
    "name",
    `Name must be at least ${MIN_LENGTH_NAME} characters long`
  );

  valid = assertCondition(
    valid,
    description.length >= MIN_LENGTH_DESCRIPTION,
    "description",
    `Description must be at least ${MIN_LENGTH_DESCRIPTION} characters long`
  );

  return valid;
}

function callContract(data) {
  const {
    name,
    type,
    category,
    status,
    start_date,
    end_date,
    location,
    image,
    links,
    description,
  } = data;
  Near.call(
    CONTRACT,
    "create_event",
    {
      account_id: accountId,
      name,
      type,
      category,
      status,
      start_date,
      end_date,
      location,
      image,
      links,
      description,
    },
    TGAS_300,
    1
  );
}

function sanitizeValidateAndCall(data) {
  const sanitized = sanitize(data);
  const valid = validate(sanitized);
  if (valid) {
    callContract(sanitized);
  }
}

function sanitizeAndValidate(data) {
  const sanitized = sanitize(data);
  validate(sanitized);
}

const updateState = (event, key) => {
  State.update({ [key]: event.target.value });
  sanitizeAndValidate({ ...state, [key]: event.target.value });
};

return (
  <div>
    {/* TODO: add Back Button */}

    {/* FORM */}
    <div
      style={{
        width: "50%",
        margin: "0 auto",
        minWidth: "300px",
        maxWidth: "600px",
        backgroundColor: "#fff",
        padding: "1rem",
      }}
    >
      <h1>Create Event</h1>

      <div className="mt-3">
        <Label>Name</Label>
        <input
          type="text"
          placeholder="Event Name"
          value={state.name || ""}
          onChange={(event) => {
            updateState(event, "name");
          }}
        />
      </div>
      <Error>{getError("name")}</Error>

      <div className="mt-3">
        <Label>Description</Label>
        <textarea
          className="w-100"
          placeholder="Event Description"
          value={state.description}
          onChange={(event) => {
            updateState(event, "description");
          }}
          rows={3}
        />
      </div>
      <Error>{getError("description")}</Error>

      <div className="mt-3">
        <Label>Type</Label>
        <Select
          value={state.type}
          onChange={(event) => {
            updateState(event, "type");
          }}
        >
          {EventTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
      </div>
      <Error>{getError("type")}</Error>

      <div className="mt-3">
        <Label>Category</Label>
        <input
          type="text"
          placeholder="Event Category"
          value={state.category}
          onChange={(event) => {
            updateState(event, "category");
          }}
        />
      </div>
      <Error>{getError("category")}</Error>

      <div className="mt-3">
        <Label>Status</Label>
        <Select
          value={state.status}
          onChange={(event) => {
            updateState(event, "status");
          }}
        >
          {EventStatus.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </Select>
      </div>
      <Error>{getError("status")}</Error>

      <div className="mt-3">
        <Label>Start Date</Label>
        <input
          type="date"
          value={state.start_date}
          onChange={(event) => {
            updateState(event, "start_date");
          }}
        />
      </div>
      <Error>{getError("start_date")}</Error>

      <div className="mt-3">
        <Label>End Date</Label>
        <input
          type="date"
          value={state.end_date}
          onChange={(event) => {
            updateState(event, "end_date");
          }}
        />
      </div>
      <Error>{getError("end_date")}</Error>

      <div className="mt-3">
        <Label>Location</Label>
        <textarea
          className="w-100"
          placeholder="Event Location"
          value={state.location}
          onChange={(event) => {
            updateState(event, "location");
          }}
          rows={3}
        />
      </div>
      <Error>{getError("location")}</Error>

      <div className="mt-3">
        <Label>Images</Label>
        {state.images.map((image, index) => (
          <div key={index} className="mb-4 d-flex">
            <Select
              style={{ width: "100px" }}
              value={image.type}
              onChange={(event) => {
                const images = [...state.images];
                images[index].type = event.target.value;
                State.update({ images });
                sanitizeAndValidate({ ...state, images });
              }}
            >
              {ImageTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>

            <div className="ms-2">
              <IpfsImageUpload
                image={image.url}
                onChange={(event) => {
                  const images = [...state.images];
                  images[index].url = event.target.value;
                  State.update({ images });
                  sanitizeAndValidate({ ...state, images });
                }}
              />
            </div>

            <button
              className="ms-2 btn btn-danger"
              onClick={() => {
                const images = [...state.images];
                images.splice(index, 1);
                State.update({ images });
                sanitizeAndValidate({ ...state, images });
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          className="btn btn-secondary"
          onClick={() => {
            const images = [...state.images];
            images.push({ type: "tile", image: "" });
            State.update({ images });
            sanitizeAndValidate({ ...state, images });
          }}
        >
          Add Image
        </button>
      </div>
      <Error>{getError("images")}</Error>

      <div className="mt-3">
        <Label>Links</Label>
        {state.links.map((link, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Link URL"
              className="mb-2"
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
              value={link.url}
              onChange={(event) => {
                const links = [...state.links];
                links[index].url = event.target.value;
                State.update({ links });
                sanitizeAndValidate({ ...state, links });
              }}
            />

            <div>
              <input
                type="text"
                placeholder="Link Text"
                style={{
                  width: "200px",
                  display: "inline-block",
                  boxSizing: "border-box",
                }}
                value={link.text}
                onChange={(event) => {
                  const links = [...state.links];
                  links[index].text = event.target.value;
                  State.update({ links });
                  sanitizeAndValidate({ ...state, links });
                }}
              />

              <Select
                className="ms-2"
                style={{ width: "100px" }}
                value={link.type}
                onChange={(event) => {
                  const links = [...state.links];
                  links[index].type = event.target.value;
                  State.update({ links });
                  sanitizeAndValidate({ ...state, links });
                }}
              >
                {LinkTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>

              <button
                className="ms-2 btn btn-danger"
                onClick={() => {
                  const links = [...state.links];
                  links.splice(index, 1);
                  State.update({ links });
                  sanitizeAndValidate({ ...state, links });
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          className="btn btn-secondary"
          onClick={() => {
            const links = [...state.links];
            links.push("");
            State.update({ links });
            sanitizeAndValidate({ ...state, links });
          }}
        >
          Add Link
        </button>
      </div>
      <Error>{getError("links")}</Error>

      <Button
        className="mt-3"
        onClick={() => {
          sanitizeValidateAndCall(state);
        }}
      >
        Create Event
      </Button>
    </div>
  </div>
);
