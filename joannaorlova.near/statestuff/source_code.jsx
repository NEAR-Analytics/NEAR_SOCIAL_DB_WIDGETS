State.init({ greeting: "Have a great day" });

const onChange = ({ target }) => {
  State.update({ greeting: target.value });
};

return (
  <>
    <div class="container border border-info p-3 min-vw-100">
      <p>
        <b> Greeting: </b> {state.greeting}{" "}
      </p>

      <label class="text-left">Change the Greeting</label>
      <input onChange={onChange} />
    </div>
  </>
);
