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

const ValidationError = props.__engine.Components.ValidationError;

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
  const { name, description } = data;
  return {
    name,
    description,
  };
}

function validate(data) {
  let valid = true;

  const { name, description } = data;

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
    <ValidationError>{getErrors('name')}</ValidationError>

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
    <ValidationError>{getErrors('description')}</ValidationError>

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
