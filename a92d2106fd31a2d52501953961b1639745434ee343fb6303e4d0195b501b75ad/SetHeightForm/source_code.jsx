const contractId = "proof_of_height.lewidenmann.near";
const accountId = context.accountId;
if (!accountId) {
  return "Please login to use Proof of Height";
}

State.init({
  heightHasBeenSaved: false,
  heightFeet: 0,
  heightInches: 0,
});

const userHeight = Near.view(contractId, "get_height_inches", {
  account_id: accountId,
});

if (userHeight && !state.heightHasBeenSaved) {
  console.log(userHeight);
  State.update({
    heightHasBeenSaved: true,
    heightFeet: userHeight / 12,
    heightInches: userHeight % 12,
  });
}

const height = {
  feet: state.inputHeightFeet || 0,
  inches: state.inputHeightInches || 0,
};

const heightIsSet = height.feet > 0 || height.inches > 0;
const inchesAreValid = height.inches >= 0 && height.inches < 12;
const formIsValid = heightIsSet && inchesAreValid;

function submitHeight() {
  const totalInches = height.feet * 12 + height.inches;
  Near.call(contractId, "set_height_inches", {
    height: totalInches,
  });
  State.update({
    heightHasBeenSaved: true,
  });
  console.log(`Your height in total inches: ${totalInches}`);
}

return (
  <div class="card p-3">
    {state.heightHasBeenSaved ? (
      <div class="alert alert-success m-0" role="alert">
        Your height has been saved: {state.heightFeet}′{state.heightInches}″
      </div>
    ) : (
      <div>
        <div
          className=" d-flex flex-column flex-md-row align-items-stretch"
          style={{ gap: "1rem" }}
        >
          <div
            className="d-flex align-items-center"
            style={{ marginRight: "auto" }}
          >
            <h5 className="m-0">What&apos;s your height?</h5>
          </div>

          <div
            className="d-flex flex-row"
            style={{ gap: "1rem", minWidth: "15rem" }}
          >
            <div class="form-floating" style={{ width: "50%" }}>
              <input
                className="form-control"
                id="heightFeet"
                type="number"
                placeholder="Feet"
                value={state.giveBadgeAccountId}
                min="0"
                onChange={(e) => {
                  const value = Number(e.target.value) || 0;
                  State.update({ inputHeightFeet: e.target.value });
                }}
              />
              <label for="heightFeet">Feet</label>
            </div>

            <div class="form-floating" style={{ width: "50%" }}>
              <input
                className="form-control"
                id="heightInches"
                type="number"
                placeholder="Inches"
                value={state.giveBadgeAccountId}
                min="0"
                max="11"
                onChange={(e) => {
                  const value = Number(e.target.value) || 0;
                  State.update({ inputHeightInches: value });
                }}
              />
              <label for="heightInches">Inches</label>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            disabled={!formIsValid}
            onClick={submitHeight}
          >
            Save Height: {height.feet}′{height.inches}″
          </button>
        </div>

        {!inchesAreValid && (
          <div class="alert alert-danger m-0 mt-3" role="alert">
            Inches must be between 0 and 11
          </div>
        )}
      </div>
    )}
  </div>
);
