let appName = "avtr";

initState({
  svg: "",
  details: "",
  type: "clothingGraphic",
  name: "nearLogo",
  price: 1,
});

let price = 0;

try {
  price = new Big(state.price).mul(new Big(10).pow(24)).toFixed(0);
} catch (e) {
  console.log(e);
}

let data = {
  [appName]: {
    components: {
      [state.type]: {
        [state.name.replace(" ", "-").trim().toLowerCase()]: {
          name: state.name.replace(/([A-Z])/g, " $1").trim(),
          src: state.svg,
          price,
        },
      },
    },
  },
};

return (
  <div class="container">
    <div class="form-floating">
      <div class="mb-3">
        <label for="type" class="form-label">
          Component type
        </label>
        <input
          type="text"
          class="form-control"
          value={state.type}
          onChange={(e) => State.update({ type: e.target.value })}
          id="type"
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">
          Component name
        </label>
        <input
          type="text"
          class="form-control"
          value={state.name}
          onChange={(e) => State.update({ name: e.target.value })}
          id="name"
        />
      </div>
      <div class="mb-3">
        <label for="details" class="form-label">
          Details (optional)
        </label>
        <input
          type="text"
          class="form-control"
          value={state.details}
          onChange={(e) => State.update({ details: e.target.value })}
          id="details"
        />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">
          Component price (NEAR)
        </label>
        <input
          type="text"
          class="form-control"
          value={state.price}
          onChange={(e) =>
            State.update({
              price: e.target.value,
            })
          }
          id="price"
        />
      </div>
      <div class="mb-3">
        <label for="floatingTextarea">SVG code</label>
        <textarea
          class="form-control"
          placeholder="Paste you SVG source here"
          id="floatingTextarea"
          onChange={(e) => State.update({ svg: e.target.value })}
        />
      </div>
      <div class="mb-3">
        <CommitButton disabled={!(state.type && state.name)} data={data}>
          Submit
        </CommitButton>
      </div>
    </div>
  </div>
);
