const label = props.label ?? "Account ID:";
const forbiddenIds = props.forbiddenIds ?? new Set();
const update = props.update;
const value = props.value;

initState({
  valid: true,
  errorMessage: "",
});

const validate = (accountId) => {
  const accountIdRegex =
    /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/;

  if (typeof accountId !== "string") {
    State.update({
      valid: false,
      errorMessage: "Account ID must be a text value!",
    });
    return;
  }

  if (accountId.length < 2) {
    State.update({
      valid: false,
      errorMessage: "Account ID must be at least 2 characters long!",
    });
    return;
  }

  if (accountId.length > 64) {
    State.update({
      valid: false,
      errorMessage: "Account ID must be at most 64 characters long!",
    });
    return;
  }

  if (!accountIdRegex.test(accountId)) {
    State.update({
      valid: false,
      errorMessage:
        'Account ID must follow the rules specified <a href="https://nomicon.io/DataStructures/Account#account-id-rules">here</a>!',
    });
    return;
  }

  if (forbiddenIds.has(accountId)) {
    State.update({
      valid: false,
      errorMessage: "This account ID has already been used!",
    });
    return;
  }

  State.update({ valid: true, errorMessage: "" });
};

if (typeof value !== "string") {
  return "Cannot accept non string value for input!";
}

if (!update) {
  return "Cannot render account ID input without update function!";
}

return (
  <>
    <label htmlFor="account-id">{label}</label>
    <small style={{ color: "red" }}>
      {state.valid ? null : state.errorMessage}
    </small>
    <input
      type="text"
      id="account-id"
      value={value}
      onChange={({ target }) => update(target.value)}
      onBlur={() => validate(value)}
      style={{
        ...(!state.valid ? { borderColor: "red" } : {}),
      }}
    />
  </>
);
