const onSave = props.onSave;
if (onSave === undefined || onSave === null) {
  return 'props.onSave is required';
}

const model = props.model;
const buttonText = props.buttonText || 'Save';

const MIN_LENGTH_NAME = 4;
const MIN_LENGTH_DESCRIPTION = 10;
const MAX_LENGTH_NAME = 100;
const MAX_LENGTH_DESCRIPTION = 2000;
const MIN_LENGTH_LOCATION = 10;
const MAX_LENGTH_LOCATION = 400;
const MIN_LENGTH_CATEGORY = 3;
const MAX_LENGTH_CATEGORY = 20;

const MILLISECONDS_IN_DAY = 86400000;
const DAYS_IN_WEEK = 7;

const TODAY =
  Math.floor((Date.now() + 0) / MILLISECONDS_IN_DAY) * MILLISECONDS_IN_DAY;
const TOMORROW = TODAY + MILLISECONDS_IN_DAY;
const ONE_WEEK = DAYS_IN_WEEK * MILLISECONDS_IN_DAY;

const formatDate = props.__engine.helpers.formatDate;

const EventStatus = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'cancelled', label: 'Cancelled' },
];

const EventTypes = [
  { value: 'virtual', label: 'Online' },
  { value: 'irl', label: 'In Person' },
  { value: 'mixed', label: 'Both' },
];

const DEFAULT_STATE = {
  name: '',
  type: EventTypes[0].value,
  category: '',
  status: EventStatus[0].value,
  start_date: new Date(TODAY + ONE_WEEK),
  end_date: new Date(TOMORROW + ONE_WEEK),
  location: '',
  images: [
    {
      url: null,
      type: 'tile',
    },
    {
      url: null,
      type: 'banner',
    },
  ],
  links: [
    {
      text: 'Register here',
      url: '',
      type: 'register',
    },
    {
      text: 'Get tickets',
      url: '',
      type: 'tickets',
    },
    {
      text: 'Watch live',
      url: '',
      type: 'join_stream',
    },
  ],
  description: '',

  errors: {},
};

if (!state) {
  if (model) {
    const start_date = model.start_date
      ? formatDate(model.start_date, '{{ YYYY }}-{{ MM }}-{{ DD }}')
      : null;

    const end_date = model.end_date
      ? formatDate(model.end_date, '{{ YYYY }}-{{ MM }}-{{ DD }}')
      : null;

    State.init({
      ...model,
      images: model.images || DEFAULT_STATE.images,
      links: model.links || DEFAULT_STATE.links,
      start_date,
      end_date,
    });
  } else {
    State.init(DEFAULT_STATE);
  }
  return 'Loading...';
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

const ErrorMessage = styled.div`
  color: #c00;
  font-size: 0.8rem;
  margin: 0.5rem 0 0 0;
`;

const LinkTypes = [
  { value: 'register', label: 'Register' },
  { value: 'tickets', label: 'Tickets' },
  { value: 'join_stream', label: 'Stream URL' },
];

function addError(key, message) {
  const oldErrors = { ...state.errors };
  const oldKeyErrors = oldErrors[key] || [];

  const newKeyErrors = oldKeyErrors.includes(message)
    ? oldKeyErrors
    : [...oldKeyErrors, message];
  const newErrors = { ...oldErrors, [key]: newKeyErrors };

  State.update({
    errors: newErrors,
  });
}

function clearErrors() {
  State.update({ errors: {} });
}

function getErrors(key) {
  const errors = state.errors[key];
  const hasErrors = errors && errors.length > 0;
  if (hasErrors && errors.length === 1) {
    return errors[0];
  }

  if (!hasErrors) {
    return null;
  }

  return (
    <ul>
      {errors.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  );
}

function assertCondition(valid, condition, key, message) {
  if (!condition) {
    addError(key, message);
    return false;
  }
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
    images,
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
    images,
    links,
    description,
  };
}

function validate(data) {
  let valid = true;

  const {
    name,
    description,
    end_date,
    start_date,
    images,
    category,
    type,
    status,
    location,
  } = data;

  clearErrors();

  valid = assertCondition(
    valid,
    name.length >= MIN_LENGTH_NAME && name.length < MAX_LENGTH_NAME,
    'name',
    `Name must be between ${MIN_LENGTH_NAME} and ${MAX_LENGTH_NAME} characters long. Currently: ${name.length} characters.`
  );

  valid = assertCondition(
    valid,
    description.length >= MIN_LENGTH_DESCRIPTION &&
      description.length < MAX_LENGTH_DESCRIPTION,
    'description',
    `Description must be between ${MIN_LENGTH_DESCRIPTION} and ${MAX_LENGTH_DESCRIPTION} characters long. Currently: ${description.length} characters.`
  );

  valid = assertCondition(
    valid,
    location !== null &&
      location.length >= MIN_LENGTH_LOCATION &&
      location.length < MAX_LENGTH_LOCATION,
    'location',
    `Location must be between ${MIN_LENGTH_LOCATION} and ${MAX_LENGTH_LOCATION} characters long. Currently: ${location.length} characters.`
  );

  valid = assertCondition(
    valid,
    category !== null &&
      category.length >= MIN_LENGTH_CATEGORY &&
      category.length < MAX_LENGTH_CATEGORY,
    'category',
    `Category must be between ${MIN_LENGTH_CATEGORY} and ${MAX_LENGTH_CATEGORY} characters long. Currently: ${category.length} characters.`
  );

  valid = assertCondition(
    valid,
    !end_date || new Date(end_date).getTime() > new Date(start_date).getTime(),
    'end_date',
    'End date must be after start date, or empty'
  );

  valid = assertCondition(
    valid,
    start_date !== null && start_date !== undefined && start_date !== '',
    'start_date',
    'Event must have a start date'
  );

  valid = assertCondition(
    valid,
    category !== null && category !== undefined && category !== '',
    'category',
    'Event must have a category'
  );

  valid = assertCondition(
    valid,
    location !== null && location !== undefined && location !== '',
    'location',
    'Event must have a location'
  );

  valid = assertCondition(
    valid,
    images !== null &&
      images !== undefined &&
      images.length >= 2 &&
      images.reduce(
        (acc, image) =>
          acc &&
          image.url !== null &&
          image.url !== undefined &&
          image.url !== '',
        true
      ) &&
      images.reduce(
        (acc, image) =>
          acc &&
          image.type !== null &&
          image.type !== undefined &&
          image.type !== '',
        true
      ),
    'images',
    'Event must have at least 2 images with a url and type'
  );

  valid = assertCondition(
    valid,
    type !== null && type !== undefined && type !== '',
    'type',
    'Event must have a type'
  );

  valid = assertCondition(
    valid,
    status !== null && status !== undefined && status !== '',
    'status',
    'Event must have a status'
  );

  return valid;
}

function sanitizeValidateAndCall(data) {
  const sanitized = sanitize(data);
  const valid = validate(sanitized);
  if (valid && onSave) {
    onSave(sanitized);
  }
}

function sanitizeAndValidate(data) {
  const sanitized = sanitize(data);
  return validate(sanitized);
}

const updateState = (event, key) => {
  State.update({ [key]: event.target.value });
  sanitizeAndValidate({ ...state, [key]: event.target.value });
};

return (
  <div
    style={{
      width: '100%',
      padding: '1rem',
    }}
  >
    <div className="mt-3">
      <Label>Name</Label>
      <input
        type="text"
        placeholder="Event Name"
        value={state.name || ''}
        onChange={(event) => {
          updateState(event, 'name');
        }}
      />
    </div>
    <ErrorMessage>{getErrors('name')}</ErrorMessage>

    <div className="mt-3">
      <Label>Description</Label>
      <textarea
        className="w-100"
        placeholder="Event Description"
        value={state.description}
        onChange={(event) => {
          updateState(event, 'description');
        }}
        rows={3}
      />
    </div>
    <ErrorMessage>{getErrors('description')}</ErrorMessage>

    <div className="mt-3">
      <Label>Type</Label>
      <Select
        value={state.type}
        onChange={(event) => {
          updateState(event, 'type');
        }}
      >
        {EventTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </Select>
    </div>
    <ErrorMessage>{getErrors('type')}</ErrorMessage>

    <div className="mt-3">
      <Label>Category</Label>
      <input
        type="text"
        placeholder="Event Category"
        value={state.category}
        onChange={(event) => {
          updateState(event, 'category');
        }}
      />
    </div>
    <ErrorMessage>{getErrors('category')}</ErrorMessage>

    <div className="mt-3">
      <Label>Status</Label>
      <Select
        value={state.status}
        onChange={(event) => {
          updateState(event, 'status');
        }}
      >
        {EventStatus.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </Select>
    </div>
    <ErrorMessage>{getErrors('status')}</ErrorMessage>

    <div className="mt-3">
      <Label>Start Date</Label>
      <input
        type="date"
        value={state.start_date}
        onChange={(event) => {
          updateState(event, 'start_date');
        }}
      />
    </div>
    <ErrorMessage>{getErrors('start_date')}</ErrorMessage>

    <div className="mt-3">
      <Label>End Date</Label>
      <input
        type="date"
        value={state.end_date}
        onChange={(event) => {
          updateState(event, 'end_date');
        }}
      />
    </div>
    <ErrorMessage>{getErrors('end_date')}</ErrorMessage>

    <div className="mt-3">
      <Label>Location</Label>
      <textarea
        className="w-100"
        placeholder="Event Location"
        value={state.location}
        onChange={(event) => {
          updateState(event, 'location');
        }}
        rows={3}
      />
    </div>
    <ErrorMessage>{getErrors('location')}</ErrorMessage>

    <div className="mt-3">
      <Label>Images</Label>

      {state.images.map((image, index) => (
        <div key={index} className="mb-4 d-flex">
          {props.__engine.renderComponent('_form.image_component', {
            image: image,
            onChange: (changed) => {
              state.images[index] = changed;
              sanitizeAndValidate({ ...state, images: state.images });
            },
            onRemove: () => {
              const images = [...state.images];
              images.splice(index, 1);
              State.update({ images });
              sanitizeAndValidate({ ...state, images });
            },
          })}
        </div>
      ))}

      <button
        className="btn btn-secondary"
        onClick={() => {
          const images = [...state.images];
          images.push({ type: 'tile', image: '' });
          State.update({ images });
          sanitizeAndValidate({ ...state, images });
        }}
      >
        Add Image
      </button>
    </div>
    <ErrorMessage>{getErrors('images')}</ErrorMessage>

    <div className="mt-3">
      <Label>Links</Label>
      {state.links.map((link, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            placeholder="Link URL"
            className="mb-2"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
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
                width: '200px',
                display: 'inline-block',
                boxSizing: 'border-box',
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
              style={{ width: '100px' }}
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
          links.push('');
          State.update({ links });
          sanitizeAndValidate({ ...state, links });
        }}
      >
        Add Link
      </button>
    </div>
    <ErrorMessage>{getErrors('links')}</ErrorMessage>

    <br />
    <Button
      className="mt-3"
      onClick={() => {
        sanitizeValidateAndCall(state);
      }}
    >
      {buttonText}
    </Button>
  </div>
);
