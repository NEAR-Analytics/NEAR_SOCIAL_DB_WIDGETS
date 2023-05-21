const contract = "almondjelly.near";
const greeting = Near.view(contract, "get_greeting", {});

// Use and manipulate state
State.init({ new_greeting: "" });

const onInputChange = ({ target }) => {
  State.update({ new_greeting: target.value });
};

const onBtnClick = () => {
  if (!state.new_greeting) {
    return;
  }

  Near.call(contract, "set_greeting", {
    greeting: state.new_greeting,
  });
};

// Define components
const greetingForm = (
  <>
    <div class="border border-black p-3">
      <label>Update greeting</label>
      <input placeholder="Howdy" onChange={onInputChange} />
      <button class="btn btn-primary mt-2" onClick={onBtnClick}>
        Save
      </button>
    </div>
  </>
);

const notLoggedInWarning = (
  <p class="text-center py-2"> Log in to change the greeting </p>
);

// Render
return (
  <>
    <div class="container border border-info p-3">
      <h3 class="text-center">
        The contract says:
        <span class="text-decoration-underline"> {greeting} </span>
      </h3>

      <p class="text-center py-2">
        Look at that! A greeting stored on the NEAR blockchain.
      </p>

      {context.accountId ? greetingForm : notLoggedInWarning}
    </div>
  </>
);

return (
  <svg>
    <g>
      <path d="M95.05,41.89c-1.03,0.54-2.07,1.06-3.11,1.59c-0.19,0.09-0.42,0.02-0.51-0.17l-1.51-3.04c-2.42-4.93-4.24-8.65-9.89-10.72 l-0.71-0.24c-1.61-0.5-3.24-0.72-4.83-0.65c-1.59,0.06-3.13,0.41-4.54,1.03c-1.43,0.63-2.73,1.54-3.83,2.74 c-1.04,1.13-1.9,2.52-2.5,4.16c-0.08,0.22-0.16,0.45-0.23,0.68c-1.51,4.84-0.7,10.18,1.14,15.51c1.85,5.37,4.74,10.74,7.36,15.61 l0.02,0.03c1.01,1.87,1.98,3.67,2.88,5.47l3.6,7.16l9.32-4.43l2.47-1.15l3.18-1.45c3.06-1.39,6.42-2.92,9.56-4.49 c1.18-0.59,2.36-1.21,3.51-1.83c1.13-0.62,2.21-1.24,3.23-1.87c0.99-0.61,1.91-1.23,2.74-1.84l0.01-0.01 c0.82-0.61,1.55-1.21,2.15-1.79c0.97-0.94,1.76-1.95,2.36-3c0.64-1.1,1.08-2.25,1.34-3.41c0.25-1.1,0.34-2.22,0.3-3.33 c-0.05-1.15-0.26-2.29-0.6-3.39c-0.34-1.1-0.82-2.17-1.41-3.17c-0.59-1-1.31-1.94-2.12-2.78c-0.96-0.99-2.06-1.85-3.28-2.54 c-1.16-0.66-2.44-1.17-3.79-1.47c-4.77-1.08-8.16,0.67-12.28,2.79L95.05,41.89L95.05,41.89z M42.17,20.82 c-0.26,0.66-0.52,1.32-0.85,2.12l-0.9,2.21l-2.21-0.91c-0.65-0.27-1.32-0.55-1.96-0.83c-6.85-2.89-12.01-5.07-19.69-2.14 c-0.3,0.11-0.62,0.25-0.94,0.39c-4.22,1.85-7.53,4.99-9.35,8.82c-1.78,3.78-2.1,8.26-0.34,12.87c0.1,0.29,0.23,0.59,0.37,0.91 c5.53,12.61,22.21,18.91,36.03,24.13c2.67,1.01,5.22,1.97,7.71,2.99l10.33,4.23l4.72-10.81c-4.68-9.14-8.78-19.37-5.83-28.83 l0.29-0.87c0.81-2.22,1.98-4.11,3.4-5.65c1.5-1.63,3.29-2.88,5.26-3.74c1.89-0.83,3.94-1.29,6.04-1.38 c2.04-0.09,4.12,0.17,6.16,0.78c0.03-0.24,0.05-0.47,0.07-0.7c0.33-3.79-0.43-7.14-1.94-9.96c-1.49-2.78-3.72-5.05-6.36-6.69 c-2.68-1.67-5.78-2.69-8.97-2.97C59.54,4.5,55.74,5.17,52.31,7C46.41,10.18,44.5,14.98,42.17,20.82L42.17,20.82L42.17,20.82z M67.92,70.17l-4.14,9.48l-0.93,2.13l-2.15-0.88l-12.48-5.11c-2.28-0.93-4.89-1.92-7.59-2.94C25.98,67.3,8.29,60.62,1.94,46.17 c-0.15-0.35-0.3-0.73-0.45-1.11c-2.25-5.91-1.83-11.71,0.49-16.61c2.3-4.85,6.47-8.81,11.73-11.13c0.36-0.16,0.74-0.32,1.15-0.47 c9.37-3.57,15.25-1.18,22.96,2.07l0,0c2.65-6.67,4.88-12.16,12.26-16.11c4.26-2.28,8.98-3.12,13.54-2.72 c3.94,0.34,7.76,1.6,11.06,3.65c3.34,2.07,6.16,4.94,8.05,8.48c1.92,3.59,2.89,7.84,2.47,12.61c-0.06,0.72-0.16,1.46-0.29,2.22 c1.8,1.04,3.19,2.26,4.35,3.63c1.72,2.04,2.93,4.42,4.26,7.12c2.28-1.18,4.39-2.23,6.67-2.85c2.41-0.65,4.99-0.81,8.12-0.1 c1.77,0.4,3.44,1.06,4.95,1.93c1.58,0.9,3.01,2.02,4.25,3.31c1.05,1.09,1.97,2.29,2.74,3.58c0.77,1.29,1.38,2.66,1.82,4.09 c0.45,1.46,0.72,2.98,0.79,4.51c0.07,1.48-0.06,2.98-0.39,4.45c-0.35,1.56-0.95,3.1-1.79,4.57c-0.8,1.4-1.84,2.74-3.13,3.98 c-0.74,0.72-1.6,1.43-2.55,2.13c-0.94,0.7-1.98,1.39-3.08,2.07c-1.08,0.67-2.22,1.33-3.41,1.98c-1.17,0.64-2.4,1.28-3.66,1.91 c-1.74,0.88-3.48,1.71-5.18,2.5c-1.68,0.78-3.39,1.56-5.01,2.3c-1.71,0.78-3.4,1.55-5.1,2.35l-12.8,6.08 c-0.19,0.09-0.41,0.01-0.5-0.18l-5.33-10.59c-0.41-0.82-0.87-1.69-1.35-2.6l-1.52-2.83L67.92,70.17L67.92,70.17z" />
    </g>
  </svg>
);
