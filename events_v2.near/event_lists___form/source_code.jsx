const onSave = props.onSave;
if (onSave === undefined || onSave === null) {
  return props.__engine.helpers.propIsRequiredMessage('onSave');
}

const model = props.model;
const buttonText = props.buttonText || 'Save';

const MIN_LENGTH_NAME = 4;
const MIN_LENGTH_DESCRIPTION = 10;
const MAX_LENGTH_NAME = 100;
const MAX_LENGTH_DESCRIPTION = 2000;

const DEFAULT_STATE = {
  name: '',
  description: '',

  errors: {},
};

if (!state) {
  if (model) {
    State.init({
      ...model,
    });
  } else {
    State.init(DEFAULT_STATE);
  }
  return props.__engine.loading();
}

const ValidationError = props.__engine.Components.ValidationError;
const FullActionButton = props.__engine.Components.FullActionButton;
const FormLabel = props.__engine.Components.FormLabel;

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
      <FormLabel>Name</FormLabel>
      <input
        type="text"
        placeholder="Name"
        value={state.name || ''}
        onChange={(event) => {
          updateState(event, 'name');
        }}
      />
    </div>
    <ValidationError>{getErrors('name')}</ValidationError>

    <div className="mt-3">
      <FormLabel>Description</FormLabel>
      <textarea
        className="w-100"
        placeholder="Description"
        value={state.description}
        onChange={(event) => {
          updateState(event, 'description');
        }}
        rows={9}
      />
    </div>
    <ValidationError>{getErrors('description')}</ValidationError>

    <br />
    <FullActionButton
      className="mt-3"
      onClick={() => {
        sanitizeValidateAndCall(state);
      }}
    >
      {buttonText}
    </FullActionButton>
  </div>
);
